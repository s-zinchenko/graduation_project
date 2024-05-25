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
        position: {x: index * 500 * Math.random(1, -1), y: index * 500 * Math.random(2, -2)},
        data: {...table},
    }));


    const edges = schema.relations.map((relation) => ({
        id: `edge-${relation.id}`,
        sourceHandle: `column-${schema.tables.find((table) => table.title === relation.source.table).title}-${schema.tables.find((table) => table.title === relation.source.table).props.find((prop) => prop.name === relation.source.field).name}-source`,
        targetHandle: `column-${schema.tables.find((table) => table.title === relation.target.table).title}-${schema.tables.find((table) => table.title === relation.target.table).props.find((prop) => prop.name === relation.target.field).name}-target`,
        source: `node-${schema.tables.find((table) => table.title === relation.source.table).id}`,
        target: `node-${schema.tables.find((table) => table.title === relation.target.table).id}`,
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