import '../css/AddMovie.css';

import React from "react";
import { useNavigate } from "react-router";

class AddMovie extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            title: "title",
            duration: 0,
            description: "description",
            image: "",
            trailer: ""
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
                key = "title";
                break;
            case 'input-movie-desc':
                key = "descriptionc"
                break;
            case 'input-movie-dur':
                key = "duration"
                value = parseInt(value);
                value = isNaN(value) ? "0" : value;
                break;
            case 'input-movie-image':
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
            this.setState( prevState => {
                let state = prevState;
                state[ key ] = value;

                return {...state};
            });
        }
    }

    render()
    {
        return (
        <div className="container main-container">
            <div className="card-add-movie">
                <div className="card-image">	
                    <h2 className="card-heading">
                        Add Movie
                        <small>Add new interesting movie</small>
                    </h2>
                </div>
                <form className="card-form">
                    <div className="input">
                        <input type="text" className="input-field" id="input-movie-title" onChange={ this.onChange } required/>
                        <label className="input-label">Title</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" id="input-movie-desc" onChange={ this.onChange } required/>
                        <label className="input-label">Description</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" id="input-movie-dur" onChange={ this.onChange } required/>
                        <label className="input-label">Duration (minutes)</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" id="input-movie-image" onChange={ this.onChange } required/>
                        <label className="input-label">Image link</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" id="input-movie-trailer" onChange={ this.onChange } required/>
                        <label className="input-label">Video link / Trailer</label>
                    </div>
                    <div className="action">
                        <button className="action-button" onClick={ this.onClick }> Add Movie </button>
                    </div>
                </form>
                <div className="card-info">
                    Don't forget to add image link and trailer link
                </div>
            </div>
        </div>);
    }
}

const AddMovieHelper = (props) => (<AddMovie {...props} navigate={useNavigate()} />);
export default AddMovieHelper;