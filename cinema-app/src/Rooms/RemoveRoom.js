import React from "react";
import { useParams, useNavigate } from "react-router";

class RemoveRoom extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            room: props.rooms[this.props.params.id],
        };
    }

    onYesClick = () => {
        let { removeRoom } = this.props;
        removeRoom(this.state.room);
        this.props.navigate('../../');
    }

    onNoClick = () => {
        this.props.navigate('../../' + this.props.params.id);
    }

    render()
    {
        return (<div>
            <p>Would you like to remove Room: {this.state.room.roomNumber}??</p>
            <button onClick={this.onYesClick}>Yes</button> | <button onClick={this.onNoClick}>No</button>
        </div>);
    }
}

const RemoveRoomWrapper = (props) => (<RemoveRoom {...props} params={useParams()} navigate={useNavigate()} />)
export default RemoveRoomWrapper;