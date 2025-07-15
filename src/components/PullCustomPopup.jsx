import { useState } from 'react';

export default function NumberPopup() {
    const [isOpen, setIsOpen] = useState(true);
    const [inputValue, setInputValue] = useState('');

    const handleConfirm = () => {
        console.log(`you've chosen ${inputValue}`);
        setIsOpen(false);
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center z-50">
                <div className="bg-gray-900/50 p-6 flex items-center gap-2">
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleConfirm()}
                        className="border border-gray-300 px-3 py-2 w-32 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter number"
                    />
                    <button
                        onClick={handleConfirm}
                        className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-lg font-bold"
                    >
                        &gt;
                    </button>
                </div>
            </div>
        )
    );
}
