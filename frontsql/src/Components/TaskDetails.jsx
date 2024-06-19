import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import ERDiagram from "./ERDiagram";
import "./TaskDetails.css"
import Header from "./Header";


const Editor = React.lazy(() => import("./TaskEditor"));

const TaskDetails = () => {
    const [query, setQuery] = useState("");
    const [value, setValue] = useState("select * from customers");
    const [isOpen, setIsOpen] = useState(false);

    const [task, setTask] = useState(null);
    const {taskId} = useParams();

    useEffect(() => {
        fetchTask();
    }, [taskId]);

    const fetchTask = async () => {
        try {
            const response = await fetch(`/api/course.task_detail?id=${taskId}`, {credentials: "same-origin"});
            const data = await response.json();
            console.log(data)
            setTask(data.data);
        } catch (error) {
            console.error('Error fetching task:', error);
        }
    };

    if (!task) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div id="__next" className="snipcss-JcZIV">
                <div className="trainer trainer-tasks">
                    <Header />
                    <div className="snipcss0-0-0-1 style-HKwqa" id="style-HKwqa">
                        <div className="snipcss0-1-1-2 style-Lt2Gc" id="style-Lt2Gc">
                            <div className="panel-container snipcss0-2-2-9">
                                <div
                                    className="split-view split-view-horizontal split-view-separator-border allotment-module_splitView__L-yRc allotment-module_horizontal__7doS8 allotment-module_separatorBorder__x-rDS root-panel false snipcss0-3-9-10">
                                    <div
                                        className="sash-container allotment-module_sashContainer__fzwJF snipcss0-4-10-11">
                                        <div
                                            className="sash sash-module_sash__K-9lB sash-mac sash-module_mac__Jf6OJ sash-vertical sash-module_vertical__pB-rs snipcss0-5-11-12 style-6noq4"
                                            data-testid="sash" id="style-6noq4"></div>
                                        <div
                                            className="sash sash-module_sash__K-9lB sash-mac sash-module_mac__Jf6OJ sash-vertical sash-module_vertical__pB-rs snipcss0-5-11-13 style-qCXBx"
                                            data-testid="sash" id="style-qCXBx"></div>
                                    </div>
                                    <div
                                        className="split-view-container allotment-module_splitViewContainer__rQnVa snipcss0-4-10-14">
                                        <div
                                            className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible snipcss0-5-14-15 style-CRhkB"
                                            data-testid="split-view-view" id="style-CRhkB">
                                            <div className="scrollable-container-wrapper snipcss0-6-15-16 style-eaz2D"
                                                 id="style-eaz2D">
                                                <div className="snipcss0-7-16-17 style-cvVoB" id="style-cvVoB">
                                                    <div
                                                        className="box questionbox trainer-tour-step-1 snipcss0-8-17-18">
                                                        <div className="box__title snipcss0-9-18-19">
                                                            <div className="title snipcss0-10-19-20">
                                                                <div className="snipcss0-11-20-21">Задание {task.id}</div>
                                                                <div data-tip="Лёгкая"
                                                                     className="difficulty-indicator snipcss0-11-20-22"
                                                                     currentitem="false">
                                                                    {(() => {
                                                                        if (task.difficulty === '1'){
                                                                            return (
                                                                                <>
                                                                                    <div className="dot easy snipcss0-12-22-23"></div>
                                                                                    <div className="dot snipcss0-12-22-24"></div>
                                                                                    <div className="dot snipcss0-12-22-25"></div>
                                                                                </>
                                                                            )
                                                                        }
                                                                        if (task.difficulty === '2'){
                                                                            return (
                                                                                <>
                                                                                    <div className="dot medium snipcss0-12-22-23"></div>
                                                                                    <div className="dot medium snipcss0-12-22-24"></div>
                                                                                    <div className="dot snipcss0-12-22-25"></div>
                                                                                </>
                                                                            )
                                                                        }
                                                                        if (task.difficulty === '3'){
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
                                                            </div>
                                                            <div className="box__title-extra snipcss0-10-19-26"></div>
                                                        </div>
                                                        <div className="box__content snipcss0-9-18-27">
                                                            <div className="content snipcss0-10-27-28">
                                                                <div className="task snipcss0-11-28-29">{task.question}
                                                                </div>
                                                                <div className="task-divider snipcss0-11-28-30"></div>
                                                                <span
                                                                    className="trainer-tour-question-details snipcss0-11-28-31">
                                                        <div className="show snipcss0-12-31-32"><span
                                                            className="snipcss0-13-32-33">Поля в результирующей таблице:</span>
                                                            <div className="question-field snipcss0-13-32-34">{task.result_format_hint}</div>
                                                        </div>
                                                    </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="snipcss0-7-16-55 style-X4OS9" id="style-X4OS9">
                                                    <div className="snipcss0-8-55-56 style-133Lx"
                                                         id="style-133Lx"></div>
                                                </div>
                                                <div className="snipcss0-7-16-57 style-v4XoJ" id="style-v4XoJ">
                                                    <div className="snipcss0-8-57-58 style-CgU6o"
                                                         id="style-CgU6o"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible snipcss0-5-14-59 style-7sasl"
                                            data-testid="split-view-view" id="style-7sasl">
                                            <div
                                                className="split-view split-view-vertical split-view-separator-border allotment-module_splitView__L-yRc allotment-module_vertical__WSwwa allotment-module_separatorBorder__x-rDS snipcss0-6-59-60">
                                                <div
                                                    className="sash-container allotment-module_sashContainer__fzwJF snipcss0-7-60-61">
                                                </div>
                                                <div
                                                    className="split-view-container allotment-module_splitViewContainer__rQnVa snipcss0-7-60-63">
                                                    <Editor
                                                        setQuery={setQuery}
                                                        value={value}
                                                        setValue={setValue}
                                                        isOpen={isOpen}
                                                        databaseId={task.database.id}
                                                        databaseSchema={task.database}
                                                        taskId={task.id}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div
                                            className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible snipcss0-5-14-147 style-3oUWP"
                                            data-testid="split-view-view" id="style-3oUWP">
                                            <div
                                                className="erd-datagrip trainer-diagram trainer-tour-step-7 snipcss0-6-147-148 style-QXm62"
                                                id="style-QXm62">
                                                <div className="controls snipcss0-7-148-149"></div>
                                                <div className="diagram-container snipcss0-7-148-150">
                                                    <svg style={{position: "absolute", top: "0px", left: "0px"}}
                                                         className="snipcss0-8-150-151">
                                                        <defs className="snipcss0-9-151-152">
                                                            <marker id="many-left" viewBox="0 0 20 20" markerHeight="10"
                                                                    markerWidth="10" refX="20" refY="10"
                                                                    className="snipcss0-10-152-153">
                                                                <path d="M 0 10 L 20 10 M 0 10 L 20 0 M 0 10 L 20 20"
                                                                      stroke="#b1b1b7" stroke-width="2"></path>
                                                            </marker>
                                                            <marker id="many-right" viewBox="0 0 20 20"
                                                                    markerHeight="10" markerWidth="10" refX="0"
                                                                    refY="10" className="snipcss0-10-152-154">
                                                                <path d="M 20 10 L 0 10 M 20 10 L 0 0 M 20 10 L 0 20"
                                                                      stroke="#b1b1b7" stroke-width="2"></path>
                                                            </marker>
                                                        </defs>
                                                    </svg>
                                                    <ERDiagram schema={task.database} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/*<main>*/}
            {/*    <div className="sandbox">*/}
            {/*        <div className="wrapper">*/}
            {/*            <div className="split-view-container">*/}
            {/*                <div className="split-view-view">*/}
            {/*                    <div>*/}
            {/*                        <h2>Task Details</h2>*/}
            {/*                        <p>ID: {task.id}</p>*/}
            {/*                        <p>Question: {task.question}</p>*/}
            {/*                        <p>Result Format Hint: {task.result_format_hint}</p>*/}
            {/*                        <p>Extra Hint: {task.extra_hint}</p>*/}
            {/*                        <p>Task Order: {task.task_order}</p>*/}
            {/*                        <p>Task Type: {task.task_type}</p>*/}
            {/*                        <p>Difficulty: {task.difficulty}</p>*/}
            {/*                    </div>*/}
            {/*                    <Editor*/}
            {/*                        setQuery={setQuery}*/}
            {/*                        value={value}*/}
            {/*                        setValue={setValue}*/}
            {/*                        isOpen={isOpen}*/}
            {/*                        databaseId={task.database.id}*/}
            {/*                        taskId={task.id}*/}
            {/*                    />*/}
            {/*                    <ERDiagram schema={task.database}/>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</main>*/}
        </>

    );
};

export default TaskDetails;
