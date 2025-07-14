import { useRef } from 'react';
import BannerCard from './BannerCard';
import bannersDB from '../bannersDB.json'; // Adjust path if needed


const BannerSelectingSection = () => {

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

    // 🔍 Transform bannersDB into usable array
    const banners = Object.entries(bannersDB).map(([id, data]) => ({
        bannerID: id,
        bannerName: data.name,
        bannerArtPath: data.art,
        date: data.type // Optional: use this or a formatted release string
    }));

    return (
        <div className="flex items-center w-full overflow-hidden p-4">
            <button
                className="text-3xl p-2 hover:bg-gray-200 rounded-full"
                onClick={() => scroll('left')}
            >
                ‹
            </button>

            <div
                className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar"
                ref={scrollRef}
            >
                {banners.map((banner) => (
                    <div className='w-[400px] shrink-0'>
                        <BannerCard
                            key={banner.bannerID}
                            bannerID={banner.bannerID}
                            bannerName={banner.bannerName}
                            bannerArtPath={banner.bannerArtPath}
                            date={banner.date}
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

export default BannerSelectingSection;
