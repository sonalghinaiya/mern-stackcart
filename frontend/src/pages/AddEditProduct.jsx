import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";
import { useEffect } from "react";
import { useState } from "react";

function AddEditProduct() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = Boolean(id);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isEdit) {
      const fetchProduct = async () => {
        try {
          const res = await api.get(`/products/${id}`);
          const product = res.data.data;

          setName(product.name);
          setPrice(product.price);
          setDescription(product.description);
          setRating(product.rating);
          if (image) setImage(product.image);
        } catch (error) {
          console.log(error);
        }
      };
      fetchProduct();
    }
  }, [isEdit, id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    // if (image) {
    //   formData.set("image", image);
    // }

    try {
      if (isEdit) {
        await api.patch(`/products/${id}`, formData);
      } else {
        await api.post("/products", formData);
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-full max-w-md  space-y-4"
      >
        <h2 className="text-xl font-bold text-center">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        <input
          className="input"
          type="text"
          value={name}
          name="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="input"
          type="number"
          value={price}
          name="price"
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />
        <input
          className="input"
          type="text"
          value={description}
          name="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <input
          className="input"
          type="number"
          value={rating}
          name="rating"
          onChange={(e) => setRating(e.target.value)}
          placeholder="Rating"
        />
        <label className="text-sm text-gray-600 mt-2 block">
          Product image
        </label>
        <input
          type="file"
          name="image"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button className="bg-blue-600 text-white py-2 w-full rounded hover:bg-blue-700">
          {isEdit ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
}

export default AddEditProduct;
