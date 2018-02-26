import axios from "axios";

// CONSTANTS

const GET_USER = "GET_USER";
const GET_INFO = "GET_INFO";
const UPDATE_EMAIL = "UPDATE_EMAIL";
const UPDATE_CITY = "UPDATE_CITY";

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


// INITIAL STATE

const initialState = {
  user: {},
  isLoading: false,
  didErr: false,
  errMessage: null,
  email: "",
  city: ""
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
    default:
      return state;
  }
}
