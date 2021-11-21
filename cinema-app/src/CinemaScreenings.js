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
        return (<ol>
            {this.props.screenings.map((element, index) => {
                return(
                    <li>
                        <ul>

                            <li>Screening date: {element.screeningsDates}</li>
                            <li>{element.screeningsHours}</li>
                            <li>{element.screeningsMoviesId}</li>
                            <li>{element.roomId}</li>
                            <li>{element.roomsOccupations.map((seat) => {return (`${seat}, `)})}</li>

                        </ul>
                    </li>
                )
            })}
        </ol>);
    }
}

export default CinemaScreenings;