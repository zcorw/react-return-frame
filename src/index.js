import React, { Component } from "react";
import PropTypes from "prop-types";

export function connect(macroDetail) {
    if (!(macroDetail instanceof MacroDetail)) {
        throw Error(`TypeError: argument ${detail} is not a MacroDetail`);
    }
    const option = macroDetail.get();
    return function component(defaultPage, defaultDetail) {
        return (props) => <DetailFrame defaultPage={defaultPage} defaultDetail={defaultDetail} detailOption={option} {...props}/>;
    };
}

export class SingleDetail {
    constructor(key, _component) {
        if (!(Component.isPrototypeOf(_component)) && typeof _component !== "function" ) {
            throw Error(`TypeError: argument 2 ${_component} is not a function or a Component`);
        }
        this.data = {[key]: _component}
    }
    set(key, _component) {
        if (!(Component.isPrototypeOf(_component)) && typeof _component !== "function" ) {
            throw Error(`TypeError: argument 2 ${_component} is not a function or a Component`);
        }
        this.data = { [key]: _component };
    }
    get() {
        return this.data;
    }
}

export class MacroDetail {
    constructor() {
        this.data = {};
    }
    set(detail) {
        if (!(detail instanceof SingleDetail) && !(detail instanceof MacroDetail) ) {
            throw Error(`TypeError: argument ${detail} is not a SingleDetail or a MacroDetail`);
        }
        this.data = Object.assign({}, this.data, detail.get());
        return this;
    }
    get() {
        return this.data;
    }
}
class DetailFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailKey: props.defaultPage,
            detail: props.defaultDetail,
        };
        this.returnStack = [];
    }
    showDetail(key, detail) {
        this.returnStack.push({ detailKey: this.state.detailKey, detail: this.state.detail });
        this.setState({ detailKey: key, detail });
    }
    returnDetail(state) {
        if (this.returnStack.length == 0) {
            return null;
        }
        const { detailKey, detail } = this.returnStack.pop();
        this.setState({ detailKey, detail: Object.assign({}, detail, state) });
    }
    render() {
        const {detailOption, defaultKey, defaultDetail, ...props} = this.props;
        const Detail = detailOption[this.state.detailKey];
        return (
            <Detail {...props} detail={this.state.detail} showDetail={this.showDetail.bind(this)} returnDetail={this.returnDetail.bind(this)} btnReturnVisible={this.returnStack.length > 0} />
        )
    }
}
console.log("​DetailFrame", DetailFrame, Component)
