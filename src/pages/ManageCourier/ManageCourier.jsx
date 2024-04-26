import { instance2 } from "../../services/AxiosOrder";
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

export default function Donations() {
  const [donations, setDonations] = useState([]);


  useEffect(() => {
    instance2
      .get("/donations/all")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDonations(response.data);
          console.log("Donations:", response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error loading Donations:", error);
      });
  }, []);

  const handleDeleteDonations = async (donationId) => {

    try {
      await instance2.delete(`/donations/${donationId}`);
      console.log("Donation deleted:", donationId);
      toast.success("Donation deleted successfully");
      // Optionally, update the list of books after deleting
      updatedDonationList();
    } catch (error) {
      console.error("Error deleting Donation: ", error);
      toast.error("Error deleting Donation");
    }
  };

   // function to fetch updated list of books
   const updatedDonationList = async () => {
    try {
      const response = await instance2.get("/donations/all");
      setDonations(response.data);
    } catch (error) {
      console.error("Error updating Donation list: ", error);
    }
  };

  return (
    <>
    <Toaster />
    <Table>
      <TableCaption>All Donations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Author</TableHead>
          <TableHead>Book Name</TableHead>
          <TableHead>Donation Type</TableHead>
          <TableHead>ISBN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {donations.map((donation) => (
          <TableRow key={donation.Id}>
            <TableCell>{donation.donationId}</TableCell>
            <TableCell>{donation.author}</TableCell>
            <TableCell>{donation.bookName}</TableCell>
            <TableCell>{donation.donationType}</TableCell>
            <TableCell>{donation.isbn}</TableCell>
            <TableCell>
                <>
                  <Button
                    onClick={() => handleDeleteDonations(donation.donationId)}
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
