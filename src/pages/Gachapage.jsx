import { useParams } from 'react-router-dom';
import { useState } from 'react';
import BannerSection from '../components/BannerSection';
import PullButtons from '../components/PullButtons.jsx';
import HistorySection from '../components/HistorySection.jsx';
import BannerSelector from '../components/BannerSelector.jsx';
import bannerDB from '../bannersDB.json';
import BorderOverlay from '../components/BorderOverlay.jsx';

const Gachapage = () => {
  //border tracing animation
  const [borderTrigger, setBorderTrigger] = useState(false);

  const triggerBorder = () => {
    setBorderTrigger(true);
    setTimeout(() => setBorderTrigger(false), 100); // reset trigger
  };

  const { bannerID } = useParams();

  return (

    <div>
      <main className="grid-cols-3 lg:flex gap-4">
        <div className='relative lg:w-2/3'>
          <BannerSection bannerID={bannerID} />
          <div>
            <BorderOverlay trigger={borderTrigger} />
            <PullButtons onTriggerBorder={triggerBorder} />
          </div>
        </div>
        <div className="lg:w-1/3">
          <HistorySection />
        </div>
      </main>

      <BannerSelector />
    </div>
  );
};

export default Gachapage;
