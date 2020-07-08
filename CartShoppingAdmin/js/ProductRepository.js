import ProductApi from "./productApi.js";

class ProductRepository {
  products = [];
  constructor() {}

  add(product) {
    return ProductApi.createProduct(product)
      .then((data) => {
        console.log(data);
        return ProductApi.getProducts();
      })
      .then((data) => {
        this.products = data;
        return;
      });
  }

  update(id, product) {
    return ProductApi.updateProduct(id, product)
      .then((data) => {
        console.log(data);
        return ProductApi.getProducts();
      })
      .then((data) => {
        this.products = data;
        return;
      });
  }

  get(id) {
    return ProductApi.getProduct(id);
  }

  delete(id) {
    return ProductApi.deleteProduct(id);
  }

  loadProducts() {
    return ProductApi.getProducts().then((data) => {
      this.products = data;
      return;
    });
  }
}

const ProductStore = new ProductRepository();
export default ProductStore;
