import React, { Component } from "react";
import classes from "./Backdrop.module.css";

export default class Backdrop extends Component {
  render() {
    return <div style={{ display: this.props.show ? "block" : "none" }} className={classes.Backdrop} onClick={this.props.onClick}></div>;
  }
}
