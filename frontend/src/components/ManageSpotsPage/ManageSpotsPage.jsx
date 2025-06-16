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
      <button onClick={() => navigate('/spots/new')} className="create-spot-button">
        Create a New Spot
      </button>

      <div className="spots-container">
        {spots.map(spot => (
          <div key={spot.id} className="spot-card">
            <img
              src={spot.previewImage || 'https://via.placeholder.com/300x200?text=No+Image'}
              alt={spot.name}
              className="spot-thumbnail"
              onClick={() => navigate(`/spots/${spot.id}`)}
            />

            <div className="spot-header" onClick={() => navigate(`/spots/${spot.id}`)}>
              <h2 className="spot-location">{spot.city}, {spot.state}</h2>
              <div className="name-rating">
                <p className="spot-name">{spot.name}</p>
                <p className="spot-rating">
                  ⭐ {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}
                </p>
              </div>
            </div>

            <p className="spot-price">${spot.price} night</p>

            <div className="manage-buttons">
              <button onClick={(e) => {
                e.stopPropagation();
                handleUpdate(spot.id);
              }}>Update</button>
              <button onClick={(e) => {
                e.stopPropagation();
                openDeleteModal(spot.id);
              }}>Delete</button>
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