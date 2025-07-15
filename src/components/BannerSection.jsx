const BannerSection = ({ bannerID }) => (
  <div className="grid-cols-3 p-4 lg:flex">
    <img
      src={`/data/banners/art/${bannerID}.png`}
      alt={bannerID}
      className="w-full object-contain"
    />
    <div className="lg:absolute top-9 left-7 bg-gray-900/70 text-white text-xs px-3 py-1 rounded lg:w-3/5 h-auto">
      Available operators:  Exusiai, SilverAsh, Eyjafjalla, Siege, Saria, Ch'en, Hoshiguma, Nightingale, Shining, Ifrit, Texas, Lappland, Amiya, Myrtle, Specter, Blue Poison, Meteorite, Silence, Warfarin, Zima, Ptilopsis, Liskarm, Red, Glaucus, Manticore, Croissant, Mayer, Earthspirit, Beehunter, Gummy
    </div>
  </div>
);

export default BannerSection;
