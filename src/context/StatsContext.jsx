// src/context/StatsContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';

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

  // REMOVED: Old enableIndexedDbPersistence useEffect (no longer needed—handled in firebase.js)

  // Fetch globals with safe create/update + retry
  useEffect(() => {
    const fetchStats = async (retries = 3) => {
      const statRef = doc(db, 'stats', 'portfolio');
      for (let i = 0; i < retries; i++) {
        try {
          const snap = await getDoc(statRef);
          if (snap.exists()) {
            const data = snap.data();
            setTotalLikes(data.likes || 0);
            setTotalViews(data.views || 0);
          } else {
            // Create doc if missing
            await setDoc(statRef, { likes: 0, views: 0 }, { merge: true });
            setTotalLikes(0);
            setTotalViews(0);
          }
          setLoading(false);
          return; // Success
        } catch (error) {
          console.error(`Fetch attempt ${i + 1} failed:`, error);
          if (i === retries - 1) {
            // Fallback to local
            setTotalLikes(parseInt(localStorage.getItem('totalPortfolioLikes') || '0', 10));
            setTotalViews(parseInt(localStorage.getItem('totalPortfolioViews') || '0', 10));
            setLoading(false);
          }
          await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
        }
      }
    };
    fetchStats();
  }, []);

  const incrementViews = async () => {
    if (sessionStorage.getItem('viewedToday')) return;
    sessionStorage.setItem('viewedToday', 'true');

    const statRef = doc(db, 'stats', 'portfolio');
    try {
      await setDoc(statRef, { views: increment(1) }, { merge: true });
      setTotalViews(prev => prev + 1);
    } catch (error) {
      console.error('View increment failed:', error);
      const newViews = parseInt(localStorage.getItem('totalPortfolioViews') || '0', 10) + 1;
      localStorage.setItem('totalPortfolioViews', newViews.toString());
      setTotalViews(newViews);
    }
  };

  const incrementLikes = async () => {
    if (localStorage.getItem('portfolioLiked')) return;
    localStorage.setItem('portfolioLiked', 'true');

    const statRef = doc(db, 'stats', 'portfolio');
    try {
      await setDoc(statRef, { likes: increment(1) }, { merge: true });
      setTotalLikes(prev => prev + 1);
    } catch (error) {
      console.error('Like increment failed:', error);
      const newLikes = parseInt(localStorage.getItem('totalPortfolioLikes') || '0', 10) + 1;
      localStorage.setItem('totalPortfolioLikes', newLikes.toString());
      setTotalLikes(newLikes);
    }
  };

  return (
    <StatsContext.Provider value={{ totalLikes, totalViews, incrementLikes, incrementViews, loading }}>
      {children}
    </StatsContext.Provider>
  );
};