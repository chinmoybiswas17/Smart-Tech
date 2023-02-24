import React, { useState } from 'react';
import Loading from '../../Shared/Loading/Loading';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';

const AllBuyers = () => {
    const [deletingUser, setDeletingUser] = useState(null);

    const closeModal = () => {
        setDeletingUser(null);
    }

    const { data: allBuyer, refetch, isLoading } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            try {
                const res = await fetch(' https://used-product-resale-market-server-roan.vercel.app/users?role=buyer');
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
                if (data.modifiedCount > 0) {
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
        <div className="overflow-x-auto">
            <table className="table w-full">
                {/* <!-- head --> */}
                <thead>
                    <tr className='text-xl'>
                        <th></th>
                        <th>Buyer Name</th>
                        <th>Email</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allBuyer &&
                        allBuyer?.map((buyer, i) => <tr key={buyer._id}>
                            <th>{i + 1}</th>
                            <td>{buyer.name}</td>
                            <td>{buyer.email}</td>
                            <td><label onClick={() => setDeletingUser(buyer)} htmlFor="confirmation-modal" className="btn btn-sm btn-error text-white hover:bg-red-600">Delete</label></td>

                        </tr>)
                    }

                </tbody>
            </table>

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

export default AllBuyers;