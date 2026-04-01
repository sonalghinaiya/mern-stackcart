import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { ArrowRight, ShoppingCart, Star } from "lucide-react";
import ProductCard from "../../components/ProductCard";

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
    <section className="max-w-7xl mx-auto px-4 py-10 sm:py-12">
      <div className="flex items-center justify-between mb-8 sm:mb-10">
        <div>
          <p className="text-xs text-indigo-600 font-semibold uppercase tracking-widest mb-1">
            Handpicked
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
        </div>
        <button
          onClick={() => navigate("/products")}
          className="flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline"
        >
          View all <ArrowRight size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
