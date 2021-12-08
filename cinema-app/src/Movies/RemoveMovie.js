import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import PropTypes from 'prop-types';

function RemoveMovie(props)
{
    let { id } = useParams();
    let navigate = useNavigate();

    const [movie, setMovie] = useState(props);
    useEffect(() => setMovie(props.movies[id]), [props]);

    const onYesClick = () => {
        let { removeMovie } = props;
        removeMovie(id);
        navigate('../../');
    };

    const onNoClick = () => navigate('../../' + id);

    return movie ?
    (<div className="main-container">
        <div>
            <p>Would you like to remove: {movie.title} ?</p>
            <button onClick={ onYesClick }>Yes</button> | <button onClick={ onNoClick }>No</button>
        </div>
    </div>) : null;
}

RemoveMovie.propTypes = {
    removeMovie: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired
}

export default RemoveMovie;