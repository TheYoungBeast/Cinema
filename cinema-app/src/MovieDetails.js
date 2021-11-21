import React from 'react';
import { useParams, useLocation } from "react-router";
import { Link } from 'react-router-dom';


function MovieDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();
    
    return (
            <div>
            <h3>Szczegóły Filmu: </h3>
            <p>Nazwa: {props.movies[id].movieTitle}</p>
            <p>Ilosc: {props.movies[id].movieDuration}</p>
            <p>Opis: {props.movies[id].movieDesc}</p> 
            <span>
                <Link to={pathname+"/edit"}><button>edit</button></Link>
                <button>remove</button>
            </span>
        </div>
    )
}

export default MovieDetails;


