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
            originalRooms: this.props.rooms,
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
                this.setState({
                    rooms: this.state.originalRooms
                })
                
                this.setState({
                    rooms: this.state.rooms.filter((roomx, index) => {
                        let check = this.state.screenings.find(screeningx => {
                            let movie = this.state.movies[screeningx.movieId].duration;
                            let screeningStartDate = new Date(screeningx.date.split('.')[2], screeningx.date.split('.')[1], screeningx.date.split('.')[0], screeningx.hours.split(':')[1], screeningx.hours.split(':')[0])
                            let screeningFinishDate = new Date(screeningStartDate)
                            let currentDate = new Date(value.split('.')[2], value.split('.')[1], value.split('.')[0], hour.split(':')[0], hour.split(':')[1])
                            screeningFinishDate.setHours(screeningFinishDate.getHours() + Math.floor(movie/60))
                            screeningFinishDate.setMinutes(screeningFinishDate.getMinutes() + movie%60)

                            if(screeningStartDate <= currentDate && screeningFinishDate >= currentDate && screeningx.roomId === index) {
                                return screeningx;
                            }
                        })
                        if(check === undefined) {
                            return roomx;
                        }
                    })
                })
                console.log(this.props.rooms)
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
        return (<div className="main-container">
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