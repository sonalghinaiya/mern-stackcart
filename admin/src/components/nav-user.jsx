"use client";

import { ChevronDown, LogOut } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function NavUser({ variant = "navbar" }) {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: "",
    fname: "",
    lname: "",
    email: "",
    profileImage: "",
  });

  const [openLogout, setOpenLogout] = useState(false);

  useEffect(() => {
    const userProfile = localStorage.getItem("user");
    if (userProfile) {
      const userData = JSON.parse(userProfile);
      setUser({
        id: userData._id || "",
        fname: userData.firstName || "",
        lname: userData.lastName || "",
        email: userData.email || "",
        profileImage: userData.profilePic || "",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  if (variant === "sidebar") {
    return (
      <div className="flex items-center gap-3 p-2">
        <Avatar className="h-9 w-9">
          {user.profileImage ? (
            <AvatarImage src={user.profileImage} />
          ) : (
            <AvatarFallback className="text-indigo-700 font-bold bg-indigo-100">
              {user.fname
                ? user.fname.charAt(0).toUpperCase() +
                  (user.lname ? user.lname.charAt(0).toUpperCase() : "")
                : "U"}
            </AvatarFallback>
          )}
        </Avatar>
        <div className="flex flex-col text-left">
          <span className="text-sm font-semibold text-gray-800">
            {user.fname} {user.lname}
          </span>
          <span className="text-xs text-muted-foreground">{user.email}</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 px-2 py-1 hover:bg-accent rounded-lg"
          >
            <Avatar className="h-9 w-9">
              {user.profileImage ? (
                <AvatarImage src={user.profileImage} />
              ) : (
                <AvatarFallback className="text-white font-bold bg-indigo-600">
                  {user.fname
                    ? user.fname.charAt(0).toUpperCase() +
                      (user.lname ? user.lname.charAt(0).toUpperCase() : "")
                    : "U"}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col text-left leading-tight md:block">
              <span className="text-sm font-semibold">
                {user.fname} {user.lname}
              </span>
            </div>

            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-55">
          <DropdownMenuItem>
            <h2 className="font-medium">
              {user.fname} {user.lname}
            </h2>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <h2 className="-mt-2 text-gray-500 text-xs">{user.email}</h2>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-500"
            onClick={() => setOpenLogout(true)}
          >
            <LogOut className="mr-2 h-4 w-4 text-red-500" />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logout Dialog */}
      <Dialog open={openLogout} onOpenChange={setOpenLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log out?</DialogTitle>
            <DialogDescription>
              Are you sure you want to log out?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpenLogout(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleLogout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
