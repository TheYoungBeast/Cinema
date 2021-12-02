import React from "react";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";


function RoomDetails(props) {
    const id = useParams().id;
    const { pathname } = useLocation();

    return (
            <div>
                <h3>Room details: </h3>
                <ul>
                    <li>Room Number: {props.rooms[id].roomNumber}</li>
                    <li>Room Capacity: {props.rooms[id].roomCapacity}</li>
                </ul>
                <span>
                    <Link to={pathname+'/edit'}><button>Edit</button></Link> | <Link to={pathname+'/remove'}><button>Remove</button> </Link>
                </span>
            </div>);
    }

export default RoomDetails;