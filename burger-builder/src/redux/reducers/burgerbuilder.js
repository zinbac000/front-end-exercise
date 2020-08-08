import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: { salad: 0, cheese: 0, beef: 0 },
  totalPrice: 0,
  menu: {
    salad: 10,
    cheese: 10,
    beef: 10
  }
};
export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MODIFY_INGREDIENTS:
      const { ingredientType, increment } = action;
      const newIngredients = { ...state.ingredients };
      newIngredients[ingredientType] += increment;

      const newTotalPrice = state.totalPrice + increment * state.menu[ingredientType];

      return { ...state, ingredients: newIngredients, totalPrice: newTotalPrice };
    default:
      return state;
  }
};
