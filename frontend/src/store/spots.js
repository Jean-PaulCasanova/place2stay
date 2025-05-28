// src/store/spots.js
import { csrfFetch } from './csrf';

// Action Types
const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT = 'spots/loadSpot';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot';

// Action Creators
const loadSpots = (spots) => ({ type: LOAD_SPOTS, spots });
const loadSpot = (spot) => ({ type: LOAD_SPOT, spot });
const addSpot = (spot) => ({ type: CREATE_SPOT, spot });
const deleteSpot = (spotId) => ({ type: DELETE_SPOT, spotId });

// Thunks
export const fetchAllSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots');
  const data = await res.json();
  console.log('Fetched spots:', data); // debug line for testing 
  dispatch(loadSpots(data.Spots));
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`);
  const data = await res.json();
  dispatch(loadSpot(data));
};

export const createSpot = (spotData) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    body: JSON.stringify(spotData)
  });
  const data = await res.json();
  dispatch(addSpot(data));
  return data;
};

export const deleteSpotById = (spotId) => async (dispatch) => {
  await csrfFetch(`/api/spots/${spotId}`, { method: 'DELETE' });
  dispatch(deleteSpot(spotId));
};

// Reducer
const initialState = {};

export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOTS: {
      const newState = {};
      action.spots.forEach(spot => newState[spot.id] = spot);
      return newState;
    }
    case LOAD_SPOT:
    case CREATE_SPOT: {
      return { ...state, [action.spot.id]: action.spot };
    }
    case DELETE_SPOT: {
      const newState = { ...state };
      delete newState[action.spotId];
      return newState;
    }
    default:
      return state;
  }
}