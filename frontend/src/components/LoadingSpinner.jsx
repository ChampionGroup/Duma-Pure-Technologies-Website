import React from 'react';

const LoadingSpinner = () => {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      width: '100%',
      position: 'fixed',
      top: 0,
      left: 0,
      backgroundColor: 'var(--text-color)',
      zIndex: 9999
    }}>
      <l-spiral
        size="40"
        speed="0.9"
        color="var(--secondary-color)"
      ></l-spiral>
    </div>
  );
};

export default LoadingSpinner;
