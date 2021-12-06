import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';


function RoomDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();

    return(<div className="main-container">
        <div>
            <ul>
                <li>Room Number: {props.rooms[id].roomNumber}</li>
                <li>Room Capacity: {props.rooms[id].capacity}</li>
            </ul>

            <Link to={pathname+'/edit'}><button>Edit</button></Link>
            <Link to={pathname+'/remove'}><button>Remove</button> </Link>
        </div>
    </div>);
}

RoomDetails.propTypes = {
    rooms: PropTypes.array.isRequired
}

export default RoomDetails;