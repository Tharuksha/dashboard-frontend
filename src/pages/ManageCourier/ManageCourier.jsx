import { instance } from "../../services/AxiosOrder";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useState, useEffect } from "react";

export default function ManageCourier() {
  const [courier, setCouriers] = useState([]);


  useEffect(() => {
    instance
      .get("/couriers/all")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setCouriers(response.data);
          console.log("Donations:", response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error loading Donations:", error);
      });
  }, []);

  const handleDeleteCouriers = async (id) => {

    try {
      await instance.delete(`/couriers/${id}`);
      console.log("Donation deleted:", id);
      toast.success("Donation deleted successfully");
      // Optionally, update the list of books after deleting
      updatedCourierList();
    } catch (error) {
      console.error("Error deleting Donation: ", error);
      toast.error("Error deleting Donation");
    }
  };

   // function to fetch updated list of books
   const updatedCourierList = async () => {
    try {
      const response = await instance.get("/couriers/all");
      setCouriers(response.data);
    } catch (error) {
      console.error("Error updating Donation list: ", error);
    }
  };

  return (
    <>
    <Toaster />
    <Table>
      <TableCaption>All Couriers</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Contact Number</TableHead>
          <TableHead>Delivery Area</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {courier.map((courier) => (
          <TableRow key={courier.id}>
            <TableCell>{courier.id}</TableCell>
            <TableCell>{courier.name}</TableCell>
            <TableCell>{courier.contactNumber}</TableCell>
            <TableCell>{courier.deliveryArea}</TableCell>
            <TableCell>
                <>
                  <Button
                    onClick={() => handleDeleteCouriers(courier.id)}
                    variant="destructive"
                    size="icon">
                    <Trash2 size={20} />
                  </Button>
                </>
              </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </>
  );
}
