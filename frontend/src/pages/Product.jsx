import axios from "axios";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/products");
      // console.log("res", res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Products</h2>
      {products.map((product) => (
        <div
          key={product._id}
          className="border p-4 mb-3 rounded flex justify-between"
        >
          <div>
            <h4>Name: {product.name}</h4>
            <p>Price: {product.price}</p>
            <p>Rating: {product.rating}</p>
          </div>
          <button
            onClick={() => {
              handleDelete(product._id);
            }}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Product;
