import { useParams } from 'react-router-dom';

const GachaPage = () => {
  const { bannerID } = useParams();
  return(

  <div>
    <main>
      bannerID = {bannerID}
    </main>
  </div>
  );
}


export default GachaPage;
