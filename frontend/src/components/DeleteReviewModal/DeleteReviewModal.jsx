import { useDispatch } from 'react-redux';
import { deleteReview } from '../../store/reviews'; 
import './DeleteReviewModal.css';

export default function DeleteReviewModal({ reviewId, closeModal }) {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    await dispatch(deleteReview(reviewId));
    closeModal(); // Close modal after deletion
  };

  return (
    <div className="delete-review-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="modal-buttons">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Review)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
}