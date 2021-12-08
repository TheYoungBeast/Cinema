import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types';

function RemoveRoom(props)
{
    let { id } = useParams();
    let navigate = useNavigate();

    const [room, setRooms] = useState(props);
    useEffect(() => setRooms(props.rooms[id]), [props]);

    const onYesClick = () => {
        let { removeRoom } = props;
        removeRoom(id);
        navigate('../../');
    };

    const onNoClick = () => navigate('../../' + id);

    return room ? (<div className="main-container">
        <div>
            <p>Would you like to remove: {room.roomNumber} ?</p>
            <button onClick={ onYesClick }>Yes</button> | <button onClick={ onNoClick }>No</button>
        </div>
    </div>) : null;
}

RemoveRoom.propTypes = {
    removeRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired
}

export default RemoveRoom;