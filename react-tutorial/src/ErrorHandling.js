import React, { useState } from 'react';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', backgroundColor: '#ffebee', color: '#c62828' }}>
          <h3>Something went wrong</h3>
          <details>
            <summary>Error details</summary>
            <pre>{this.state.error?.message}</pre>
          </details>
          <button onClick={() => this.setState({ hasError: false, error: null })}>
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Component that might cause error
const ErrorProneComponent = () => {
  const [shouldError, setShouldError] = useState(false);

  if (shouldError) {
    throw new Error('This is a test error!');
  }

  return (
    <div>
      <p>This component is working fine</p>
      <button onClick={() => setShouldError(true)}>
        Trigger Error
      </button>
    </div>
  );
};

// API Error Handling Component
function ApiErrorHandling() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [retryCount, setRetryCount] = useState(0);

  const fetchDataWithRetry = async (retries = 3) => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with random failure
      const response = await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() < 0.5) { // 50% chance of failure
            reject(new Error('Network error: Failed to fetch data'));
          } else {
            resolve({
              ok: true,
              json: () => Promise.resolve({ message: 'Success!', data: [1, 2, 3] })
            });
          }
        }, 1500);
      });
      
      const result = await response.json();
      setData(result);
      setRetryCount(0);
    } catch (err) {
      if (retries > 0) {
        // Retry with exponential backoff
        const delay = Math.pow(2, 3 - retries) * 1000;
        console.log(`Retrying... (${retries} attempts left, delay: ${delay}ms)`);
        setTimeout(() => {
          fetchDataWithRetry(retries - 1);
        }, delay);
        setRetryCount(prev => prev + 1);
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h4>API Error Handling</h4>
      <button onClick={() => fetchDataWithRetry()}>
        Fetch Data (may fail)
      </button>
      
      {loading && <p>Loading... (Attempt {retryCount + 1})</p>}
      
      {error && (
        <div style={{ backgroundColor: '#ffebee', padding: '15px', margin: '10px 0' }}>
          <p>Error: {error}</p>
          <button onClick={() => fetchDataWithRetry()}>Retry</button>
        </div>
      )}
      
      {data && (
        <div style={{ backgroundColor: '#e8f5e9', padding: '15px', margin: '10px 0' }}>
          <p>Data: {JSON.stringify(data)}</p>
        </div>
      )}
    </div>
  );
}

// Form Error Handling
const FormWithErrors = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    
    if (!validate()) {
      return;
    }
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.password === 'error') {
            reject(new Error('Invalid credentials'));
          } else {
            resolve();
          }
        }, 1000);
      });
      alert('Form submitted successfully!');
    } catch (err) {
      setSubmitError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>Form with Error Handling</h4>
      
      <div>
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>
      
      <div>
        <input
          type="password"
          placeholder="Password (type 'error' to fail)"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>
      
      {submitError && (
        <div style={{ color: 'red' }}>
          Submit Error: {submitError}
        </div>
      )}
      
      <button type="submit">Submit</button>
    </form>
  );
};

// Main Component
function ErrorHandlingDemo() {
  return (
    <div>
      <h3>Error Handling</h3>
      
      <ErrorBoundary>
        <ErrorProneComponent />
      </ErrorBoundary>
      
      <ApiErrorHandling />
      <FormWithErrors />
    </div>
  );
}

export default ErrorHandlingDemo;