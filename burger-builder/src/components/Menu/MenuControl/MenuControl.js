import React, { Component } from "react";

import classes from "./MenuControl.module.css";
import { connect } from "react-redux";
import * as actions from "../../../redux/actions/index";

class MenuControl extends Component {
  render() {
    return (
      <div className={classes.MenuControl}>
        <span style={{ textTransform: "capitalize", minWidth: "70px", textAlign: "left" }}>{this.props.ingredientType}</span>
        <div>
          <button
            className={classes.MenuButton}
            onClick={() => this.props.modifyIngredients(this.props.ingredientType, -1)}
            disabled={!this.props.decreasable}
          >
            -
          </button>
          <button className={classes.MenuButton} onClick={() => this.props.modifyIngredients(this.props.ingredientType, 1)}>
            +
          </button>
        </div>
        <span>{this.props.price}$</span>
      </div>
    );
  }
}

const mapDispatchToProps = {
  modifyIngredients: actions.modifyIngredients
};

export default connect(null, mapDispatchToProps)(MenuControl);
