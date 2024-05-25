import React from "react";

export const Button = ({children, className, handleClick}) => {
    return (
        <div className="sc-6bb5377-0 bWVWpK snipcss0-5-7-59">
            <div className="sc-21e9fcb5-0 epabOj snipcss0-6-59-60">
                <div
                    className="sc-21e9fcb5-2 fwQAeW snipcss0-7-60-61"></div>
                <div
                    className="sc-6bb5377-1 igZPqo snipcss0-7-60-62">
                    <button type="button" kind="primary"
                            shape="rounded"
                            className="sc-ac123477-1 fhnrwH snipcss0-8-62-63" onClick={handleClick}>
                        <div data-tip="⌘ + enter"
                             className="sc-ac123477-2 sc-ac123477-3 isesWM bYIbeg snipcss0-9-63-64"
                             currentitem="false">
                            <div
                                className="sc-ac123477-5 iEnqmq snipcss0-10-64-65 style-lGTws"
                                id="style-lGTws">
                                {children}
                            </div>
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
};
