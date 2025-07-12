import BannerSection from '../components/BannerSection.jsx';
import PullButtons from '../components/PullButtons.jsx';
import AvailableOperators from '../components/AvailableOperators.jsx';
import HistorySection from '../components/HistorySection.jsx';
import Pagination from '../components/Pagination.jsx';
import Navbar from '../components/NavBar.jsx';

const GachaPage = () => (
  <div>
    <main>
      <BannerSection />
      <PullButtons />
      <AvailableOperators />
    </main>
  </div>
);

export default GachaPage;
