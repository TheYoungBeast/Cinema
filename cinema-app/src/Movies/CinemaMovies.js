import React from "react";
import { Link } from 'react-router-dom';


function CinemaMovies(props)
{
    return (<div>
        
            <div key="movie-list">
            <h3>Movie list: </h3>
                <ol>
                    { props.data.Movies.map((product, index) => {
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

            <Link to={'/movies/add'}><button>Add Movie</button></Link>
        </div>);
}

export default CinemaMovies;