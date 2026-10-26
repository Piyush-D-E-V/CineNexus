import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { WatchlistProvider } from "./context/WatchlistContext"; // <-- Import provider
import Navbar from "./Homepage/Navbar"; 
import Home from "./Homepage/Home"; 
import SearchPage from "./Components/SearchPage";
import Details from "./Details/Details";
import ViewAll from "./Homepage/ViewAll";
import Watchlist from "./Components/Watchlist";
import Login from "./Components/Login"; // <-- 1. Naya Login import kiya (Path check kar lena)

const RootLayout = () => (
  <>
    <Navbar />
    <main><Outlet /></main>
  </>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, 
    children: [
      { index: true, element: <Home /> },
      { path: "watchlist", element: <Watchlist /> },
      { path: "search", element: <SearchPage /> },
      { path: "details/:mediaType/:id", element: <Details /> },
      { path: "view-all/:category", element: <ViewAll /> },
      { path: "login", element: <Login /> }, // <-- 2. Login ka route add kar diya
    ],
  },
]);

export default function App() {
  return (
    // Wrap the app here so global state flows everywhere
    <WatchlistProvider>
      <RouterProvider router={router} />
    </WatchlistProvider>
  );
}