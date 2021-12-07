import '../css/Trending.css';

import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class TrendingScreenings extends React.Component {
    constructor(props) { 
        super(props)
        this.state = {
            firstDate: '',
            secondDate: '',
            ranking: [],
        }
    }

    compare = (a, b) => { 

    }

    onChange = (event) => { 
        let name = event.target.id;
        let value = event.target.value;
        this.setState({
            [name]: value
        })
    }

    onClick = () => {
        let firstDate = new Date(this.state.firstDate.split('-')[0], this.state.firstDate.split('-')[1] - 1, this.state.firstDate.split('-')[2]);
        let secondDate = new Date(this.state.secondDate.split('-')[0], this.state.secondDate.split('-')[1] - 1, this.state.secondDate.split('-')[2]);

       // console.log(firstDate)
       // console.log(secondDate)

        let ranking = {}
        this.props.movies.forEach((movie, index) => {
            this.props.screenings.forEach((screening) => {
                let screeningDate = new Date(screening.date.split('.')[2], screening.date.split('.')[1] - 1, screening.date.split('.')[0])
                if(screening.movieId === index && screeningDate >= firstDate && screeningDate <= secondDate) { 
                    ranking[movie.title] = ranking[movie.title] === undefined ? screening.occupation.length : Number(ranking[movie.title] + screening.occupation.length)
                }
            })    
        });

        let moviesRanking = Object.keys(ranking).map(function(key) {
            return [key, ranking[key]]
        })

        moviesRanking.sort(function(first, second){ 
            return second[1] - first[1]
        })

        this.setState({
            ranking: moviesRanking
        })
    }
    render() {
        return (<div className="main-container">
            <div className="container-table">
                <h2>Trending Movies</h2>
                <span>
                    <label for="firstDate">Start date: </label>
                    <input type="date" id="firstDate" placeholder="Search by date..." onChange={ this.onChange } />
                    <label for="seconDate">End date:</label>
                    <input type="date" id="secondDate" placeholder="Search by date..." onChange={ this.onChange } />
                </span>
                <button className="action-button" onClick={ this.onClick }>Search</button>
                <ul className="responsive-table">
                    <li className="table-header">
                        <div className="col col-1">rank</div>
                        <div className="col col-2">name</div>
                        <div className="col col-3">popularity</div>
                        <div className="col col-4">details</div>
                    </li>
                    { 
                        this.state.ranking.map((element, index) => {
                            let awards = [(<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal2.png"/>), 
                                    (<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal-second-place.png"/>),
                                    (<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal2-third-place.png"/>)];
                            let award = index + 1 <=3 ? awards[index] : null;
                            return (
                                
                                <li className="table-row">
                                    <div className="col col-1" data-label="Rank">{award ? award : (index + 1)}</div>
                                    <div className="col col-2" data-label="Name">{element[0]}</div>
                                    <div className="col col-3" data-label="Amount">{element[1]}</div>
                                    <div className="col col-4" data-label="Details"><Link to={`/movies/${index}`}>see more</Link></div>
                                </li>);
                        })
                    }
                </ul>
            </div>
        </div>
        );
    }
}

TrendingScreenings.propTypes = {
    screenings: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
}

export default TrendingScreenings;