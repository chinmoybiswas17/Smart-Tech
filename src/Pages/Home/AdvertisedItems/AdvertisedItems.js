import React, { useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthProvider';
import { useQuery } from '@tanstack/react-query';
import Cards from '../../Shared/Cards/Cards';
import BookingModal from '../BookingModal/BookingModal';
import Loading from '../../Shared/Loading/Loading';

const AdvertisedItems = () => {
    const { user } = useContext(AuthContext);
    const [product, setProduct] = useState(null)

    const { data: adProducts, isLoading } = useQuery({
        queryKey: ['adproducts'],
        queryFn: async () => {
            try {
                const res = await fetch(` https://used-product-resale-market-server-roan.vercel.app/products?isAdvertise=${true}`);
                const data = await res.json();
                setProduct(data);
                // console.log(data);
                return data;
            }
            catch (error) {
                console.error(error);
            }
        }
    });

    // console.log(isLoading);

    if (isLoading) {
        return <Loading></Loading>
    }

    return (
        <div className='mx-4 pt-12'>
            {/* <div className='grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 my-16 bg-accent px-4 py-12'></div> */}
            <h2 className='text-2xl text-primary font-bold mb-2'>Advertised Items</h2>

            <Cards products={adProducts} modalOpen={true} setProduct={setProduct}></Cards>

            {
                adProducts &&

                <BookingModal
                    product={product}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default AdvertisedItems;