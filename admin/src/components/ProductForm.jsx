import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import api from "@/api/axios";

function ProductForm({ productId }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [brand, setBrand] = useState("");
  const [inStock, setInStock] = useState(true);
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const isEdit = Boolean(productId);

  useEffect(() => {
    if (!productId) return;

    const fetchProduct = async () => {
      const res = await api.get(`/products/${productId}`);
      const product = res.data.data;

      setName(product.name);
      setDescription(product.description);
      setLongDescription(product.longDescription);
      setPrice(product.price);
      setRating(product.rating);
      setBrand(product.brand);
      setInStock(product.inStock);
      setIsBestSeller(product.isBestSeller);
      setImage(product.image);
    };
    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("inStock", inStock);
    formData.append("isBestSeller", isBestSeller);
    try {
      if (isEdit) {
        await api.patch(`/products/${productId}`, formData);
      } else {
        await api.post("/products", formData);
      }
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div className="sticky top-0 z-30 bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted"
          >
            <ArrowLeft />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight">
              {isEdit ? "Edit Product" : "New Product"}
            </h1>
            <p className="text-muted-foreground">
              {isEdit
                ? "Update product details"
                : "Add a new product to your catalog"}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4 bg-white shadow-sm p-6 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">
              Basic Info
            </h2>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Product Name</Label>
              <Input
                placeholder="e.g. Wireless Headphones"
                name="name"
                value={name}
                className="bg-gray-50"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Description</Label>
              <Textarea
                placeholder="Short product description..."
                value={description}
                name="description"
                className="bg-gray-50"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Price</Label>
                <Input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  name="price"
                  className="bg-gray-50"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Rating(0-5)</Label>
                <Input
                  type="number"
                  placeholder="e.g. 4.5"
                  value={rating}
                  name="rating"
                  className="bg-gray-50"
                  onChange={(e) => setRating(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-white shadow-sm p-6 rounded-lg">
            <h2 className="text-sm font-semibold text-gray-500 uppercase">
              Product Info
            </h2>
            <div className="space-y-2">
              <Label className="text-sm font-medium">Long Description</Label>
              <Textarea
                placeholder="Detailed product description..."
                value={longDescription}
                rows={8}
                name="longDescription"
                className="bg-gray-50 min-h-24"
                onChange={(e) => setLongDescription(e.target.value)}
              />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">Brand</Label>
                <Input
                  placeholder="e.g. Apple, Samsung"
                  value={brand}
                  name="brand"
                  className="bg-gray-50"
                  onChange={(e) => setBrand(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">In Stock</span>

                  <button
                    type="button"
                    onClick={() => setInStock(!inStock)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                      inStock ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        inStock ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between bg-gray-50 border rounded-lg px-4 py-2">
                  <span className="text-sm font-medium">Best Seller</span>

                  <button
                    type="button"
                    onClick={() => setIsBestSeller(!isBestSeller)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition ${
                      isBestSeller ? "bg-indigo-600" : "bg-gray-300"
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow transform transition ${
                        isBestSeller ? "translate-x-5" : ""
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4 bg-white shadow-sm p-6 rounded-lg">
          <h2 className="text-sm font-semibold text-gray-500 uppercase">
            Product Image
          </h2>
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
              {image ? (
                <img
                  src={
                    typeof image === "string"
                      ? image
                      : URL.createObjectURL(image)
                  }
                  alt="preview"
                  className="h-full w-full object-cover rounded-md"
                />
              ) : (
                <Upload className="h-6 w-6" />
              )}
            </div>

            <div className="space-y-3">
              <Label className="cursor-pointer">
                <span className="inline-flex items-center gap-2 px-12 py-2 text-sm bg-gray-50 border rounded-md hover:bg-gray-100">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </span>
                <Input
                  type="file"
                  name="image"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Label>
              <p className="text-xs text-muted-foreground">Max 3MB</p>
            </div>
          </div>
          <Button type="submit">{isEdit ? "Update" : "Save"} Product</Button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
