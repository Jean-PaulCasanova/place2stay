// components/ManageSpotsPage/ManageSpotsPage.jsx
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUserSpots, deleteSpotById } from '../../store/spots';
import DeleteSpotModal from '../DeleteSpotModal/DeleteSpotModal';
import './ManageSpotsPage.css';

export default function ManageSpotsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots));
  const sessionUser = useSelector(state => state.session.user);

  const [showModal, setShowModal] = useState(false);
  const [spotToDelete, setSpotToDelete] = useState(null);

  useEffect(() => {
    if (sessionUser) dispatch(fetchCurrentUserSpots());
  }, [dispatch, sessionUser]);

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const openDeleteModal = (spotId) => {
    setSpotToDelete(spotId);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    await dispatch(deleteSpotById(spotToDelete));
    setShowModal(false);
    setSpotToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setSpotToDelete(null);
  };

  if (!spots.length) {
    return (
      <div className="manage-spots-container">
        <h1>Manage Spots</h1>
        <button onClick={() => navigate('/spots/new')}>
          Create a New Spot
        </button>
      </div>
    );
  }

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      <div className="spot-tiles-grid">
        {spots.map(spot => (
          <div
            key={spot.id}
            className="spot-tile"
            onClick={() => navigate(`/spots/${spot.id}`)}
          >
            <img src={spot.previewImage} alt={spot.name} />
            <div className="spot-info">
              <div>{spot.city}, {spot.state}</div>
              <div>⭐ {spot.avgRating || 'New'}</div>
              <div>${spot.price} night</div>
            </div>
            <div className="spot-buttons">
              <button onClick={(e) => {
                e.stopPropagation();
                handleUpdate(spot.id);
              }}>
                Update
              </button>
              <button onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(spot.id);
              }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <DeleteSpotModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}