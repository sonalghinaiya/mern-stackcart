import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import { Star } from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

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
      <div className="text-center py-20 text-gray-500 text-lg">
        Loading product...
      </div>
    );
  }

  return (
    <section className="max-w-7xl mt-3 mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          {product.name}
        </h1>
        <p className="text-gray-600 text-base sm:text-lg leading-8">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center mt-4">
        <div className="relative flex justify-center">
          <div className="border border-gray-200 rounded-2xl shadow-sm w-full max-w-lg">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[450px] object-contain rounded-xl"
            />
          </div>

          {!product.inStock && (
            <span className="absolute top-4 left-4 bg-red-600 text-white text-xs px-3 py-1 rounded-md shadow">
              Out of Stock
            </span>
          )}
        </div>
        <div className="flex flex-col justify-center space-y-4 w-full">
          <h2 className="text-2xl font-bold text-gray-900">
            ₹{product.price.toLocaleString("en-IN")}
          </h2>
          <div className="flex items-center gap-1 text-yellow-500">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={26}
                fill={product.rating >= star ? "currentColor" : "none"}
                className="stroke-current"
              />
            ))}
          </div>
          <p className="text-md text-gray-500">
            Brand:{" "}
            <span className="font-medium text-gray-800">{product.brand}</span>
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            {product.isBestSeller && (
              <span className="inline-block bg-orange-100 text-orange-600 text-sm px-3 py-1 rounded-md w-fit font-medium">
                Best Seller
              </span>
            )}

            <p
              className={`text-sm font-medium ${
                product.inStock
                  ? "bg-green-100 text-green-600 text-sm px-3 py-1 rounded-md"
                  : "text-red-500"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>

          <button
            disabled={!product.inStock}
            className={`w-fit px-20 py-3 rounded-lg text-white text-sm font-medium transition ${
              product.inStock
                ? "bg-blue-700 hover:bg-blue-800"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {product.inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <p className="leading-6 pt-2 text-lg">{product.longDescription}</p>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
