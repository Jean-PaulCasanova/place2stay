// components/ManageSpotsPage/ManageSpotsPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchCurrentUserSpots, deleteSpotById } from '../../store/spots';
import './ManageSpotsPage.css';

export default function ManageSpotsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) dispatch(fetchCurrentUserSpots());
  }, [dispatch, sessionUser]);

  const handleUpdate = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const handleDelete = async (spotId) => {
    if (window.confirm('Are you sure you want to delete this spot?')) {
      await dispatch(deleteSpotById(spotId));
    }
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
              <button onClick={(e) => { e.stopPropagation(); handleUpdate(spot.id); }}>
                Update
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(spot.id); }}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}