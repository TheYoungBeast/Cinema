import './css/index.css';

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore, applyMiddleware} from 'redux';
import { connect, Provider } from 'react-redux';
import reducers from './reducers';
import thunk from 'redux-thunk';

import * as Actions from './actions/actions';

import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'; 

import App from './App';

const store = createStore(reducers, applyMiddleware(thunk));

const mapStateToProps = (state) => {
  return {...state};
};

const mapDispatchToProps = (dispatch) => ({
  fetchData: () => dispatch(Actions.fetchData()),
  addMovie: (movie) => dispatch(Actions.addMovie(movie)),
  editMovie: (movie, id) => dispatch(Actions.editMovie(movie, id)),
  removeMovie: (id) => dispatch(Actions.removeMovie(id)),
  addRoom: (room) => dispatch(Actions.addRoom(room)),
  editRoom: (room, id) => dispatch(Actions.editRoom(room, id)),
  removeRoom: (id) => dispatch(Actions.removeRoom(id)),
  addScreening: (screening) => dispatch(Actions.addScreening(screening)),
  editScreening: (screening, id) => dispatch(Actions.editScreening(screening, id)),
  removeScreening: (id) => dispatch(Actions.removeScreening(id))
});

const AppRedux = connect(mapStateToProps, mapDispatchToProps)(App);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Provider store={store}>
        <AppRedux />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
