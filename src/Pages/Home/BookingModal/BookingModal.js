import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../contexts/AuthProvider';
import Loading from '../../Shared/Loading/Loading';

const BookingModal = ({   product, setProduct }) => {
    const { user } = useContext(AuthContext);

    if(product === null){
        return;
    }

    const { productName, resalePrice, _id } = product;
    console.log(productName)


    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        // const productName = form.name.value;
        // const email = form.email.value;
        const phone = form.phone.value;
        const meetLocation = form.meet.value;
        // [3, 4, 5].map((value, i) => console.log(value))




        // meeting location
        const booking = {
            name: user?.displayName,
            email: user?.email,
            productName,
            price: resalePrice,
            phone,
            meetLocation,
            productId: _id
        }

        // TODO: send data to the server
        // and once data is saved then close the modal 
        // and display success toast

        console.log(booking);

        fetch(' https://used-product-resale-market-server-roan.vercel.app/bookings', {
            method: 'POST',
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.acknowledged){
                setProduct(null);
                toast.success('Booking Confirmed');
                // refetch();
            }
            else{
                toast.error(data.message);
            }
        })



    }

    return (
        <div>
            {/* Put this part before </body> tag */}
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold text-primary">Product name: {productName} </h3>
                    <p className='text-sm font-bold'>Price: ${resalePrice}</p>

                    <form onSubmit={handleBooking} className='mt-2'>
                        <div>
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name="name" type="text" defaultValue={user?.displayName} disabled placeholder="Your Name" className="input w-full input-bordered my-1" />
                        </div>
                        
                        <div>
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name="email" type="email" defaultValue={user?.email} disabled placeholder="Email Address" className="input w-full input-bordered my-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Phone Number</span>
                            </label>
                            <input name="phone" type="text" placeholder="Phone Number" className="input w-full input-bordered my-1" />
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text">Meet Location with the Seller</span>
                            </label>
                            <input name="meet" type="text" placeholder="Meet Location" className="input w-full input-bordered my-1" />
                        </div>
                        
                        <br />
                        <input className='btn btn-primary text-white w-full' type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;