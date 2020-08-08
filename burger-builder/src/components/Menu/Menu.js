import React, { Component } from "react";

import classes from "./Menu.module.css";
import MenuControl from "./MenuControl/MenuControl";
import { connect } from "react-redux";

class Menu extends Component {
  renderMenuControls = () => {
    return Object.entries(this.props.menu).map(([ingredientKey, ingredientValue]) => (
      <MenuControl
        key={ingredientKey}
        ingredientType={ingredientKey}
        price={ingredientValue}
        decreasable={this.props.ingredients[ingredientKey] > 0}
      />
    ));
  };

  render() {
    return (
      <div className={classes.Menu}>
        {this.renderMenuControls()}
        <p className={classes.TotalPrice}>
          Tổng tiền: <strong>{this.props.totalPrice.toLocaleString()}$</strong>
        </p>
        <button className={classes.PayButton}>THANH TOÁN</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients,
  totalPrice: state.burgerBuilder.totalPrice,
  menu: state.burgerBuilder.menu
});

export default connect(mapStateToProps)(Menu);
