import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from "./Profile.jsx";
import AllOffers from "./offers/AllOffers.jsx";
import OfferSide from "./offers/OfferSide.jsx";
import Category from "./offers/Category.jsx";
import ErrorPage from "./ErrorPage.jsx";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:3200";
// axios.defaults.headers = ;

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
        // errorElement: <ErrorPage/>,
        children: [
            {
                path: '/',
                element: <AllOffers/>
            },
            {
                path: '/category/:categoryTitle',
                element: <Category/>
            },
            {
                path: "/profile",
                element: <Profile/>
            },
            {
                path: "/offer/:offerId",
                element: <OfferSide/>
            },
            {
                path: "*",
                element: <ErrorPage/>
            },
        ]
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
