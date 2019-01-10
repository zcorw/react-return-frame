import React, { Component } from "react";
import PropTypes from "prop-types";

function connect(macroDetail) {
    if (!(macroDetail instanceof MacroDetail)) {
        throw Error(`TypeError: argument ${detail} is not a MacroDetail`);
    }
    const option = macroDetail.get();
    return function component(defaultKey, defaultDetail) {
        return (props) => <DetailFrame defaultKey={defaultKey} defaultDetail={defaultDetail} detailOption={option} {...props}/>;
    };
}

class SingleDetail {
    constructor(key, _component) {
        if (!(_component instanceof Component) && typeof _component !== "function" ) {
            throw Error(`TypeError: argument 2 ${_component} is not a function or a Component`);
        }
        this.data = {[key]: _component}
    }
    set(key, _component) {
        if (!(_component instanceof Component) && typeof _component !== "function" ) {
            throw Error(`TypeError: argument 2 ${_component} is not a function or a Component`);
        }
        this.data = { [key]: _component };
    }
    get() {
        return this.data;
    }
}

class MacroDetail {
    data = {}
    set(detail) {
        if (!(detail instanceof SingleDetail)) {
            throw Error(`TypeError: argument ${detail} is not a SingleDetail`);
        }
        this.data = Object.assign({}, this.data, detail.get());
        return this;
    }
    get() {
        return this.data;
    }
}

export default {
    connect,
    SingleDetail,
    MacroDetail,
};

class DetailFrame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailKey: props.defaultKey,
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
            <Detail {...props} detail={this.state.detail} />
        )
    }
}