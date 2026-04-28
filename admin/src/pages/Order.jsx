import { useEffect, useState } from "react";
import api from "../api/axios";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowRightIcon,
  ArrowUp,
  ArrowUpDown,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Clock,
  ImageOff,
  MoreVertical,
  Package,
  Search,
  Shield,
  Trash2,
  Truck,
  UserCheck,
  XCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");

  const [openDelete, setOpenDelete] = useState(false);
  const [openStatusUpdate, setOpenStatusUpdate] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  const fetchOrders = async () => {
    try {
      const res = await api.get("/admin/orders", {
        params: {
          page,
          limit,
          orderStatus: statusFilter === "all" ? undefined : statusFilter,
          orderNumber: search,
          sortBy,
          order,
        },
      });
      setOrders(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setTotalItems(res.data.pagination.totalOrders);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit, search, statusFilter, sortBy, order]);

  const deleteOrder = async () => {
    try {
      await api.delete(`/admin/orders/${selectedOrder}`);
      toast.success("Order deleted successfully");
      setOpenDelete(false);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to delete order");
    }
  };

  const updateOrderStatus = async () => {
    try {
      await api.patch(`/admin/orders/${selectedOrder}/status`, {
        orderStatus: newStatus,
      });
      toast.success("Order status updated");
      setOpenStatusUpdate(false);
      fetchOrders();
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
    setPage(1);
  };

  const getSortIcon = (field) => {
    if (sortBy !== field) {
      return <ArrowUpDown className="inline w-3 h-3 ml-1 text-gray-400" />;
    }

    return order === "asc" ? (
      <ArrowUp className="inline w-3 h-3 ml-1" />
    ) : (
      <ArrowDown className="inline w-3 h-3 ml-1" />
    );
  };

  const getStatusBadge = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700 border-amber-200",
      processing: "bg-blue-100 text-blue-700 border-blue-200",
      shipped: "bg-indigo-100 text-indigo-700 border-indigo-200",
      delivered: "bg-green-100 text-green-700 border-green-200",
      cancelled: "bg-red-100 text-red-700 border-red-200",
    };

    const icons = {
      pending: <Clock className="w-3 h-3" />,
      processing: <Package className="w-3 h-3" />,
      shipped: <Truck className="w-3 h-3" />,
      delivered: <CheckCircle className="w-3 h-3" />,
      cancelled: <XCircle className="w-3 h-3" />,
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-2 py-1 text-xs font-medium rounded-full border ${styles[status]}`}
      >
        {icons[status]}
        {status}
      </span>
    );
  };

  const getPaymentStatusBadge = (status) => {
    const isPaid = status === "paid";
    return (
      <span
        className={`px-2 py-1 text-xs font-medium rounded-full ${
          isPaid ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
        }`}
      >
        {isPaid ? "Paid" : "Pending"}
      </span>
    );
  };

  const statusCounts = {
    all: totalItems,
    pending: orders.filter((o) => o.orderStatus === "pending").length,
    processing: orders.filter((o) => o.orderStatus === "processing").length,
    shipped: orders.filter((o) => o.orderStatus === "shipped").length,
    delivered: orders.filter((o) => o.orderStatus === "delivered").length,
    cancelled: orders.filter((o) => o.orderStatus === "cancelled").length,
  };

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center shadow-sm bg-white rounded-lg p-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage all customers orders</p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-600 shadow-sm">
              <Package className="w-3.5 h-3.5" />
              Total {totalItems}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col flex-1 min-h-0">
        <div className="flex items-center gap-4 mb-4">
          <div className="relative w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

            <Input
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search..."
              className="pl-9 bg-gray-50"
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) => {
              setStatusFilter(value);
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Filter Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">
                All Statuses ({statusCounts.all})
              </SelectItem>

              <SelectItem value="pending">
                Pending ({statusCounts.pending})
              </SelectItem>

              <SelectItem value="processing">
                Processing ({statusCounts.processing})
              </SelectItem>

              <SelectItem value="shipped">
                Shipped ({statusCounts.shipped})
              </SelectItem>

              <SelectItem value="delivered">
                Delivered ({statusCounts.delivered})
              </SelectItem>

              <SelectItem value="cancelled">
                Cancelled ({statusCounts.cancelled})
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-4">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0 z-10 capitalize">
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("orderNumber")}
                  >
                    Order Number {getSortIcon("orderNumber")}
                  </TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("total")}
                  >
                    Amount {getSortIcon("total")}
                  </TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("createdAt")}
                  >
                    Created {getSortIcon("createdAt")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("updatedAt")}
                  >
                    Updated {getSortIcon("updatedAt")}
                  </TableHead>
                  <TableHead className="text-center border-s-2">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {orders.length > 0 ? (
                  orders.map((item) => (
                    <TableRow key={item._id} className="hover:bg-muted/40">
                      <TableCell className="font-medium">
                        {item.orderNumber}
                      </TableCell>
                      <TableCell>
                        {item.user ? (
                          <>
                            <p className="font-medium">
                              {item.user.firstName} {item.user.lastName}
                            </p>

                            <p className="text-xs text-gray-500">
                              {item.user.email}
                            </p>
                          </>
                        ) : (
                          <>
                            <p className="font-medium text-red-500">
                              User Deleted
                            </p>

                            <p className="text-xs text-gray-500">N/A</p>
                          </>
                        )}
                      </TableCell>
                      <TableCell className="font-semibold">
                        ₹{item.total.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell>
                        {getPaymentStatusBadge(item.paymentStatus)}
                        <p className="text-xs text-gray-500 mt-1 capitalize">
                          {item.paymentMethod}
                        </p>
                      </TableCell>
                      <TableCell>{getStatusBadge(item.orderStatus)}</TableCell>

                      <TableCell>
                        {new Date(item.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {new Date(item.updatedAt).toLocaleDateString()}
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
                              onClick={() => {
                                setSelectedOrder(item._id);
                                setNewStatus("processing");
                                setOpenStatusUpdate(true);
                              }}
                            >
                              <Package className="mr-2 h-4 w-4" />
                              Mark Processing
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(item._id);
                                setNewStatus("shipped");
                                setOpenStatusUpdate(true);
                              }}
                            >
                              <Truck className="mr-2 h-4 w-4" />
                              Mark Shipped
                            </DropdownMenuItem>

                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(item._id);
                                setNewStatus("delivered");
                                setOpenStatusUpdate(true);
                              }}
                            >
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark Delivered
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              onClick={() => {
                                setSelectedOrder(item._id);
                                setNewStatus("cancelled");
                                setOpenStatusUpdate(true);
                              }}
                              className="text-red-500"
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Cancel Order
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
                      No orders found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex items-center justify-between p-4 border-t">
          <p className="text-md text-muted-foreground">
            Total records: <span className="font-semibold">{totalItems}</span>
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rows per page
              </span>
              <select
                className="border rounded-md px-2 py-1 text-sm"
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Page {page} of {totalPages}
              </span>

              <Button
                size="icon"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(1)}
              >
                <ChevronsLeft className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              <Button
                size="icon"
                variant="outline"
                disabled={page === totalPages}
                onClick={() => setPage(totalPages)}
              >
                <ChevronsRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={openStatusUpdate} onOpenChange={setOpenStatusUpdate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Order Status</DialogTitle>
            <DialogDescription>
              Change order status to:
              <b> {newStatus}</b> ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenStatusUpdate(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={updateOrderStatus}>
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Orders;
