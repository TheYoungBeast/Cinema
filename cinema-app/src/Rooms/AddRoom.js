import React from "react";
import { useNavigate } from "react-router";

class AddRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            roomNumber: "001",
            capacity: 50 
        }
    }

    onChange = (event) => {
        let key="";
        let value = parseInt(event.target.value);
        value = isNaN(value) ? 0 : value;

        switch(event.target.id)
        {
            case 'input-room-number':
                key="roomNumber";
                value = ('000'+value).slice(-3);
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

    onClick = () => {
        let { addRoom } = this.props;
        addRoom(this.state);
        this.props.navigate('/rooms/');
    }

    render()
    {
        return (<div>
            <label>Room Number</label>
            <input id="input-room-number" type="number" min="1" onChange={ this.onChange } value={ this.state.roomNumber.toString() } />
            <label>Room Capacity</label>
            <input id="input-room-capacity" type="number" min="10" onChange={ this.onChange } value={ this.state.capacity.toString() } />

            <button onClick={ this.onClick } >Add Room</button>
        </div>);
    }
}

const AddRoomHelper = (props) => (<AddRoom {...props} navigate={useNavigate()} />);
export default AddRoomHelper;