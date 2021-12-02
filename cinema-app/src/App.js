import './App.css';

import React from 'react';
import axios from 'axios';
import { Route, Routes, Link } from 'react-router-dom';

import RemoveMovie from './Movies/RemoveMovie';
import CinemaMovies from "./Movies/CinemaMovies";
import CinemaRooms from "./Rooms/CinemaRooms";
import CinemaScreenings from './Screenings/CinemaScreenings';
import PageNotFound from './PageNotFound';
import MovieDetails from './Movies/MovieDetails'
import EditMovie from './Movies/EditMovie';
import AddMovie from './Movies/AddMovie';
import RoomDetails from './Rooms/RoomDetails';
import EditRoom from './Rooms/EditRoom'
import AddRoom from './Rooms/AddRoom'

axios.defaults.baseURL = "http://localhost:7777";

class App extends React.Component {
    constructor(props) 
    {
      super(props);
      this.state = {}
    }
    
    componentDidMount()
    {
      axios.get('/')
      .then( res => {
        if(res.status === 200)
          this.setState(res.data);
      })
      .catch(error => {
        console.error(error.response)
      });
    }

    addMovie = (movie) => {
      this.setState( prevState => {
        return {
          screenings: prevState.screenings,
          movies: [...prevState.movies, movie],
          rooms: prevState.rooms
        };
      })
    }

    editMovie = (editedMovie) => {
      let movie = Object.assign({}, editedMovie);
      let id = movie.movieId;
      delete movie.movieId;

      this.setState(prevState => {
        prevState.movies[id] = movie;
        return {...prevState};
      });
    }

    removeMovie = (id) => {
      console.log(id, this.state);
      this.setState(prevState => {
        prevState.movies.splice(id, 1);
        return {
          screenings: prevState.screenings,
          movies: [...prevState.movies],
          rooms: prevState.rooms
        };
      });
    }

    addRoom = (room) => {
      this.setState( prevState => {
        return {
          screenings: prevState.screenings,
          movies: prevState.movies,
          rooms: [...prevState.rooms, room]
        };
      });
    }

    editRoom = (editedRoom) => {
      let room = Object.assign({}, editedRoom);
      let { id } = room;
      delete room.id;

      this.setState(prevState => {
        prevState.rooms[id] = room;
        return {...prevState};
      });
    }

    render() {

      return ( 
        <div id="mainPanel">
        <Link to = "/ticket" ><button> Buy a Ticket </button></Link >
        <Link to = "/movies" >< button > Movies </button></Link >
        <Link to = "/screenings" >< button > Screenings </button></Link >
        <Link to="/rooms"><button> Rooms </button></Link>

        <Routes>
          <Route path="/" element={<div>Main</div>} />

          <Route path="movies">
            <Route path="" element={<CinemaMovies addMovie={ this.addMovie } data={ this.state } />} />
            <Route path="add" element={<AddMovie addMovie={ this.addMovie } />} />
            <Route path=":id">
              <Route path="" element = {<MovieDetails movies={ this.state.movies } /> } />
              <Route path="edit" element={<EditMovie editMovie={this.editMovie} movies={this.state.movies} />} />
              <Route path="remove" element={<RemoveMovie removeMovie={this.removeMovie} movies={this.state.movies} />} />
            </Route>
          </Route>

          <Route path="screenings">
            <Route path="" element={<CinemaScreenings screenings={ this.state.screenings } /> }/>
            <Route path="add" />
            <Route path=":id">
              <Route path="" />
              <Route path="edit" />
              <Route path="remove"/>
            </Route>
          </Route>

          <Route path="rooms">
            <Route path="" element={<CinemaRooms rooms={ this.state.rooms } />} />
            <Route path="add" element={<AddRoom addRoom={ this.addRoom } />} />
            <Route path=":id">
              <Route path="" element={<RoomDetails rooms={ this.state.rooms } />} />
              <Route path="edit" element={<EditRoom editRoom={ this.editRoom } rooms={ this.state.rooms } />} />
              <Route path="remove"/>
            </Route>
          </Route>

          <Route path="*" element = {< PageNotFound />}/> 
        </Routes>
        </div>
      );
    }
}

export default App;