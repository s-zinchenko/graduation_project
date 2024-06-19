import React, {useState, useEffect} from "react";
import AceEditor from "react-ace";
import "ace-builds/src-min-noconflict/ext-language_tools";
import "ace-builds/src-min-noconflict/mode-mysql";
import "ace-builds/src-noconflict/theme-github";
import {Button} from "./Button";

const SandboxEditor = ({setQuery, value, setValue, isOpen, databaseId, databaseSchema}) => {
    const [item, setItem] = useState('');
    let [btn_item, setBtnItem] = useState('');
    const onChange = (newValue) => {
        console.log(newValue)
        console.log('onChange',value, newValue)
        setValue(newValue);
        setItem(newValue)
        const btn_item_1 = newValue
    };

    useEffect(()=>{
        setItem(value)
    }, [value])

    const [table_data, setTableData] = useState([]);
    const [table_columns, setTableColumns] = useState([]);


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

        console.log("execute_query_response ", value)
        const execute_query_response = await fetch(
            "/api/databases.execute",
            {
                method: "POST",
                body: JSON.stringify(
                    {
                        query: item,
                        database: databaseId,
                    }
                ),
                headers: {
                    "Content-type": "application/json"
                }
            }
        )
        const execute_query_json = await execute_query_response.json()

        console.log(execute_query_json)

        if (execute_query_response.status === 200) {
            setTableData(execute_query_json.data.rows);
            setTableColumns(execute_query_json.data.columns);
            setQuery(value)
        }

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
                <Button handleClick={onSubmit} iconName="fas fa-play" />
                {/*    <svg*/}
                {/*        xmlns="http://www.w3.org/2000/svg"*/}
                {/*        className="h-6 w-6 inline mr-2"*/}
                {/*        viewBox="0 0 20 20"*/}
                {/*        fill="currentColor"*/}
                {/*    >*/}
                {/*        <title id="run">Отправить запрос</title>*/}
                {/*        <path*/}
                {/*            fillRule="evenodd"*/}
                {/*            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"*/}
                {/*            clipRule="evenodd"*/}
                {/*        />*/}
                {/*    </svg>*/}
                {/*    {" "}*/}
                {/*    Отправить запрос*/}
                {/*</Button>*/}
            </div>
            <div className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible style-oipDm"
                 data-testid="split-view-view" id="style-oipDm">
                <div className="scrollable-container-wrapper query-table-scrollbars style-hPj9E" id="style-hPj9E">
                    <div className="style-MqnoA" id="style-MqnoA">
                        <div className="result-table line-break">
                            <table>
                                <thead>
                                <tr>
                                    <th className="table-row-number"></th>
                                    {table_columns.map((column) => (
                                        <th key={column}>{column}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                {table_data.map((row, index) => (
                                    <tr key={row.id}>
                                        <td className="table-row-number">{index + 1}</td>
                                        {table_columns.map((column) => (
                                            <td key={`${row.id}-${column}`}>{row[column]}</td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SandboxEditor;
