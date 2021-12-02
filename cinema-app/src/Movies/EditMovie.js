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
        let key = "";
        let value = event.target.value;

        switch(event.target.id)
        {
            case 'input-movie-title':
                key = "movieTitle";
                break;
            case 'input-movie-desc':
                key = "movieDesc"
                break;
            case 'input-movie-dur':
                key = "movieDuration"
                value = parseInt(value) || 0;
                break;
            default:
                console.error(`Unhandled case: ${event.target.id}`);
                break;
        }

        if(key.length)
        {
            this.setState(prevState => {
                let state = prevState;
                state[ key ] = value;

                return {...state};
            });
        }
    }

    onClick = () =>{
        let { editMovie } = this.props;
        editMovie(this.state);
        this.props.navigate('../../'+this.state.movieId);
    }

    render()
    {
        return (<div>
            <label> Title </label>
            <input onChange={this.onChange} id="input-movie-title" value={this.state.movieTitle} />
            <label> Duration </label>
            <input onChange={this.onChange} id="input-movie-dur" value={this.state.movieDuration.toString()} />
            <label> Description </label>
            <input onChange={this.onChange} id="input-movie-desc" value={this.state.movieDesc} />
            <button onClick={this.onClick}>Edit</button>
        </div>);
    }
}

const EditMovieWrapper = (props) => (<EditMovie {...props} params={useParams()} navigate={useNavigate()} />)
export default EditMovieWrapper;