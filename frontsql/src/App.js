import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskDetails from "./Components/TaskDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="tasks" element={<TaskList />} />
        <Route path="/tasks/:taskId" element={<TaskDetails />} />
        {/* Другие маршруты */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
