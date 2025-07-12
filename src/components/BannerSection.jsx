const BannerSection = (bannerID, bannerName, bannerArtPath) => (
    <div id="gallery" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
        <div class="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
            <img src={bannerArtPath} alt={bannerID} class="w-full h-48 object-cover"/>
            <div class="p-4">
                <h3 class="text-white font-semibold text-lg">
                    {bannerName}
                </h3>
            </div>
        </div>
    </div>
);

export default BannerSection;
