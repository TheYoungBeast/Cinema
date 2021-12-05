import * as api from "../api/api";

export const FETCH_DATA = 'FETCH_DATA';

export const ADD_MOVIE = 'ADD_MOVIE';
export const EDIT_MOVIE = 'EDIT_MOVIE';
export const REMOVE_MOVIE = 'REMOVE_MOVIE';

export const ADD_ROOM = 'ADD_ROOM';
export const EDIT_ROOM = 'EDIT_ROOM';
export const REMOVE_ROOM = 'REMOVE_ROOM';

export const ADD_SCREENING = 'ADD_SCREENING';
export const EDIT_SCREENING = 'EDIT_SCREENING';
export const REMOVE_SCREENING = 'REMOVE_SCREENING';

const fetchDataAction = (data) => ({
    type: FETCH_DATA,
    data: data
});

const addMovieAction = (movie) => ({
    type: ADD_MOVIE,
    movie: movie
});

const editMovieAction = (movie, id) => ({
    type: EDIT_MOVIE,
    movie: movie,
    id: id
});

const removeMovieAction = (id) => ({
    type: REMOVE_MOVIE,
    id: id
});

const addRoomAction = (room) => ({
    type: ADD_ROOM,
    room: room
});

const editRoomAction = (room, id) => ({
    type: EDIT_ROOM,
    room: room,
    id: id
});

const removeRoomAction = (id) => ({
    type: REMOVE_ROOM,
    id: id
});

const addScreeningAction = (screening) => ({
    type: ADD_SCREENING,
    screening: screening
});

const editScreeningAction = (screening, id) => ({
    type: EDIT_SCREENING,
    screening: screening,
    id: id
});

const removeScreeningAction = (id) => ({
    type: REMOVE_SCREENING,
    id: id
});

export const fetchData = () => (dispatch) => {
    apiFetchData().then( res => {
        if(res.status === 200)
            dispatch(fetchDataAction(res.data));
    }).catch( e => console.error(e) );
};

export const addMovie = (movie) => (dispatch) => {
    apiAddMovie(movie).then( res => {
        if(res.status === 201)
            dispatch(addMovieAction(movie));
    }).catch( e => console.error(e) );
};

export const editMovie = (movie, id) => (dispatch) => {
    apiEditMovie(movie, id).then( res => {
        if(res.status === 200)
            dispatch(editMovieAction(movie, id));
    }).catch( e => console.log(e) );
};

export const removeMovie = (id) => (dispatch) => {
    apiRemoveMovie(id).then( res => {
        if(res.status === 204)
            dispatch(removeMovieAction(id));
    }).catch( e => console.error(e) );
};

export const addRoom = (room) => (dispatch) => {
    apiAddRoom(room).then( res => {
        if(res.status === 201)
            dispatch(addRoomAction(room));
    }).catch( e => console.error(e) );
};

export const editRoom = (room, id) => (dispatch) => {
    apiEditRoom(room).then( res => {
        if(res.status === 200)
            dispatch(editRoomAction(room, id));
    }).catch( e => console.error(e) );
};

export const removeRoom = (id) => (dispatch) => {
    apiRemoveRoom(id).then( res => {
        if(res.status == 204)
            dispatch(removeRoomAction(id));
    }).catch( e => console.error(e) );
};

export const addScreening = (screening) => (dispatch) => {
    apiAddScreening(screening).then( res => {
        if(res.status === 201)
            dispatch(addScreeningAction(screening));
    }).catch( e => console.error(e) );
};

export const editScreening = (screening, id) => (dispatch) => {
    apiEditScreening(screening, id).then( res => {
        if(res.status === 200)
            dispatch(editScreeningAction(screening, id));
    }).catch( e => console.error(e) );
};

export const removeScreening = (id) => (dispatch) => {
    apiRemoveScreening(id).then( res => {
        if(res.status === 204)
            dispatch(removeScreeningAction(id));
    }).catch( e => console.error(e) );
};