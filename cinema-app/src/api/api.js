import axios from "axios";

axios.defaults.baseURL = "http://localhost:7777";

export const apiFetchData = () => {
    return axios.get('/').then( res => res )
    .catch( error => console.error(error) );
};

export const apiAddMovie = (movie) => {
    return axios.post('/add/movie', movie, {headers: { 'Content-type': 'application/json'}})
    .then( res => res ) // new promise
    .catch( error => console.error(error) );
};

export const apiEditMovie = (movie, id) => {
    return axios.put(`/update/movie/${id}`, movie, {headers: { 'Content-type': 'application/json'}})
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiRemoveMovie = (id) => {
    return axios.delete(`/delete/movies/${id}`)
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiAddRoom = (room) => {
    return axios.post('/add/room', room, {headers: { 'Content-type': 'application/json'}})
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiEditRoom = (room, id) => {
    return axios.put(`/update/room/${id}`, room,  {headers: { 'Content-type': 'application/json'}})
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiRemoveRoom = (id) => {
    return axios.delete(`/delete/rooms/${id}`)
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiAddScreening = (screening) => {
    return axios.post('/add/screening', screening,  {headers: { 'Content-type': 'application/json'}})
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiEditScreening = (screening, id) => {
    return axios.put(`/update/screening/${id}`, screening, {headers: { 'Content-type': 'application/json'}})
    .then( res => res )
    .catch( error => console.error(error) );
};

export const apiRemoveScreening = (id) => {
    return axios.delete(`/delete/screenings/${id}`)
    .then( res => res )
    .catch( error => console.error(error) );
};