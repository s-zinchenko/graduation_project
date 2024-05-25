import React, {useState, useEffect} from 'react';
import {Link, useLocation, useSearchParams} from 'react-router-dom';
import './TaskList.css'
import Header from "./Header";

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
            let task_url = '/api/course.tasks?';
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
        <div className="trainer-tasks snipcss0-0-0-1 snipcss-xA1nU">
        <Header/>
        <div className="wrapper">
            <div className="main-container snipcss0-2-32-33">
                <div className="title-container snipcss0-3-33-34">
                    <div className="title snipcss0-4-34-35">Доступные задания</div>
                    </div>
                <div height="var(--indent-l)" className="sc-edce251-0 ehhlUV snipcss0-3-33-42"></div>

            <div className="tasks snipcss0-3-33-43">
                <div className="tasks__loading-container snipcss0-4-43-44">
                    {tasks.map((task) => (
                        <a target="_blank" className="trainer-list-task snipcss0-5-44-77" href={`/tasks/${task.id}`}>
                        {/*<Link to={`/tasks/${task.id}`}># {task.id}</Link>*/}
                        <div className="trainer-list-task__question snipcss0-6-77-78">{task.question}</div>
                        <div height="var(--indent-m)" className="sc-edce251-0 iAMgQU snipcss0-6-77-79"></div>
                        <div className="trainer-list-task__params snipcss0-6-77-80">
                        <div data-tip="Лёгкая" className="difficulty-indicator snipcss0-7-80-81"
                        currentitem="false">
                            {(() => {
                                if (task.difficulty === '1') {
                                    return (
                                        <>
                                            <div className="dot easy snipcss0-12-22-23"></div>
                                            <div className="dot snipcss0-12-22-24"></div>
                                            <div className="dot snipcss0-12-22-25"></div>
                                        </>
                                    )
                                }
                                if (task.difficulty === '2') {
                                    return (
                                        <>
                                            <div className="dot medium snipcss0-12-22-23"></div>
                                            <div className="dot medium snipcss0-12-22-24"></div>
                                            <div className="dot snipcss0-12-22-25"></div>
                                        </>
                                    )
                                }
                                if (task.difficulty === '3') {
                                    return (
                                        <>
                                            <div className="dot hard snipcss0-12-22-23"></div>
                                            <div className="dot hard snipcss0-12-22-24"></div>
                                            <div className="dot hard snipcss0-12-22-25"></div>
                                        </>
                                    )
                                }
                            })()}
                        </div>
                        <div width="var(--indent-m)" className="sc-edce251-0 kUzPR snipcss0-7-80-85"></div>
                        <div className="trainer-list-task__status snipcss0-7-80-87"></div>
                        </div>
                        </a>

                        ))}


                </div>
            </div>
            </div>

            <div className="sidebar">
                <div className="filters">
                    <div className="checker-filter">
                        <div className="checker-filter__title">Статус</div>
                        <div className="checker-filter__field">
                            <input type="checkbox" id="solved" name="status" value="completed"
                                   onChange={handleFilterChange}
                                   checked={searchParams.getAll('status').includes('completed')}/>
                            <label htmlFor="solved">Решённые</label>
                        </div>
                        <div className="checker-filter__field">
                            <input id="unsolved" type="checkbox" name="status" value="not_started"
                                   onChange={handleFilterChange}
                                   checked={searchParams.getAll('status').includes('not_started')}/>
                            <label htmlFor="unsolved">Нерешённые</label>
                        </div>
                    </div>
                    <hr/>
                    <div className="checker-filter">
                        <div className="checker-filter__title">Сложность</div>
                        <div className="checker-filter__field">
                            <input type="checkbox" name="difficulty" value="easy" onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('easy')}/>
                            <label htmlFor="easy">Лёгкие</label>
                        </div>
                        <div className="checker-filter__field">
                            <input type="checkbox" name="difficulty" value="medium" onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('medium')}/>
                            <label htmlFor="medium">Средние</label>
                        </div>
                        <div className="checker-filter__field">
                            <input type="checkbox" name="difficulty" value="hard" onChange={handleFilterChange}
                                   checked={searchParams.getAll('difficulty').includes('hard')}/>
                            <label htmlFor="hard">Сложные</label>
                        </div>
                    </div>
                    <hr/>
                </div>
            </div>
        </div>
        </div>
    )
}

export default TaskList;
