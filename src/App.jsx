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
const App = () => {
  const [dataPage, setDataPage] = useState([]);
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
          path: "/datapage",
          element: <DataPage datapage={dataPage} />,
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
        setDataPage,
      }}
    >
      <RouterProvider router={router} />
    </dataContext.Provider>
  );
};

export default App;
