class Product {
  id = null;
  constructor(id, name, image, description, price, inventory, rating, type) {
    this.id = id;
    this.name = name;
    this.image = image;
    this.description = description;
    this.inventory = inventory;
    this.price = price;
    this.rating = rating;
    this.type = type;
  }
}

export default Product;
