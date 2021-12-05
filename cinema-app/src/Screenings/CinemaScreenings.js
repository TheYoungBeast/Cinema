import React from "react";
import { Link } from "react-router-dom";

class CinemaScreenings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
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
        return date;
    }

    render()
    {
        return (
            <div id="screening-list">
                <h3>Screenings:</h3>
                <span> 
                    Search for a screening: <input type="date" id="keyword" placeholder="Search by date..." onChange={ this.onChange } /> 
                </span> 
                <ol>
                    { this.props.screenings.map((element, index) => {
                        let inputData = this.dateConverter(this.state.keyword);
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
                </ol>
            </div>
        );
    }
}

export default CinemaScreenings;