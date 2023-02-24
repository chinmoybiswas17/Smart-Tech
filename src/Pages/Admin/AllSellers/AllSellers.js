import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllSellers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const closeModal = () => {
        setDeletingUser(null);
    }


    const { data: allSeller, refetch, isLoading } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            try {
                const res = await fetch(' https://used-product-resale-market-server-roan.vercel.app/users?role=seller');
                const data = await res.json();
                console.log(data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    const handleVerifySeller = id => {
        console.log(id);
        fetch(` https://used-product-resale-market-server-roan.vercel.app/users/${id}`, {
            method: 'PATCH'
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if(data.modifiedCount > 0){
                toast.success('Verified seller successfully!!');
                refetch();
            }
        })
    }

    const handleDeleteUser = user => {
        console.log(user);
        fetch(` https://used-product-resale-market-server-roan.vercel.app/users/${user._id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    refetch();
                    toast.success(`${user.name} deleted successfully`)
                }
            })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>

            <div className="overflow-x-auto">
                <table className="table w-full">
                    {/* <!-- head --> */}
                    <thead>
                        <tr className='text-xl'>
                            <th></th>
                            <th>Seller Name</th>
                            <th>Email</th>
                            <th>Verification</th>
                            <th>Delete Seller</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSeller &&
                            allSeller?.map((seller, i) => <tr key={seller._id}>
                                <th>{i + 1}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td>
                                    {
                                        seller.verify === 'true' ? 
                                        <p className='text-primary font-bold'>Verified</p>
                                        :
                                        <button onClick={() => handleVerifySeller(seller._id)} className='btn btn-success btn-sm text-white hover:bg-green-600'>Verify</button>

                                    }
                                    
                                </td>
                                <td><label onClick={() => setDeletingUser(seller)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white hover:bg-red-600">Delete</label></td>
                                
                            </tr>)
                        }


                    </tbody>
                </table>
            </div>
            {
                deletingUser &&
                <ConfirmationModal
                    title={`Are you sure you want to delete`}
                    message={`If you delete ${deletingUser.name}, it can't be undone`}
                    successAction={handleDeleteUser}
                    modalData={deletingUser}
                    closeModal={closeModal}

                ></ConfirmationModal>
            }
        </div>
    );
};

export default AllSellers;