import './css/App.css';

import React from 'react';
import axios from 'axios';
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

axios.defaults.baseURL = "http://localhost:7777";

class App extends React.Component 
{
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
      axios.post('/add/movie', movie, {headers: { 'Content-type': 'application/json'}})
      .then( res => {
        if(res.status === 201)
        {
          this.setState( prevState => {
            return { movies: [...prevState.movies, movie] };
          });
        }
      }).catch( error => console.error(error.response) );
    }

    editMovie = (editedMovie) => {
      let movie = Object.assign({}, editedMovie);
      let id = movie.movieId;
      delete movie.movieId;

      axios.put(`/update/movie/${id}`, movie, {headers: { 'Content-type': 'application/json'}})
      .then( res => {
        if(res.status === 200)
        {
          this.setState(prevState => {
            prevState.movies[id] = movie;
            return {...prevState};
          });
        }
      }).catch( error => console.error(error.response) );
    }

    removeMovie = (id) => {
      axios.delete(`/delete/movies/${id}`).then( res => {
        if(res.status === 204)
        {
          this.setState(prevState => {
            prevState.movies.splice(id, 1);
            return { movies: [...prevState.movies] };
          });
        }
      }).catch( error => console.error(error.response) );
    }

    addRoom = (room) => {
      axios.post('/add/room', room, {headers: { 'Content-type': 'application/json'}})
      .then( res => {
        if(res.status === 201)
        {
          this.setState( prevState => {
            return { rooms: [...prevState.rooms, room] };
          });
        }
      }).catch( error => console.error(error.response) );
    }

    editRoom = (editedRoom) => {
      let room = Object.assign({}, editedRoom);
      let { id } = room;
      delete room.id;

      axios.put(`/update/room/${id}`, room,  {headers: { 'Content-type': 'application/json'}})
      .then( res => {
        if(res.status === 200)
        {
          this.setState(prevState => {
            prevState.rooms[id] = room;
            return {rooms: [...prevState.rooms]};
          });
        }
      }).catch( error => console.error(error.response) );
    }

    removeRoom = (id) => {
      axios.delete(`delete/rooms/${id}`).then( res => {
        if(res.status === 204)
        {
          this.setState(prevState => {
            prevState.rooms.splice(id, 1);
            return {rooms: [...prevState.rooms]};
          });
        }
      }).catch( error => console.error(error.response) );
    }

    addScreening = (screening) => {

    }

    editScreening = (editedScreening) => {
      console.log(editedScreening);
    }

    removeScreening = () => {

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
              <Route path="edit" element={<EditMovie editMovie={ this.editMovie } movies={ this.state.movies } />} />
              <Route path="remove" element={<RemoveMovie removeMovie={ this.removeMovie } movies={ this.state.movies } />} />
            </Route>
          </Route>

          <Route path="screenings">
            <Route path="" element={<CinemaScreenings screenings={ this.state.screenings } /> }/>
            <Route path="add" element={<AddScreening addScreening={ this.addScreening } />} />
            <Route path=":id">
              <Route path="" element={<ScreeningDetails { ...this.state } editScreening={ this.editScreening } /> }/>
              <Route path="edit" element={<EditScreening editScreening={ this.editScreening } /> } />
              <Route path="remove" element={<RemoveScreening removeScreening={ this.removeScreening } screenings = { this.state.screenings} /> } />
            </Route>
          </Route>

          <Route path="rooms">
            <Route path="" element={<CinemaRooms rooms={ this.state.rooms } />} />
            <Route path="add" element={<AddRoom addRoom={ this.addRoom } />} />
            <Route path=":id">
              <Route path="" element={<RoomDetails rooms={ this.state.rooms } />} />
              <Route path="edit" element={<EditRoom editRoom={ this.editRoom } rooms={ this.state.rooms } />} />
              <Route path="remove" element={<RemoveRoom removeRoom={ this.removeRoom } rooms={ this.state.rooms } />} />
            </Route>
          </Route>

          <Route path="*" element = {< PageNotFound />}/> 
        </Routes>
        </div>
      );
    }
}

export default App;