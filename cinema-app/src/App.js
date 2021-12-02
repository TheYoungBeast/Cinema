import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';

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

import CinemaScreenings from './Screenings/CinemaScreenings';
import PageNotFound from './PageNotFound';

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

    addMovie = (movie) => {
      this.setState( prevState => {
        return {
          Screenings: prevState.Screenings,
          Movies: [...prevState.Movies, movie],
          Rooms: prevState.Rooms
        };
      })
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

        list = list.filter(element => element !== movie)
        console.log(list);
        return {
          Movies: list
        };
      });
    }

    addRoom = (room) => {
      this.setState( prevState => {
        return {
          Screenings: prevState.Screenings,
          Movies: prevState.Movies,
          Rooms: [...prevState.Rooms, room],
        };
      })
    }

    editRoom = (room) => {
      let { id } = room;
      let rooms = this.state.Rooms;
      rooms[id].roomNumber = room.roomNumber;
      rooms[id].roomCapacity = room.roomCapacity;

      this.setState(prevState => {
        return {
          Screenings: prevState.Screenings,
          Movies: prevState.Movies,
          Rooms: rooms
        }
      });
    }

    removeRoom = (room) => {
      this.setState(prevState => {
        let list = prevState.Rooms;

        list = list.filter(element => element !== room)
        console.log(list);
        return {
          Rooms: list
        };
      });
    }

    render() {

      return ( 
        <div id="mainPanel">
        <Link to = "/ticket" > <button> Buy a Ticket </button> </Link >
        <Link to = "/movies" > < button > Movies </button> </Link >
        <Link to = "/screeings" > < button > Screenings </button> </Link >
        <Link to="/rooms"> <button> Rooms </button> </Link>

        <Routes>
          <Route path="/" element={<div>Main</div>} />

          <Route path="movies">
            <Route path="" element={<CinemaMovies addMovie={ this.addMovie } data={ this.state } />} />
            <Route path="add" element={<AddMovie addMovie={ this.addMovie } />} />
            <Route path=":id">
              <Route path="" element = {<MovieDetails movies={ this.state.Movies } /> } />
              <Route path="edit" element={<EditMovie editMovie={this.editMovie} movies={this.state.Movies} />} />
              <Route path="remove" element={<RemoveMovie removeMovie={this.removeMovie} movies={this.state.Movies} />} />
            </Route>
          </Route>

          <Route path="screenings">
            <Route path="" element={< CinemaScreenings screenings={ this.state.Screenings } /> }/>
            <Route path="add" />
            <Route path=":id">
              <Route path="" />
              <Route path="edit" />
              <Route path="remove"/>
            </Route>
          </Route>

          <Route path="rooms">
            <Route path="" element={<CinemaRooms addRoom={this.addRoom} data={ this.state } />} />
            <Route path="add" element={<AddRoom addRoom={this.addRoom} />} />
            <Route path=":id">
              <Route path="" element={<RoomDetails rooms={ this.state.Rooms } />} />
              <Route path="edit" element={<EditRoom editRoom={ this.editRoom } rooms={ this.state.Rooms } />} />
              <Route path="remove" element={ <RemoveRoom removeRoom={this.removeRoom} rooms={this.state.Rooms} /> } />
            </Route>
          </Route>

          <Route path="*" element = {< PageNotFound />}/> 
        </Routes>
        </div>
      );
    }
}

export default App;