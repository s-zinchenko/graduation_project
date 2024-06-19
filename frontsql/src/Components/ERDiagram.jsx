import React, {useState, useCallback} from 'react';
import ReactFlow, {
    Controls,
    Background,
} from 'reactflow';

import 'reactflow/dist/style.css';
import TableNode from "./TableNode";

const ERDiagram = ({schema}) => {
    const nodes = schema.tables.map((table, index) => ({
        id: `node-${table.id}`,
        type: 'table',
        // position: {x: index * 500, y: index * 100},
        position: table.position,
        data: {...table},
    }));


    const edges = schema.relations.map((relation) => ({
        id: `edge-${relation.id}`,
        sourceHandle: `column-${schema.tables.find((table) => table.title === relation.source.table_name).title}-${schema.tables.find((table) => table.title === relation.source.table_name).props.find((prop) => prop.name === relation.source.field_name).name}-source`,
        targetHandle: `column-${schema.tables.find((table) => table.title === relation.target.table_name).title}-${schema.tables.find((table) => table.title === relation.target.table_name).props.find((prop) => prop.name === relation.target.field_name).name}-target`,
        source: `node-${schema.tables.find((table) => table.title === relation.source.table_name).id}`,
        target: `node-${schema.tables.find((table) => table.title === relation.target.table_name).id}`,
        // type: relation.type,
        // label: relation.type,
        markerStart: {
            type: 'arrow',
        },
    }));

    const nodeTypes = {
        table: TableNode,
    };


    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            fitView
        >
            <Background/>
            <Controls/>
        </ReactFlow>
    );


};

export default ERDiagram;