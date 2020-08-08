import React, { Component } from "react";

import classes from "./Ingredient.module.css";

export default class Ingredient extends Component {
  render() {
    return <div className={classes[this.props.ingredientType[0].toUpperCase() + this.props.ingredientType.substring(1)]}></div>;
  }
}
