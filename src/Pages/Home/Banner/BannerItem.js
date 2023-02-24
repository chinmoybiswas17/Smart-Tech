import React from 'react';

const BannerItem = ({ slide }) => {
    const { image, id, prev, next, price, brand } = slide;
    return (
        <div id={`slide${id}`} className="carousel-item relative w-full">
            <div className='carousel-img'>
                <img src={image} alt="" className="h-64 my-14 mx-24 rounded-xl" />
            </div>

            <div>
                <div className="absolute flex justify-end transform -translate-y-1/2 right-34 top-1/3">
                <h1 className='font-bold'>
                    <span className='text-4xl text-font2'>Second Hand</span> <br />
                    <span className='text-5xl text-primary'>{brand} Laptops</span> <br />
                    <span className='text-3xl text-font2'>Now From <span className='text-black font-extrabold'>${price}</span></span> <br />
                </h1>
            </div>
            
            <div className="absolute flex justify-end transform -translate-y-1/2 right-28 bottom-0">
                <a href={`#slide${prev}`} className="btn btn-circle mr-5">❮</a>
                <a href={`#slide${next}`} className="btn btn-circle">❯</a>
            </div>
            </div>
        </div>

    );
};

export default BannerItem;