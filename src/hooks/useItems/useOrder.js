import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useOrder = (id) => {
  // get and check if menu exists in store
  const storeOrder = useSelector((state) => state.orders.items.find((item) => item.id === id));

  const [order, setOrder] = useState(storeOrder);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!order || order.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleOrder(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setOrder(data);
              setLoading(false);
            }
          } else {
            setError('Order not found.');
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

  return { order, isLoading, error };
};

export default useOrder;
