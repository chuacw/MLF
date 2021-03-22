import React, { Component } from "react";

class TextArea extends Component {
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (this.state == null) {
    //         console.log("Should Update");
    //         return true;
    //     }
    //     if ((typeof this.state.value != "undefined") && (this.state.value === nextState.value)) {
    //         console.log("Won't Update");
    //         return false;
    //     }
    //     console.log("Should Update");
    //     return true;
    // }

    constructor(props) {
        super(props);
        if (typeof props.LabelText == "undefined") {
            props.LabelText = ""
        }
        if (typeof props.Placeholder == "undefined") {
            props.Placeholder = ""
        }
        if (typeof props.Name == "undefined") {
            props.Name = ""
        }
        this.handleChange = this.handleChange.bind(this);
        let handler = ((typeof props.onChange == "function") ? props.onChange : null)
        this.state = {
            name: props.Name,
            value: "",
            labelText: props.LabelText,
            placeholder: props.Placeholder,
            handler: handler
        };
    }

    handleChange(event) {
        event.preventDefault()
        this.setState({ value: event.target.value });
        if (this.state.handler) {
            this.state.handler(event)
        }
    }

    render() {
        return (
            <div>
                <label>{this.state.labelText}</label>
                <textarea placeholder={this.state.placeholder} required name={this.state.name}
                   value={this.state.value} onChange={this.handleChange} />
            </div>
        );
    }
}

export { TextArea };