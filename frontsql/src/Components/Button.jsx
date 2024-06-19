import React, {useEffect, useRef} from "react";
import "./Main.css"
import {fireEvent} from "@testing-library/react";

export const Button = ({children, className, handleClick}) => {
    // return (
    //     <div className="sc-6bb5377-0 bWVWpK snipcss0-5-7-59">
    //         <div className="sc-21e9fcb5-0 epabOj snipcss0-6-59-60">
    //             <div
    //                 className="sc-21e9fcb5-2 fwQAeW snipcss0-7-60-61"></div>
    //             <div>
    //                 <button type="button" kind="primary"
    //                         shape="rounded"
    //                         className="sc-ac123477-1 fhnrwH snipcss0-8-62-63" onClick={handleClick}>
    //                     <div data-tip="⌘ + enter"
    //                          className="sc-ac123477-2 sc-ac123477-3 isesWM bYIbeg snipcss0-9-63-64"
    //                          currentitem="false">
    //                         <div
    //                             className="sc-ac123477-5 iEnqmq snipcss0-10-64-65 style-lGTws"
    //                             id="style-lGTws">
    //                             Отправить запрос
    //                         </div>
    //                     </div>
    //                 </button>
    //             </div>
    //         </div>
    //     </div>
    // );

    // const buttonRef = useRef(null);
    //
    // const handleKeyDown = (event) => {
    //     if (event.ctrlKey && event.key === 'Enter') {
    //         buttonRef.current.click(); // Имитируем нажатие на кнопку
    //     }
    // };

    const keydownHandler = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            // handleClick
            const btn = document.getElementById("custom-button-id")
            // handleClick();
            fireEvent.click(btn);
            // btn.onclick(e)
        }
    };
    useEffect(() => {
        document.addEventListener('keydown', keydownHandler);
        return () => {
            document.removeEventListener('keydown', keydownHandler);
        }
    }, []);

    return (
        <div className="check-result">
            <div className="sc-21e9fcb5-0 epabOj">
                <div className="sc-21e9fcb5-2 fwQAeW"></div>
                <div className="tools">
                    <div style={{border_radius: "50px",}} >
                        <button className={"custom-button"} type="button" id={"custom-button-id"}
                                 onClick={handleClick}>
                            <div data-tip="⌘ + shift + enter" >
                                <div >Отправить</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
