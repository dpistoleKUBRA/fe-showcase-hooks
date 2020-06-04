import React from 'react';
import {
  createStore,
  applyMiddleware,
} from "redux";
import thunk from "redux-thunk";
import {
  composeWithDevTools,
} from "redux-devtools-extension";
import { Provider } from "react-redux";
import {
  render,
} from 'react-dom';


import App from './apps/000-ClassComponent';
// import App from './apps/001-BasicHooks';

const initialState = {
  widgetsById: {},
  getWidgetsStatus: 'EMPTY',
}

const reducer = (state = initialState, action) => {
  switch(action.type) {
    case "GET_WIDGETS_REQUEST": {
      return Object.assign({}, state, {
        getWidgetsStatus: 'IN_PROGRESS',
      });
    }
    case "GET_WIDGETS_SUCCESS": {
      return Object.assign({}, state, {
        widgetsById: action.data,
        getWidgetsStatus: 'DONE',
      });
    }
    case "GET_WIDGETS_FAILURE": {
      return Object.assign({}, state, {
        getWidgetsStatus: 'ERROR',
      });
    }
    default:
      return state;
  }
}

const store = createStore(reducer, composeWithDevTools(
  applyMiddleware(thunk)
));

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)