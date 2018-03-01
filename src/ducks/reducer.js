import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
const GET_BUSINESSES = "GET_BUSINESSES"
// const GET_SUBS = "GET_SUBS";
// const UPDATE_SUBS ="UPDATE_SUBS";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_CITY = "UPDATE_CITY";
const SEARCH_INPUT = "SEARCH_INPUT";

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



// INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  email: "",
  location: "",
  search: "",
  businesses: "",

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

    case UPDATE_CITY:
      return Object.assign({}, state, { city: action.payload });

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
    // console.log(action.payload)
      return Object.assign({}, state, { search: action.payload });
    default:
      return state;
  }
}
