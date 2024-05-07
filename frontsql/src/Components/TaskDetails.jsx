import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


const Editor = React.lazy(() => import("./SqlEditor"));

const TaskDetails = () => {
  const [query, setQuery] = useState("");
  const [value, setValue] = useState("select * from customers");
  const [isOpen, setIsOpen] = useState(false);

  const [task, setTask] = useState(null);
  const { taskId } = useParams();

  useEffect(() => {
    fetchTask();
  }, [taskId]);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/course.task_detail?id=${taskId}`);
      const data = await response.json();
      setTask(data.data);
    } catch (error) {
      console.error('Error fetching task:', error);
    }
  };

  if (!task) {
    return <div>Loading...</div>;
  }

  console.log(task)
  return (
      <>
          <div>
              <h2>Task Details</h2>
              <p>ID: {task.id}</p>
              <p>Question: {task.question}</p>
              <p>Result Format Hint: {task.result_format_hint}</p>
              <p>Extra Hint: {task.extra_hint}</p>
              <p>Task Order: {task.task_order}</p>
              <p>Task Type: {task.task_type}</p>
              <p>Difficulty: {task.difficulty}</p>
          </div>
          <Editor
              setQuery={setQuery}
              value={value}
              setValue={setValue}
              isOpen={isOpen}
              databaseId={task.database.id}
          />
      </>

  );
};

export default TaskDetails;
