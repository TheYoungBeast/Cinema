import './App.css';

import React from 'react';

function App(props) {
  return <div key="app-return">
    { props.data.screeningsDates.map((value, index) => {
      return <div key={"app-return-data" + index}>
        <p>
          <label>Date </label>
          {value}
        </p>
        <p>
          <label>Time </label>
          {props.data.screeningsHours[index]}
        </p>
        <p>
          <label> Index </label>
          {props.data.screeningsMoviesId[index]}
        </p>
        <p>
          <label> Room Occupation </label>
          {props.data.roomsOccupations[index].map((v) => {
            return v.toString() + " ,";
          })}
        </p>
        </div>
    }) }
  </div>
}

export default App;
