import React from "react";

class CinemaMovies extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            movieTitles: ["The Conjuring", "Rampage", "Tenet"],
            movieDurations: [ 112, 107, 150 ]
        }
    }

    getMovieData = (id) => {
        return {
            id: id,
            movieTitle: this.state.movieTitles[id],
            movieDuration: this.state.movieDurations[id]
        };
    }
}