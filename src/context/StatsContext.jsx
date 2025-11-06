// src/context/StatsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) throw new Error('useStats must be used within a StatsProvider');
  return context;
};

export const StatsProvider = ({ children }) => {
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load locally stored values
    const savedLikes = parseInt(localStorage.getItem('totalPortfolioLikes') || '0', 10);
    const savedViews = parseInt(localStorage.getItem('totalPortfolioViews') || '0', 10);
    setTotalLikes(savedLikes);
    setTotalViews(savedViews);

    // Only count one view per session
    if (!sessionStorage.getItem('viewedToday')) {
      sessionStorage.setItem('viewedToday', 'true');
      const newViews = savedViews + 1;
      setTotalViews(newViews);
      localStorage.setItem('totalPortfolioViews', newViews.toString());
    }

    setLoading(false);
  }, []);

  const incrementLikes = () => {
    if (localStorage.getItem('portfolioLiked')) return;
    localStorage.setItem('portfolioLiked', 'true');
    const newLikes = totalLikes + 1;
    setTotalLikes(newLikes);
    localStorage.setItem('totalPortfolioLikes', newLikes.toString());
  };

  return (
    <StatsContext.Provider
      value={{ totalLikes, totalViews, incrementLikes, loading }}
    >
      {children}
    </StatsContext.Provider>
  );
};
