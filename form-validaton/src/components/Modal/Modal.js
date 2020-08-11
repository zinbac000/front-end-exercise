import React, { PureComponent } from "react";
import Backdrop from "../Backdrop/Backdrop";
import classes from "./Modal.module.css";

export default class Modal extends PureComponent {
  render() {
    return (
      <>
        <Backdrop show={this.props.modalOpen} onClick={this.props.onModalClosed} />
        <div className={[classes.Modal, this.props.modalOpen ? classes.Open : null].join(" ")}>{this.props.children}</div>
      </>
    );
  }
}
