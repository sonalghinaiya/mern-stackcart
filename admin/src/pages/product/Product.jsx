import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ImageOff,
  MoreVertical,
  Pencil,
  PlusIcon,
  Search,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link, useNavigate } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate();

  const fetchProducts = async () => {
    const res = await api.get("/admin/products");
    setProducts(res.data.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProducts = async () => {
    await api.delete(`/products/${selectedProduct}`);
    setOpenDelete(false);
    fetchProducts();
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between shadow-sm bg-white rounded-lg p-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">
            Manage and monitor your store products
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Link to="/admin/products/add">
            <Button className="text-md">
              <PlusIcon /> Add Product
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col flex-1 min-h-0">
        <div className="relative w-64 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 h-9 bg-gray-50 text-sm rounded-lg border-muted-foreground/20 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-4">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead>Image</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="text-center border-s-2">
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {products.length > 0 ? (
                  products.map((product) => (
                    <TableRow key={product._id} className="hover:bg-muted/40">
                      <TableCell>
                        <img
                          src={product.image}
                          alt=""
                          className="h-12 w-12 rounded-md object-cover border"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                            e.currentTarget.nextSibling.style.display = "flex";
                          }}
                        />

                        <div className="h-12 w-12 items-center justify-center rounded-md bg-gray-100 border hidden">
                          <ImageOff className="h-5 w-5 text-gray-400" />
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {product.name}
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <p className="truncate" title={product.description}>
                          {product.description}
                        </p>
                      </TableCell>
                      <TableCell>
                        ₹{product.price.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        <span className="text-yellow-500">
                          {"★".repeat(product.rating)}
                          {"☆".repeat(5 - product.rating)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 text-xs rounded-md ${
                            product.isDeleted
                              ? "bg-red-100 text-red-600"
                              : "bg-green-100 text-green-600"
                          }`}
                        >
                          {product.isDeleted ? "Deleted" : "Active"}
                        </span>
                      </TableCell>
                      <TableCell>
                        {new Date(product.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(product.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-center border-s-2">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-5 w-5" />
                            </Button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() =>
                                navigate(`/admin/products/edit/${product._id}`)
                              }
                            >
                              <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                              Edit
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedProduct(product._id);
                                setOpenDelete(true);
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-md text-muted-foreground">
            Total records:{" "}
            <span className="font-semibold">{products.length}</span>
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rows per page
              </span>
              <select
                className="border rounded-md px-2 py-1 text-sm"
                // value={recordsPerPage}
                // onChange={(e) => setRecordsPerPage(Number(e.target.value))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page 1 of 5{/* Page {currentPage} of {totalPages} */}
              </span>

              <Button
                size="icon"
                variant="outline"
                // disabled={currentPage === 1}
                // onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                ‹
              </Button>

              <Button
                size="icon"
                variant="outline"
                // disabled={currentPage === totalPages}
                // onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                ›
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Product Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Product?</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this product?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteProducts}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Products;
