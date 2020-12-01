import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'fontsource-roboto';
import {createStore} from 'redux';
import {Provider} from 'react-redux';

const initial_state={
  variables:{}
};

function reducer(state=initial_state , action){
    // console.log(action);
    switch(action.type){
      case "add":
        if(!(action.name in state.variables)){
            return {...state,variables:{...state.variables,[action.name]:action.value}}
        }
        return state;
      case "delete":
        const new_state = {...state,variables:{...state.variables,[action.name]:{}}};
        delete new_state.variables[action.name];
        return new_state;
      case "update":
        return {...state,variables:{...state.variables,[action.name]:action.value}}
      default:
        return state;
    }
}

const store = createStore(reducer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
