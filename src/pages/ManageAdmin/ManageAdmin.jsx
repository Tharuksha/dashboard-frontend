/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import { Trash2, Loader2, NotebookPen, X } from "lucide-react";
import { instance, instance2 } from "../../services/AxiosOrder";
import toast, { Toaster } from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function ManageAdmin() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    f_name: "",
    l_name: "",
    email: "",
    password: "",
    role: "admin",
  });

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  useEffect(() => {
    instance2
      .get("/users/admins")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAdmins(response.data);
        } else {
          console.log(
            "Data is not an array, actual type:",
            typeof response.data
          );
        }
      })
      .catch((error) => {
        console.error("Error loading admins:", error);
      });
  }, []);

  const handleAddAdmin = () => {
    setShowAddDialog(true);
  };

  const handleSaveNewAdmin = async () => {
    setLoading(true);
    try {
      const response = await instance.post("/signup", {
        email: newAdmin.email,
        password: newAdmin.password,
        f_name: newAdmin.f_name,
        l_name: newAdmin.l_name,
        role: "admin",
      });

      if (
        response.status === 200 &&
        response.data &&
        response.data.users &&
        response.data.users.id
      ) {
        console.log("New admin ID:", response.data.users.id);
        const newAdminWithId = { ...newAdmin, id: response.data.users.id };
        setAdmins((prevAdmins) => [...prevAdmins, newAdminWithId]);
        setShowAddDialog(false);
        toast.success("Admin added successfully");
        setNewAdmin({
          f_name: "",
          l_name: "",
          email: "",
          password: "",
          role: "admin",
        });
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding new admin:", error);
      toast.error("Error adding new admin");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setLoading(true);
    setSelectedAdmin({ id });
    instance2
      .delete(`/users/${id}`)
      .then(() => {
        setAdmins((prevAdmins) =>
          prevAdmins.filter((admin) => admin.id !== id)
        );
        toast.success("Admin deleted successfully");
        setSelectedAdmin(null);
      })
      .catch((error) => {
        console.error("Error deleting user:", error);
        toast.error("Error deleting admin");
      })
      .finally(() => setLoading(false));
  };

  const handleEdit = (admin) => {
    setSelectedAdmin(admin);
    setShowEditDialog(true);
  };

  const handleSaveChanges = async () => {
    if (selectedAdmin) {
      setLoading(true);
      try {
        const updatedUser = {
          f_name: document.getElementById("f_name").value,
          l_name: document.getElementById("l_name").value,
          email: document.getElementById("email").value,
          role: "admin",
        };

        const response = await instance2.put(
          `/users/${selectedAdmin.id}`,
          updatedUser
        );
        if (response.status === 200) {
          setAdmins((prevAdmins) =>
            prevAdmins.map((user) =>
              user.id === selectedAdmin.id ? { ...user, ...updatedUser } : user
            )
          );
          setShowEditDialog(false);
          toast.success("Admin updated successfully");
          setSelectedAdmin(null);
        }
      } catch (error) {
        console.error("Error updating user:", error);
        toast.error("Error updating admin");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Toaster />
      <div className="flex justify-end mb-5">
        <Button
          className="m-0 w-[150px] h-[50px] mr-[10px] text-lg"
          type="button"
          onClick={handleAddAdmin}
        >
          Add Admin
        </Button>
      </div>
      <Table>
        <TableCaption>Manage Admins Page</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {admins.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>
                {user.f_name} {user.l_name}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                {loading && selectedAdmin?.id === user.id ? (
                  <Button disabled>
                    <Loader2 className="animate-spin" />
                    Please wait...
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={() => handleDelete(user.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash2 size={20} />
                    </Button>
                    {"  "}
                    <Button
                      onClick={() => handleEdit(user)}
                      variant="secondary"
                      size="icon"
                    >
                      <NotebookPen size={20} />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {showAddDialog && (
        <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
              <Button
                onClick={() => setShowAddDialog(false)}
                aria-label="Close"
                className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8"
                style={{ lineHeight: "1", padding: "0" }}
              >
                <X size={24} />
              </Button>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="f_name_new">First Name</Label>
                <Input
                  id="f_name_new"
                  value={newAdmin.f_name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, f_name: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="l_name_new">Last Name</Label>
                <Input
                  id="l_name_new"
                  value={newAdmin.l_name}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, l_name: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newAdmin.email}
                  onChange={(e) =>
                    setNewAdmin({ ...newAdmin, email: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password_new">Password</Label>
                <div className="relative col-span-3">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password_new"
                    value={newAdmin.password}
                    onChange={(e) =>
                      setNewAdmin({ ...newAdmin, password: e.target.value })
                    }
                    className="w-full pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-sm"
                  >
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      size="lg"
                    />
                  </button>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleSaveNewAdmin}
                disabled={
                  !newAdmin.f_name ||
                  !newAdmin.l_name ||
                  !newAdmin.email ||
                  newAdmin.password.length < 1
                }
              >
                Save Admin
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {showEditDialog && selectedAdmin && (
        <Dialog open>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you're done.
              </DialogDescription>
              <Button
                onClick={() => {
                  setShowEditDialog(false);
                  setSelectedAdmin(null);
                }}
                aria-label="Close"
                className="absolute top-0 right-0 mt-2 mr-2 w-8 h-8"
                style={{ lineHeight: "1", padding: "0" }}
              >
                <X size={24} />
              </Button>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="f_name">First Name</Label>
                <Input
                  id="f_name"
                  defaultValue={selectedAdmin?.f_name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="l_name">Last Name</Label>
                <Input
                  id="l_name"
                  defaultValue={selectedAdmin?.l_name}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  defaultValue={selectedAdmin?.email}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
