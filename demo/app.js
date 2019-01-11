import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {connect, SingleDetail, MacroDetail} from '../src/index';

function Template(props) {
    return (
        <div id="doc">
            <h2>{props.title}</h2>
            <p>{props.data}</p>
            {props.returnBtn && <a href="javascript:void(0)" onClick={props.return}>返回</a>}
            {props.children}
        </div>
    )
}
console.log(SingleDetail)
const first = new SingleDetail("first", (props) => {
    return (
        <Template title="first" content={props.detail.content} returnBtn={props.btnReturnVisible} return={props.returnDetail}>
            <ul>
                <li><a href="javascript:void(0)" onClick={() => props.showDetail("second", {content: "from first"})}>two</a></li>
                <li><a href="javascript:void(0)" onClick={() => props.showDetail("third", {content: "from first"})}>three</a></li>
            </ul>
        </Template>
    )
});

const second = new SingleDetail("second", (props) => {
    return (
        <Template title="second" content={props.detail.content} returnBtn={props.btnReturnVisible} return={props.returnDetail}>
        </Template>
    )
});

const third = new SingleDetail("third", (props) => {
    return (
        <Template title="third" content={props.detail.content} returnBtn={props.btnReturnVisible} return={props.returnDetail}>
            <ul>
                <li><a href="javascript:void(0)" onClick={() => props.showDetail("fourth", {content: "from third"})}>four</a></li>
            </ul>
        </Template>
    )
});

const fourth = new SingleDetail("fourth", (props) => {
    return (
        <Template title="fourth" content={props.detail.content} returnBtn={props.btnReturnVisible} return={props.returnDetail}>
            <ul>
                <li><a href="javascript:void(0)" onClick={() => props.showDetail("first", {content: "from fourth"})}>first</a></li>
            </ul>
        </Template>
    )
});

const firstMacro = new MacroDetail().set(first).set(second).set(third);
const fourMacro = new MacroDetail().set(firstMacro). set(fourth);
const Node = connect(fourMacro)("first", {content: "begin"});

ReactDOM.render(<Node />, document.getElementById("main"));