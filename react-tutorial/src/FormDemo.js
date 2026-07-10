import React, { useState } from 'react';

function FormDemo() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    gender: '',
    interests: [],
    country: '',
    terms: false
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Handle checkbox
    if (type === 'checkbox') {
      if (name === 'terms') {
        setFormData(prev => ({ ...prev, [name]: checked }));
      } else {
        // Handle multiple checkboxes (interests)
        if (checked) {
          setFormData(prev => ({
            ...prev,
            interests: [...prev.interests, value]
          }));
        } else {
          setFormData(prev => ({
            ...prev,
            interests: prev.interests.filter(item => item !== value)
          }));
        }
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    
    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData.gender) {
      newErrors.gender = 'Please select a gender';
    }
    
    if (formData.interests.length === 0) {
      newErrors.interests = 'Please select at least one interest';
    }
    
    if (!formData.country) {
      newErrors.country = 'Please select a country';
    }
    
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      setSubmitted(true);
      console.log('Form data:', formData);
      // You would typically send this to an API
    }
  };

  const handleReset = () => {
    setFormData({
      username: '',
      email: '',
      password: '',
      gender: '',
      interests: [],
      country: '',
      terms: false
    });
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div>
        <h3>✅ Form Submitted Successfully!</h3>
        <p>Welcome, {formData.username}!</p>
        <button onClick={handleReset}>Submit Another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <h3>Registration Form</h3>
      
      {/* Text Input */}
      <div>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter username"
        />
        {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
      </div>

      {/* Email Input */}
      <div>
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
        />
        {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
      </div>

      {/* Password Input */}
      <div>
        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />
        {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
      </div>

      {/* Radio Buttons */}
      <div>
        <label>Gender:</label>
        <div>
          <label>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === 'male'}
              onChange={handleChange}
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === 'female'}
              onChange={handleChange}
            />
            Female
          </label>
          <label>
            <input
              type="radio"
              name="gender"
              value="other"
              checked={formData.gender === 'other'}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        {errors.gender && <span style={{ color: 'red' }}>{errors.gender}</span>}
      </div>

      {/* Checkboxes */}
      <div>
        <label>Interests:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="coding"
              checked={formData.interests.includes('coding')}
              onChange={handleChange}
            />
            Coding
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="reading"
              checked={formData.interests.includes('reading')}
              onChange={handleChange}
            />
            Reading
          </label>
          <label>
            <input
              type="checkbox"
              name="interests"
              value="gaming"
              checked={formData.interests.includes('gaming')}
              onChange={handleChange}
            />
            Gaming
          </label>
        </div>
        {errors.interests && <span style={{ color: 'red' }}>{errors.interests}</span>}
      </div>

      {/* Select Dropdown */}
      <div>
        <label>Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
        >
          <option value="">Select a country</option>
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="ca">Canada</option>
          <option value="in">India</option>
        </select>
        {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
      </div>

      {/* Terms Checkbox */}
      <div>
        <label>
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
          />
          I accept the terms and conditions
        </label>
        {errors.terms && <span style={{ color: 'red' }}>{errors.terms}</span>}
      </div>

      {/* Form Actions */}
      <div>
        <button type="submit">Register</button>
        <button type="button" onClick={handleReset}>Reset</button>
      </div>
    </form>
  );
}

export default FormDemo;