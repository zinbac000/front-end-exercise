class CartRepository {
  cart = [];
  constructor() {}

  add = function (product) {
    let foundCartItem = this.cart.find((item) => item.product.id === product.id);
    if (foundCartItem) {
      foundCartItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
  };

  remove = function (id) {
    let foundIndex = this.cart.findIndex((item) => item.product.id === id);
    if (id !== -1) {
      this.cart.splice(foundIndex, 1);
    } else {
      console.error(`product with id ${id} doesn't exist in the cart.`);
    }
  };

  removeAll = function () {
    this.cart = [];
  };
}

const CartStore = new CartRepository();
export default CartStore;
