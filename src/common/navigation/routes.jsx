import ManageAdmin from "@/pages/ManageAdmin/ManageAdmin";
import ManageBooks from "@/pages/ManageBooks/ManageBooks";
import Orders from "@/pages/Orders/Orders";
import DonateBooks from "@/pages/DonateBooks/DonateBooks";

const routes = [
  {
    name: "Manage Admins",
    path: "/manageadmin",
    key: "manageadmin",
    element: <ManageAdmin />,
  },
  {
    name: "Manage Books",
    path: "/managebooks",
    key: "managebooks",
    element: <ManageBooks />,
  },
  {
    name: "Orders",
    path: "/orders",
    key: "orders",
    element: <Orders />,
  },
  {
    name: "Donate Books",
    path: "/donatebooks",
    key: "donatebooks",
    element: <DonateBooks />,
  },
];

export default routes;
