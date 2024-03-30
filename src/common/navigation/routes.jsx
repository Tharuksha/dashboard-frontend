import ManageAdmin from "@/pages/ManageAdmin/ManageAdmin";
import ManageBooks from "@/pages/ManageBooks/ManageBooks";
import Orders from "@/pages/Orders/Orders";

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
];

export default routes;
