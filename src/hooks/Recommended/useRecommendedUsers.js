import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from '../../services/firebase';

const useRecommendedUsers = (itemsCount) => {
  const [recommendedUsers, setRecommendedUsers] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchRecommendedUsers = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getRecommendedUsers(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No recommended users found.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setRecommendedUsers(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch recommended users');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (recommendedUsers.length === 0 && didMount) {
      fetchRecommendedUsers();
    }
  }, []);


  return {
    recommendedUsers, fetchRecommendedUsers, isLoading, error
  };
};

export default useRecommendedUsers;