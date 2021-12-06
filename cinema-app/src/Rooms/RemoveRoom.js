import React from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types';

function RemoveRoom(props)
{
    let { id } = useParams();
    let navigate = useNavigate();

    const onYesClick = () => {
        let { removeRoom } = props;
        removeRoom(id);
        navigate('../../');
    };

    const onNoClick = () => navigate('../../' + id);

    return (<div className="main-container">
        <div>
            <p>Would you like to remove: {props.rooms[id].roomNumber} ?</p>
            <button onClick={ onYesClick }>Yes</button> | <button onClick={ onNoClick }>No</button>
        </div>
    </div>);
}

RemoveRoom.propTypes = {
    removeRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired
}

export default RemoveRoom;