const AxiosClient = axios.create({
  baseURL: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api"
});

AxiosClient.interceptors.response.use(
  (response) => {
    return response && response.data ? response.data : response;
  },
  (err) => console.err(err)
);

export default {
  getProducts: function () {
    return AxiosClient.get("/products");
  },
  getProduct: function (id) {
    return AxiosClient.get(`/products/${id}`);
  },
  createProduct: function (product) {
    return AxiosClient.post("/products", product);
  },
  updateProduct: function (id, product) {
    return AxiosClient.put(`/products/${id}`, product);
  },
  deleteProduct: function (id) {
    return AxiosClient.delete(`/products/${id}`);
  }
};
