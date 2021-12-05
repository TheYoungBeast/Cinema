import * as actions from '../actions/actions';

const initState = () => ({
    screenings: [],
    movies: [],
    rooms: []
});


function CinemaReducer(state = initState(), action)
{
    let nState = {};

    switch(action.type)
    {
        case actions.FETCH_DATA:
            return nState;

        case actions.ADD_MOVIE:
            return nState;

        case actions.ADD_ROOM:
            return nState;

        case actions.ADD_SCREENING:
            return nState;

        case actions.EDIT_MOVIE:
            return nState;

        case actions.EDIT_ROOM:
            return nState;

        case actions.EDIT_SCREENING:
            return nState;

        case actions.REMOVE_MOVIE:
            return nState;

        case actions.REMOVE_ROOM:
            return nState;

        case actions.REMOVE_SCREENING:
            return nState;

        default:
            return state;
    }
}

export default CinemaReducer;
