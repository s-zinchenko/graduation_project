import ERDiagram from "./ERDiagram";
import React, {useState, useEffect} from "react";
import './Sandbox.css'
import Header from "./Header";

const SandboxEditor = React.lazy(() => import("./SandboxEditor"));


const Sandbox = () => {
    const [query, setQuery] = useState("");
    const [value, setValue] = useState("select * from customers");
    const [isOpen, setIsOpen] = useState(false);

    const [options, setOptions] = useState([]);

    let xhr = new XMLHttpRequest();
    xhr.open('GET', `/api/databases.get?id=1`, false);
    xhr.send(null);
    let databaseSchema = JSON.parse(xhr.response);

    let [databaseInfo, setDatabaseInfo] = useState(databaseSchema);


    useEffect(() => {
        const fetchOptions = async () => {
            const response = await fetch("/api/databases.list",);
            const data = await response.json();
            setOptions(data.data.items);
        };

        fetchOptions();
        },
        []
    );

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;

        let xhr = new XMLHttpRequest();
        xhr.open('GET', `/api/databases.get?id=${selectedOption}`, false);
        xhr.send(null);
        databaseSchema = JSON.parse(xhr.response);

        setDatabaseInfo(() => databaseSchema)
    };


    return (
        <>
            <div id="__next" className="snipcss-5Zqk1">
                <div className="sandbox-page">
                    <Header/>
                    <main>
                        <div className="sandbox">
                            <div className="wrapper">
                                <main className="main">
                                    <div
                                        className="split-view split-view-horizontal split-view-separator-border allotment-module_splitView__L-yRc allotment-module_horizontal__7doS8 allotment-module_separatorBorder__x-rDS root-panel">
                                        <div className="sash-container allotment-module_sashContainer__fzwJF">
                                            <div
                                                className="sash sash-module_sash__K-9lB sash-mac sash-module_mac__Jf6OJ sash-vertical sash-module_vertical__pB-rs style-ewWOd"
                                                data-testid="sash" id="style-ewWOd"></div>
                                        </div>
                                        <div
                                            className="split-view-container allotment-module_splitViewContainer__rQnVa snipcss0-0-0-1">
                                            <div
                                                className="split-view-view allotment-module_splitViewView__MGZ6O split-view-view-visible snipcss0-1-1-2 style-HNsFM"
                                                data-testid="split-view-view" id="style-HNsFM">
                                                <div
                                                    className="split-view split-view-vertical split-view-separator-border allotment-module_splitView__L-yRc allotment-module_vertical__WSwwa allotment-module_separatorBorder__x-rDS snipcss0-2-2-3">
                                                    <div
                                                        className="sash-container allotment-module_sashContainer__fzwJF snipcss0-3-3-4">
                                                        <div
                                                            className="sash sash-module_sash__K-9lB sash-mac sash-module_mac__Jf6OJ sash-horizontal sash-module_horizontal__kFbiw snipcss0-4-4-5 sash-module_minimum__-UKxp sash-minimum style-wvy27"
                                                            data-testid="sash" id="style-wvy27"></div>
                                                    </div>
                                                    <div
                                                        className="split-view-container allotment-module_splitViewContainer__rQnVa snipcss0-3-3-6">
                                                            <SandboxEditor
                                                                setQuery={setQuery}
                                                                value={value}
                                                                setValue={setValue}
                                                                isOpen={isOpen}
                                                                databaseId={databaseInfo.data.id}
                                                                databaseSchema={databaseInfo.data}
                                                            />
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className="split-view-view allotment-module_splitViewView__MGZ6O database-pane split-view-view-visible snipcss0-1-1-69 style-ZhBV7"
                                                data-testid="split-view-view" id="style-ZhBV7">
                                                <div className="erd-datagrip snipcss0-2-69-70 style-GJbNZ"
                                                     id="style-GJbNZ">
                                                    <div className="controls snipcss0-3-70-71">
                                                        {/*<div*/}
                                                        {/*    className="sc-3518867f-2 fRGnJi snipcss0-4-71-72 style-h8I1R"*/}
                                                        {/*    id="style-h8I1R">Авиаперелёты*/}
                                                        {/*    <svg viewBox="0 0 1 0.5" style={{width: "14px", height: "7px"}}*/}
                                                        {/*         className="snipcss0-5-72-73">*/}
                                                        {/*        <path*/}
                                                        {/*            d="M 0.15 0 L 0.85 0 Q 0.95 0.05 0.85 0.15 L 0.6 0.4 Q 0.5 0.5 0.4 0.4 L 0.15 0.15 Q 0.05 0.05 0.15 0"*/}
                                                        {/*            fill="var(--text-color-primary)"></path>*/}
                                                        {/*    </svg>*/}
                                                        {/*</div>*/}
                                                        <select className={"custom-select"} onChange={handleOptionChange}>
                                                            {options.map((item) => (
                                                                <option key={item.id} value={item.id}>
                                                                    {item.title}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="diagram-container snipcss0-3-70-74">
                                                        <svg style={{position: "absolute", top: "0px", left: "0px"}}
                                                             className="snipcss0-4-74-75">
                                                            <defs className="snipcss0-5-75-76">
                                                                <marker id="many-left" viewBox="0 0 20 20"
                                                                        markerHeight="10" markerWidth="10" refX="20"
                                                                        refY="10" className="snipcss0-6-76-77">
                                                                    <path
                                                                        d="M 0 10 L 20 10 M 0 10 L 20 0 M 0 10 L 20 20"
                                                                        stroke="#b1b1b7" stroke-width="2"></path>
                                                                </marker>
                                                                <marker id="many-right" viewBox="0 0 20 20"
                                                                        markerHeight="10" markerWidth="10" refX="0"
                                                                        refY="10" className="snipcss0-6-76-78">
                                                                    <path
                                                                        d="M 20 10 L 0 10 M 20 10 L 0 0 M 20 10 L 0 20"
                                                                        stroke="#b1b1b7" stroke-width="2"></path>
                                                                </marker>
                                                            </defs>
                                                        </svg>
                                                        <ERDiagram schema={databaseInfo.data} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </main>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </>
    )

}
export default Sandbox;