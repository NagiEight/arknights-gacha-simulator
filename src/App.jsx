import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GalleryPage from './pages/Gallerypage.jsx';
import Homepage from './pages/Homepage.jsx';
import Navbar from './components/Navbar.jsx';
import Gachapage from './pages/GachaPage.jsx';
import Bannerpage from './pages/Bannerpage.jsx';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/gacha" element={<Gachapage />} />
        <Route path="/banners" element={<Bannerpage />} />
      </Routes>
    </>
  );
}

export default App;
