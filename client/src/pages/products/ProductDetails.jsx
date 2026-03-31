import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { Star } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  const fetchProduct = async () => {
    try {
      const res = await api.get(`/products/${id}`);
      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="text-center py-20 text-gray-500">Loading product...</div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto mt-10 px-4 py-12 grid md:grid-cols-2 gap-10">
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[450px] object-cover rounded-xl shadow"
        />
      </div>
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
        <div className="flex items-center gap-1 text-yellow-400 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={20}
              fill={product.rating >= star ? "currentColor" : "none"}
            />
          ))}
        </div>

        <p className="text-gray-600 mb-6">{product.description}</p>

        <h2 className="text-2xl font-bold mb-4">₹{product.price}</h2>
        <button className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetails;
