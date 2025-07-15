import { Link } from "react-router-dom";

const BannerCard = ({ bannerID, bannerName, bannerArtPath, date = "" }) => {
  return (
    <Link to={`/gacha/${bannerID}`} className="block cursor-pointer">

      <div className="bg-gray-600/50 hover:bg-gray-600/90 duration-300 w-full">
        <img src={bannerArtPath} alt={bannerID} className="w-full" />
        <div className="p-4 text-white">
          <h3 className="text-lg font-semibold">{bannerName}</h3>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>
    </Link>
  );
};

export default BannerCard;
