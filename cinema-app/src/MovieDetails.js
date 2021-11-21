import React from 'react';
import { Navigate } from 'react-router-dom';
import { useParams, useLocation } from "react-router";
import { Link } from 'react-router-dom';


function MovieDetails(props) {
    const id = useParams().id;

    return (
            <div>
            <h3>Szczegóły Filmu: </h3>
            <p>Nazwa: {props.movies[id].movieTitle}</p>
            <p>Ilosc: {props.movies[id].movieDuration}</p>
            <p>Opis: Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam reiciendis maxime quam assumenda deserunt suscipit dolor tempora dolorem quae neque? Quam, at sit. Illum doloremque ullam quia saepe aliquid.</p> 
            <span>
                <button>edit</button>
                <button>remove</button>
            </span>
        </div>
    )
}

export default MovieDetails;


