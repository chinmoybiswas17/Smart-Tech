import React from 'react';
import { FaGift, FaTools, FaLaptopHouse, FaHeadset } from "react-icons/fa";

const IconSection = () => {
    return (
        <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-16 px-4 py-12'>
            <div className='py-12 text-base bg-white flex flex-col items-center justify-center hover:text-secondary hover:shadow-md'>
                <span className='text-4xl'><FaGift/></span>
                <h4>Gift Options Available</h4>
            </div>
            <div className='py-12 text-base bg-white flex flex-col items-center justify-center hover:text-secondary hover:shadow-md'>
                <span className='text-4xl'><FaTools/></span>
                <h4>30 Days Free Service</h4>
            </div>
            <div className='py-12 text-base bg-white flex flex-col items-center justify-center hover:text-secondary hover:shadow-md'>
                <span className='text-4xl'><FaLaptopHouse/></span>
                <h4>Free Home Delivery</h4>
            </div>
            <div className='py-12 text-base bg-white flex flex-col items-center justify-center hover:text-secondary hover:shadow-md'>
                <span className='text-4xl'><FaHeadset/></span>
                <h4>24/7 Customer Care</h4>
            </div>
        </div>
    );
};

export default IconSection;