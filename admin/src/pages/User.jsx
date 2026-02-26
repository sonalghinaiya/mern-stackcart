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
  ImageOff,
  MoreVertical,
  Pencil,
  PlusIcon,
  Search,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    const res = await api.get("/admin/users");
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    await api.delete(`/users/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-1 space-y-6">
      <div className="flex justify-between shadow-sm bg-white rounded-lg p-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor your customers
          </p>
        </div>
        <div className="flex justify-center items-center">
          <Button className="text-md">
            <PlusIcon /> Add User
          </Button>
        </div>
      </div>

      <div className="bg-white border rounded-lg shadow-sm p-4 -mt-2">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search..."
            className="pl-9 h-9 bg-gray-50 text-sm rounded-lg border-muted-foreground/20 focus:ring-1 focus:ring-blue-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="bg-white rounded-lg shadow-sm border overflow-hidden mt-4">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Updated</TableHead>
                <TableHead className="text-center border-s-2">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {users.length > 0 ? (
                users.map((user) => (
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
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600">
                        {user.role}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 text-xs rounded-md ${
                          user.isDeleted
                            ? "bg-red-100 text-red-600"
                            : "bg-green-100 text-green-600"
                        }`}
                      >
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
                            onClick={() => console.log("Edit", product._id)}
                          >
                            <Pencil className="mr-2 h-4 w-4 text-blue-500" />
                            Edit
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            onClick={() => deleteProducts(product._id)}
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
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default Users;
