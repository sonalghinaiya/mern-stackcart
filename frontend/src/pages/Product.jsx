import { useEffect, useState } from "react";
import api from "../api/axios";
import React from "react";
import { FaEdit, FaPlus, FaTrash, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

function Product() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await api.get("http://localhost:8000/api/v1/products");
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
      const res = await api.delete(`/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to="/products/add"
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          <FaPlus />
          Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 items-start rounded flex justify-between"
          >
            <div>
              <h4 className="font-semibold">{product.name}</h4>
              <p>₹{product.price}</p>
              <p>⭐{product.rating}</p>
            </div>
            <div className="flex gap-3">
              <button className="text-blue-600 hover:text-blue-800">
                <FaEdit />
              </button>
              <button
                onClick={() => {
                  handleDelete(product._id);
                }}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Product;
