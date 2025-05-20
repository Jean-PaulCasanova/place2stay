import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSpotDetails } from '../../store/spots';
import './SpotDetail.css';

export default function SpotDetailsPage() {
  const { spotId } = useParams();
  const dispatch = useDispatch();

  const spot = useSelector(state => state.spots[spotId]);

  useEffect(() => {
    dispatch(fetchSpotDetails(spotId));
  }, [dispatch, spotId]);

  if (!spot) return <h2>Loading spot details...</h2>;

  return (
    <div className="spot-detail-container">
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}</p>
      
      <div className="spot-image-wrapper">
        <img src={spot.previewImage} alt={spot.name} className="spot-image" />
      </div>

      <div className="spot-info">
        <p className="spot-price"><strong>${spot.price}</strong> / night</p>
        <p className="spot-description">{spot.description}</p>
      </div>
    </div>
  );
}