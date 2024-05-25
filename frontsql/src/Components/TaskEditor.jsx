import React, {useState} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import {Button} from "./Button";

const TaskEditor = ({setQuery, value, setValue, isOpen, databaseId, taskId}) => {
    // let [isCorrectTask, setIsCorrectTask] = useState(false)
    let [isCorrectTask, setIsCorrectTask] = useState(false)

    const onChange = (newValue) => {
        setValue(newValue);
    };

    const onSubmit = async () => {
        const check_database_session_response = await fetch(
            "/api/databases.check_session",
            {
              method: "POST",
              body: JSON.stringify({
                database: databaseId
              }),
            headers: {
                "Content-type": "application/json"
              }
            }
        );
        const check_database_session_json = await check_database_session_response.json()

        if (check_database_session_json.data.is_active === false) {
          const create_session_response = await fetch(
              "/api/databases.create_session",
              {
                method: "POST",
                body: JSON.stringify(
                    {
                      database: databaseId
                    }
                ),
              headers: {
                "Content-type": "application/json"
              }
              }
          )
        }


        const execute_query_response = await fetch(
            "/api/course.answer",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        answer: value,
                        practical_task_id: taskId,
                    }
                ),
                headers: {
                    "Content-type": "application/json"
                }
            }
        )
        const execute_query_json = await execute_query_response.json()

        console.log(execute_query_json)

        setIsCorrectTask(() => execute_query_json.data.is_correct)

    };

    return (
        <>
            <div className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible snipcss0-4-6-7 style-8gvjz" data-testid="split-view-view" id="style-8gvjz">
                <div className="sql-editor editor-panel snipcss0-5-7-8">
                    <AceEditor
                        id="editor"
                        aria-label="editor"
                        mode="mysql"
                        theme="github"
                        name="editor"
                        fontSize={16}
                        minLines={15}
                        maxLines={10}
                        width="100%"
                        showPrintMargin={false}
                        showGutter
                        placeholder="Write your Query here..."
                        editorProps={{$blockScrolling: true}}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: true,
                            enableSnippets: true,
                        }}
                        value={value}
                        onChange={onChange}
                        showLineNumbers
                    />
                </div>
                {isCorrectTask &&
                    <div className="sc-21e9fcb5-2 fwQAeW snipcss0-11-117-118 snipcss0-13-149-150">
                        <div className="sc-21e9fcb5-1 boOZQr">
                            <div tabIndex="0" className="sc-12f6b33c-0 bYbnDd sc-21e9fcb5-3 bslxpG"
                                 style={{opacity: 1, height: "45px"}}>
                                <div className="sc-12f6b33c-1 jNPRZP">
                                    <div className="sc-12f6b33c-3 jQblow"><span className="sc-12f6b33c-4 fKWUuL"><svg
                                        aria-hidden="true" focusable="false" data-prefix="far" data-icon="circle-check"
                                        className="svg-inline--fa fa-circle-check " role="img"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor"
                                                                                                       d="M256 48a208 208 0 1 1 0 416 208 208 0 1 1 0-416zm0 464A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0l-111 111-47-47c-9.4-9.4-24.6-9.4-33.9 0s-9.4 24.6 0 33.9l64 64c9.4 9.4 24.6 9.4 33.9 0L369 209z"></path></svg></span>
                                    </div>
                                    <div className="sc-12f6b33c-2 hIwpnE">Решение верно</div>
                                    <div className="sc-12f6b33c-5 fmxQNo"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <Button handleClick={onSubmit} iconName="fas fa-play">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 inline mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <title id="run">run query</title>
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                        />
                    </svg>
                    {" "}
                    Run Query
                </Button>
            </div>
            <div className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible style-oipDm"
                 data-testid="split-view-view" id="style-oipDm">
                <div className="scrollable-container-wrapper query-table-scrollbars style-hPj9E" id="style-hPj9E">
                    <div className="style-MqnoA" id="style-MqnoA">
                        <div className="result-table line-break">
                            {!isCorrectTask && <div className="empty-query snipcss0-11-145-146">Здесь будет результат вашего
                                запроса</div>}

                            {/*{isCorrectTask &&*/}
                            {/*    <table>*/}
                            {/*        <thead>*/}
                            {/*        <tr>*/}
                            {/*            <th className="table-row-number"></th>*/}
                            {/*            {table_columns.map((column) => (*/}
                            {/*                <th key={column}>{column}</th>*/}
                            {/*            ))}*/}
                            {/*        </tr>*/}
                            {/*        </thead>*/}
                            {/*        <tbody>*/}
                            {/*        {table_data.map((row, index) => (*/}
                            {/*            <tr key={row.id}>*/}
                            {/*                <td className="table-row-number">{index + 1}</td>*/}
                            {/*                {table_columns.map((column) => (*/}
                            {/*                    <td key={`${row.id}-${column}`}>{row[column]}</td>*/}
                            {/*                ))}*/}
                            {/*            </tr>*/}
                            {/*        ))}*/}
                            {/*        </tbody>*/}
                            {/*    </table>*/}
                            {/*}*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskEditor;
