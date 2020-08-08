import React, { Component } from "react";

import classes from "./Burger.module.css";
import Ingredient from "./Ingredient/Ingredient";

import { connect } from "react-redux";

class Burger extends Component {
  renderIngredients = () => {
    let transformedIngredients = Object.entries(this.props.ingredients)
      .map(([ingredientKey, ingredientValue]) =>
        [...Array(ingredientValue)].map((_, index) => <Ingredient ingredientType={ingredientKey} key={ingredientKey + index} />)
      )
      .reduce((result, elementArr) => [...result, ...elementArr], []);

    if (transformedIngredients.length === 0) {
      transformedIngredients = <p>Chọn thức ăn</p>;
    }
    console.log(transformedIngredients);
    return transformedIngredients;
  };

  render() {
    return (
      <div className={classes.Burger}>
        <Ingredient ingredientType="BreadTop" />
        {this.renderIngredients()}
        <Ingredient ingredientType="BreadBottom" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  ingredients: state.burgerBuilder.ingredients
});

export default connect(mapStateToProps)(Burger);
