import React, {useState, useEffect} from 'react';
import {Link, useLocation, useSearchParams} from 'react-router-dom';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        fetchTasks();
    }, [searchParams]);

    const fetchTasks = async () => {
        const difficult_map = {
            "easy": 1,
            "medium": 2,
            "hard": 3
        }
        try {
            let task_url = 'http://127.0.0.1:8000/api/course.tasks?';
            const difficulty = searchParams.get('difficulty');

            if (difficulty) {
                task_url = task_url + `&difficulty=${difficult_map[difficulty]}`;
            }
            console.log(searchParams)
            const status = searchParams.get('status');
            if (status != null) {
                task_url = task_url + `&status=${status}`;
            }

            console.log(task_url)

            const response = await fetch(task_url);

            const data = await response.json();
            setTasks(data.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleFilterChange = (e) => {
        const {name, value, checked} = e.target;
        const newSearchParams = new URLSearchParams(searchParams);

        if (name === 'difficulty') {
            const difficulties = newSearchParams.getAll('difficulty');
            if (checked) {
                difficulties.push(value);
            } else {
                const index = difficulties.indexOf(value);
                difficulties.splice(index, 1);
            }
            newSearchParams.delete('difficulty');
            difficulties.forEach((difficulty) => newSearchParams.append('difficulty', difficulty));
        }

        if (name === 'status') {
            const statuses = newSearchParams.getAll('status');
            if (checked) {
                statuses.push(value);
            } else {
                const index = statuses.indexOf(value);
                statuses.splice(index, 1);
            }
            newSearchParams.delete('status');
            statuses.forEach((status) => newSearchParams.append('status', status));
        }

        setSearchParams(newSearchParams);
    };

    const back_front_task_difficulty_map = {
      "1": "easy",
      "2": "medium",
      "3": "hard"
    }

    return (
        <div className="wrapper">
            <div className="title-container">
                <div className="title">Доступные задания</div>
            </div>
            <div className="tasks-container">
                <div className="task-list">
                    {tasks.map((task) => (
                        <div className="task-card">
                            <div className="task-header">
                                <Link to={`/tasks/${task.id}`}># {task.id}</Link>

                            </div>
                            <p className="task-description">
                                {task.question}
                            </p>
                            <div className="task-footer">
                                <span data-difficulty={back_front_task_difficulty_map[task.difficulty]} className="dot"></span>
                            </div>

                        </div>
                    ))}
                </div>


                <div className="filters">
                    <div className="filter-group">
                        <div className="checker-filter__title">Статус</div>
                        <div className="checker-filter__field"><input type="checkbox" id="solved" name="status"
                                                                      value="completed"
                                                                      onChange={handleFilterChange}
                                                                      checked={searchParams.getAll('status').includes('completed')}/><label
                        >Решённые</label></div>
                        <div className="checker-filter__field"><input
                            id="unsolved" type="checkbox" name="status" value="not_started"
                            onChange={handleFilterChange}
                            checked={searchParams.getAll('status').includes('not_started')}/><label
                        >Нерешённые</label></div>
                    </div>

                    <div className="filter-group">
                        <div className="checker-filter__title">Сложность</div>
                        <div className="checker-filter__field"><label>
                            <input type="checkbox" name="difficulty" value="easy"
                                   onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('easy')}/>
                            Easy
                        </label>
                        </div>
                        <div className="checker-filter__field"><label>
                            <input type="checkbox" name="difficulty" value="medium"
                                   onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('medium')}/>
                            Medium
                        </label></div>
                        <div className="checker-filter__field"><label>
                            <input type="checkbox" name="difficulty" value="hard"
                                   onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('hard')}/>
                            Hard
                        </label></div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default TaskList;
