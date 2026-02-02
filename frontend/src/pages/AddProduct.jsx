import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function AddProduct() {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const formData = new FormData(e.target);

    try {
      const res = await api.post("/products", formData);

      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Name" />
        <input type="number" name="price" placeholder="Price" />
        <input type="text" name="description" placeholder="Description" />
        <input type="number" name="rating" placeholder="Rating" />
        <input type="file" name="image" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddProduct;
