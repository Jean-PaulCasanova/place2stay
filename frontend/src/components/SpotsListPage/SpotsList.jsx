// src/components/SpotsListPage/SpotsList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';

export default function SpotsListPage() {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj || {}); // <-- safeguard

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  if (!spots.length) return <p>Loading spots...</p>;

  return (
    <div className="spots-container">
      {spots.map(spot => (
        <Link key={spot.id} to={`/spots/${spot.id}`}>
          <div className="spot-card">
            <img src={spot.previewImage} alt={spot.name} />
            <h2>{spot.name}</h2>
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} / night</p>
            <p>⭐ {spot.avgRating}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}