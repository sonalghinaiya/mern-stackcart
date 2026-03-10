import { useEffect, useState } from "react";
import api from "../../api/axios";
import React from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="p-6 max-w-5xl mx-auto">
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
                src={product.image}
                alt={product.name}
                className="w-24 h-24 rounded object-cover mt-5"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
