import React from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types';

function RemoveMovie(props)
{
    let { id } = useParams();
    let navigate = useNavigate();

    const onYesClick = () => {
        let { removeMovie } = props;
        removeMovie(id);
        navigate('../../');
    };

    const onNoClick = () => navigate('../../' + id);

    return (<div className="main-container">
        <div>
            <p>Would you like to remove: {props.movies[id].title} ?</p>
            <button onClick={ onYesClick }>Yes</button> | <button onClick={ onNoClick }>No</button>
        </div>
    </div>);
}

RemoveMovie.propTypes = {
    removeMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired
}

export default RemoveMovie;