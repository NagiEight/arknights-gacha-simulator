import React from 'react';
import ApiTray from '../components/ApiTray';

function Homepage() {
  return (
    <>
      <div style={{ padding: '2rem' }}>
        <h1>Homepage</h1>
        <p>Welcome to the Vite-powered React app!</p>
      </div>
      <ApiTray></ApiTray>
    </>
  );
}

export default Homepage;
