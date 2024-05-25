import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, useParams} from 'react-router-dom';
import TaskList from './Components/TaskList';
import TaskDetails from "./Components/TaskDetails";
import Sandbox from "./Components/Sandbox";
import Profile from "./Components/Profile";
import Main from "./Components/Main";

function App() {
    const user_info = async () => {
        const user_current_response = await fetch(
            "/api/user.current",
        )
        const data = await user_current_response.json();

        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('userIsLazy', data.data.is_lazy);
    }

    user_info()

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/tasks" element={<TaskList/>}/>
                    <Route path="/tasks/:taskId" element={<TaskDetails/>}/>
                    <Route path="/sandbox" element={<Sandbox/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/" element={<Main/>}/>
                    {/* Другие маршруты */}
                </Routes>
            </BrowserRouter>
        </>
);
}

export default App;
