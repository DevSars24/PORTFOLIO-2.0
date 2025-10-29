// src/hooks/useProjectStats.js
import { useLocalStorage } from './useLocalStorage';
import { Heart, Eye } from 'lucide-react'; // From lucide-react

export const useProjectStats = (projectId) => {
  const [views, setViews] = useLocalStorage(`views-${projectId}`, 0);
  const [likes, setLikes] = useLocalStorage(`likes-${projectId}`, 0);
  const [isLiked, setIsLiked] = useState(false);

  // Check if liked on mount
  useEffect(() => {
    const likedItems = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    setIsLiked(likedItems.includes(projectId));
  }, [projectId]);

  const incrementViews = () => setViews(views + 1);

  const toggleLike = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setLikes(newLiked ? likes + 1 : likes);

    const likedItems = JSON.parse(localStorage.getItem('likedProjects') || '[]');
    const updated = newLiked 
      ? [...likedItems, projectId] 
      : likedItems.filter(id => id !== projectId);
    localStorage.setItem('likedProjects', JSON.stringify(updated));
  };

  return { views, likes, isLiked, incrementViews, toggleLike };
};