import { useRef } from 'react';
import BannerCard from './BannerCard';
import bannerDB from '../bannersDB.json'; // Adjust path if needed
import React, { useEffect, useState } from "react";


const BannerSelector = () => {
    // Get banners data
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        setBanners(Object.entries(bannerDB));
    }, []);
    const getRandomDate = () => {
        const start = new Date(2025, 0, 1);
        const end = new Date(2025, 6, 13);
        const rand = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
        return rand.toISOString().split('T')[0];
    }
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        const amount = 300;
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -amount : amount,
                behavior: 'smooth',
            });
        }
    };

    // // 🔍 Transform bannersDB into usable array
    // const banners = Object.entries(bannerDB).map(([id, data]) => ({
    //     bannerID: id,
    //     bannerName: data.name,
    //     bannerArtPath: data.art,
    //     date: data.type // Optional: use this or a formatted release string
    // }));

    return (
        <div className="flex items-center w-full overflow-hidden p-4">
            <button
                className="text-3xl p-2 hover:bg-gray-200"
                onClick={() => scroll('left')}
            >
                ‹
            </button>

            <div
                className="flex gap-[60px] overflow-x-auto scroll-smooth no-scrollbar items-center"
                ref={scrollRef}
            >
                {banners.map(([id, data]) => (
                    <div className='w-[300px] shrink-0 h-full'>
                        <BannerCard
                            key={id}
                            bannerID={id}
                            bannerName={data.name}
                            bannerArtPath={`/${data.art.replace("#", "%23")}`}
                            date={getRandomDate()}
                        />

                    </div>
                ))}
            </div>

            <button
                className="text-3xl p-2 hover:bg-gray-200 rounded-full"
                onClick={() => scroll('right')}
            >
                ›
            </button>
        </div>
    );
};

export default BannerSelector;
