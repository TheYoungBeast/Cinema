import React from "react";
import { useNavigate, useParams } from "react-router";

class EditRoom extends React.Component
{
    constructor(props)
    {
        super(props);

        let { id } = props.params;
        this.state = {
            id: id,
            roomNumber: props.rooms[id].roomNumber,
            roomCapacity: props.rooms[id].roomCapacity
        };
    }

    onClick = () => {
        let { editRoom } = this.props;
        editRoom(this.state);
        this.props.navigate("../");
    }

    onChange = (event) => {
        let key="";
        let value = parseInt(event.target.value);
        value = isNaN(value) ? 0 : value;

        switch(event.target.id)
        {
            case 'input-room-number':
                key="roomNumber";
                break;
            case 'input-room-capacity':
                key="roomCapacity";
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
        return (<div>
                <label>Room Number</label>
                <input id="input-room-number" type="number" min="1" onChange={ this.onChange } value={ this.state.roomNumber.toString() } />
                <label>Room Capacity</label>
                <input id="input-room-capacity" type="number" min="10" onChange={ this.onChange } value={ this.state.roomCapacity.toString() } />

                <button onClick={ this.onClick }>Edit</button>
            </div>);
    }
}

const EditRoomHelper = (props) => (<EditRoom {...props} params={useParams()} navigate={useNavigate()} />);
export default EditRoomHelper;