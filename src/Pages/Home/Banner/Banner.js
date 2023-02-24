import React from 'react';
import BannerItem from './BannerItem';
import img1 from '../../../assets/1.png'
import img3 from '../../../assets/3.png'
import './Banner.css'

const Banner = () => {
    const bannerData = [
        {
            image: img1,
            price: 300,
            brand: "Apple",
            prev: 3,
            id: 1,
            next: 2
        },
        {
            image: img3,
            price: 250,
            brand: "Dell",
            prev: 1,
            id: 2,
            next: 3
        },
        {
            image: "https://ssl-product-images.www8-hp.com/digmedialib/prodimg/lowres/c06606458.png",
            price: 400,
            brand: "HP",
            prev: 2,
            id: 3,
            next: 1
        }
    ]
    return (
        <div className='carousel w-full banner bg-neutral'>
            {
                bannerData.map(slide => <BannerItem
                    key={slide.id}
                    slide = {slide}
                ></BannerItem>)
            }

        </div>
    );
};

export default Banner;