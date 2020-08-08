import React, { Component } from "react";

import classes from "./BurgerBuilder.module.css";
import Burger from "../../components/Burger/Burger";
import Menu from "../../components/Menu/Menu";

export default class BurgerBuilder extends Component {
  render() {
    return (
      <div className={classes.BurgerBuilder}>
        <Burger />
        <Menu />
      </div>
    );
  }
}
