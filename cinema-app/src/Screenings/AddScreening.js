import React from "react";
import { useParams, useNavigate } from "react-router";

class AddScreening extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieId: 0,
            roomId: 0,
            date: '',
            hours: '',
            occupation: [],

            screenings: this.props.screenings,
            movies: this.props.movies,
            rooms: this.props.rooms,
        }
    }       

    add = () => {
        let { addScreening } = this.props;
        addScreening({
            movieId: this.state.movieId,
            roomId: this.state.roomId,
            date: this.state.date,
            hours: this.state.hours,
            occupation: [],
        });
        this.props.navigate('/screenings/');
    }

    onClick = (event) => {
        // tutaj mozna walidowac dane przed wysłaniem
        console.log(this.state)
        this.add();
    }

    onChange = (event) => {
        let key="";
        let value = event.target.value
        
        switch(event.target.id) {
            case 'select-date':
                key='date';
                let tmpDate = value.split('T')[0].split('-');
                var hour = value.split('T')[1];
                value = tmpDate[2] + '.' + tmpDate [1] + '.' + tmpDate[0];
                break;
            case 'select-movie':
                key='movieId';
                break;
            case 'select-room':
                key='roomId'
                break;
        }


        if(key === 'date') {
            this.setState({
                date: value,
                hours: hour
            })
        }
        else {
            this.setState(prevState => {
                let state = prevState;
                state[key] = Number(value);

                return {...state};
            });
        }
    }

    render() {
        return (<div>
            <label for="date">Choose a date: </label>
            <input type="datetime-local" id="select-date" onChange={ this.onChange }/>

            <br/>
            <label for="movies">Choose a movie: </label>
            <select name="movies" id="select-movie" onChange={ this.onChange }>
            {
                this.state.movies.map((element, index) => {
                    return (
                        <option value={index}>{element.title}</option>
                    )
                })
            }
            </select>
            <br/>
            <label for="rooms">Choose a room: </label>
            <select name="rooms" id="select-room" onChange={ this.onChange }>
            {
                this.state.rooms.map((element, index) => {
                    return (
                        <option value={index}>Room number: {element.roomNumber} (capacity: {element.capacity}</option>
                    )
                })
            }
            </select>
            <br/>
            <button onClick={ this.onClick }> Add Screening </button>
        </div>)
    }
}

const AddScreeningHelper = (props) => (<AddScreening {...props} params={useParams()} navigate={useNavigate()} />);
export default AddScreeningHelper;