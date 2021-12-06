import React from "react";
import { useNavigate } from "react-router";
import PropTypes from 'prop-types';

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
        return (
        <div className="container main-container">
            <div className="card-add-movie">
                <div className="card-image">	
                    <h2 className="card-heading">
                        Add Room
                        <small>Add place to enjoy fav movies</small>
                    </h2>
                </div>
                <form className="card-form">
                    <div className="input">
                        <input className="input-field" id="input-room-number" type="number" min="1" onChange={ this.onChange } value={ this.state.roomNumber.toString() } />
                        <label className="input-label">Room Number</label>
                    </div>
                    <div className="input">
                        <input className="input-field" id="input-room-capacity" type="number" min="10" onChange={ this.onChange } value={ this.state.capacity.toString() } />
                        <label className="input-label">Room Capacity</label>
                    </div>
                    <div className="action">
                        <button className="action-button" onClick={ this.onClick }> Add Room </button>
                    </div>
                </form>
                <div className="card-info">
                    Room number always contains 3 digits
                </div>
            </div>
        </div>);
    }
}

AddRoom.propTypes = {
    addRoom: PropTypes.func.isRequired
}

const AddRoomHelper = (props) => (<AddRoom {...props} navigate={useNavigate()} />);
export default AddRoomHelper;