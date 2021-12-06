import React from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types'


class EditScreening extends React.Component {
    constructor(props)
    {
        super(props);
        let id = props.params.id;
        let currentScreening = props.screenings[id]
        this.state = {
            id: id,
            movieId: currentScreening.movieId,
            roomId: currentScreening.roomId,
            date: "",
            hours: "",
            occupation: currentScreening.occupation,
        };
    }

    onChange = (event) => {
        let key = "";
        let value = event.target.value;

        switch(event.target.id)
        {
            case 'select-date':
                key='date';
                let tmpDate = value.split('T')[0].split('-');
                value = tmpDate.reverse().join('.');
                break;
            case 'select-time':
                key="hours";
                break;
            case 'select-movie':
                key='movieId';
                value = parseInt(value);
                break;
            case 'select-room':
                value = parseInt(value);
                key='roomId'
                break;
            default:
                console.error(`Unhandled case: ${event.target.id}`);
                break;
        }

        if(key)
        {
            this.setState(prevState => {
                let state = prevState;
                state[ key ] = value;

                return {...state};
            });
        }
    }

    onClick = (event) => {
        event.preventDefault();
        let { editScreening } = this.props;

        if(this.state.date && this.state.hours)
        {
            editScreening(this.state);
            this.props.navigate('/screenings');
        }
        else
            alert(`Fields cannot be emtpy`);
    }

    render()
    {
        return this.props.movies[this.props.params.id] ? 
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
                        <select className="input-field" name="movies" id="select-movie" onChange={ this.onChange }>
                            { this.props.movies.map( (movie, id) => (<option key={`movie-${id}`} value={id}>{movie.title}</option>) ) }
                        </select>
                        <label className="input-label">Movie</label>
                    </div>
                    <div className="input">
                        <select className="input-field" name="rooms" id='select-room' onChange={ this.onChange } >
                            { this.props.rooms.map( (room, id) => (<option key={`room-${id}`} value={id}>{room.roomNumber}</option>) ) }
                        </select>
                        <label className="input-label">Room</label>
                    </div>
                    <div className="input">
                        <input type="date" className="input-field" onChange={this.onChange} id="select-date" />
                        <label className="input-label">Set Date</label>
                    </div>
                    <div className="input">
                        <input type="time" className="input-field" onChange={this.onChange} id="select-time" />
                        <label className="input-label">Set hour</label>
                    </div>
                    <div className="action">
                        <button className="action-button" onClick={ this.onClick }>Edit Screening</button>
                    </div>
                </form>
                <div className="card-info">
                    Edit info
                </div>
            </div>
        </div>) : null;
    }
}

EditScreening.propTypes = {
    editScreening: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    screenings: PropTypes.array.isRequired,
    rooms: PropTypes.array.isRequired,
}

const EditScreeningWrapper = (props) => (<EditScreening {...props} params={useParams()} navigate={useNavigate()} />)
export default EditScreeningWrapper;