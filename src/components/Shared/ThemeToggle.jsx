import { useEffect, useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') ? localStorage.getItem('theme') : 'light'
  );

  const handleToggle = (e) => {
    if (e.target.checked) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  return (
    <label className="swap swap-rotate btn btn-ghost btn-circle">
      <input 
        type="checkbox" 
        onChange={handleToggle}
        checked={theme === 'dark'} 
      />
      
      <FaSun className="swap-off fill-current w-6 h-6" />
      
      <FaMoon className="swap-on fill-current w-6 h-6" />
    </label>
  );
};

export default ThemeToggle;