import React from "react";
import { useNavigate } from "react-router";

class AddMovie extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            movieTitle: "title",
            movieDuration: 0,
            movieDesc: "description"
        }
    }

    add = () => {
        let { addMovie } = this.props;
        addMovie(this.state);
        this.props.navigate('/movies/');
    }

    onClick = (event) => {
        // tutaj mozna walidowac dane przed wysłaniem
        this.add();
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
                break;
            case 'input-movie-image':
                break;
            case 'input-movie-trailer':
                break;
            default:
                console.error(`Unhandled case: ${event.target.id}`);
                break;
        }

        if(key.length)
        {
            this.setState( prevState => {
                let state = prevState;
                state[ key ] = value;

                return {...state};
            });
        }
    }

    render()
    {
        return (<div>
            <input type="text" id="input-movie-title" placeholder="Movie title" onChange={ this.onChange } />
            <input type="text" id="input-movie-desc" placeholder="Description" onChange={ this.onChange } />
            <input type="text" id="input-movie-dur" placeholder="Duration (minutes)" onChange={ this.onChange } />
            <input type="text" id="input-movie-image" placeholder="Img link" onChange={ this.onChange } />
            <input type="text" id="input-movie-trailer" placeholder="Trailer (video) link" onChange={ this.onChange } />

            <button onClick={ this.onClick }> Add Movie </button>
        </div>)
    }
}

const AddMovieHelper = (props) => (<AddMovie {...props} navigate={useNavigate()} />);
export default AddMovieHelper;