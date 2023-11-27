import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useUser = (id) => {
  // get and check if user exists in store
  const storeUser = useSelector((state) => state.users.items.find((item) => item.id === id));

  const [user, setUser] = useState(storeUser);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!user || user.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleUser(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setUser(data);
              setLoading(false);
            }
          } else {
            setError('User not found.');
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

  return { user, isLoading, error };
};

export default useUser;