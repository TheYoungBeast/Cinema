import React from "react";
import { useParams, useNavigate } from "react-router";

class RemoveMovie extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            movie: props.movies[this.props.params.id],
        };
    }

    onYesClick = () => {
        let { removeMovie } = this.props;
        removeMovie(this.state.movie);
        this.props.navigate('../../');
    }

    onNoClick = () => {
        this.props.navigate('../../' + this.props.params.id);
    }

    render()
    {
        return (<div>
            <p>Would you like to remove: {this.state.movie.movieTitle}??</p>
            <button onClick={this.onYesClick}>Yes</button> | <button onClick={this.onNoClick}>No</button>
        </div>);
    }
}

const RemoveMovieWrapper = (props) => (<RemoveMovie {...props} params={useParams()} navigate={useNavigate()} />)
export default RemoveMovieWrapper;