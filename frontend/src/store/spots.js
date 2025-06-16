// src/store/spots.js
import { csrfFetch } from './csrf';

// Action Types
const LOAD_SPOTS = 'spots/loadSpots';
const LOAD_SPOT = 'spots/loadSpot';
const CREATE_SPOT = 'spots/createSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const DELETE_SPOT = 'spots/deleteSpot';

// Action Creators
const loadSpots = (spots) => ({ type: LOAD_SPOTS, spots });
const loadSpot = (spot) => ({ type: LOAD_SPOT, spot });
const addSpot = (spot) => ({ type: CREATE_SPOT, spot });
const updateSpotAction = (spot) => ({ type: UPDATE_SPOT, spot });
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

export const uploadSpotImage = (spotId, imageData) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    body: JSON.stringify(imageData)
  });

  if (!res.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await res.json();
  return data;
};

export const fetchCurrentUserSpots = () => async dispatch => {
  const res = await fetch('/api/spots/current');

  if (res.ok) {
    const data = await res.json();
    dispatch(loadSpots(data.Spots)); 
    return data.Spots;
  } else {
    throw new Error('User has not created a spot yet')
  }
};

export const updateSpot = (spotData) => async (dispatch) => {
  const { id, ...body } = spotData;

  const res = await csrfFetch(`/api/spots/${id}`, {
    method: 'PUT',
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    throw new Error('Failed to update spot');
  }

  const data = await res.json();
  dispatch(addSpot(data));
  return data;
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
    case CREATE_SPOT:
    case UPDATE_SPOT: {
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

export const getSpotById = (spotId) => (state) => state.spots[spotId];