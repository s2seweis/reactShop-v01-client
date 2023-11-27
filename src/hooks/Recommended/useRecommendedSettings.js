import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import firebase from '../../services/firebase';

const useRecommendedSettings = (itemsCount) => {
  const [recommendedSettings, setRecommendedSettings] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const didMount = useDidMount(true);

  const fetchRecommendedSettings = async () => {
    try {
      setLoading(true);
      setError('');

      const docs = await firebase.getRecommendedSettings(itemsCount);

      if (docs.empty) {
        if (didMount) {
          setError('No recommended settings found.');
          setLoading(false);
        }
      } else {
        const items = [];

        docs.forEach((snap) => {
          const data = snap.data();
          items.push({ id: snap.ref.id, ...data });
        });

        if (didMount) {
          setRecommendedSettings(items);
          setLoading(false);
        }
      }
    } catch (e) {
      if (didMount) {
        setError('Failed to fetch recommended settings');
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (recommendedSettings.length === 0 && didMount) {
      fetchRecommendedSettings();
    }
  }, []);


  return {
    recommendedSettings, fetchRecommendedSettings, isLoading, error
  };
};

export default useRecommendedSettings;
