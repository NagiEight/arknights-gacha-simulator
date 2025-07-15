// BorderOverlay.jsx
import { useEffect, useState } from 'react';

const BorderOverlay = ({ trigger }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (trigger) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 1000); // 1s animation
            return () => clearTimeout(timer);
        }
    }, [trigger]);

    return (
        visible && (
            <div className="fixed inset-0 z-50 pointer-events-none">
                <div className="absolute inset-0 border-2 border-white animate-borderFlash" />
            </div>
        )
    );
};

export default BorderOverlay;
