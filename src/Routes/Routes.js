import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DashboardLayout from '../layout/DashboardLayout';
import Main from '../layout/Main';
import AllBuyers from '../Pages/Admin/AllBuyers/AllBuyers';
import AllSellers from '../Pages/Admin/AllSellers/AllSellers';
import Blog from '../Pages/Blog/Blog';
import CategoryItems from '../Pages/CategoryItems/CategoryItems';
import AddProducts from '../Pages/Dashboard/AddProducts/AddProducts';
import MyProducts from '../Pages/Dashboard/AddProducts/MyProducts/MyProducts';
import Dashboard from '../Pages/Dashboard/Dashboard/Dashboard';
import Home from '../Pages/Home/Home/Home'
import Login from '../Pages/Login/Login';
import DisplayError from '../Pages/Shared/DisplayError/DisplayError';
import SignUp from '../Pages/SignUp/SignUp';
import PrivateRoute from '../Routes/PrivateRoute/PrivateRoute'
import AdminRoute from './PrivateRoute/AdminRoute';
import SellerRoute from './PrivateRoute/SellerRoute';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
            path:'/',
            element: <Home></Home>
        },
        {
            path:'/category/:brand',
            element: <PrivateRoute><CategoryItems></CategoryItems></PrivateRoute>,
            loader: ({params}) => fetch(`https://used-product-resale-market-server-roan.vercel.app/category/${params.brand}`)
        },
        {
            path:'/login',
            element: <Login></Login>
        },
        {
            path:'/signup',
            element: <SignUp></SignUp>
        },
        {
            path:'/blog',
            element: <Blog></Blog>
        },
        
      ]
    },

    {
        path: '/dashboard',
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement: <DisplayError></DisplayError>,
        children: [
          {
            path:'/dashboard',
            element: <Dashboard></Dashboard>
          },
          {
            path:'/dashboard/allSellers',
            element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
          },
          {
            path:'/dashboard/allBuyers',
            element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
          },
          {
            path:'/dashboard/reported'
          },
          {
            path:'/dashboard/addproduct',
            element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
          },
          {
            path:'/dashboard/myproducts',
            element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
          },
          {
            path:'/dashboard/mybuyers',
          },
          {
            path:'/dashboard/myorders',
          },
        ]
    },
    {path: '*', element: <div><h2 className='text-center'>404 Link not Found!</h2></div>},
  ]);

export default router;