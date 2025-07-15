import PullButtonTen from './PullButtonTen.jsx';
import PullButtonOne from './PullButtonOne.jsx';
import PullButtonCustom from './PullButtonCustom.jsx';

const PullButtons = () => (
    <div className="lg:absolute bottom-0 sm:p-5 md:p-5 lg:p-0 lg:right-9">
        <div className="grid-cols-3 flex lg:flex-row-reverse gap-4">
            <PullButtonTen onClick={() => console.log('Pulled x10')} />
            <PullButtonOne onClick={() => console.log('Pulled x1')} />
            <PullButtonCustom />
        </div>
    </div>
);

export default PullButtons;
