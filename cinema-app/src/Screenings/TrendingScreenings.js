import '../css/Trending.css';

import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'

class TrendingScreenings extends React.Component {
    constructor(props) { 
        super(props)

        let popularAll = props.screenings.reduce( (dict, key) => {
            let title = props.movies[ key.movieId ].title;
            dict[ title ] = (dict[ title ] ?? 0) + key.occupation.length;
            return dict;
        }, {});

        let initRanking = Object.entries(popularAll).sort( ([,a], [,b]) => b-a );

        this.state = {
            firstDate: '',
            secondDate: '',
            ranking: initRanking,
        }
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
             <div className="container-trending">
                    <div className="input">
                        
                    </div>
                    <div className="input ">
                        <input className="input-field" type="date" id="firstDate"  max={new Date().toISOString().slice(0,10)} onChange={ this.onChange } />
                        <label className="input-label">Start date:</label>
                    </div>
                    <div className="input">
                        <input className="input-field" type="date" id="secondDate" max={new Date().toISOString().slice(0,10)} onChange={ this.onChange } />
                        <label className="input-label">End date:</label>
                    </div>

                    <button className="action-button" onClick={ this.onClick }>Search</button>
                </div>
            <div className="container-table">
                
                { this.state.ranking.length ? 
                (<ul className="responsive-table">
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
                </ul>) : <p style={{margin: "auto auto"}}>Seems like there were no screenings played at that time.</p> }
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