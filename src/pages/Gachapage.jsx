import { useParams } from 'react-router-dom';
import BannerSection from '../components/BannerSection';
import PullButtons from '../components/PullButtons.jsx';

const Gachapage = () => {
  const { bannerID } = useParams();
  return (

    <div>
      <main>
        bannerID = {bannerID}
        <div className='relative lg:w-2/3'>
          <BannerSection bannerID={bannerID} />
          <PullButtons></PullButtons>
        </div>
      </main>
    </div>
  );
}


export default Gachapage;
