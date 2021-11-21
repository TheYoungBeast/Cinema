import React from "react";
import { useParams, useNavigate } from "react-router";

class EditMovie extends React.Component
{
    constructor(props)
    {
        super(props);
        let id = props.params.id;
        this.state = {
            movieId: id,
            movieTitle: props.movies[id].movieTitle,
            movieDuration: props.movies[id].movieDuration,
            movieDesc: props.movies[id].movieDesc
        };
    }

    onChange = (event) => {
        let title = document.getElementById("movie-title-input").value;
        let dur = parseInt(document.getElementById("movie-duration-input").value) || 0; // change to 0 if NaN
        let desc = document.getElementById("movie-desc-input").value

        this.setState({
            movieId: this.state.movieId,
            movieTitle: title,
            movieDuration: dur,
            movieDesc: desc
        });
    }

    onClick = () =>{
        let { editMovie } = this.props;
        editMovie(this.state);
        this.props.navigate('../'+this.state.movieId);
    }

    render()
    {
        return (<div>
            <label> Title </label>
            <input onChange={this.onChange} id="movie-title-input" value={this.state.movieTitle} />
            <label> Duration </label>
            <input onChange={this.onChange} id="movie-duration-input" value={this.state.movieDuration.toString()} />
            <label> Description </label>
            <input onChange={this.onChange} id="movie-desc-input" value={this.state.movieDesc} />
            <button onClick={this.onClick}>Edit</button>
        </div>);
    }
}

const EditMovieWrapper = (props) => (<EditMovie {...props} params={useParams()} navigate={useNavigate()} />)
export default EditMovieWrapper;