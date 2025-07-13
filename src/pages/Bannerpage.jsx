import React, { useEffect, useState } from "react";
import BannerCard from '../components/BannerCard.jsx';
import bannerDB from "../mergedDB.json";

function Bannerpage() {
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

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {banners.map(([id, data]) => (
                    <BannerCard 
                    key={id}
                    bannerID={id}
                    bannerName={data.name}
                    bannerArtPath={`/${data.art.replace("#", "%23")}`}
                    date={getRandomDate()}
                    />
                ))}
            </div>
        </div>
    );
}

export default Bannerpage;
