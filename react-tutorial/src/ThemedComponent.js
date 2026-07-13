// File: src/ThemedComponent.js
import React from 'react';
import { useTheme, useSettings } from './context/ThemeContext'; 

const ThemedComponent = () => {
  const { theme, toggleTheme } = useTheme();
  const { settings, updateSettings } = useSettings();

  // Font size mapping
  const fontSizeMap = {
    small: '14px',
    medium: '18px',
    large: '24px'
  };

  const currentFontSize = fontSizeMap[settings.fontSize] || fontSizeMap.medium;

  const styles = {
    light: {
      backgroundColor: '#ffffff',
      color: '#000000',
      padding: '20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    },
    dark: {
      backgroundColor: '#333333',
      color: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      transition: 'all 0.3s ease'
    }
  };

  const languageMap = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    hi: 'Hindi'
  };

  return (
    <div style={{ ...styles[theme], fontSize: currentFontSize }}>
      <h2 style={{ marginBottom: '15px' }}>🎨 Themed Component</h2>
      
      <div style={{ 
        display: 'grid', 
        gap: '10px',
        marginBottom: '20px'
      }}>
        <p><strong>Current Theme:</strong> {theme === 'light' ? '☀️ Light' : '🌙 Dark'}</p>
        <p><strong>Font Size:</strong> {settings.fontSize} ({currentFontSize})</p>
        <p><strong>Language:</strong> {languageMap[settings.language] || settings.language}</p>
        <p><strong>Notifications:</strong> {settings.notifications ? '🔔 On' : '🔕 Off'}</p>
      </div>
      
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        flexWrap: 'wrap',
        marginBottom: '20px'
      }}>
        <button 
          onClick={toggleTheme}
          style={{
            padding: '10px 20px',
            backgroundColor: theme === 'light' ? '#333' : '#fff',
            color: theme === 'light' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          {theme === 'light' ? '🌙 Switch to Dark' : '☀️ Switch to Light'}
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gap: '15px',
        padding: '15px',
        backgroundColor: theme === 'light' ? '#f5f5f5' : '#444',
        borderRadius: '4px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Font Size:
          </label>
          <select 
            value={settings.fontSize}
            onChange={(e) => updateSettings({ fontSize: e.target.value })}
            style={{
              padding: '8px 12px',
              width: '100%',
              maxWidth: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'light' ? '#fff' : '#555',
              color: theme === 'light' ? '#000' : '#fff'
            }}
          >
            <option value="small">Small (14px)</option>
            <option value="medium">Medium (18px)</option>
            <option value="large">Large (24px)</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
            Language:
          </label>
          <select 
            value={settings.language}
            onChange={(e) => updateSettings({ language: e.target.value })}
            style={{
              padding: '8px 12px',
              width: '100%',
              maxWidth: '200px',
              borderRadius: '4px',
              border: '1px solid #ccc',
              backgroundColor: theme === 'light' ? '#fff' : '#555',
              color: theme === 'light' ? '#000' : '#fff'
            }}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
            <option value="de">Deutsch</option>
            <option value="hi">हिन्दी</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSettings({ notifications: e.target.checked })}
              style={{ width: '18px', height: '18px' }}
            />
            <span>Enable Notifications</span>
          </label>
        </div>
      </div>

      {/* Preview text */}
      <div style={{ 
        marginTop: '20px',
        padding: '15px',
        border: `2px dashed ${theme === 'light' ? '#ccc' : '#666'}`,
        borderRadius: '4px'
      }}>
        <h3>📝 Preview Text</h3>
        <p style={{ fontSize: currentFontSize }}>
          This text demonstrates the current font size: {currentFontSize}
        </p>
      </div>
    </div>
  );
};

export default ThemedComponent;