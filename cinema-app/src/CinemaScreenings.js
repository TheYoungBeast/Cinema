import React from "react";
import { Route, Routes, Link } from 'react-router-dom';

import App from "./App";
import CinemaMovies from "./CinemaMovies";
import CinemaRooms from "./CinemaRooms";
import PageNotFound from './PageNotFound';

class CinemaScreenings extends React.Component
{
    constructor(props)    {
        super(props);
        this.state = {
            screeningsDates: [ "20.11.2021", "21.11.2021", "22.11.2021" ],
            screeningsHours: [ "19:10", "20:30", "16:00" ],
            screeningsMoviesId: [ 0, 1, 2 ],
            roomsOccupations: [ [10, 11, 12, 14], [1,2,3,4,5], [20, 21, 22, 23, 24]]
        }
    }

    getScreeningsData = (id) => {
        return {
            id: id,
            screeningDate: this.state.screeningsDates[id],
            screeningHours: this.state.screeningsHours[id],
            roomOccupation: this.state.roomsOccupations[id]
        };
    }

    render()
    {
        return (<div>
            <Link to="/Rooms"><button>Rooms</button></Link>
            <Link to="/Movies"><button>Movies</button></Link>
            <Link to="/Screeings"><button>Screeings</button></Link>
            <Routes>
                <Route exact path="/Movies" element={<CinemaMovies data={this.state}/> } />
                <Route exact path="/Screeings" element={<App data={this.state} /> } />
                <Route exact path="/Rooms" element={<CinemaRooms data={this.state} /> } />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>);
    }
}

export default CinemaScreenings;