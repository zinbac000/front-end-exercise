import ProductStore from "./ProductRepository.js";

const renderProducts = function (products) {
  let bodyHtml = products
    .map((product) => {
      let ratingHtml = new Array(+product.rating)
        .fill(0)
        .map(() => {
          return `<i class="fa fa-star"></i>`;
        })
        .join("");
      return `
        <tr>
            <td class="text-capitalize">${product.name}</td>
            <td><img src="${product.image}" alt="product banner" width="100"/></td>
            <td>${product.description}</td>
            <td class="text-right">${product.price}$</td>
            <td class="text-right">${product.inventory}</td>
            <td class="text-center text-danger" style="max-width: 300px">${ratingHtml}</td>
            <td>${product.type}</td>
            <td class="d-flex" style="min-width: 200px">
              <button class="btn btn-info mr-2"><i class="fa fa-pen"></i></button>
              <button class="btn btn-danger"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("tbodyProducts").innerHTML = bodyHtml;
};

ProductStore.loadProducts().then(() => {
  renderProducts(ProductStore.products);
});
