import { createBrowserRouter } from 'react-router-dom';
import { Layout } from "../components/Layout/Layout";
import { ErrorPage } from "../components/ErrorPage";
import { MainPage } from '../components/Pages/MainPage/MainPage';
import { Product } from '../components/Pages/Product/Product';
import { Products } from '../components/Pages/Products/Products';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <MainPage />
            },
            {
                path: '/products/:id',
                element: <Products />
            },
            {
                path: '/product/:id',
                element: <Product />
            },
        ]
    }
])