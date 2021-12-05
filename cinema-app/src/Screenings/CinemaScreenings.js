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

        if(this.state.shown) {
            var keyword1 = day + '.' + month + '.' + year;  //checks if current day
            var keyword2 = Number(hour + minutes/60);               //checks if current hour
            return this.props.screenings.map((element, index) => {
                let movieDuration = Number(this.props.movies[element.movieId].duration);    //movie duration in minutes
                let screeningHour = Number(element.hours.split(':')[0]);    // starting hour of screening
                let screeningTime = (screeningHour + movieDuration/60 + (movieDuration%60)/60); //ending time of screening 

                if(element.date.includes(keyword1) && keyword2 - screeningTime < 0) {
                    return(
                        <li key={index}>
                        <ul>
                            <Link to={"./"+index}><li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li></Link>
                            <li key={element.screeningsMoviesId+"li-hour"}>{element.hours}</li>
                            <li key={element.screeningsMoviesId+"li-id"}>{element.movieId}</li>
                            <li key={element.screeningsMoviesId+"li-room"}>{element.roomId}</li>
                            <li key={element.screeningsMoviesId+"li-occupation"}>{element.occupation.map((seat) => {return (`${seat}, `)})}</li>
                        </ul>
                    </li>)
                }
            })
                
        }
        else {
            var keyword = this.state.keyword;
            return this.props.screenings.map((element, index) => {
                let inputData = this.dateConverter(keyword);
                if(element.date.includes(inputData))
                return(
                    <li key={index}>
                        <ul>
                            <Link to={"./"+index}><li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li></Link>
                            <li key={element.screeningsMoviesId+"li-hour"}>{element.hours}</li>
                            <li key={element.screeningsMoviesId+"li-id"}>{element.movieId}</li>
                            <li key={element.screeningsMoviesId+"li-room"}>{element.roomId}</li>
                            <li key={element.screeningsMoviesId+"li-occupation"}>{element.occupation.map((seat) => {return (`${seat}, `)})}</li>
                        </ul>
                    </li>)})
        
        }
    }

    render()
    {
        return (
            <div id="screening-list">
                <h3>Screenings:</h3>
                <button id="currentlyPlayingScreeningsButton" onClick={this.showCurrentScreenings}>Current screenings</button>
                <span> 
                    Search for a screening: <input type="date" id="keyword" placeholder="Search by date..." onChange={ this.onChange } /> 
                </span> 
                <ol>
                    {   
                        this.renderList() 
                    }
                </ol>
                <Link to={'/screenings/add'}><button>Add Screening</button></Link>
            </div>
        );
    }
}

export default CinemaScreenings;