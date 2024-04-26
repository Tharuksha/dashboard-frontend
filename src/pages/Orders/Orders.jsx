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

  const handleDeleteOrder = async (orderid) => {

    try {
      await instance.delete(`/orders/${orderid}`);
      console.log("order deleted:", orderid);
      toast.success("Order deleted successfully");
      // Optionally, update the list of books after deleting
      updatedOrderList();
    } catch (error) {
      console.error("Error deleting order: ", error);
      toast.error("Error deleting order");
    }
  };

   // function to fetch updated list of books
   const updatedOrderList = async () => {
    try {
      const response = await instance.get("/orders/all");
      setOrders(response.data);
    } catch (error) {
      console.error("Error updating order list: ", error);
    }
  };

  return (
    <>
    <Toaster />
    <Table>
      <TableCaption>All Orders</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Order Date</TableHead>
          <TableHead>Note</TableHead>
          <TableHead>Shipping Address</TableHead>
          <TableHead>Contact Details</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order) => (
          <TableRow key={order.id}>
            <TableCell>{order.orderid}</TableCell>
            <TableCell>{order.orderDate}</TableCell>
            <TableCell>{order.note}</TableCell>
            <TableCell>{order.shippingAddress}</TableCell>
            <TableCell>{order.contactNumber}</TableCell>
            <TableCell>
                <>
                  <Button
                    onClick={() => handleDeleteOrder(order.orderid)}
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
