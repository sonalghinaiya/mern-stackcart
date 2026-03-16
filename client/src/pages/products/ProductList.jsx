import React from "react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { Star, StarHalf } from "lucide-react";

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
    // <section className="max-w-6xl mx-auto px-4 py-12">
    //   <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>

    //   <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {products.map((product) => (
    //       <div className="mt-5 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-sm shadow-md bg-white rounded-xl relative mx-auto">
    //         <img
    //           onClick={() => navigator(`/products/${product._id}`)}
    //           className="rounded h-60 w-full cursor-pointer object-cover"
    //           src={product.image}
    //           alt=""
    //         />

    //         <h2 className="text-2xl font-semibold mt-5 pl-5">{product.name}</h2>
    //         <p className="text-md -mt-2 p-5 text-gray-700">
    //           {product.description}
    //         </p>
    //         <span className="text-yellow-500 px-5 flex gap-1 text-[20px]">
    //           {[1, 2, 3, 4, 5].map((star) => (
    //             <Star
    //               key={star}
    //               size={18}
    //               fill={product.rating >= star ? "currentColor" : "none"}
    //             />
    //           ))}
    //         </span>
    //         <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-5 pb-3">
    //           <p className="text-2xl mt-3">₹{product.price}</p>
    //           <button className="bg-black text-white px-3 py-1.5 rounded-lg text-sm hover:bg-gray-800">
    //             Add to Cart +
    //           </button>
    //         </div>
    //       </div>
    //     ))}
    //   </div>
    // </section>
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <img
              onClick={() => navigate(`/products/${product._id}`)}
              className="h-56 w-full object-cover cursor-pointer"
              src={product.image}
              alt={product.name}
            />

            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-1">{product.name}</h3>

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
                <span className="text-lg font-bold">₹{product.price}</span>
                <button className="bg-blue-700 text-white px-3 py-1.5 rounded-lg text-sm hover:bg-blue-600">
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

export default ProductList;
