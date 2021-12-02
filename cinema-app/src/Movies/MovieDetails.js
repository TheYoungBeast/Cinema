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
                <li>Name: {props.movies[id].title}</li>
                <li>Duration: {props.movies[id].duration}</li>
                <li>Descripton: {props.movies[id].description}</li>
            </ul>
            <video width="auto" height="auto" controls autoPlay>
                <source src={props.movies[id].trailer} type="video/mp4"/>
                Your browser does not support the video tag.
            </video>
            <img src={props.movies[id].image} alt="movie img" />
            <span>
                <Link to={pathname+"/edit"}><button>Edit</button></Link> | <Link to={pathname+"/remove"}><button>Remove</button></Link>
            </span>
        </div>
    )
}

export default MovieDetails;


