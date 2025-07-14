import React, { useState } from 'react';

const ApiTray = () => {
    const [inputValue, setInputValue] = useState('');

    const handleClick = () => {
        console.log('Button clicked. Input value:', inputValue);
        //trigger your API logic here
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value..."
                style={{ padding: '8px', fontSize: '1rem' }}
            />
            <button onClick={handleClick} style={{ padding: '8px 12px' }}>
                Submit
            </button>
        </div>
    );
};

export default ApiTray;
