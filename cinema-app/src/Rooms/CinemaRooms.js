import React from "react";
import { Link } from "react-router-dom";

function CinemaRooms(props)
{
    return (<div>
        <ol>
            { props.rooms.map((room, index) => {
                return ( <li key={"room-item-"+index}>Room Number: {room.roomNumber} Capacity: {room.capacity}
                <Link to={'./'+index}><span>Details & Actions</span></Link>
                </li> ); })
            }
        </ol>
        <Link to="add"><button>Add Room</button></Link>
    </div>);
}

export default CinemaRooms;