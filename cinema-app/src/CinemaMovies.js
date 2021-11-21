import React from "react";
import { Link } from 'react-router-dom';

class CinemaMovies extends React.Component
{
    getMovieData = (id) => {
        return {
            id: id,
            movieTitle: this.state.movieTitles[id],
            movieDuration: this.state.movieDurations[id]
        };
    }

    render() { 
        return (
            <div key="movie-list">
            <h3>Movie list: </h3>
            <ol>
            { this.props.data.Movies.map((product, index) => {
                return ( 
                    <li key={"movie-item-"+index}>
                        <p>
                            <Link to={`/movies/${index}`}>{product.movieTitle}</Link>
                            <span> Czas trwania: {product.movieDuration}</span>
                        </p>
                    </li>);
                })
            }
            </ol>
            </div>
        )
    }
}

export default CinemaMovies;