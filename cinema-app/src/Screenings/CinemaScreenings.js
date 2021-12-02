import React from "react";
import { Link } from "react-router-dom";

class CinemaScreenings extends React.Component
{
    render()
    {
        return (<ol>
            {this.props.screenings.map((element, index) => {
                return(
                    <li key={index}>
                        <ul>
                            <Link to={"./"+index}><li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li></Link>
                            <li key={element.screeningsMoviesId+"li-hour"}>{element.hours}</li>
                            <li key={element.screeningsMoviesId+"li-id"}>{element.movieId}</li>
                            <li key={element.screeningsMoviesId+"li-room"}>{element.roomId}</li>
                            <li key={element.screeningsMoviesId+"li-occupation"}>{element.occupation.map((seat) => {return (`${seat}, `)})}</li>
                        </ul>
                    </li>
                )
            })}
        </ol>);
    }
}

export default CinemaScreenings;