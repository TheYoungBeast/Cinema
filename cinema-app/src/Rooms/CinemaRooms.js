import React from "react";
import { Link } from "react-router-dom";

function CinemaRooms(props)
{
    return (<div>
        
            <div key="room-list">
            <h3>Room list: </h3>
                <ol>
                    { props.data.Rooms.map((product, index) => {
                        return ( 
                            <li key={"room-item-"+index}>
                                <p>
                                    <Link to={`/rooms/${index}`}>{product.roomNumber}</Link>
                                    <span> Room capacity: {product.roomCapacity}</span>
                                </p>
                            </li>);
                        })
                    }
                </ol>
            </div>

            <Link to={'/rooms/add'}><button>Add Room</button></Link>
        </div>);
}

export default CinemaRooms;