import { createBrowserRouter } from 'react-router-dom';
import { Layout } from "../components/Layout/Layout";
import { AuthPage } from '../components/Pages/AuthPage/AuthPage';
import { ErrorPage } from "../components/Pages/ErrorPage/ErrorPage.jsx";
import { LoginPage } from '../components/Pages/LoginPage/LoginPage';
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
    },
    {
        path: '/auth',
        element: <AuthPage />
    },
    {
        path: '/login',
        element: <LoginPage />
    }
])