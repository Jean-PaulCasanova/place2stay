// src/components/SpotDetailPage/SpotDetailPage.jsx
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
  const sessionUser = useSelector(state => state.session.user);

  const reviews = useSelector(state =>
    Object.values(state.reviews).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  );

  const isOwner = sessionUser && sessionUser.id === spot?.Owner?.id;

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviewsBySpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <h2>Loading spot details...</h2>;

  const reviewCount = reviews.length;
  const rating = spot.avgStarRating !== null && !isNaN(spot.avgStarRating)
    ? Number(spot.avgStarRating).toFixed(1)
    : 'New';

  return (
    <div className="spot-detail-container">
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

      <div className="spot-images-container">
        <img
          className="spot-main-image"
          src={spot.SpotImages?.[0]?.url || spot.previewImage}
          alt="Main spot"
        />
        <div className="spot-thumbnails">
          {spot.SpotImages?.slice(1, 5).map((img, i) => (
            <img
              key={i}
              className="spot-thumb"
              src={img.url}
              alt={`Thumbnail ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="spot-layout">
        <div className="spot-main-content">
          <h2>Hosted by {spot.Owner?.firstName} {spot.Owner?.lastName}</h2>
          <p className="spot-description">{spot.description}</p>
        </div>

        <div className="spot-callout-box">
          <div className="price-rating-row">
            <span className="spot-price">${spot.price} <span className="per-night">night</span></span>
            <span className="spot-rating">
              ⭐ {rating}
              {reviewCount > 0 && (
                <>
                  <span className="dot-separator"> · </span>
                  <span>{reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}</span>
                </>
              )}
            </span>
          </div>
          <button className="reserve-button" onClick={() => alert('Feature coming soon')}>
            Reserve
          </button>
        </div>
      </div>

      {/* Review Summary Heading */}
      <div className="reviews-summary">
        <h2>
          <span>
            ⭐ {rating}
            {reviewCount > 0 && (
              <>
                <span className="dot-separator"> · </span>
                <span>{reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'}</span>
              </>
            )}
          </span>
        </h2>
      </div>

      {/* Review List */}
      <div className="reviews-section">
        {reviewCount === 0 ? (
          sessionUser && !isOwner ? (
            <p>Be the first to post a review!</p>
          ) : (
            <p>No reviews yet.</p>
          )
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-card">
              <p><strong>{review.User.firstName}</strong></p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p>{review.review}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}