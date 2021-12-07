import React from 'react';
import { useParams, useLocation } from "react-router";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function MovieDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();
    
    return props.movies[id] ? 
        (<div className="main-container">
            <div className="movie-header">
               <h2>{props.movies[id].title}</h2>
                <span>{props.movies[id].duration} minutes</span>
            </div>
            <div className="movie-container">
                <img src={props.movies[id].image} alt="movie img" />
                <video width="auto" height="auto" controls autoPlay loop>
                    <source src={props.movies[id].trailer} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="movie-desc">
                <p>{props.movies[id].description}</p>
            </div>
            <div className="movie-buttons">
                <span>
                        <Link to={pathname+"/edit"}><button>Edit</button></Link>
                        <Link to={pathname+"/remove"}><button>Remove</button></Link>
                </span>
            </div>
        </div>) : null;
}

MovieDetails.propTypes = {
    movies: PropTypes.array.isRequired
}

export default MovieDetails;