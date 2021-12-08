import React from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types';

class EditMovie extends React.Component
{
    constructor(props)
    {
        super(props);
        let id = props.params.id;

        if(this.props.movies.length)
        {
            this.state = {
                movieId: id,
                title: props.movies[id].title,
                duration: props.movies[id].duration,
                description: props.movies[id].description,
                image: props.movies[id].image,
                trailer: props.movies[id].trailer
            };
        }
    }

    componentDidUpdate()
    {
        let id = this.props.params.id;
        
        if(!this.state)
        {
            this.setState({
                movieId: id,
                title: this.props.movies[id].title,
                duration: this.props.movies[id].duration,
                description: this.props.movies[id].description,
                image: this.props.movies[id].image,
                trailer: this.props.movies[id].trailer
            });
        }
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
        this.props.navigate('/movies/'+this.state.movieId);
    }

    render()
    {
        return this.state ? 
        (<div className="container main-container">
            <div className="card-add-movie">
                <div className="card-image">	
                    <h2 className="card-heading">
                        Edit Movie
                        <small>Edit selected movie</small>
                    </h2>
                </div>
                <form className="card-form">
                    <div className="input">
                        <input type="text" className="input-field" onChange={this.onChange} id="input-movie-title" value={this.state.title} />
                        <label className="input-label">Title</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" onChange={this.onChange} id="input-movie-dur" value={this.state.duration.toString()} />
                        <label className="input-label">Duration</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" onChange={this.onChange} id="input-movie-desc" value={this.state.description} />
                        <label className="input-label">Description</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" onChange={this.onChange} id="input-movie-img" value={this.state.image} />
                        <label className="input-label"> Image link</label>
                    </div>
                    <div className="input">
                        <input type="text" className="input-field" onChange={this.onChange} id="input-movie-trailer" value={this.state.trailer} />
                        <label className="input-label">Trailer link / Video </label>
                    </div>
                    <div className="action">
                        <button className="action-button" onClick={ this.onClick }>Edit</button>
                    </div>
                </form>
                <div className="card-info">
                    Don't forget to add image link and trailer link
                </div>
            </div>
        </div>) : null;
    }
}

EditMovie.propTypes = {
    editMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired
}

const EditMovieWrapper = (props) => (<EditMovie {...props} params={useParams()} navigate={useNavigate()} />)
export default EditMovieWrapper;