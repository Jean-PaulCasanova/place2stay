import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import { fetchReviewsBySpot } from '../../store/reviews';
import ReviewFormModal from '../ReviewFormPage/ReviewFormModal';
import DeleteReviewModal from '../DeleteReviewModal/DeleteReviewModal';
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
  const hasUserReviewed = sessionUser && reviews.some(review => review.userId === sessionUser.id);

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
    dispatch(fetchReviewsBySpot(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <h2>Loading spot details...</h2>;

  const reviewCount = reviews.length;
  const rating = spot.avgStarRating !== null && !isNaN(spot.avgStarRating)
    ? Number(spot.avgStarRating).toFixed(1)
    : 'New';

  const openDeleteModal = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteModal(true);
  };

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

      {/* Review button for logged-in users who aren't the owner and haven't reviewed yet */}
      {sessionUser && !isOwner && !hasUserReviewed && (
        <button onClick={() => setShowReviewModal(true)} className="post-review-button">
          Post Your Review
        </button>
      )}
      {showReviewModal && (
        <ReviewFormModal spotId={spotId} onClose={() => setShowReviewModal(false)} />
      )}

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
              <p><strong>{review.User?.firstName || 'Anonymous'}</strong></p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p>{review.review}</p>

              {/* Delete Button (only for current user's reviews) */}
              {sessionUser && sessionUser.id === review.userId && (
                <button
                  className="delete-review-button"
                  onClick={() => openDeleteModal(review.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>

      {/* Delete Review Modal */}
      {showDeleteModal && reviewToDelete && (
        <DeleteReviewModal
          reviewId={reviewToDelete}
          closeModal={() => {
            setShowDeleteModal(false);
            setReviewToDelete(null);
          }}
        />
      )}
    </div>
  );
}