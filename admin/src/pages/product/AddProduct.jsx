import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowLeft, PlusIcon, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/api/axios";

function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      navigate("/admin/products");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <div className="sticky top-0 z-30 bg-white p-4 rounded-lg shadow-sm border flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/admin/products")}
            className="h-10 w-10 flex items-center justify-center rounded-full hover:bg-muted"
          >
            <ArrowLeft />
          </button>

          <div>
            <h1 className="text-xl font-bold tracking-tight">New Product</h1>
            <p className="text-muted-foreground">
              Add a new product to your catalog
            </p>
          </div>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg border shadow-sm"
      >
        <div className="space-y-2">
          <Label className="text-sm font-medium">Product Name</Label>
          <Input
            placeholder="Enter product name"
            name="name"
            value={name}
            className="bg-gray-50"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label className="text-sm font-medium">Description</Label>
          <Textarea
            placeholder="Write product description..."
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
            <Label className="text-sm font-medium">Rating</Label>
            <Select
              value={rating}
              name="rating"
              onValueChange={(value) => setRating(value)}
            >
              <SelectTrigger className="w-full bg-gray-50">
                <SelectValue placeholder="Select rating" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Rating</SelectLabel>
                  <SelectItem value="1">⭐</SelectItem>
                  <SelectItem value="2">⭐⭐</SelectItem>
                  <SelectItem value="3">⭐⭐⭐</SelectItem>
                  <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
                  <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="h-24 w-24 border-2 border-dashed rounded-md flex items-center justify-center text-muted-foreground">
            {image ? (
              <img
                src={URL.createObjectURL(image)}
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
        <Button type="submit">Save Product</Button>
      </form>
    </div>
  );
}

export default AddProduct;
