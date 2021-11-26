import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

import RemoveMovie from './Movies/RemoveMovie';
import CinemaMovies from "./Movies/CinemaMovies";
import CinemaRooms from "./Rooms/CinemaRooms";
import CinemaScreenings from './Screenings/CinemaScreenings';
import PageNotFound from './PageNotFound';
import MovieDetails from './Movies/MovieDetails.js'
import EditMovie from './Movies/EditMovie';

class App extends React.Component {
    constructor(props) 
    {
      super(props);
      this.state = {
        Screenings: [
          {
            screeningsDates: "20.11.2021",
            screeningsHours: "19:10",
            screeningsMoviesId: 0,
            roomId: 0, 
            roomsOccupations: [10, 11, 12, 14],
          },
          {
            screeningsDates: "21.11.2021",
            screeningsHours: "20:30",
            screeningsMoviesId: 1,
            roomId: 1, 
            roomsOccupations: [1, 2, 3, 4, 5],
          },
          {
            screeningsDates: "22.11.2021",
            screeningsHours: "16:00",
            screeningsMoviesId: 2,
            roomId: 2, 
            roomsOccupations: [20, 21, 22, 23, 24],
          },
        ],

        Movies: [
          { 
            movieTitle: "The Conjuring",
            movieDuration: 112,
            movieDesc: "Short movie descripton..."
          },
          {
            movieTitle: "Rampage",
            movieDuration: 107,
            movieDesc: "Short movie descripton..."
          },
          {
            movieTitle: "Tenet",
            movieDuration: 150,
            movieDesc: "Short movie descripton..."
          },
        ],

        Rooms: [
          {
            roomNumber: 101,
            roomCapacity: 50,
          },
          {
            roomNumber: 104,
            roomCapacity: 80,
          },
          {
            roomNumber: 109,
            roomCapacity: 100
          },
        ]
      }
    }

    editMovie = (movie) => {
      let id = movie.movieId;
      let movies =  this.state.Movies;
      movies[id].movieTitle = movie.movieTitle;
      movies[id].movieDesc = movie.movieDesc;
      movies[id].movieDuration = movie.movieDuration;

      this.setState(prevState => {
        return {
          Screenings: prevState.Screenings,
          Movies: movies,
          Rooms: prevState.Rooms
        };
      });
    }

    removeMovie = (movie) => {
      this.setState(prevState => {
        let list = prevState.Movies;

        list = list.filter(element => element != movie)
        console.log(list);
        return {
          Movies: list
        };
      });
    }

    render() {

      return ( 
        <div id="mainPanel">
        <Link to = "/ticket" > <button> Buy a Ticket </button> </Link >
        <Link to = "/movies" > < button > Movies </button> </Link >
        <Link to = "/screeings" > < button > Screenings </button> </Link >

        <Routes>
          <Route path="/" element={<div>Main</div>} />

          <Route path="movies">
            <Route path="" element={<CinemaMovies data={ this.state } />} />
            <Route path=":id" element = {<MovieDetails movies={ this.state.Movies } /> } />
            <Route path=":id/edit" element={<EditMovie editMovie={this.editMovie} movies={this.state.Movies} />} />
            <Route path=":id/remove" element={<RemoveMovie removeMovie={this.removeMovie} movies={this.state.Movies} />} />
          </Route>

          <Route path="/screeings" element = {< CinemaScreenings screenings = { this.state.Screenings } /> } />
          <Route path="/rooms" element = {< CinemaRooms data = { this.state.Rooms } /> } />
          <Route path="*" element = {< PageNotFound />}/> 
        </Routes>
        </div>
      );
    }
}

export default App;