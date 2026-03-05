import ProductForm from "@/components/ProductForm";
import React from "react";
import { useParams } from "react-router-dom";

function EditProduct() {
  const { id } = useParams();
  return <ProductForm productId={id} />;
}

export default EditProduct;
