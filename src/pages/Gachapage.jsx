import { useParams } from 'react-router-dom';
import BannerSection from '../components/BannerSection';
import PullButtons from '../components/PullButtons.jsx';
import HistorySection from '../components/HistorySection.jsx';
import BannerSelectingSection from '../components/BannerSelectingSection.jsx'

const Gachapage = () => {
  const { bannerID } = useParams();
  return (

    <div>
      <main className="grid-cols-3 lg:flex">
        <div className='relative lg:w-2/3'>
          <BannerSection bannerID={bannerID} />
          <PullButtons></PullButtons>
        </div>
        <div className="lg:w-1/3">
          <HistorySection></HistorySection>
        </div>
      </main>

      <BannerSelectingSection></BannerSelectingSection>
    </div>
  );
}


export default Gachapage;
