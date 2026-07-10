import React, { useState, useEffect } from 'react';

// Loading Component - NOW USED!
const Spinner = () => (
  <div className="spinner" style={{ textAlign: 'center' }}>
    <div style={{
      width: '40px',
      height: '40px',
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #3498db',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '20px auto'
    }} />
    <p>Loading...</p>
    <style>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// Skeleton Loader
const SkeletonLoader = () => (
  <div style={{ padding: '20px' }}>
    <div style={{ 
      height: '30px', 
      backgroundColor: '#f0f0f0', 
      margin: '10px 0',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite'
    }} />
    <div style={{ 
      height: '60px', 
      backgroundColor: '#f0f0f0', 
      margin: '10px 0',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite 0.5s'
    }} />
    <div style={{ 
      height: '40px', 
      backgroundColor: '#f0f0f0', 
      margin: '10px 0',
      borderRadius: '4px',
      animation: 'pulse 1.5s ease-in-out infinite 1s'
    }} />
    <style>{`
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.5; }
        100% { opacity: 1; }
      }
    `}</style>
  </div>
);

function LoadingStates() {
  const [loading, setLoading] = useState({
    initial: true,
    fetch: false,
    update: false,
    spinner: false // New loading state for spinner demo
  });
  const [data, setData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [spinnerData, setSpinnerData] = useState(null);

  // Simulate initial load
  useEffect(() => {
    setTimeout(() => {
      setLoading(prev => ({ ...prev, initial: false }));
    }, 2000);
  }, []);

  // Simulate progress loading
  useEffect(() => {
    if (loading.update) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLoading(prev => ({ ...prev, update: false }));
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [loading.update]);

  const fetchData = () => {
    setLoading(prev => ({ ...prev, fetch: true }));
    
    setTimeout(() => {
      setData([
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
        { id: 3, title: 'Post 3', content: 'Content 3' }
      ]);
      setLoading(prev => ({ ...prev, fetch: false }));
    }, 2000);
  };

  const updateData = () => {
    setLoading(prev => ({ ...prev, update: true }));
    setProgress(0);
    
    setTimeout(() => {
      // Update complete
    }, 3000);
  };

  // New function to demonstrate spinner
  const fetchWithSpinner = () => {
    setLoading(prev => ({ ...prev, spinner: true }));
    setSpinnerData(null);
    
    setTimeout(() => {
      setSpinnerData({
        message: 'Data loaded successfully!',
        timestamp: new Date().toLocaleString(),
        items: ['Item 1', 'Item 2', 'Item 3', 'Item 4']
      });
      setLoading(prev => ({ ...prev, spinner: false }));
    }, 3000);
  };

  if (loading.initial) {
    return (
      <div>
        <h3>Loading States Demo</h3>
        <p>Initial load with Skeleton Loader...</p>
        <SkeletonLoader />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h3>Loading States Demo</h3>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        
        {/* Button Loading State */}
        <div style={{ 
          flex: '1 1 300px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <h4>1. Button Loading</h4>
          <button 
            onClick={fetchData} 
            disabled={loading.fetch}
            style={{
              padding: '10px 20px',
              backgroundColor: loading.fetch ? '#ccc' : '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading.fetch ? 'not-allowed' : 'pointer'
            }}
          >
            {loading.fetch ? 'Loading...' : 'Fetch Data'}
          </button>
          {loading.fetch && <Spinner />}
          {!loading.fetch && data.length > 0 && (
            <div style={{ marginTop: '10px' }}>
              {data.map(item => (
                <div key={item.id} style={{
                  border: '1px solid #ddd',
                  padding: '10px',
                  margin: '5px 0',
                  borderRadius: '4px'
                }}>
                  <h5>{item.title}</h5>
                  <p>{item.content}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Progress Bar Loading */}
        <div style={{ 
          flex: '1 1 300px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <h4>2. Progress Bar</h4>
          <button 
            onClick={updateData}
            disabled={loading.update}
            style={{
              padding: '10px 20px',
              backgroundColor: loading.update ? '#ccc' : '#FF9800',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading.update ? 'not-allowed' : 'pointer'
            }}
          >
            {loading.update ? 'Updating...' : 'Update Data'}
          </button>
          {loading.update && (
            <div style={{ marginTop: '10px' }}>
              <div style={{
                width: '100%',
                height: '20px',
                backgroundColor: '#f0f0f0',
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${progress}%`,
                  height: '100%',
                  backgroundColor: '#4CAF50',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <p style={{ marginTop: '5px' }}>{progress}% Complete</p>
            </div>
          )}
        </div>

        {/* Skeleton Loading */}
        <div style={{ 
          flex: '1 1 300px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <h4>3. Skeleton Loading</h4>
          <button 
            onClick={fetchData}
            disabled={loading.fetch}
            style={{
              padding: '10px 20px',
              backgroundColor: loading.fetch ? '#ccc' : '#9C27B0',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading.fetch ? 'not-allowed' : 'pointer',
              marginBottom: '10px'
            }}
          >
            {loading.fetch ? 'Loading...' : 'Load with Skeleton'}
          </button>
          {loading.fetch ? (
            <SkeletonLoader />
          ) : (
            data.length > 0 && data.map(item => (
              <div key={item.id} style={{
                border: '1px solid #ddd',
                padding: '15px',
                margin: '10px 0',
                borderRadius: '4px'
              }}>
                <h5>{item.title}</h5>
                <p>{item.content}</p>
              </div>
            ))
          )}
        </div>

        {/* Spinner Loading - NOW USING THE SPINNER! */}
        <div style={{ 
          flex: '1 1 300px',
          padding: '15px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px'
        }}>
          <h4>4. Spinner Loading</h4>
          <button 
            onClick={fetchWithSpinner}
            disabled={loading.spinner}
            style={{
              padding: '10px 20px',
              backgroundColor: loading.spinner ? '#ccc' : '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: loading.spinner ? 'not-allowed' : 'pointer',
              marginBottom: '10px'
            }}
          >
            {loading.spinner ? 'Loading...' : 'Load with Spinner'}
          </button>
          
          {loading.spinner && <Spinner />}
          
          {spinnerData && !loading.spinner && (
            <div style={{
              padding: '15px',
              backgroundColor: '#e8f5e9',
              borderRadius: '4px',
              marginTop: '10px'
            }}>
              <p style={{ color: '#2e7d32', fontWeight: 'bold' }}>
                ✅ {spinnerData.message}
              </p>
              <p><strong>Timestamp:</strong> {spinnerData.timestamp}</p>
              <ul>
                {spinnerData.items.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Summary */}
      <div style={{ 
        marginTop: '30px',
        padding: '20px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        borderLeft: '4px solid #2196F3'
      }}>
        <h4>📚 Loading State Patterns Demonstrated:</h4>
        <ul>
          <li><strong>Spinner:</strong> Simple rotating loader (used in sections 1 and 4)</li>
          <li><strong>Skeleton Loader:</strong> Placeholder shapes that mimic content structure (used in section 3)</li>
          <li><strong>Progress Bar:</strong> Shows completion percentage (used in section 2)</li>
          <li><strong>Button Loading:</strong> Disabled state with loading text (used in section 1)</li>
        </ul>
        <p style={{ marginTop: '10px', color: '#666' }}>
          💡 Click each button to see different loading patterns in action!
        </p>
      </div>
    </div>
  );
}

export default LoadingStates;