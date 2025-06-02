// src/components/SpotsListPage/SpotsList.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';
import '../LandingPage/Landing.css';

export default function SpotsListPage() {
  const dispatch = useDispatch();
  const spotsObj = useSelector(state => state.spots);
  const spots = Object.values(spotsObj || {});

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  if (!spots.length) return <p>Loading spots...</p>;

  return (
    <div className="spots-container">
      {spots.map(spot => (
        <Link key={spot.id} to={`/spots/${spot.id}`} title={spot.name}>
          <div className="spot-card">
            <img src={spot.previewImage} alt={spot.name} className="spot-thumbnail" />

            <div className="spot-header">
              <h2 className="spot-location">{spot.city}, {spot.state}</h2>

              <div className="name-rating">
                <p className="spot-name">{spot.name}</p>
                <p className="spot-rating">
                  ⭐ {typeof spot.avgRating === 'number' ? spot.avgRating.toFixed(1) : 'New'}
                </p>
              </div>
            </div>

            <p className="spot-price">${spot.price} night</p>
          </div>
        </Link>
      ))}
    </div>
  );
}