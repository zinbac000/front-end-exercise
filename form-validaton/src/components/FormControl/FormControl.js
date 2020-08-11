import React, { PureComponent } from "react";
import classes from "./FormControl.module.css";

export default class FormControl extends PureComponent {
  extractClassName = () => {
    let className = null;
    const { customclass } = this.props;
    if (customclass) {
      if (typeof customclass === "string") {
        className = customclass;
      }
      if (typeof customclass === typeof Array) {
        className = customclass.join(" ");
      }
    }
    return className;
  };

  renderControl = () => {
    const { value, controlType, errors, ...rest } = this.props;
    let inputClasses = [classes.Input];
    if (value.trim() !== "") {
      inputClasses.push(classes.InputFocus);
    }

    if (errors?.length > 0) {
      inputClasses.push(classes.Invalid);
    }

    inputClasses = inputClasses.join(" ");

    switch (controlType) {
      case "input":
        return <input className={inputClasses} {...rest} />;
      case "textarea":
        // not implemented
        return null;
      case "select":
        // not implemented
        return null;
      default:
        return <input className={inputClasses} {...rest} />;
    }
  };

  renderErrors = () => {
    const { errors } = this.props;

    if (errors?.length > 0) {
      return <span className={classes.InvalidFeedback}>{errors[0]}</span>;
    }
    return null;
  };

  render() {
    const { id, label, customStyle } = this.props;

    return (
      <div style={customStyle || {}} className={[classes.FormControl, this.extractClassName()].join(" ")}>
        <label htmlFor={id}>{label}</label>
        {this.renderControl()}
        {this.renderErrors()}
      </div>
    );
  }
}
