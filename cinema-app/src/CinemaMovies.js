import React from "react";
import {
    Route,
    Routes,
    Link
  } from 'react-router-dom';

class CinemaMovies extends React.Component
{
    constructor(props) {
        super(props);
    }

    getMovieData = (id) => {
        return {
            id: id,
            movieTitle: this.state.movieTitles[id],
            movieDuration: this.state.movieDurations[id]
        };
    }

    render() { 
        return (
            <div>
            <h3>Movie list: </h3>
            { this.props.data.Movies.map((product, index) => {
                return ( 
                    <div>
                        <p><span><Link to={`/Movies/${index}`}>{product.movieTitle}</Link>    Czas trwania: {product.movieDuration} </span></p>
                    </div>
                    )})
            }
            </div>
        )
    }
}

export default CinemaMovies;