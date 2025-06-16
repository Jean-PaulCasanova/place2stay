// DeleteSpotModal.jsx
import './DeleteSpotModal.css';

export default function DeleteSpotModal({ onConfirm, onCancel }) {
  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal">
        <h2>Confirm Delete</h2>
        <p>Are you sure you want to remove this spot?</p>
        <div className="delete-modal-buttons">
          <button className="delete-button" onClick={onConfirm}>
            Yes (Delete Spot)
          </button>
          <button className="cancel-button" onClick={onCancel}>
            No (Keep Spot)
          </button>
        </div>
      </div>
    </div>
  );
}