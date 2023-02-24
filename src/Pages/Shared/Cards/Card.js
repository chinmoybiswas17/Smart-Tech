import React, { useState } from 'react';
import { FaRegCheckCircle } from 'react-icons/fa'
import { useEffect } from 'react';

const Card = ({ product, modalOpen, setProduct }) => {
    const { image, productName, productBrand, location, resalePrice, originalPrice, yearsOfUse, sellerName, email, date, _id } = product;
    const [seller, setSeller] = useState(null);
    // console.log(email)
    // console.log('modalOpen', modalOpen);

    useEffect(() => {
        if(email){
            fetch(` https://used-product-resale-market-server-roan.vercel.app/users/role/${email}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSeller(data);
            })
            .catch(err => console.error(err))
        }
    }, [email])


    return (
        <div className="card card-compact shadow-md hover:shadow-lg">
            <figure><img src={image} className="h-44 w-full" alt="productImage" /></figure>
            <div className="card-body">
                <div className='mx-auto'>
                    <h2 className="card-title pb-3 text-primary">  {productName} </h2>
                    <ul className='text-lg'>
                        <li><b>Brand: </b>{productBrand}</li>
                        <li><b>location:</b> {location}</li>
                        <li><b>Re-sale Price:</b> ${resalePrice}</li>
                        <li><b>Original Price:</b> ${originalPrice}</li>
                        <li><b>Years of use:</b> {yearsOfUse}</li>
                        <li><b>Posted on:</b> {date}</li>
                    </ul>

                    <h3>
                        {
                            seller?.verify === 'true' ?
                                <div className='flex items-center font-bold mt-3'>
                                    <h5>Seller: {sellerName} </h5>
                                    <FaRegCheckCircle className='ml-1 mt-1 text-green-500 text-lg' />
                                </div>
                                :
                                <h5 className='font-bold mt-3'>Seller: {sellerName}</h5>
                        }
                    </h3>
                </div>
                <div className="card-actions justify-center">
                    {/* <button className="btn btn-primary text-white px-12">Book Now</button> */}

                    {
                        modalOpen ?
                            <>
                                {/* The button to open modal */}
                                <label
                                    onClick={() => setProduct(product)}
                                    htmlFor="booking-modal"
                                    className="btn btn-primary btn-sm mt-3 px-6 text-white uppercase">
                                    Book Now
                                </label>
                            </>
                            :
                            <button className="btn btn-primary text-white px-12">Book Now</button>
                    }
                </div>
            </div>
        </div>
    );
};

export default Card;