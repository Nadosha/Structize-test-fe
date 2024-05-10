import React from 'react';

import ErrorBoundary from '@Components/ErrorBoundary/ErrorBoundary';
import BasicLayout from '@Components/UI/BasicLayout/BasicLayout';

// add bootstrap css
import 'bootstrap/dist/css/bootstrap.css';
// custom css files here
import '@Styles/index.scss';

import 'bootstrap-icons/font/bootstrap-icons.css';
import { Provider } from 'react-redux';
import store from '@Redux/store';

const App = ({ Component, pageProps }: any) => {
  return (
    <ErrorBoundary>
      <BasicLayout>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </BasicLayout>
    </ErrorBoundary>
  );
};
export default App;
