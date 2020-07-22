import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import { Router, Route, browserHistory } from 'react-router';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'font-awesome/css/font-awesome.min.css';

import App from './components/App';

import reducers from './reducers/employeeReducer';

const middleware = [promise(), thunk, loadingBarMiddleware({
  promiseTypeSuffixes: ['START', 'SUCCESS', 'ERROR'],
})];
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger());
}
const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory}>
      <Route path="/" component={App} />
    </Router>
  </Provider>
  , document.getElementById('employee-list-root'));
