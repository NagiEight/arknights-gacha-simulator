const BannerSection = () => (
  <div className="grid-cols-2 p-4 flex">
    <div className="relative grid-rows-2">
      <img
        src="./data/banners/art/[Carnival]_Cloudtop_Lucid_Dreams.png"
        alt="banner-image"
        className="rounded-lg border border-gray-700"
      />
      <div className="absolute bottom-3 left-2 bg-gray-900/70 text-white text-xs px-3 py-1 rounded width-20">
        Available operators:  Exusiai, SilverAsh, Eyjafjalla, Siege, Saria, Ch'en, Hoshiguma, Nightingale, Shining, Ifrit, Texas, Lappland, Amiya, Myrtle, Specter, Blue Poison, Meteorite, Silence, Warfarin, Zima, Ptilopsis, Liskarm, Red, Glaucus, Manticore, Croissant, Mayer, Earthspirit, Beehunter, Gummy

      </div>
    </div>
  </div>
);

export default BannerSection;
