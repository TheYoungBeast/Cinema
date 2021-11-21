import React from "react";

class CinemaScreenings extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            screeningsDates: [ "20.11.2021", "21.11.2021", "22.11.2021" ],
            screeningsHours: [ "19:10", "20:30", "16:00" ],
            screeningsMoviesId: [ 0, 1, 2 ],
            roomsOccupations: [ [10, 11, 12, 14], [1,2,3,4,5], [20, 21, 22, 23, 24]]
        }
    }
}