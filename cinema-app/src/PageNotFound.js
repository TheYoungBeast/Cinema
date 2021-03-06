import React from 'react'

import './css/PageNotFound.css';

const PageNotFound = () => {
    return (
        <div className="main-container" id="wrapper">
            <img alt="404 not found img" src="https://i.imgur.com/qIufhof.png" />
            <div id="info">
                <h3>This page could not be found</h3>
            </div>
        </div >
    )
}

export default PageNotFound;