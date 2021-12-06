import React from "react";
import { Link } from "react-router-dom";
import AddScreening from "./AddScreening";

class CinemaScreenings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
            shown: false,
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

    showCurrentScreenings = () => {
        this.setState({
            shown: this.state.shown ? false : true
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

        if(this.state.shown) {
            var keyword1 = day + '.' + month + '.' + year;  //checks if current day
            var keyword2 = Number(hour + minutes/60);              //checks if current hour
            
            list = this.props.screenings.filter((element) => {
                let movieDuration = Number(this.props.movies[element.movieId].duration);    //movie duration in minutes
                let screeningHour = Number(element.hours.split(':')[0]);    // starting hour of screening
                let screeningTime = (screeningHour + movieDuration/60 + (movieDuration%60)/60); //ending time of screening 

                if(element.date.includes(keyword1) && keyword2 - screeningTime < 0) {
                    return element;
                }
            })
                
        }
        else {
            var keyword = this.state.keyword;
            list = this.props.screenings.filter( element => element.date.includes(this.dateConverter(keyword)) );
        }
        if(list.length != 0) { 
            return(
                    list.map((element, index) => {
                        return(
                            <li key={index}>
                                <ul>
                                <Link to={"./"+index}><li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li></Link>
                                    <li key={element.screeningsMoviesId+"li-hour"}>{element.hours}</li>
                                    <li key={element.screeningsMoviesId+"li-id"}>{element.movieId}</li>
                                    <li key={element.screeningsMoviesId+"li-room"}>{element.roomId}</li>
                                    <li key={element.screeningsMoviesId+"li-occupation"}>Tickets bought: {element.occupation.length > 0 ? element.occupation.map((seat) => {return (`${seat}, `)}) : "All tickets available!"}</li>
                                </ul>
                    </li>)}) 
            )
        }
        else {
            return(<div><p>There aren't any current screenings</p></div>)
        }
    }

    render()
    {
        return (
            <div className="main-container" id="screening-list">
                <h3>Screenings:</h3>
                <button id="currentlyPlayingScreeningsButton" onClick={this.showCurrentScreenings}>Current screenings</button>
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

export default CinemaScreenings;