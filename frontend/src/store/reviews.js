import { csrfFetch } from './csrf';

//action types

const LOAD_REVIEWS = 'reviews/loadReviews';
const ADD_REVIEW = 'reviews/addReview';
const DELETE_REVIEW = 'reviews/deleteReview';

//action creators

const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    reviews
  });
  
  const addReview = (review) => ({
    type: ADD_REVIEW,
    review
  });
  
  const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
  });

  // THUNKS

  export const fetchReviewsBySpot = (spotId) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
    const data = await res.json();
    dispatch(loadReviews(data.Reviews));
  };

  export const createReview = (spotId, reviewData) => async (dispatch) => {
    const res = await csrfFetch(`/api/spots/${spotId}/reviews`, {
      method: 'POST',
      body: JSON.stringify(reviewData)
    });
  
    if (res.ok) {
      const data = await res.json();
      dispatch(addReview(data));
      return data;
    } else {
      const error = await res.json();
      throw error;
    }
  };

  export const deleteReviewById = (reviewId) => async (dispatch) => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
  
    if (res.ok) {
      dispatch(deleteReview(reviewId));
    }
  };

  //Reducer
  const initialState = {};

export default function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const newState = {};
      action.reviews.forEach(review => {
        newState[review.id] = review;
      });
      return newState;
    }
    case ADD_REVIEW: {
      return {
        ...state,
        [action.review.id]: action.review
      };
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.reviewId];
      return newState;
    }
    default:
      return state;
  }
}