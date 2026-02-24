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
import { Trash2 } from "lucide-react";

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

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-muted-foreground">
          Manage and monitor your customers.
        </p>
      </div>

      {/* Search + Actions */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search users..."
          className="max-w-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button>Add User</Button>
      </div>

      {/* Table Card */}
      <div className="bg-white border rounded-2xl shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user._id} className="hover:bg-muted/40">
                  <TableCell className="font-medium">
                    {user.firstName}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded-md bg-blue-100 text-blue-600">
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteUser(user._id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
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
  );
}

export default Users;
