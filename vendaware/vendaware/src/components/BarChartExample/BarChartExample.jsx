import React, { Component } from "react";
import NodeGroup from "react-move/NodeGroup";
import {
    getInitialData,
    getAppendedData,
    getTruncatedData,
    getUpdatedData
} from "./helpers";
import css from "./BarChart.module.scss";
import {ResizableBox} from "react-resizable";

let barHeight = 25;
let barPadding = 2;
let barColour = "#348AA7";
let widthScale = d => d * 5;

function BarGroup(props) {
    let width = widthScale(props.state.value);
    let yMid = barHeight * 0.5;

    return (
        <g className={css.bar_group} transform={`translate(0, ${props.state.y})`}>
            <rect
                y={barPadding * 0.5}
                width={width}
                height={barHeight - barPadding}
                style={{ fill: barColour, opacity: props.state.opacity }}
            />
            <text
                className={css.value_label}
                x={width - 6}
                y={yMid}
                alignmentBaseline="middle"
            >
                {props.state.value.toFixed(0)}
            </text>
            <text
                className={css.name_label}
                x="-6"
                y={yMid}
                alignmentBaseline="middle"
                style={{ opacity: props.state.opacity }}
            >
                {props.data.name}
            </text>
        </g>
    );
}

class BarChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: getInitialData()
        };

        this.handleAdd = this.handleAdd.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleAdd() {
        this.setState({
            data: getAppendedData(this.state.data)
        });
    }

    handleRemove() {
        this.setState({
            data: getTruncatedData(this.state.data)
        });
    }

    handleUpdate() {
        this.setState({
            data: getUpdatedData(this.state.data)
        });
    }

    startTransition(d, i) {
        return { value: 0, y: i * barHeight, opacity: 0 };
    }

    enterTransition(d) {
        return { value: [d.value], opacity: [1], timing: { duration: 250 } };
    }

    updateTransition(d, i) {
        return { value: [d.value], y: [i * barHeight], timing: { duration: 300 } };
    }

    leaveTransition(d) {
        return { y: [-barHeight], opacity: [0], timing: { duration: 250 } };
    }

    render() {
        return (
            <ResizableBox className={css.item} width={850} height={350}
                               minConstraints={[850, 350]} maxConstraints={[1300, 700]}>
                <div id="menu">
                    <button onClick={this.handleAdd}>Add item</button>
                    <button onClick={this.handleRemove}>Remove item</button>
                    <button onClick={this.handleUpdate}>Update values</button>
                </div>
                <svg width="800" height="2200">
                    <g className={css.chart} transform="translate(100,10)">
                        <NodeGroup
                            data={this.state.data}
                            keyAccessor={d => d.name}
                            start={this.startTransition}
                            enter={this.enterTransition}
                            update={this.updateTransition}
                            leave={this.leaveTransition}
                        >
                            {nodes => (
                                <g>
                                    {nodes.map(({ key, data, state }) => (
                                        <BarGroup key={key} data={data} state={state} />
                                    ))}
                                </g>
                            )}
                        </NodeGroup>
                    </g>
                </svg>
            </ResizableBox>
        );
    }
}

export default BarChart;
