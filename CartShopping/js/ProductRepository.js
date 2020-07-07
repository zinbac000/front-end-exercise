import Config from "./config.js";

class ProductRepository {
  products = [];
  constructor() {}
  sort = function (sortType, filteredProducts) {
    let listToSort = filteredProducts || this.products;
    switch (sortType) {
      case Config.ASCENDING_SORT:
        listToSort.sort((p1, p2) => {
          let name1 = p1.name.toUpperCase();
          let name2 = p2.name.toUpperCase();
          if (name1 < name2) {
            return -1;
          }
          if (name1 > name2) {
            return 1;
          }

          return 0;
        });
        break;
      case Config.DESCENING_SORT:
        listToSort.sort((p1, p2) => {
          let name1 = p1.name.toUpperCase();
          let name2 = p2.name.toUpperCase();
          if (name1 > name2) {
            return -1;
          }
          if (name1 < name2) {
            return 1;
          }

          return 0;
        });
        break;
      default:
        console.error(`SortType ${sortType} is not supported`);
    }
  };
  filter = function (filterType) {
    if (filterType === "all") {
      return this.products;
    }
    return this.products.filter((product) => product.type === filterType);
  };

  getFilterOptions = function () {
    return this.products.reduce((filterOptions, product) => {
      if (filterOptions.findIndex((option) => option === product.type) === -1) {
        filterOptions.push(product.type);
      }
      return filterOptions;
    }, []);
  };

  getById = function (id) {
    return this.products.find((product) => product.id === id);
  };
}

const ProductStore = new ProductRepository();
export default ProductStore;
