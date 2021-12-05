import './css/App.css';

import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';

import CinemaMovies from "./Movies/CinemaMovies";
import AddMovie from './Movies/AddMovie';
import MovieDetails from './Movies/MovieDetails'
import EditMovie from './Movies/EditMovie';
import RemoveMovie from './Movies/RemoveMovie';

import CinemaRooms from "./Rooms/CinemaRooms";
import AddRoom from './Rooms/AddRoom';
import EditRoom from './Rooms/EditRoom';
import RoomDetails from './Rooms/RoomDetails';
import RemoveRoom from './Rooms/RemoveRoom';

import CinemaScreenings from "./Screenings/CinemaScreenings";
import ScreeningDetails from "./Screenings/ScreeningDetails";
import EditScreening from "./Screenings/EditScreening";
import RemoveScreening from "./Screenings/RemoveScreening";
import AddScreening from './Screenings/AddScreening';

import PageNotFound from './PageNotFound'

class App extends React.Component 
{
    componentDidMount() {
      this.props.fetchData();
    }

    addMovie = (movie) => {
      this.props.addMovie(movie);
    }

    editMovie = (editedMovie) => {
      let movie = Object.assign({}, editedMovie);
      let id = movie.movieId;
      delete movie.movieId;

      this.props.editMovie(movie, id);
    }

    removeMovie = (id) => {
      this.props.removeMovie(id);
    }

    addRoom = (room) => {
      this.props.addRoom(room);
    }

    editRoom = (editedRoom) => {
      let room = Object.assign({}, editedRoom);
      let { id } = room;
      delete room.id;

      this.props.editRoom(room, id);
    }

    removeRoom = (id) => {
      this.props.removeRoom(id);
    }

    addScreening = (screening) => {
      this.props.addScreening(screening);
    }

    editScreening = (editedScreening) => {
      let screening = Object.assign({}, editedScreening);
      let { id } = screening;
      delete screening.id;

      this.props.editScreening(screening, id);
    }

    removeScreening = (id) => {
      this.props.removeScreening(id);
    }

    render() {
      const state = this.props.CinemaReducer

      return state ? ( 
        <div id="mainPanel">
          <Link to="/"><button>Home</button></Link>
          <Link to = "/movies" >< button > Movies </button></Link >
          <Link to = "/screenings" >< button > Screenings </button></Link >
          <Link to="/rooms"><button> Rooms </button></Link>

          <Routes>
            <Route path="/" element={<div>Main</div>} />

            <Route path="movies">
              <Route path="" element={<CinemaMovies addMovie={ this.addMovie } data={ state } />} />
              <Route path="add" element={<AddMovie addMovie={ this.addMovie } />} />
              <Route path=":id">
                <Route path="" element = {<MovieDetails movies={ state.movies } /> } />
                <Route path="edit" element={<EditMovie editMovie={ this.editMovie } movies={ state.movies } />} />
                <Route path="remove" element={<RemoveMovie removeMovie={ this.removeMovie } movies={ state.movies } />} />
              </Route>
            </Route>

            <Route path="screenings">
              <Route path="" element={<CinemaScreenings screenings={ state.screenings } /> }/>
              <Route path="add" element={<AddScreening addScreening={ this.addScreening } />} />
              <Route path=":id">
                <Route path="" element={<ScreeningDetails { ...state } editScreening={ this.editScreening } /> }/>
                <Route path="edit" element={<EditScreening editScreening={ this.editScreening } /> } />
                <Route path="remove" element={<RemoveScreening removeScreening={ this.removeScreening } screenings = { state.screenings} /> } />
              </Route>
            </Route>

            <Route path="rooms">
              <Route path="" element={<CinemaRooms rooms={ state.rooms } />} />
              <Route path="add" element={<AddRoom addRoom={ this.addRoom } />} />
              <Route path=":id">
                <Route path="" element={<RoomDetails rooms={ state.rooms } />} />
                <Route path="edit" element={<EditRoom editRoom={ this.editRoom } rooms={ state.rooms } />} />
                <Route path="remove" element={<RemoveRoom removeRoom={ this.removeRoom } rooms={ state.rooms } />} />
              </Route>
            </Route>

            <Route path="*" element = {< PageNotFound />}/> 
          </Routes>
        </div>
      ) : null;
    }
}

export default App;