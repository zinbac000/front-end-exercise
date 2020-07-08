class CartRepository {
  cart = [];
  saveCartFunc = null;
  constructor() {}

  add = function (product) {
    let foundCartItem = this.cart.find((item) => item.product.id === product.id);
    if (foundCartItem) {
      foundCartItem.quantity += 1;
    } else {
      this.cart.push({ product, quantity: 1 });
    }
    this.saveCartFunc();
  };

  remove = function (id) {
    let foundIndex = this.cart.findIndex((item) => item.product.id === id);
    if (id !== -1) {
      this.cart.splice(foundIndex, 1);
    } else {
      console.error(`product with id ${id} doesn't exist in the cart.`);
    }
    this.saveCartFunc();
  };

  removeAll = function () {
    this.cart = [];
    this.saveCartFunc();
  };

  getByProductId = function (id) {
    return this.cart.find((item) => item.product.id === id);
  };

  updateQuantity = function (id, increment) {
    let foundItem = this.getByProductId(id);
    if (foundItem) {
      foundItem.quantity += increment;
      if (foundItem.quantity < 0) {
        foundItem.quantity = 0;
      }
    }
    this.saveCartFunc();
  };
}

const CartStore = new CartRepository();
export default CartStore;
