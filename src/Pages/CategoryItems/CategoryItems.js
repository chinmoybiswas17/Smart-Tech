import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import BookingModal from '../Home/BookingModal/BookingModal';
import Cards from '../Shared/Cards/Cards';

const CategoryItems = () => {
    const products = useLoaderData();

    const [product, setProduct] = useState(null);
    // setProduct(products);
    
    // console.log(products)

    if (products.length === 0) {
        return <div><h2 className='text-error text-3xl text-center font-bold my-4'>No products were listed in this Category!</h2></div>
    }

    return (
        <div>
            <Cards products={products} modalOpen={true} setProduct={setProduct} ></Cards>


            {
                products &&

                <BookingModal
                    product={products}
                    setProduct={setProduct}
                ></BookingModal>
            }
        </div>
    );
};

export default CategoryItems;