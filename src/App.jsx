import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RouterLayout from "./layout/RouterLayout";
import { dataContext } from "./useContext/DataContext";
import {
  headerData,
  doctors,
  products,
  customerCard,
  hamkorlar,
  chegirma,
  yutuqlar,
  videos,
} from "../data/data.js";

// css
import "./App.css";
// pages
import Home from "./pages/Home/Home";
import About from "./pages/About/About.jsx";
import Products from "./pages/Product/Products.jsx";
import News from "./pages/News/News.jsx";
import AllDoctors from "./pages/Doctors/AllDoctors.jsx";
import DataPage from "./components/dataPage/DataPage.jsx";
import { useState } from "react";
import ProductPage from "./components/dataPage/ProductPage.jsx";
import DoctorPage from "./components/doctorPage/DoctorPage.jsx";
import Korzinka from "./pages/Korzinka/Korzinka.jsx";
import Feedback from "./pages/Feedback/Feedback.jsx";

const App = () => {
  // eslint-disable-next-line no-unused-vars
  const [_, setDataPage] = useState([]);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RouterLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/product",
          element: <Products />,
        },
        {
          path: "/news",
          element: <News />,
        },
        {
          path: "/alldoctors",
          element: <AllDoctors />,
        },
        {
          path: "/cart",
          element: <Korzinka />
        },
        {
          path: "/feedback",
          element: <Feedback />
        },
        {
          path: "/datapage/:id",
          element: <DataPage />,
        },
        {
          path: "/productpage/:id",
          element: <ProductPage />,
        },
        {
          path: "/doctorpage/:id",
          element: <DoctorPage />,
        },
      ],
    },
  ]);
  return (
    <dataContext.Provider
      value={{
        headerData,
        doctors,
        products,
        customerCard,
        hamkorlar,
        chegirma,
        yutuqlar,
        videos,
        setDataPage,
      }}
    >
      <RouterProvider router={router} />
    </dataContext.Provider>
  );
};

export default App;
