import React from "react";
import { Link } from "react-router-dom";

function CinemaRooms(props)
{
    return (<div>
        <ol>
            { props.rooms.map((room, index) => {
                return ( <li key={"room-item-"+index}>Room Number: {room.roomNumber} Capacity: {room.roomCapacity}
                <Link to={'./'+index}><span>Details & Actions</span></Link>
                </li> ); })
            }
        </ol>
    </div>);
}

export default CinemaRooms;