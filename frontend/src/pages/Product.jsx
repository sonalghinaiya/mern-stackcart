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
      const res = await api.get("/products");
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
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Products</h2>
        <Link
          to="/products/add"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded flex justify-between"
          >
            <div>
              <h4 className="font-semibold text-lg">{product.name}</h4>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-gray-600">₹{product.price}</p>
              <p className="text-gray-500 text-sm">⭐{product.rating}</p>
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.name}
                className="w-24 h-24 rounded object-cover mt-5"
              />
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
