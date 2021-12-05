import React from "react";
import { useParams } from "react-router";

import '../css/ScreeningDetails.css';
import '../css/purchase.css';

function PurchaseDetails(props)
{
    return (
    <div className="card">
        <div className="checkmark-container">
            <i className="checkmark">✓</i>
        </div>
        <h1>Success</h1> 
        <p>Thanks for buying tickets in our Cinema<br/> Your reserved seats: </p>
        <p>{props.seats.join(', ')}</p>
    </div>);
}

class ScreeningDetails extends React.Component
{
    constructor(props)
    {
        super(props);
        const { id } = props.params;
        const { roomId, movieId } = props.screenings[id];

        const maxRowNo = 7;
        let bestRowNo = 0;
        let bestRestModulo = props.rooms[roomId].capacity % maxRowNo;

        for(let i = 4; i <= maxRowNo; i++ )
        {
            let modulo = props.rooms[roomId].capacity % i;
            if(modulo <= bestRestModulo)
            {
                bestRestModulo = modulo;
                bestRowNo = i;
            }
        }

        this.state = {
            id: id,
            movie: props.movies[movieId],
            room: props.rooms[roomId],
            screening: props.screenings[id],
            bestRowNo: bestRowNo,
            selectedSeats: [],
            purchased: false
        }
    }

    onBuyTickets = () => {
        const { editScreening } = this.props;
        let screening = Object.assign({}, this.state.screening);
        screening.occupation = screening.occupation.concat(...this.state.selectedSeats)
        screening.id = this.state.id;
        editScreening(screening);
        this.setState({purchased: true});
    }
    
    onSeatSelected = (event) => {
        if(event.target.nodeName === "DIV")
        {
            if(!Array.from(event.target.classList).includes("active"))
            {
                let seatNumber = parseInt(event.target.dataset.seatNo);

                if(!seatNumber || isNaN(seatNumber))
                    return;

                event.target.classList.toggle("selected");

                if(!this.state.selectedSeats.includes(seatNumber))
                {
                    this.setState(prevState => {
                        return { selectedSeats: [...prevState.selectedSeats, seatNumber] };
                    })
                }
                else
                {
                    this.setState(prevState => {
                        let id = prevState.selectedSeats.indexOf(seatNumber);
                        prevState.selectedSeats.splice(id, 1);

                        return { selectedSeats: [...prevState.selectedSeats] };
                    })
                }
            }
        }
    };

    render()
    {
        const rowNo = this.state.bestRowNo;
        const seatsCount = this.state.room.capacity;
        const seatsPerSide = seatsCount/2;
        const seatsPerRow = Math.ceil(seatsPerSide/rowNo);
        const rows = new Array(rowNo);
        rows.fill(undefined);
        const seatsInRow = new Array(seatsPerRow);
        seatsInRow.fill(undefined);
        
        return this.state.purchased ? <PurchaseDetails seats={this.state.selectedSeats} /> : 
        (<div className="main-container">
            <ul>
                <li>Title: {this.state.movie.title}</li>
                <li>Duration: {this.state.movie.duration}</li>
                <li>{this.state.screening.date} {this.state.screening.hours}</li>
                <li>Room No: {this.state.room.roomNumber}</li>
                <li>Ticekts left: {this.state.room.capacity-this.state.screening.occupation.length}</li>
            </ul>

            <div className="theatre" onClick={ this.onSeatSelected }>
                <div className="cinema-seats left">
                {
                    rows.map( (element, index) => {
                        return (<div key={`cinema-left-row row-${index+1}`} className={`cinema-row row-${index+1}`}> 
                            {
                                seatsInRow.map((v, i) => {
                                    let seatNo = (index+1)+(i*rowNo);
                                    const active = this.state.screening.occupation.includes(seatNo);
                                    return <div key={`cinema-left-row seat-${seatNo}`} className={ active ? "seat active" : "seat" } data-seat-no={seatNo}>{ seatNo }</div>;
                                })
                            }
                        </div>);
                    })
                }
                </div>

                <div className="cinema-seats right">
                {
                    rows.map( (e, index) => {
                        return (<div key={`cinema-right-row row-${index+1}`} className={`cinema-row row-${index+1}`}>
                            {
                                seatsInRow.map((v, i) => {
                                    let seatNo = (rowNo * seatsPerRow) + (index+1) + (rowNo*i);
                                    const active = this.state.screening.occupation.includes(seatNo) || (seatNo > this.state.room.capacity);
                                    return <div key={`cinema-right-row seat-${seatNo}`} className={ active ? "seat active" : "seat" } data-seat-no={seatNo}>{ seatNo }</div>;
                                })
                            }
                        </div>);
                    })
                }
                </div>
            </div>
            
            {this.state.selectedSeats.length ? (<button onClick={ this.onBuyTickets }>Buy tickets</button>) : (<button disabled>Buy tickets</button>)}
        </div>);
    }
}

const ScreeningDetailsHelper = (props) => (<ScreeningDetails {...props} params={useParams()} />);
export default ScreeningDetailsHelper;