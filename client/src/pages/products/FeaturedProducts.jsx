import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ArrowRight, Star } from "lucide-react";

function FeaturedProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products/featured_products");
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-10 sm:py-12">
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-sm font-medium text-blue-700 hover:underline"
        >
          View all <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="h-48 sm:h-56 w-full flex items-center justify-center p-4">
              <img
                onClick={() => navigate(`/products/${product._id}`)}
                className="h-full w-full object-contain cursor-pointer"
                src={product.image}
                alt={product.name}
              />
            </div>

            <div className="p-4 bg-gray-50">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 line-clamp-1">
                {product.name}
              </h3>

              <p className="text-gray-500 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>

              <div className="flex items-center gap-1 text-yellow-400 mb-3">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={18}
                    fill={product.rating >= star ? "currentColor" : "none"}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <button className="bg-blue-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;