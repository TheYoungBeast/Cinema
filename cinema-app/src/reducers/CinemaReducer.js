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
            nState = Object.assign({}, action.data);
            return nState;

        case actions.ADD_MOVIE:
            nState = Object.assign({}, state);
            nState.movies.push(action.movie);
            return nState;

        case actions.ADD_ROOM:
            nState = Object.assign({}, state);
            nState.rooms.push(action.room);
            return nState;

        case actions.ADD_SCREENING:
            nState = Object.assign({}, state);
            nState.screenings.push(action.screening);
            return nState;

        case actions.EDIT_MOVIE:
            nState = Object.assign({}, state);
            nState.movies[action.id] = action.room;
            return nState;

        case actions.EDIT_ROOM:
            nState = Object.assign({}, state);
            nState.rooms[action.id] = action.room;
            return nState;

        case actions.EDIT_SCREENING:
            nState = Object.assign({}, state);
            nState.screenings[action.id] = action.screening;
            return nState;

        case actions.REMOVE_MOVIE:
            nState = Object.assign({}, state);
            nState.movies.splice(action.id, 1);
            return nState;

        case actions.REMOVE_ROOM:
            nState = Object.assign({}, state);
            nState.rooms.splice(action.id, 1);
            return nState;

        case actions.REMOVE_SCREENING:
            nState = Object.assign({}, state);
            nState.screenings.splice(action.id, 1);
            return nState;

        default:
            return state;
    }
}

export default CinemaReducer;
