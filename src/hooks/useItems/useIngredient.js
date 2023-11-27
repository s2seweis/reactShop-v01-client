import { useDidMount } from 'hooks';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import firebase from 'services/firebase';

const useIngredient = (id) => {
  // get and check if product exists in store
  const storeIngredient = useSelector((state) => state.ingredients.items.find((item) => item.id === id));

  const [ingredient, setIngredient] = useState(storeIngredient);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const didMount = useDidMount(true);

  useEffect(() => {
    (async () => {
      try {
        if (!ingredient || ingredient.id !== id) {
          setLoading(true);
          const doc = await firebase.getSingleIngredient(id);

          if (doc.exists) {
            const data = { ...doc.data(), id: doc.ref.id };

            if (didMount) {
              setIngredient(data);
              setLoading(false);
            }
          } else {
            setError('Ingredient not found.');
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

  return { ingredient, isLoading, error };
};

export default useIngredient;
