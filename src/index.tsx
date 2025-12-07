import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import {testOffers} from './mocks/offer.ts';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffers} from './store/api-action.ts';


store.dispatch(fetchOffers());
// store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={testOffers}/>
    </Provider>
  </React.StrictMode>
);
