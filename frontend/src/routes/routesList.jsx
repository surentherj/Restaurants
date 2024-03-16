import React from "react";

const Landing = React.lazy(() => import("../pages/landingPage"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));

const routesList = [
  { path: "/", exact: true, name: "Landing", component: Landing },
  { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
];

export default routesList;
