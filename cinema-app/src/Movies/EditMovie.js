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
            title: props.movies[id].title,
            duration: props.movies[id].duration,
            description: props.movies[id].description,
            image: props.movies[id].image,
            trailer: props.movies[id].trailer
        };
    }

    onChange = (event) => {
        let key = "";
        let value = event.target.value;

        switch(event.target.id)
        {
            case 'input-movie-title':
                key = "title";
                break;
            case 'input-movie-desc':
                key = "description"
                break;
            case 'input-movie-dur':
                key = "duration"
                value = parseInt(value) || 0;
                break;
            case 'input-movie-img':
                key = "image";
                break;
            case 'input-movie-trailer':
                key = "trailer";
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
            <input onChange={this.onChange} id="input-movie-title" value={this.state.title} />
            <label> Duration </label>
            <input onChange={this.onChange} id="input-movie-dur" value={this.state.duration.toString()} />
            <label> Description </label>
            <input onChange={this.onChange} id="input-movie-desc" value={this.state.description} />
            <label> Image </label>
            <input onChange={this.onChange} id="input-movie-img" value={this.state.image} />
            <label> Trailer (video) </label>
            <input onChange={this.onChange} id="input-movie-trailer" value={this.state.trailer} />

            <button onClick={this.onClick}>Edit</button>
        </div>);
    }
}

const EditMovieWrapper = (props) => (<EditMovie {...props} params={useParams()} navigate={useNavigate()} />)
export default EditMovieWrapper;