import React from "react";
import { Link } from "react-router-dom";


class CinemaRooms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (event) => {
        let name = event.target.id;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    render() {
        
        return (<div className="main-container">
            
                <div key="room-list">
                    <h3>Room list:</h3>
                    <span> 
                        Search for a room: <input type="number" id="keyword" placeholder="Search by number..." onChange={ this.onChange } /> 
                    </span>
                    <ol>
                        { this.props.rooms.map((product, index) => {
                            if(product.roomNumber.includes(this.state.keyword))
                            return ( 
                                <li key={"room-item-"+index}>
                                    <p>
                                        <span>
                                            Room № <Link to={`/rooms/${index}`}>{product.roomNumber}</Link>
                                        </span>
                                        <span> Room capacity: {product.capacity}</span>
                                    </p>
                                </li>)
                            else return null;
                            })
                        }
                    </ol>
                </div>
    
                <Link to={'/rooms/add'}><button>Add Room</button></Link>
            </div>);
    }
}

export default CinemaRooms;