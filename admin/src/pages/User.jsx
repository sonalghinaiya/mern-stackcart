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
  ArrowUp,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ImageOff,
  MoreVertical,
  Search,
  Shield,
  Trash2,
  UserCheck,
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

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const [sortBy, setSortBy] = useState("createdAt");
  const [order, setOrder] = useState("desc");
  const [roleFilter, setRoleFilter] = useState("");

  const [openDelete, setOpenDelete] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [openRoleChange, setOpenRoleChange] = useState(false);
  const [newRole, setNewRole] = useState("");

  const currentUser = JSON.parse(localStorage.getItem("user") || "{}");

  const fetchUsers = async () => {
    try {
      const res = await api.get("/admin/users", {
        params: {
          page,
          limit,
          firstName: search,
          role: roleFilter,
          sortBy,
          order,
        },
      });
      setUsers(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setTotalItems(res.data.pagination.totalUsers);
    } catch (error) {
      toast.error("Failed to fetch users");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, limit, search, roleFilter, sortBy, order]);

  const deleteUser = async () => {
    try {
      await api.delete(`/users/${selectedUser}`);
      setOpenDelete(false);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const changeUserRole = async () => {
    try {
      await api.patch(`/admin/users/${selectedUser}/role`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      setOpenRoleChange(false);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleRoleChangeClick = (userId, currentRole, targetRole) => {
    if (userId === currentUser._id) {
      toast.error("You cannot change your own role!");
      return;
    }

    setSelectedUser(userId);
    setNewRole(targetRole);
    setOpenRoleChange(true);
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

  const totalAdmins = users.filter((u) => u.role === "admin").length;
  const totalUsers = users.filter((u) => u.role === "user").length;

  return (
    <div className="flex flex-col h-full gap-4">
      <div className="flex justify-between items-center shadow-sm bg-white rounded-lg p-4 shrink-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor your customers
          </p>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-600 shadow-sm">
              <Shield className="w-3.5 h-3.5" />
              {totalAdmins} Admins
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-semibold text-gray-600 shadow-sm">
              <UserCheck className="w-3.5 h-3.5" />
              {totalUsers} Users
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col flex-1 min-h-0">
        <div className="relative w-64 shrink-0">
          <div className="flex gap-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-9 h-9 bg-gray-50 text-sm rounded-lg border-muted-foreground/20 focus:ring-1 focus:ring-blue-500"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className="border rounded-md px-2 py-1 text-sm"
              value={roleFilter}
              onChange={(e) => {
                setRoleFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-4">
          <div className="h-full overflow-y-auto">
            <Table>
              <TableHeader className="bg-gray-50 sticky top-0 z-10 capitalize">
                <TableRow>
                  <TableHead>Profile</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    Name {getSortIcon("firstName")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    Email {getSortIcon("firstName")}
                  </TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    Created {getSortIcon("firstName")}
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("firstName")}
                  >
                    Updated {getSortIcon("firstName")}
                  </TableHead>
                  <TableHead className="text-center border-s-2"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.length > 0 ? (
                  users.map((user) => {
                    const isCurrentUser = user._id === currentUser._id;
                    return (
                      <TableRow key={user._id} className="hover:bg-muted/40">
                        <TableCell>
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.firstName}
                              className="h-10 w-10 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="h-12 w-12 flex items-center justify-center rounded-md bg-gray-100 border">
                              <ImageOff className="h-5 w-5 text-gray-400" />
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {user.firstName} {user.lastName}
                          {isCurrentUser && (
                            <span className="ml-2 text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full">
                              You
                            </span>
                          )}
                        </TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full capitalize ${
                              user.role === "admin"
                                ? "bg-blue-50 text-blue-600 border border-blue-200"
                                : "bg-gray-50 text-gray-600 border border-gray-200"
                            }`}
                          >
                            {user.role === "admin" && (
                              <Shield className="h-3.5 w-3.5 text-blue-500" />
                            )}

                            {user.role}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md ${
                              user.isDeleted
                                ? "bg-red-50 text-red-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${
                                user.isDeleted ? "bg-red-500" : "bg-emerald-500"
                              }`}
                            ></span>

                            {user.isDeleted ? "Deleted" : "Active"}
                          </span>
                        </TableCell>

                        <TableCell>
                          {new Date(user.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {new Date(user.updatedAt).toLocaleDateString()}
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
                                disabled={
                                  user.role === "admin" || isCurrentUser
                                }
                                onClick={() =>
                                  handleRoleChangeClick(
                                    user._id,
                                    user.role,
                                    "admin",
                                  )
                                }
                              >
                                <Shield className="mr-2 h-4 w-4 text-blue-500" />
                                Make Admin
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                disabled={user.role === "user" || isCurrentUser}
                                onClick={() =>
                                  handleRoleChangeClick(
                                    user._id,
                                    user.role,
                                    "user",
                                  )
                                }
                              >
                                <UserCheck className="mr-2 h-4 w-4" />
                                Make User
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />

                              <DropdownMenuItem
                                disabled={isCurrentUser}
                                onClick={() => {
                                  if (isCurrentUser) {
                                    toast.error("You cannot delete yourself!");
                                    return;
                                  }
                                  setSelectedUser(user._id);
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
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={4}
                      className="text-center py-6 text-muted-foreground"
                    >
                      No users found.
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

      {/* Delete User Dialog */}
      <Dialog open={openDelete} onOpenChange={setOpenDelete}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User?</DialogTitle>
            <DialogDescription>
              This action will mark the user as deleted. You can restore later
              if needed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenDelete(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={deleteUser}>
              Yes, Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Role Dialog */}
      <Dialog open={openRoleChange} onOpenChange={setOpenRoleChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change User Role?</DialogTitle>
            <DialogDescription>
              Are you sure you want to change this user's role to{" "}
              <span className="font-semibold capitalize">{newRole}</span>?
              {newRole === "admin" && (
                <span className="block mt-2 text-amber-600">
                  ⚠️ This will grant admin privileges to this user.
                </span>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenRoleChange(false)}>
              Cancel
            </Button>
            <Button onClick={changeUserRole}>Yes, Change Role</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Users;
