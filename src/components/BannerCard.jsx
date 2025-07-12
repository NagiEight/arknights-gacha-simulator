import React from 'react';

function BannerCard({ name, date, imgSrc }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      <img src={imgSrc} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold hover:text-blue-300">{name}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </div>
  );
}

export default BannerCard;
