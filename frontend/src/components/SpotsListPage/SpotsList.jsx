import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import './SpotsList.css';

export default function SpotsListPage() {
  const dispatch = useDispatch();
  const spotsState = useSelector(state => state.spots);
console.log('Spots state:', spotsState);

const spots = Object.values(spotsState?.Spots || {});

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  if (!spots.length) return <p>Loading spots...</p>;

  return (
    <div className="spots-list-container">
      {spots.map((spot) => (
        <div key={spot.id} className="spot-card">
          <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name} className="spot-image" />
            <div className="spot-info">
              <div className="spot-location">
                {spot.city}, {spot.state}
              </div>
              <div className="spot-rating">★ {spot.avgRating?.toFixed(1) || 'New'}</div>
              <div className="spot-name">{spot.name}</div>
              <div className="spot-price">${spot.price} / night</div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}