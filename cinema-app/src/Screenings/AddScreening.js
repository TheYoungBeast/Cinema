import React from "react";
import { useParams, useNavigate } from "react-router";

const stringToDate = (string) => {
    let date = new Date();
    date.setFullYear(string.slice(-4), string.slice(3, 5)-1, string.slice(0, 2));
    date.setHours(0, 0, 0, 0);
    return date;
}

const timeStringToMinutes = (time) => {
    var hoursMinutes = time.split(/[.:]/);
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours*60 + minutes;
}

class AddScreening extends React.Component 
{
    constructor(props) 
    {
        super(props);
        this.state = {
            movieId: 0,
            roomId: -1,
            date: '',
            hours: '',
        }
    }       

    add = () => {
        let { addScreening } = this.props;
        addScreening({
            movieId: this.state.movieId,
            roomId: this.state.roomId,
            date: this.state.date,
            hours: this.state.hours,
            occupation: []
        });
        this.props.navigate('/screenings/');
    }

    onClick = (event) => {
        event.preventDefault();
        if(this.state.date && this.state.hours && this.state.movieId > -1 && this.state.roomId > -1)
            this.add();
        else
            alert("Fields cannot be empty")
    }

    onChange = (event) => {
        let key="";
        let value = event.target.value
        
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
                console.log(value);
                break;
            default:
                console.log(`Unhandled case: ${event.target}`);
                return;
        }

        if(key)
        {
            this.setState(prevState => {
                let state = prevState;
                state[key] = value;

                return {...state};
            });
        }
    }

    render() {
            let unavailableRooms = Array.from(new Set(this.props.screenings.filter( screening => {
                if(stringToDate(screening.date).valueOf() === stringToDate(this.state.date).valueOf())
                {
                    let newScreeningStart = timeStringToMinutes(this.state.hours);
                    let newScreeningEnd = newScreeningStart + this.props.movies[this.state.movieId].duration;
                    let oldScreeningStart = timeStringToMinutes( screening.hours );
                    let oldScreeningEnd = oldScreeningStart + this.props.movies[screening.movieId].duration;
                    
                    let isOverlapping = (newScreeningStart >= oldScreeningStart && newScreeningStart <= oldScreeningEnd) || (newScreeningEnd >= oldScreeningStart && newScreeningEnd <= oldScreeningEnd);
                    
                    return isNaN(newScreeningStart) ? false : isOverlapping;
                }
                else return false;
            }).map( screening => screening.roomId )));

            let rooms = this.props.rooms.map( (r, i) => i );
            let availableRooms = rooms.filter( (roomId) => !unavailableRooms.includes(roomId) ); 

            return this.props.rooms && (
            <div className="container main-container">
                <div className="card-add-movie">
                    <div className="card-image">	
                        <h2 className="card-heading">
                            Add Screening
                            <small>Set up new screening!</small>
                        </h2>
                    </div>
                    <form className="card-form" onSubmit={this.preve}>
                        <div className="input">
                            <select className="input-field" name="movies" id="select-movie" onChange={ this.onChange }>

                                { this.props.movies.map( (movie, id) => (<option key={`movie-${id}`} value={id}>{movie.title}</option>) ) }
                            </select>
                            <label className="input-label">Select Movie</label>
                        </div>
                        <div className="input">
                            <input className="input-field" type="date" id="select-date" onChange={ this.onChange } /*value={new Date().toISOString().slice(0, 10)}*/ required/>
                            <label>Set Date</label>
                        </div>
                        <div className="input">
                            <input className="input-field" type="time" id="select-time" min="06:00" max="23:00" onChange={ this.onChange } /*value={new Date().toISOString().slice(11, 16)}*/ required/>
                            <label >Set Hour</label>
                        </div>
                        <div className="input">
                            <select className="input-field" name="rooms" id='select-room' onChange={ this.onChange } >
                                <option key="room-default" value={-1}>Select room</option>
                                { availableRooms.map( id => (<option key={`room-${id}`} value={id}>{this.props.rooms[id].roomNumber}</option>) ) }
                            </select>
                            <label className="input-label">Select Room</label>
                        </div>
                        <div className="action">
                            <button className="action-button" onClick={ this.onClick }>Add Screening</button>
                        </div>
                    </form>
                    <div className="card-info">
                        An empty room list means all rooms are occupied at a selected date/time
                    </div>
                </div>
            </div>);
    }
}

const AddScreeningHelper = (props) => (<AddScreening {...props} params={useParams()} navigate={useNavigate()} />);
export default AddScreeningHelper;