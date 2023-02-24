import React, { useContext, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Loading from '../Pages/Shared/Loading/Loading'

const DashboardLayout = () => {
    const {user} = useContext(AuthContext);

    const [userRole] = useAdmin(user?.email);
    const currentUser = userRole?.role;

    // console.log(userRole.role);


    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile mb-8">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content pr-4">
                    {/* page content */}
                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu px-4 pb-4 text-base-content">
                        {/* Sidebar content here */}
                        <div className='bg-accent px-8 py-4'>
                            <h2 className='text-xl font-bold text-font1'>Add / View</h2>
                        </div>
                        {
                            currentUser === "admin" && 
                            <>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/allsellers' className='hover:bg-white font-semibold'>All Sellers</Link></li>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/allbuyers' className='hover:bg-white font-semibold'>All Buyers</Link></li>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/reported' className='hover:bg-white font-semibold'>Reported Items</Link></li>
                            </>
                        }
                        {
                            currentUser === "seller" && 
                            <>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/addproduct' className='hover:bg-white font-semibold'>Add a Product</Link></li>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/myproducts' className='hover:bg-white font-semibold'>My Products</Link></li>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/mybuyers' className='hover:bg-white font-semibold'>My Buyers</Link></li>
                            </>
                        }
                        {
                            currentUser === "buyer" && 
                            <>
                                <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link to='/dashboard/myorders' className='hover:bg-white font-semibold'>My Orders</Link></li>
                            </>
                        }

                        
                        {/* <div className='bg-accent px-8 py-4'>
                            <h2 className='text-xl font-bold text-font1'>Top Categories</h2>
                        </div>
                        <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link className='hover:bg-white font-semibold' to='/category/apple'>Apple</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/asus'>Asus</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/dell'>Dell</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/hp'>HP</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/acer'>Acer</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/lenovo'>Lenovo</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/microsoft'>Microsoft</Link></li> */}
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default DashboardLayout;