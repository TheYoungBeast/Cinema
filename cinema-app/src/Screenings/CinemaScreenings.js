import React from "react";

class CinemaScreenings extends React.Component
{
    getScreeningsData = (id) => {
        return {
            id: id,
            screeningDate: this.state.screeningsDates[id],
            screeningHours: this.state.screeningsHours[id],
            roomOccupation: this.state.roomsOccupations[id]
        };
    }

    render()
    {
        return (<ol>
            {this.props.screenings.map((element, index) => {
                return(
                    <li key={index}>
                        <ul>
                            <li key={element.screeningsMoviesId+"li-date"}>Screening date: {element.date}</li>
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