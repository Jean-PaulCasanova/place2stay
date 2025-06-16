import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createReview } from '../../store/reviews';
import './ReviewForm.css';

export default function ReviewFormPage() {
  const dispatch = useDispatch();
  const { spotId } = useParams();
  const navigate = useNavigate(); 

  const [review, setReview] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const reviewData = { review, stars: parseInt(stars) };

    try {
      await dispatch(createReview(spotId, reviewData));
      navigate(`/spots/${spotId}`);
    } catch (err) {
      const data = await err.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <div className="review-form-container">
      <h2>Leave a Review</h2>
      <form onSubmit={handleSubmit}>
        {errors.review && <p className="error">{errors.review}</p>}
        <textarea
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
          required
        />

        {errors.stars && <p className="error">{errors.stars}</p>}
        <label>
          Star Rating (1-5)
          <input
            type="number"
            min="1"
            max="5"
            value={stars}
            onChange={(e) => setStars(e.target.value)}
            required
          />
        </label>

        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

