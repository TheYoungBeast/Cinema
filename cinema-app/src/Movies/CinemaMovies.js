import React from "react";
import { Link } from 'react-router-dom';

class CinemaMovies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (event) => {
        let name = event.target.id;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        return(
            <div key="movie-list">
                <h3>Movie list:</h3>
                <span> 
                        Search for a movie: <input type="text" id="keyword" placeholder="Search by title..." onChange={ this.onChange } /> 
                </span>
                <ol>
                    { this.props.data.movies.map((movie, index) => {
                        if(movie.title.toLowerCase().includes(this.state.keyword.toLowerCase()))
                        return ( 
                            <li key={"movie-item-"+index}>
                                <p>
                                    <Link to={`/movies/${index}`}>{movie.title}</Link>
                                    <span> Czas trwania: {movie.duration}</span>
                                </p>
                            </li>);
                        })
                    }
                </ol>
                <Link to={'/movies/add'}><button>Add Movie</button></Link>
            </div>
        )
    }
}

export default CinemaMovies;