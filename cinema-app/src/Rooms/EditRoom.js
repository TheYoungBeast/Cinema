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
             <div className="card-add-movie">
                <div className="card-image">	
                    <h2 className="card-heading">
                        Edit Movie
                        <small>Edit selected movie</small>
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
                        <button className="action-button" onClick={ this.onClick }>Edit</button>
                    </div>
                </form>
                <div className="card-info">
                    Room numbers always contain 3 digits
                </div>
            </div>
        </div>);
    }
}

EditRoom.propTypes = {
    editRoom: PropTypes.func.isRequired,
    rooms: PropTypes.array.isRequired
}

const EditRoomHelper = (props) => (<EditRoom {...props} params={useParams()} navigate={useNavigate()} />);
export default EditRoomHelper;