import React, { useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../../Shared/Loading/Loading';
import { AuthContext } from '../../../../contexts/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../Shared/ConfirmationModal/ConfirmationModal';

const MyProducts = () => {
    const { user } = useContext(AuthContext);
    const [deletingProduct, setDeletingProduct] = useState(null);

    const closeModal = () => {
        setDeletingProduct(null);
    }

    const { data: myProducts = [], refetch, isLoading } = useQuery({
        queryKey: ['myproducts', user?.email],
        queryFn: async () => {
            try {
                const res = await fetch(`https://used-product-resale-market-server-roan.vercel.app/products?email=${user?.email}`);
                const data = await res.json();
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleDeleteProduct = product => {
        console.log(product);
        fetch(`https://used-product-resale-market-server-roan.vercel.app/products/${product._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${product.productName} deleted successfully`)
                }
            })
    }

    const handleAdvertise = id => {
        console.log(id);
        fetch(` https://used-product-resale-market-server-roan.vercel.app/products/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('Send for advertisement successfully!!');
                refetch();
            }
        })
    }

    console.log(myProducts)

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Product Name</th>
                            <th>Asking Price</th>
                            <th>Date Posted</th>
                            <th>Payment</th>
                            <th>Advertise</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            myProducts &&
                            myProducts?.map((myProduct, i) => <tr key={myProduct._id}>
                                <th>{i + 1}</th>
                                <td>{myProduct.productName}</td>
                                <td>{myProduct.resalePrice}</td>
                                <td>{myProduct.date}</td>
                                <td>
                                    {
                                        myProduct?.resalePrice && !myProduct.paid &&
                                        <span className='text-secondary font-bold'>Not Paid</span>
                                        // <Link to={`/dashboard/payment/${myProduct._id}`}>
                                        //     <button className='btn btn-primary btn-sm'>Pay</button>
                                        // </Link>
                                    }
                                    {
                                        myProduct.price && myProduct.paid && <span className='text-secondary font-bold'>Paid</span>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleAdvertise(myProduct._id)} className='btn btn-success btn-sm text-white hover:bg-green-600'>Advertise</button>
                                    
                                </td>
                                <td><label onClick={() => setDeletingProduct(myProduct)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white hover:bg-red-600">Delete</label></td>
                                
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingProduct &&
                <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`If you delete ${deletingProduct.productName}, it can't be undone`}
                    successAction={handleDeleteProduct}
                    modalData={deletingProduct}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default MyProducts;