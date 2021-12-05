import React from "react";

const date_now = () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    return `${dd}.${mm}.${yyyy}`;
}

function TrendingScreenings(props)
{
    console.log(date_now());

    let tickets = props.screenings.reduce( (dict, key) => {
        dict[ key.movieId ] = (dict[ key.movieId ] ?? 0) + key.occupation.length;
        return dict;
    }, {});

    let rank = Object.entries(tickets)
    .sort( ([,a], [,b]) => b-a )
    .map( ([key, val]) => [parseInt(key), val] );

    return (<div>
        {
            rank.map( entry => {
                const id = parseInt(entry[0]);
                const title = props.movies[id].title;
                return <div key={`${title}-${id}`}>{title} {entry[1]} tickets</div>; })
        }
    </div>);
}

export default TrendingScreenings;