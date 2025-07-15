import { useState } from 'react';

const PullButtonCustom = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const openPopup = () => setIsPopupOpen(true);
    const handleConfirm = () => {
        console.log(`you've chosen ${inputValue}`);
        setIsPopupOpen(false);
        setInputValue('');
    };

    return (
        <>
            <button
                onClick={openPopup}
                className="relative px-6 py-3 font-bold text-white uppercase tracking-wider border border-white shadow hover:scale-105 transition-transform bg-[repeating-linear-gradient(45deg,#FFFFFF,#FFFFFF_10px,#1f2937_10px,#1f2937_20px)]"
            >
                <div className="text-white bg-black text-lg">pull xcustom</div>
            </button>

            {isPopupOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setIsPopupOpen(false)} // Close on backdrop click
                >
                    <div
                        className="bg-gray-900/50 p-6 flex items-center gap-2"
                        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                    >
                        <input
                            type="number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                            className="border border-gray-300 px-3 py-2 w-[200px] text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter number"
                        />
                        <button
                            onClick={handleConfirm}
                            className="text-gray-500 bg-gray-200 hover:bg-white px-4 py-2 text-lg font-bold"
                        >
                            &gt;
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default PullButtonCustom;
