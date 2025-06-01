import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import { fetchReviewsBySpot } from '../../store/reviews';
import './SpotDetail.css';

export default function SpotDetailsPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector(state => state.spots[spotId]);
  const reviews = useSelector(state => Object.values(state.reviews));

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviewsBySpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <h2>Loading spot details...</h2>;

  return (
    <div className="spot-detail-container">
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}</p>
      
      <div className="spot-image-wrapper">
        <img src={spot.previewImage} alt={spot.name} className="spot-image" />
      </div>

      <div className="spot-info">
        <p className="spot-price"><strong>${spot.price}</strong> / night</p>
        <p className="spot-description">{spot.description}</p>
      </div>

      <div className="reviews-section">
        <h2>Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p><strong>{review.User.firstName}</strong></p>
              <p>{review.review}</p>
              <p>⭐ {review.stars}</p>
              <p className="review-date">{new Date(review.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}