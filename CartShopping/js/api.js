const AxiosClient = axios.create({
  baseURL: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api"
});

AxiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
});

export default {
  getAllProducts: function () {
    return AxiosClient.get("/products");
  }
};
