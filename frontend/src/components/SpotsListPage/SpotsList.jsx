// src/components/SpotsListPage/SpotsList.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import '../LandingPage/Landing.css';


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
        <Link key={spot.id} to={`/spots/${spot.id}`} title={spot.name}>
          <div className="spot-card">
            <img src={spot.previewImage} alt={spot.name} />
            <h2>{spot.city}, {spot.state}</h2>
            <p>{spot.name}</p>
            <div className="rating-price">
            <span>⭐ {typeof spot.avgRating === 'number' ? spot.avgRating.toFixed(1) : 'New'}</span>
              <span>${spot.price} night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}