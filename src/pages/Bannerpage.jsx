import React from 'react';
import BannerCard from '../components/BannerCard.jsx';

const images = [
  {
    name: 'Example',
    date: '2025-07-12',
    imgSrc: '/public/data/banners/art/[Carnival]_Cloudtop_Lucid_Dreams.png',
  },
  {
    name: 'ON SALE 80% OFF',
    date: '2025-06-28',
    imgSrc: '/public/data/banners/art/Unbound_Reflux.png',
  },
  {
    name: 'Something something',
    date: '2025-05-20',
    imgSrc: '/public/data/banners/art/[Celebration]_Cremation_Last_Wish.png',
  },
];

function Bannerpage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <BannerCard key={index} {...image} />
        ))}
      </div>
    </div>
  );
}

export default Bannerpage;
