import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';

export default function SpotDetailsPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector(state => state.spots[spotId]);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <h2>Loading spot details...</h2>;

  return (
    <div>
      <h1>{spot.name}</h1>
      <p>{spot.city}, {spot.state}</p>
      <p>${spot.price} / night</p>
      <p>{spot.description}</p>
      <img src={spot.previewImage} alt={spot.name} />
    </div>
  );
}