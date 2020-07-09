import ProductStore from "./ProductRepository.js";
import Product from "./model/Product.js";

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
        <tr class="product" data-product-id="${product.id}">
            <td class="text-capitalize">${product.name}</td>
            <td><img src="${product.image}" alt="product banner" width="100"/></td>
            <td>${product.description}</td>
            <td class="text-right">${product.price}$</td>
            <td class="text-right">${product.inventory}</td>
            <td class="text-center text-danger" style="max-width: 300px">${ratingHtml}</td>
            <td>${product.type}</td>
            <td class="d-flex" style="min-width: 200px">
              <button class="btn btn-warning product__edit mr-2" data-toggle="modal" data-target="#productModal"><i class="fa fa-pen"></i></button>
              <button class="btn btn-danger product__delete"><i class="fa fa-trash"></i></button>
            </td>
        </tr>
      `;
    })
    .join("");

  document.getElementById("tbodyProducts").innerHTML = bodyHtml;
  listenToProductEvent();
};

const listenToProductEvent = function () {
  document.querySelectorAll(".product").forEach((el) => {
    let productId = el.getAttribute("data-product-id");
    let btnEdit = el.querySelector(".product__edit");
    let btnDelete = el.querySelector(".product__delete");

    btnDelete.addEventListener("click", () => {
      if (confirm("Are you sure to delete this product?")) {
        ProductStore.delete(productId).then(() => {
          renderProducts(ProductStore.products);
        });
      }
    });

    btnEdit.addEventListener("click", () => {
      document.getElementById("btnCreate").style.display = "none";
      document.getElementById("btnUpdate").style.display = "block";

      ProductStore.get(productId).then((product) => {
        productForm.id.value = product.id;
        productForm.name.value = product.name;
        productForm.image.value = product.image;
        productForm.description.value = product.description;
        productForm.price.value = product.price;
        productForm.inventory.value = product.inventory;
        productForm.rating.value = product.rating;
        productForm.type.value = product.type;

        document.getElementById("imgPreview").setAttribute("src", product.image);
      });
    });
  });
};

window.addEventListener(
  "load",
  function () {
    const validateForm = function (validHandler) {
      if (productForm.checkValidity()) {
        validHandler();
      }
      productForm.classList.add("was-validated");
    };
    document.getElementById("btnCreate").addEventListener("click", (event) => {
      event.preventDefault();
      validateForm(() => {
        let NewProduct = new Product(
          null,
          productForm.name.value,
          productForm.image.value,
          productForm.description.value,
          +productForm.price.value,
          +productForm.inventory.value,
          productForm.rating.value,
          productForm.type.value
        );

        ProductStore.add(NewProduct).then(() => {
          $("#productModal").modal("hide");
          renderProducts(ProductStore.products);
        });
      });
    });

    document.getElementById("btnUpdate").addEventListener("click", (event) => {
      event.preventDefault();
      validateForm(() => {
        let UpdateProduct = new Product(
          productForm.id.value,
          productForm.name.value,
          productForm.image.value,
          productForm.description.value,
          +productForm.price.value,
          +productForm.inventory.value,
          productForm.rating.value,
          productForm.type.value
        );

        ProductStore.update(UpdateProduct.id, UpdateProduct).then(() => {
          $("#productModal").modal("hide");
          renderProducts(ProductStore.products);
        });
      });
    });

    $("#productModal").on("hide.bs.modal", (event) => {
      productForm.reset();
      productForm.classList.remove("was-validated");
      $("#imgPreview").attr("src", null);
    });

    document.getElementById("btnToggleCreate").addEventListener("click", () => {
      document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("btnCreate").style.display = "block";
    });

    document.getElementById("txtImage").addEventListener("change", (event) => {
      document.getElementById("imgPreview").setAttribute("src", event.target.value);
    });

    document.getElementById("keyword").addEventListener("input", (event) => {
      let filteredProducts = ProductStore.filter(event.target.value);
      renderProducts(filteredProducts);
    });
  },
  false
);

ProductStore.loadProducts().then(() => {
  renderProducts(ProductStore.products);
});
