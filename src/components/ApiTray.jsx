import React, { useState, useEffect } from 'react';

const ApiTray = () => {
    const [url, setUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [database, setDB] = useState(null);

    const handleFetch = () => {
        try {
            setErrorMessage("");
            setDB(null);

            const githubAPI = (PATHNAME) =>
                `https://api.github.com/repos${PATHNAME}/trees/main`;
            const defaultDB = ""; //our default git db goes here
            let currentUrl = defaultDB;
            
            if(url) {
                currentUrl = url;
            }
            const gitURL = new URL(currentUrl.pathname);

            fetch(githubAPI(gitURL.pathname))
            .then(res => {
                if(!res.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return res.json();
            })
            .then((data) => {
                setDB(data);
            });
        }
        catch(error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
                type="text"
                onChange={event => setUrl(event.target.value)}
                defaultValue={""} //<= our default git database goes here
                placeholder="https://github.com/{yourUsername}/{yourDBRepoName}"
                style={{ padding: '8px', fontSize: '1rem' }}
            />
            <button onClick={handleFetch} style={{ padding: '8px 12px' }}>
                Submit
            </button>
        </div>
    );
};

export default ApiTray;
