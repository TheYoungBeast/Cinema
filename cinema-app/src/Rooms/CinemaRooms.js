import React from "react";

class CinemaRooms extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            roomNumber: [101, 104, 109],
            roomCapacity: [50, 80, 100],
        }
    }

    getRoomData = (id) =>
    {
        return {
            id: id,
            roomNumber: this.state.roomNumber[ id ],
            roomCapacity: this.state.roomCapacity[ id ] };
    } 
}

export default CinemaRooms;