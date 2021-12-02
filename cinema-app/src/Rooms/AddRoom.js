import React from "react";
import { useNavigate } from "react-router";

class AddRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            roomNumber: 0,
            roomCapacity: 0,
        }
    }

    add = () => {
        let { addRoom } = this.props;
        addRoom(this.state);
        this.props.navigate('/rooms/');
    }

    onClick = (event) => {
        // tutaj mozna walidowac dane przed wysłaniem
        this.add();
    }

    onChange = (event) => {
        let key = "";
        let value = event.target.value;

        switch(event.target.id)
        {
            case 'input-room-number':
                key = "roomNumber"
                break;
            case 'input-room-capacity':
                key = "roomCapacity"
                break;
            default:
                console.error(`Unhandled case: ${event.target.id}`);
                break;
        }

        if(key.length)
        {
            this.setState( prevState => {
                let state = prevState;
                state[ key ] = value;

                return {...state};
            });
        }
    }

    render()
    {
        return (<div>
            <input type="text" id="input-room-number" placeholder="Room number" onChange={ this.onChange } />
            <input type="text" id="input-room-capacity" placeholder="Room capacity" onChange={ this.onChange } />

            <button onClick={ this.onClick }> Add Room </button>
        </div>)
    }
}

const AddRoomHelper = (props) => (<AddRoom {...props} navigate={useNavigate()} />);
export default AddRoomHelper;