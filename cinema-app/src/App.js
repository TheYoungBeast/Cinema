import './App.css';
import {
  Route,
  Routes,
  Link
} from 'react-router-dom';
import CinemaMovies from "./CinemaMovies";
import CinemaRooms from "./CinemaRooms";
import PageNotFound from './PageNotFound';
import MovieDetails from './MovieDetails.js'
import React from 'react';

class App extends React.Component {
    // return <div key="app-return">
    //   { props.data.screeningsDates.map((value, index) => {
    //     return <div key={"app-return-data" + index}>
    //       <p>
    //         <label>Date </label>
    //         {value}
    //       </p>
    //       <p>
    //         <label>Time </label>
    //         {props.data.screeningsHours[index]}
    //       </p>
    //       <p>
    //         <label> Index </label>
    //         {props.data.screeningsMoviesId[index]}
    //       </p>
    //       <p>
    //         <label> Room Occupation </label>
    //         {props.data.roomsOccupations[index].map((v) => {
    //           return v.toString() + " ,";
    //         })}
    //       </p>
    //       </div>
    //   }) }
    // </div>
    constructor(props) {
      super(props);
      this.state = {
        Sreenings: {
          screeningsDates: ["20.11.2021", "21.11.2021", "22.11.2021"],
          screeningsHours: ["19:10", "20:30", "16:00"],
          screeningsMoviesId: [0, 1, 2],
          roomId: [0, 1, 2],
          roomsOccupations: [
            [10, 11, 12, 14],
            [1, 2, 3, 4, 5],
            [20, 21, 22, 23, 24]
          ]
        },
        Movies: [
          { 
            movieTitle: "The Conjuring",
            movieDuration: 112,
          },
          {
            movieTitle: "Rampage",
            movieDuration: 107,
          },
          {
            movieTitle: "Tenet",
            movieDuration: 150,
          },
        ],
        Rooms: {
          roomNumber: [101, 104, 109],
          roomCapacity: [50, 80, 100],
        }
      }
    }
    render() {
      return ( 
        <div id="mainPanel">
        <Link to = "/Rooms" > <button> Rooms </button></Link >
        <Link to = "/Movies" > < button > Movies </button></Link >
        <Link to = "/Screeings" > < button > Screenings </button></Link >
        <Routes>
          <Route exact path = "/Movies" element = {< CinemaMovies data = { this.state } /> } />
          <Route exact path = "/Movies/:id" element = {< MovieDetails movies = { this.state.Movies } /> } />

          <Route exact path = "/Screeings" element = {< App data = { this.state } /> } />
          <Route exact path = "/Rooms" element = { < CinemaRooms data = { this.state } /> } />
          <Route exact path = "*" element = { < PageNotFound /> }/> 
        </Routes>
        </div>
      );
    }
}

export default App;