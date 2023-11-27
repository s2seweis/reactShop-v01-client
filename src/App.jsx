/* eslint-disable react/forbid-prop-types */
import { Preloader } from 'components/common';
import PropType from 'prop-types';
import React, { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRouter from 'routers/AppRouter';
import { ProSidebarProvider } from 'react-pro-sidebar';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51MSB2wIlCEHks7DgasuuHAllQvZd4jicmn6wWE2y7PaMEKfZmA8EHRMYL0w7nwiQ3XX45OKlICGcX4VYbENIpHCp00hdOnSYPY');

const App = ({ store, persistor }) => {

  return (
    <Elements stripe={stripePromise} >
      <ProSidebarProvider>
        <StrictMode>
          <Provider store={store}>
            <PersistGate loading={<Preloader />} persistor={persistor}>
              <AppRouter />
            </PersistGate>
          </Provider>
        </StrictMode>
      </ProSidebarProvider>
    </Elements>
  );
};

App.propTypes = {
  store: PropType.any.isRequired,
  persistor: PropType.any.isRequired
};

export default App;
