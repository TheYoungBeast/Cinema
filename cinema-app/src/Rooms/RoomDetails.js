import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function RoomDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();

    const [room, setRooms] = useState(props);
    useEffect(() => setRooms(props.rooms[id]), [props]);

    return room ?
        (<div className="main-container">
            <div>
                <ul>
                    <li>Room Number: {room.roomNumber}</li>
                    <li>Room Capacity: {room.capacity}</li>
                </ul>

                <Link to={pathname+'/edit'}><button>Edit</button></Link>
                <Link to={pathname+'/remove'}><button>Remove</button> </Link>
            </div>
        </div>) : null;
}

RoomDetails.propTypes = {
    rooms: PropTypes.array.isRequired
}

export default RoomDetails;