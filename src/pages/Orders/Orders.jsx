import { instance } from "../../services/AxiosOrder";
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

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    instance
      .get("/orders/all")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setOrders(response.data);
          console.log("Orders:", response.data);
        } else {
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.error("Error loading orders:", error);
      });
  }, []);
  return (
    <Table>
      <TableCaption>All Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Shipping Address</TableHead>
          <TableHead>Contact Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.id}</TableCell>
            <TableCell>{order.name}</TableCell>
            <TableCell>{order.email}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>
            <TableCell>{order.contactNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
