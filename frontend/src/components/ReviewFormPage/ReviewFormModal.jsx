import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createReview } from '../../store/reviews';
import './ReviewForm.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';

export default function ReviewFormModal({ spotId, onClose }) {
  const dispatch = useDispatch();

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (stars < 1) {
      setErrors({ stars: 'Star rating must be at least 1.' });
      return;
    }

    const reviewData = { review, stars };

    try {
      await dispatch(createReview(spotId, reviewData));
      onClose(); // Close the modal after successful submission
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <div className="review-form-modal">
      <h2>How was your stay?</h2>
      <form onSubmit={handleSubmit}>
        {errors.review && <p className="error">{errors.review}</p>}
        <textarea
          placeholder="Leave your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        {errors.stars && <p className="error">{errors.stars}</p>}
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((value) => (
            <span
              key={value}
              className={(hover || stars) >= value ? 'filled' : 'empty'}
              onClick={() => setStars(value)}
              onMouseEnter={() => setHover(value)}
              onMouseLeave={() => setHover(0)}
            >
              <FontAwesomeIcon icon={solidStar} />
            </span>
          ))}
        </div>

        <button type="submit" disabled={review.length < 10 || stars < 1}>
          Submit Your Review
        </button>
      </form>
    </div>
  );
}