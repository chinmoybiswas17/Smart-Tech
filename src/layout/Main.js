import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../Pages/Shared/Footer/Footer';
import Navbar from '../Pages/Shared/Navbar/Navbar';

const Main = () => {
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
                            <h2 className='text-xl font-bold text-font1'>Top Categories</h2>
                        </div>
                        <li className='hover:text-primary px-8 border-b-2 border-font1 '><Link className='hover:bg-white font-semibold' to='/category/Apple'>Apple</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/Asus'>Asus</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/Dell'>Dell</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/HP'>HP</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/Acer'>Acer</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/Lenovo'>Lenovo</Link></li>
                        <li className='hover:text-primary px-8 border-b-2 border-font1'><Link className='hover:bg-white font-semibold' to='/category/Microsoft'>Microsoft</Link></li>
                    </ul>

                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;