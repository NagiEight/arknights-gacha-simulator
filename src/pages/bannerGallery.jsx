import BannerCard from '../components/BannerCard.jsx';
import * as access from "../utils/access.jsx"

const BannersDisplay = () => {
    const output = [];

    access.jsonLoader("/data/bannerData.json").then(data => {
        for(const bannerPath of data) {
            access.jsonLoader(bannerPath).then(jsonData => {
                const bannerID = bannerPath.split("/")[3].replace(".json", "");
                const bannerName = jsonData.name;
                const bannerArtPath = jsonData.art;

                output.push(BannerCard(bannerID, bannerName, bannerArtPath))
            });
        }
        return output;
    });
};

export default BannersDisplay;