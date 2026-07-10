import React, { useState, useEffect } from 'react';

function ApiIntegration() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [postData, setPostData] = useState({
    title: '',
    body: '',
    userId: 1
  });

  // GET request
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result.slice(0, 5)); // Get first 5 posts
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // POST request
  const createPost = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData([result, ...data]);
      setPostData({ title: '', body: '', userId: 1 });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // DELETE request
  const deletePost = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      setData(data.filter(item => item.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // PUT request (update)
  const updatePost = async (id) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...postData,
          title: 'Updated: ' + postData.title
        })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(data.map(item => 
        item.id === id ? { ...item, ...result } : item
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>API Integration</h3>
      
      {/* Create Form */}
      <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
        <h4>Create New Post</h4>
        <input
          type="text"
          placeholder="Title"
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Body"
          value={postData.body}
          onChange={(e) => setPostData({ ...postData, body: e.target.value })}
        />
        <button onClick={createPost}>Create Post</button>
      </div>

      {/* Display Data */}
      <div>
        <button onClick={fetchData}>Refresh Data</button>
        {data.map((post) => (
          <div key={post.id} style={{ 
            border: '1px solid #ddd', 
            padding: '10px', 
            margin: '10px 0'
          }}>
            <h4>{post.title}</h4>
            <p>{post.body}</p>
            <button onClick={() => deletePost(post.id)}>Delete</button>
            <button onClick={() => updatePost(post.id)}>Update</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ApiIntegration;