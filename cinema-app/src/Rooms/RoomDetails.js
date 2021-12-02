import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";


function RoomDetails(props)
{
    let { id } = useParams();
    let { pathname } = useLocation();

    return(<div>
        <ul>
            <li>Room Number: {props.rooms[id].roomNumber}</li>
            <li>Room Capacity: {props.rooms[id].capacity}</li>
        </ul>

        <Link to={pathname+'/edit'}><button>Edit</button></Link>
        <Link to={pathname+'/remove'}><button>Remove</button> </Link>
    </div>);
}

export default RoomDetails;