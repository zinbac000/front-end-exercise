import * as actionTypes from "./actionTypes";

export const modifyIngredients = (ingredientType, increment) => ({
  type: actionTypes.MODIFY_INGREDIENTS,
  ingredientType,
  increment
});
