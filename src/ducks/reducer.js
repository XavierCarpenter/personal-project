import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
const UPDATE_NAME = "UPDATE_NAME";
const GET_BUSINESSES = "GET_BUSINESSES"
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_CITY = "UPDATE_CITY";
const UPDATE_STATE = "UPDATE_STATE";
const SEARCH_INPUT = "SEARCH_INPUT";
const UPDATE_BUSNAME = "UPDATE_BUSNAME";
const UPDATE_BUSTYPE = "UPDATE_BUSTYPE";
const UPDATE_BUSCITY = "UPDATE_BUSCITY";
const UPDATE_BUSSTATE = "UPDATE_BUSSTATE";
const UPDATE_BUSBIO = "UPDATE_BUSBIO";
const UPDATE_BUSEMAIL = "UPDATE_BUSEMAIL";
const UPDATE_PROFILEPIC = "UPDATE_PROFILEPIC";

// ACTION CREATORS

export function getUser() {
  return {
    type: GET_USER,
    payload: axios
      .request({ url: "/api/me" })
      .then(response => response.data)
      .catch(err => err.message)
  };
}

export function updateName(e){
  return {
    type: UPDATE_NAME,
    payload: e
  };
}

export function updateProfilePic(e){
  return {
    type: UPDATE_PROFILEPIC,
    payload: e
    
  };
}

export function getBusinesses(){
  return {
    type: GET_BUSINESSES,
    payload: axios
    .get("/api/businesses")
    .then(response => response.data)
    .catch(console.log())
  };
}

export function searchInput(e){
  return {
    type: SEARCH_INPUT,
    payload: e
  };
}
export function updateCity(e){
  return {
    type: UPDATE_CITY,
    payload: e
  };
}

export function updateState(e){
  return {
    type: UPDATE_STATE,
    payload: e
  };
}
export function updateBusName(e){
  return {
    type: UPDATE_BUSNAME,
    payload: e
  };
}
export function updateBusType(e){
  return {
    type: UPDATE_BUSTYPE,
    payload: e
  };
}

export function updateBusCity(e){
  return {
    type: UPDATE_BUSCITY,
    payload: e
  };
}
export function updateBusState(e){
  return {
    type: UPDATE_BUSSTATE,
    payload: e
  };
}
export function updateBusBio(e){
  return {
    type: UPDATE_BUSBIO,
    payload: e
  };
}

export function updateBusEmail(e){
  return {
    type: UPDATE_BUSEMAIL,
    payload: e
  };
}

// INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  name: "",
  city: "",
  state: "",
  profilePic: "",
  email: "",
  location: "",
  search: "",
  busName: "",
  busType: "",
  busCity: "",
  busState: "",
  busBio: "",
  busEmail: ""


};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_USER}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        user: action.payload
      });

    case `${GET_USER}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case UPDATE_EMAIL:
      return Object.assign({}, state, { email: action.payload });

    case UPDATE_NAME:
      return Object.assign({}, state, { name: action.payload });

    case UPDATE_CITY:
      return Object.assign({}, state, { city: action.payload });

    case UPDATE_STATE:
      return Object.assign({}, state, { state: action.payload });

    case UPDATE_PROFILEPIC:
      return Object.assign({}, state, { profilePic: action.payload });

    case UPDATE_BUSNAME:
      return Object.assign({}, state, { busName: action.payload });

    case UPDATE_BUSTYPE:
      return Object.assign({}, state, { busType: action.payload });

    case UPDATE_BUSBIO:
      return Object.assign({}, state, { busBio: action.payload });

    case UPDATE_BUSCITY:
      return Object.assign({}, state, { busCity: action.payload });

    case UPDATE_BUSSTATE:
      return Object.assign({}, state, { busState: action.payload });

    case UPDATE_BUSEMAIL:
      return Object.assign({}, state, { busEmail: action.payload });

    case `${GET_BUSINESSES}_PENDING`:
      return Object.assign({}, state, { isLoading: true });

    case `${GET_BUSINESSES}_FULFILLED`:
      return Object.assign({}, state, {
        isLoading: false,
        businesses: action.payload
      });

    case `${GET_BUSINESSES}_REJECTED`:
      return Object.assign({}, state, { isLoading: false, didErr: true });

    case SEARCH_INPUT:
      console.log(action.payload);
      return Object.assign({}, state, { search: action.payload });
    default:
      return state;
  }
}
