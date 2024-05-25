import {Handle, Position} from "reactflow";
import {memo} from "react";
import "./TableNode.css"

export default memo(({data, isConnectable}) => {
    return (
        <>
            <div className="table-node">
                <div className="table-node__title">{data.title}</div>
                <p>{data.description}</p>
                {data.props.map((prop, index) => (
                    <div className="table-field">
                        <Handle type="source" id={`column-${data.title}-${prop.name}-source`}
                                className="handle-left" position={Position.Left}
                                isConnectable={isConnectable}
                        />
                        <Handle type="target" id={`column-${data.title}-${prop.name}-target`}
                                className="handle-left" position={Position.Left}
                                isConnectable={isConnectable}
                        />

                        {prop.is_key &&
                        <>
                            'PK'
                        <div width="6px" className="sc-edce251-0 fZHVVv"></div>
                        </>
                        }
                        <div className="table-field__container">
                            <div className="table-field__name">{prop.name}</div>
                            <div width="6px" className="sc-edce251-0 fZHVVv"></div>
                            <div className="table-field__datatype">{prop.type.toUpperCase().slice(0, 9)}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
})

// export default TableNode;
