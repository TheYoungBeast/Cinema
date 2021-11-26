import React from 'react';
import { useParams, useLocation } from "react-router";
import { Link } from 'react-router-dom';


function MovieDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();
    
    return (
            <div>
            <h3>Movie Details: </h3>
            <ul>
                <li>Name: {props.movies[id].movieTitle}</li>
                <li>Duration: {props.movies[id].movieDuration}</li>
                <li>Descripton: {props.movies[id].movieDesc}</li>
            </ul>
            <span>
                <Link to={pathname+"/edit"}><button>Edit</button></Link> | <Link to={pathname+"/remove"}><button>Remove</button></Link>
            </span>
        </div>
    )
}

export default MovieDetails;


