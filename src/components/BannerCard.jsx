import { Link } from "react-router-dom";

const BannerCard = ({bannerID, bannerName, bannerArtPath, date = ""}) => {
  return (
    <Link to={`/gacha/${bannerID}`} className="block cursor-pointer">
    
    <div className="bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden shadow-lg duration-300">
      <img src={bannerArtPath} alt={bannerID} className="w-full h-48 object-cover" />
      <div className="p-4 text-white">
        <h3 className="text-lg font-semibold">{bannerName}</h3>
        <p className="text-sm text-gray-400">{date}</p>
      </div>
    </div>
    </Link>
  );
};

export default BannerCard;
