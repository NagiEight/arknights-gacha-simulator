import { useParams } from 'react-router-dom';
import BannerSection from '../components/BannerSection';

const GachaPage = () => {
  const { bannerID } = useParams();
  return (

    <div>
      <main>
        bannerID = {bannerID}
        <BannerSection bannerID={bannerID} />
      </main>
    </div>
  );
}


export default GachaPage;
