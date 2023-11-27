import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useSetting = (id) => {
  // get and check if product exists in store
  const storeSetting = useSelector((state) => state.settings.items.find((item) => item.id === id));

  const [setting, setSetting] = useState(storeSetting);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!setting || setting.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleSetting(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setSetting(data);
              setLoading(false);
            }
          } else {
            setError('Setting not found.');
          }
        }
      } catch (err) {
        if (didMount) {
          setLoading(false);
          setError(err?.message || 'Something went wrong.');
        }
      }
    })();
  }, [id]);

  return { setting, isLoading, error };
};

export default useSetting;
