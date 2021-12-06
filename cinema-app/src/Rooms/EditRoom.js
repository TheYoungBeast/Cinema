import React from "react";
import { useNavigate, useParams } from "react-router";
import PropTypes from 'prop-types';

class EditRoom extends React.Component
{
    constructor(props)
    {
        super(props);

        let { id } = props.params;
        this.state = {
            id: id,
            roomNumber: props.rooms[id].roomNumber,
            capacity: props.rooms[id].capacity
        };
    }

    onClick = () => {
        let { editRoom } = this.props;
        editRoom(this.state);
        this.props.navigate("../../"+this.state.id);
    }

    onChange = (event) => {
        let key="";
        let value = parseInt(event.target.value);
        value = isNaN(value) ? 0 : value;

        switch(event.target.id)
        {
            case 'input-room-number':
                key="roomNumber";
                value = ('000' + value).slice(-3);
                break;
            case 'input-room-capacity':
                key="capacity";
                break;
            default:
                console.error(`Unhandled case: ${event.target.id}`);
                break;
        }

        if(key.length)
        {
            this.setState(prevState => {
                let state = prevState;
                state[ key ] = value;
                
                return {...state};
            });
        }
    }

    render()
    {
        return (<div className="main-container">
                <label>Room Number</label>
                <input id="input-room-number" type="number" min="1" onChange={ this.onChange } value={ this.state.roomNumber.toString() } />
                <label>Room Capacity</label>
                <input id="input-room-capacity" type="number" min="10" onChange={ this.onChange } value={ this.state.capacity.toString() } />

                <button onClick={ this.onClick }>Edit</button>
            </div>);
    }
}

EditRoom.propTypes = {
    editRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired
}

const EditRoomHelper = (props) => (<EditRoom {...props} params={useParams()} navigate={useNavigate()} />);
export default EditRoomHelper;