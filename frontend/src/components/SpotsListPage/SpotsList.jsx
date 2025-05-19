import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';

export default function SpotsListPage() {
  const dispatch = useDispatch();
  const spots = useSelector(state => Object.values(state.spots));

  useEffect(() => {
    dispatch(fetchAllSpots());
  }, [dispatch]);

  return (
    <div className="grid grid-cols-3 gap-4">
      {spots.map(spot => (
        <Link key={spot.id} to={`/spots/${spot.id}`}>
          <div className="border rounded-lg p-4 shadow">
            <img src={spot.previewImage} alt={spot.name} />
            <h2 className="text-lg font-semibold">{spot.name}</h2>
            <p>{spot.city}, {spot.state}</p>
            <p>${spot.price} / night</p>
            <p>⭐ {spot.avgRating}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}