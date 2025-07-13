import React, { useEffect, useState } from 'react';
import BannerCard from '../components/BannerCard.jsx';
import BannersDisplay from './BannerDisplay.jsx';

function Bannerpage() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
      <BannersDisplay />
    </div>
  );
}

export default Bannerpage;
