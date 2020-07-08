import ProductStore from "./ProductRepository.js";
import CartStore from "./CartRepository.js";
import Api from "./api.js";
import Config from "./config.js";

CartStore.saveCartFunc = function () {
  localStorage.setItem(Config.LOCALSTORAGE_CART_KEY, JSON.stringify(CartStore.cart));
};

// render product list to UI
const renderProducts = function (products) {
  let productHtml = products
    .map((product) => {
      let rating = +product.rating;
      let ratingHtml = "";
      for (let i = 0; i < 5; i++) {
        ratingHtml += `<i class="fa fa-star ${i < rating ? "active" : ""}"></i>`;
      }

      return `
      <div class="col-md-4 mb-4">
        <div class="product__item">
          <img class="d-block w-100" src="${product.image}" alt="product" />
          <div class="product__content">
            <div class="product__name text-capitalize">${product.name}</div>
            <div class="product__desc">${product.description}</div>
            <div class="product__rating">
              ${ratingHtml}
            </div>
            <div class="d-flex justify-content-between align-items-center mb-3">
              <span class="product__status ${product.inventory <= 0 ? "product_status--soldout" : ""} ">${
        product.inventory > 0 ? "available" : "sold out"
      }</span>
              <span class="product__price">${product.price}$</span>
            </div>
            <button class="btn-block product__addToCart" data-product-id="${product.id}">Add to cart</button>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  document.getElementById("productList").innerHTML = productHtml;

  listenAddToCartAll();
};

// render cart to UI
const renderCart = function (cart) {
  let cartHtml = "";
  let cartTotal = "";
  if (cart.length === 0) {
    cartHtml = `
      <p class="text-center">Your cart is empty.</p>
    `;
  } else {
    // calculate total price for cart
    cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0) + "$";

    // build cart item list
    cartHtml = cart
      .map((item) => {
        return `
        <div class="cart__item" data-product-id="${item.product.id}">
          <img src="${item.product.image}" alt="cart" />
          <div class="cart__item-info">
            <div class="cart__item-name text-capitalize">${item.product.name}</div>
            <div class="cart__item-desc">${item.product.description}</div>
          </div>
          <div class="cart__item-price">${item.product.price}$</div>
          <div class="cart__item-quantity">
            <button class="cart__item-decrease"><i class="fa fa-minus"></i></button>
            <span>${item.quantity}</span>
            <button class="cart__item-increase"><i class="fa fa-plus"></i></button>
          </div>
          <div class="cart__item-totalPrice">${item.product.price * item.quantity}$</div>
          <button class="cart__item-remove"><i class="fa fa-trash-alt"></i></button>
        </div>
      `;
      })
      .join("");
  }

  document.getElementById("cartList").innerHTML = cartHtml;
  document.getElementById("cartTotal").innerHTML = cartTotal;

  listenToCartItemEvents();
};

// render filter options to UI
const renderProductFilters = function (options) {
  let optionHtml = options
    .map(
      (option) => `
    <option value="${option}">${option.toUpperCase()}</option>
  `
    )
    .join("");
  document.getElementById("productFilter").innerHTML += optionHtml;
};

// listen to click add to cart from user
const listenAddToCartAll = function () {
  document.querySelectorAll(".product__addToCart").forEach((el) => {
    el.addEventListener("click", (event) => {
      let productId = event.target.getAttribute("data-product-id");
      let foundProduct = ProductStore.getById(productId);
      if (foundProduct) {
        CartStore.add(foundProduct);
        renderCart(CartStore.cart);
      }
    });
  });
};

// listen to click increase or decrease quantity of cart item from user
const listenToCartItemEvents = function () {
  document.querySelectorAll(".cart__item").forEach((el) => {
    let productId = el.getAttribute("data-product-id");
    let btnIncrease = el.querySelector(".cart__item-increase");
    let btnDecrease = el.querySelector(".cart__item-decrease");
    let btnRemove = el.querySelector(".cart__item-remove");

    btnIncrease.addEventListener("click", () => {
      CartStore.updateQuantity(productId, 1);
      renderCart(CartStore.cart);
    });

    btnDecrease.addEventListener("click", () => {
      CartStore.updateQuantity(productId, -1);
      renderCart(CartStore.cart);
    });

    btnRemove.addEventListener("click", () => {
      CartStore.remove(productId);
      renderCart(CartStore.cart);
    });
  });
};

// fetch all products from server then rendering to UI
(function () {
  Api.getAllProducts().then((data) => {
    ProductStore.products = data;
    ProductStore.sort(Config.ASCENDING_SORT);
    renderProducts(ProductStore.products);
    renderProductFilters(ProductStore.getFilterOptions());
  });
})();

// load cart data from localStorage then rendering to UI
(function () {
  let cartData = localStorage.getItem(Config.LOCALSTORAGE_CART_KEY);
  if (cartData) {
    CartStore.cart = JSON.parse(cartData);
  }

  renderCart(CartStore.cart);
})();

const applySortAndFilter = function (filterType, sortType) {
  let filteredProducts = ProductStore.filter(filterType);
  ProductStore.sort(sortType, filteredProducts);
  renderProducts(filteredProducts);
};

// listen to "change" event of select sort then sorting and re-rendering product list
document.getElementById("productSort").addEventListener("change", (event) => {
  applySortAndFilter(document.getElementById("productFilter").value, event.target.value);
});

// listen to "change" event of select filter then filtering and re-rendering product list
document.getElementById("productFilter").addEventListener("change", (event) => {
  applySortAndFilter(event.target.value, document.getElementById("productSort").value);
});

// listen to 'click' event of button cart payment to remove all cart item
document.getElementById("btnCartPay").addEventListener("click", () => {
  CartStore.removeAll();
  renderCart(CartStore.cart);
});
