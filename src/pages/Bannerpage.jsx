import React, { useEffect, useState } from 'react';
import BannerCard from '../components/BannerCard.jsx';

function Bannerpage() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch('/data/bannerData.json')
      .then(res => res.json())
      .then(paths => {
        // Fetch all banner info files
        return Promise.all(
          paths.map(path =>
            fetch(`/${path}`)
              .then(res => res.json())
              .then(data => ({
                name: data.name,
                date: getRandomDate(),
                imgSrc: `/${data.art}`, // Ensure leading slash
              }))
              .catch(err => {
                console.warn(`Failed to load ${path}:`, err);
                return null;
              })
          )
        );
      })
      .then(banners => {
        const validBanners = banners.filter(Boolean); // Remove null entries
        setImages(validBanners);
      })
      .catch(err => console.error('Failed to load banner list:', err));
  }, []);

  function getRandomDate() {
    const start = new Date(2025, 0, 1);
    const end = new Date(2025, 6, 13);
    const rand = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return rand.toISOString().split('T')[0];
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {images.map((image, index) => (
          <BannerCard key={index} {...image} />
        ))}
      </div>
    </div>
  );
}

export default Bannerpage;
