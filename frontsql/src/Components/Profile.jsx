import React, {useEffect, useState} from "react";
import "./Profile.css"
import 'react-calendar-heatmap/dist/styles.css';
import Header from "./Header";
import CalendarHeatmap from "react-calendar-heatmap";


const Profile = () => {
    const [userData, setUserData] = useState({id: 1, date_joined: ""})
    const [userStats, setUserStats] = useState([])
    const [readableDate, setReadableDate] = useState(new Date("2014-07-04T18:06:08-07:00"))


    useEffect(() => {
        const fetchUserInfo = async () => {
            const stats_response = await fetch("/api/user.stats",);
            const user_current_response = await fetch("/api/user.current",);

            const stats_data = await stats_response.json();
            const current_data = await user_current_response.json();

            setUserStats(stats_data.data)
            setUserData(current_data.data)

            let date123 = new Date(userData.date_joined)
            setReadableDate(date123)

        }
        fetchUserInfo()
        console.log(userData)
    },
    [])

    return (
        <div id="__next" className="snipcss-6gCAE">
            <div className="profile">
                <Header/>
                <div className="wrapper">
                    <div className="main">
                        <div className="profile__sidebar">
                            <div className="sidebar_avatar"><img src="/default_avatar.jpg"/>
                            </div>
                            <div className="sidebar_user-info">
                                <div className="sidebar_username">Пользователь #{userData.id}</div>
                                <div className="sidebar_addition">
                                    <div className="social"></div>
                                </div>
                            </div>
                        </div>
                        <div className="content">
                            <div className="sc-55afef06-0 gcHSTq">
                                <h2 className="sc-f8db33bd-0 khEKv">Основная информация</h2>
                                <div className="sc-f8db33bd-1 bxNhCe"><span
                                    className="sc-f8db33bd-2 iVHEAw">Присоединился </span><span
                                    // className="sc-f8db33bd-3 dSHKGE">{userData.date_joined}</span></div>
                                    // className="sc-f8db33bd-3 dSHKGE">2024.{readableDate.getMonth()}.{readableDate.getDay()}</span></div>
                                    className="sc-f8db33bd-3 dSHKGE">2024.06.09</span></div>
                            </div>
                            <div className="sc-55afef06-0 gcHSTq profile-activity">
                                {/*<div className="sc-6d7a1e9b-1 iPUHNu">{userStats.length} активностей за последние 9 месяцев</div>*/}
                                <div className="sc-6d7a1e9b-1 iPUHNu">{userStats.length} активность за последние 9 месяцев</div>
                                <div height="var(--indent-l)" className="sc-edce251-0 ehhlUV"></div>
                                <div className="sc-6d7a1e9b-0 gxEqoW">
                                    <div className="scrollable-container-wrapper style-67GVg" id="style-67GVg">
                                        <div id="style-AQgxP" className="style-AQgxP">
                                            <CalendarHeatmap
                                                startDate={new Date(
                                                        new Date().getFullYear(),
                                                        new Date().getMonth(),
                                                    new Date().getDate() - 270)
                                                }
                                                endDate={new Date()}
                                                values={userStats}
                                                classForValue={(value) => (value?.count > 0 ? 'color-no-empty' : 'color-empty')}
                                            />

                                            {/*<svg className="react-calendar-heatmap" viewBox="0 0 478 96">*/}
                                            {/*    <g transform="translate(0, 0)"*/}
                                            {/*       className="react-calendar-heatmap-month-labels">*/}
                                            {/*        <text x="12" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Sep*/}
                                            {/*        </text>*/}
                                            {/*        <text x="60" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Oct*/}
                                            {/*        </text>*/}
                                            {/*        <text x="120" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Nov*/}
                                            {/*        </text>*/}
                                            {/*        <text x="168" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Dec*/}
                                            {/*        </text>*/}
                                            {/*        <text x="228" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Jan*/}
                                            {/*        </text>*/}
                                            {/*        <text x="276" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Feb*/}
                                            {/*        </text>*/}
                                            {/*        <text x="324" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Mar*/}
                                            {/*        </text>*/}
                                            {/*        <text x="384" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">Apr*/}
                                            {/*        </text>*/}
                                            {/*        <text x="432" y="10"*/}
                                            {/*              className="react-calendar-heatmap-month-label">May*/}
                                            {/*        </text>*/}
                                            {/*    </g>*/}
                                            {/*    <g transform="translate(0, 14)"*/}
                                            {/*       className="react-calendar-heatmap-all-weeks">*/}
                                            {/*        <g transform="translate(0, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(12, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(24, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(36, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(48, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(60, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(72, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(84, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(96, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(108, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(120, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(132, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(144, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(156, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(168, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(180, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(192, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(204, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(216, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(228, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(240, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(252, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(264, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(276, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(288, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-no-empty">*/}
                                            {/*                <title>2 активностей 5 февраля 2024 г.</title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(300, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(312, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(324, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(336, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(348, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(360, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(372, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(384, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(396, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(408, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(420, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(432, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(444, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(456, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="12"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="24"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="36"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="48"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="60"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*            <rect width="10" height="10" x="0" y="72"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*        <g transform="translate(468, 0)"*/}
                                            {/*           className="react-calendar-heatmap-week">*/}
                                            {/*            <rect width="10" height="10" x="0" y="0"*/}
                                            {/*                  className="color-empty">*/}
                                            {/*                <title></title>*/}
                                            {/*            </rect>*/}
                                            {/*        </g>*/}
                                            {/*    </g>*/}
                                            {/*    <g transform="translate(10, 14)"*/}
                                            {/*       className="react-calendar-heatmap-weekday-labels"></g>*/}
                                            {/*</svg>*/}
                                        </div>
                                        <div id="style-WmhDf" className="style-WmhDf">
                                            <div id="style-qMeOm" className="style-qMeOm"></div>
                                        </div>
                                        <div id="style-nwnSD" className="style-nwnSD">
                                            <div id="style-v1knI" className="style-v1knI"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="footer">
                    <div className="content">
                        <div className="social">
                            <div className="social-platform-list"><a aria-label="Перейти в Telegram"
                                                                     target="_blank">
                                <div className="social-platform-item telegram">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="telegram"
                                         className="svg-inline--fa fa-telegram " role="img"
                                         xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512">
                                        <path fill="currentColor"
                                              d="M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"></path>
                                    </svg>
                                </div>
                            </a><a aria-label="Перейти в нашу группу ВКонтакте"
                                   target="_blank">
                                <div className="social-platform-item vk">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="vk"
                                         className="svg-inline--fa fa-vk " role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 448 512">
                                        <path fill="currentColor"
                                              d="M31.4907 63.4907C0 94.9813 0 145.671 0 247.04V264.96C0 366.329 0 417.019 31.4907 448.509C62.9813 480 113.671 480 215.04 480H232.96C334.329 480 385.019 480 416.509 448.509C448 417.019 448 366.329 448 264.96V247.04C448 145.671 448 94.9813 416.509 63.4907C385.019 32 334.329 32 232.96 32H215.04C113.671 32 62.9813 32 31.4907 63.4907ZM75.6 168.267H126.747C128.427 253.76 166.133 289.973 196 297.44V168.267H244.16V242C273.653 238.827 304.64 205.227 315.093 168.267H363.253C359.313 187.435 351.46 205.583 340.186 221.579C328.913 237.574 314.461 251.071 297.733 261.227C316.41 270.499 332.907 283.63 346.132 299.751C359.357 315.873 369.01 334.618 374.453 354.747H321.44C316.555 337.262 306.614 321.61 292.865 309.754C279.117 297.899 262.173 290.368 244.16 288.107V354.747H238.373C136.267 354.747 78.0267 284.747 75.6 168.267Z"></path>
                                    </svg>
                                </div>
                            </a><a aria-label="Связаться с нами">
                                <div className="social-platform-item telegram">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="at"
                                         className="svg-inline--fa fa-at " role="img" xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 512 512">
                                        <path fill="currentColor"
                                              d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"></path>
                                    </svg>
                                </div>
                            </a></div>
                            <div className="link"><a href="/terms-of-use" target="__blank">Пользовательское
                                соглашение</a></div>
                        </div>
                    </div>
                </footer>
            </div>
            <div className="__react_component_tooltip global place-top type-dark" id="global" data-id="tooltip"></div>
            <div className="notification-container notification-container-empty">
                <div></div>
            </div>
        </div>
    );
}
export default Profile;
