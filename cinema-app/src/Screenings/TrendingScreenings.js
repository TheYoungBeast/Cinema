import '../css/Trending.css';

import React from "react";
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'


const date_now = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}

function TrendingScreenings(props)
{
    date_now();

    let tickets = props.screenings.reduce( (dict, key) => {
        dict[ key.movieId ] = (dict[ key.movieId ] ?? 0) + key.occupation.length;
        return dict;
    }, {});

    let rank = Object.entries(tickets)
    .sort( ([,a], [,b]) => b-a )
    .map( ([key, val]) => [parseInt(key), val] );

    return (<div className="main-container">
        <div className="container-table">
            <h2>Trending Movies</h2>
            <ul className="responsive-table">
                <li className="table-header">
                    <div className="col col-1">rank</div>
                    <div className="col col-2">name</div>
                    <div className="col col-3">popularity</div>
                    <div className="col col-4">details</div>
                </li>
                { 
                    rank.map( (entry, i) => {
                        const id = parseInt(entry[0]);
                        const title = props.movies[id].title;
                        let rank = i+1;

                        let awards = [(<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal2.png"/>), 
                                    (<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal-second-place.png"/>),
                                    (<img alt="" src="https://img.icons8.com/ios-filled/50/000000/medal2-third-place.png"/>)];
                        let award = rank <=3 ? awards[rank-1] : null;

                        return (
                            <li className="table-row">
                                <div className="col col-1" data-label="Rank">{award ? award : rank}</div>
                                <div className="col col-2" data-label="Name">{title}</div>
                                <div className="col col-3" data-label="Amount">{entry[1]}</div>
                                <div className="col col-4" data-label="Details"><Link to={`/movies/${id}`}>see more</Link></div>
                            </li>);
                        })
                }
            </ul>
        </div>
        {
            rank.map( entry => {
                const id = parseInt(entry[0]);
                const title = props.movies[id].title;
                return <div key={`${title}-${id}`}>{title} {entry[1]} tickets</div>; })
        }
        </div>
    );
}

TrendingScreenings.propTypes = {
    screenings: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
}

export default TrendingScreenings;