import axios from "axios";
import React, { useEffect, useState } from "react";

function Product() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/products");
      console.log("res", res.data.data);
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      <h2>Products Page</h2>
      {products.map((product) => (
        <>
          <h4>Name: {product.name}</h4>
          <p>Price: {product.price}</p>
          <p>Rating: {product.rating}</p>
        </>
      ))}
    </div>
  );
}

export default Product;
