import '../css/CinemaScreenings.css';

import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'


class CinemaScreenings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            todays: false,
            current: false,
        }
    }

    onChange = (event) => {
        let name = event.target.id;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }
    
    dateConverter = (date) => {
        let str = date.split('-');
        return (date !== '') ? (str[2] + '.' + str[1] + '.' + str[0]) : '';
    }

    showTodaysScreenings = () => {
        this.setState({
            todays: this.state.todays ? false : true
        })
    }

    showCurrentScreenings = () => {
        this.setState({
            current: this.state.current ? false: true
        })
    }

    renderList = () => {
        let currentDate = new Date()
        let day = currentDate.getDate();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let hour = currentDate.getHours();
        let minutes = currentDate.getMinutes();
        let list = [];

        if(this.state.current) {
            var keyword1 = day + '.' + month + '.' + year;  //checks if current day
            var keyword2 = Number(hour + minutes/60);              //checks if current hour

            list = this.props.screenings.filter((element) => {
                let movieDuration = Number(this.props.movies[element.movieId].duration);    //movie duration in minutes
                let screeningHour = Number(element.hours.split(':')[0] + element.hours.split(':')[1]/60);    // starting hour of screening
                let screeningTime = Number(screeningHour) + Number(movieDuration/60); //ending time of screening 

                let screeningStartDate = new Date(element.date.split('.')[2], element.date.split('.')[1] - 1, element.date.split('.')[0], element.hours.split(':')[0], element.hours.split(':')[1])
                let screeningFinishDate = new Date(screeningStartDate)
                screeningFinishDate.setHours(screeningFinishDate.getHours() + Number(movieDuration/60))
                screeningFinishDate.setMinutes(screeningFinishDate.getMinutes() + Number(movieDuration%60))

                return (currentDate >= screeningStartDate && currentDate <= screeningFinishDate);
            });
        }
        else if(this.state.todays) { 
            var keyword1 = day + '.' + month + '.' + year;  //checks if current day
            var keyword2 = Number(hour + minutes/60);              //checks if current hour
            
            list = this.props.screenings.filter((element) => {
                let movieDuration = Number(this.props.movies[element.movieId].duration);    //movie duration in minutes
                let screeningHour = Number(element.hours.split(':')[0] + element.hours.split(':')[1]/60);    // starting hour of screening
                let screeningTime = Number(screeningHour) + Number(movieDuration/60); //ending time of screening 

                return (element.date.includes(keyword1) && keyword2 - screeningTime < 0);
            });
        }
        else {
            var keyword = this.state.keyword;
            list = this.props.screenings.filter( element => element.date.includes(this.dateConverter(keyword)) );
        }
        if(list.length !== 0) { 
            return(<table className="table-screenings">
                <tbody>
                    <tr>
                        <th></th>
                        <th>Title</th>
                        <th>Time</th>
                        <th>Date</th>
                        <th>Room</th>
                        <th>Details</th>
                    </tr>
                    {
                        list.map((screening, index) => {
                            return(
                                <tr key={`screening-tr-${index}`}>
                                    <td><img style={{height: "150px", width: "auto"}} alt="" src={this.props.movies[screening.movieId].image} /></td>
                                    <td>{this.props.movies[screening.movieId].title}</td>
                                    <td>{screening.hours}</td>
                                    <td>{screening.date}</td>
                                    <td>{this.props.rooms[screening.roomId].roomNumber}</td>
                                    <td><Link to={"./"+index}>see more</Link></td>
                                </tr>
                                /*<li key={index}>
                                    <ul>
                                    <Link to={"./"+index}><li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li></Link>
                                        <li key={element.screeningsMoviesId+"li-hour"}>{element.hours}</li>
                                        <li key={element.screeningsMoviesId+"li-id"}>{element.movieId}</li>
                                        <li key={element.screeningsMoviesId+"li-room"}>{element.roomId}</li>
                                        <li key={element.screeningsMoviesId+"li-occupation"}>Tickets bought: {element.occupation.length > 0 ? element.occupation.map((seat) => {return (`${seat}, `)}) : "All tickets available!"}</li>
                                    </ul>
                        </li>*/
                                );
                        })
                    }
                </tbody>
                </table>);
        }
        else {
            return(<div><p>There aren't any current screenings</p></div>)
        }
    }

    render()
    {
        return (
            <div className="main-container" id="screening-list">
                <h3>{this.state.current ? "Currently playing Screenings" : (this.state.todays ? "Today's screenings" : "Screenings")}</h3>
                
                <button id="todaysPlayingScreeningsButton" onClick={this.showTodaysScreenings}>
                    {this.state.todays ? "Today's screenings (hide)" : "Today's screeninigs (show)"}
                </button>
                
                <button id="currentlyPlayingScreeningsButton" onClick={this.showCurrentScreenings}>
                    {this.state.current ? "Currently playing (hide)" : "Currently playing (show)"}
                </button>

                <div key="search-screenings"> 
                    Search for a screening: <input type="date" id="keyword" placeholder="Search by date..." onChange={ this.onChange } /> 
                </div> 
                <ol>
                    { this.renderList() }
                </ol>
                <Link to={'/screenings/add'}><button>Add Screening</button></Link>
            </div>
        );
    }
}

CinemaScreenings.propTypes = { 
    rooms: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    screenings: PropTypes.array.isRequired
}

export default CinemaScreenings;