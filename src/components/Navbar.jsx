import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
<nav class="bg-gray-900 text-white font-sans shadow-md">
  <div class="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
    <div class="text-lg font-bold tracking-wide">
      <span class="text-blue-400">ARK</span>Nav
    </div>
    <ul class="flex space-x-6">
      <Link to="/" className='text-white hover:text-blue-300 duration-300'>Home</Link>
      <Link to="/gacha" className="text-white hover:text-blue-300 duration-300">Headhunting</Link>
      <Link to="/banners" className='text-white hover:text-blue-300 duration-300'>Banners</Link>
      <Link to="/operators" className='text-white hover:text-blue-300 duration-300'>Operators</Link>
    </ul>
    <div>
        
    </div>
  </div>
</nav>

  );
}

export default Navbar;
