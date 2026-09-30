import Home from "./components/Home/Home";
import Shop from "./components/Shop/Shop";
import Cart from "./components/Cart/Cart";
import ErrorPage from "./ErrorPage/ErrorPage";
import Layout from "./components/Layout/Layout";

const routes = [
    {
        path: "/",
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "shop",
                element: <Shop />,
            },
            {
                path: "cart",
                element: <Cart />,
            }
        ]
    }
];

export default routes;
