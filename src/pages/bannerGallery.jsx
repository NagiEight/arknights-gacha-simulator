import BannerSection from '../components/BannerSection.jsx';
import * as access from "../utils/access.jsx"

const BannersDisplay = () => {
    const output = [];
    const basePath = "../../public/";

    access.jsonLoader(basePath + "data/bannerData.json").then(data => {
        for(const bannerPath of data) {
            access.jsonLoader(basePath + bannerPath).then(jsonData => {
                const bannerID = bannerPath.split("/")[3].replace(".json", "");
                const bannerName = jsonData.name;
                const bannerArtPath =  

                output.push(BannerSection())
            });
        }
    });
};

export default BannersDisplay;