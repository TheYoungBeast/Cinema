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
    return (<div>

    </div>)
}

export default TrendingScreenings;