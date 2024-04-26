import { instance2 } from "../../services/AxiosOrder";
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

  

  return (
    
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
          <TableRow key={donation.id}>
            <TableCell>{donation.id}</TableCell>
            <TableCell>{donation.author}</TableCell>
            <TableCell>{donation.bookName}</TableCell>
            <TableCell>{donation.donationType}</TableCell>
            <TableCell>{donation.isbn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
