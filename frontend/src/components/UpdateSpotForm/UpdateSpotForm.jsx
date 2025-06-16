import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchSpotDetails, updateSpot } from '../../store/spots'; // Make sure these exist
import './UpdateSpotForm.css';

export default function UpdateSpotForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { spotId } = useParams();

  const spot = useSelector(state => state.spots[spotId]);

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!spot) {
      dispatch(fetchSpotDetails(spotId));
    } else {
      // Pre-fill form with current values
      setName(spot.name);
      setAddress(spot.address);
      setCity(spot.city);
      setStateName(spot.state);
      setCountry(spot.country);
      setLat(spot.lat);
      setLng(spot.lng);
      setDescription(spot.description);
      setPrice(spot.price);
    }
  }, [dispatch, spot, spotId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!country.trim()) validationErrors.country = "Country is required";
    if (!address.trim()) validationErrors.address = "Street address is required";
    if (!city.trim()) validationErrors.city = "City is required";
    if (!stateName.trim()) validationErrors.state = "State is required";
    if (!description.trim() || description.length < 30)
      validationErrors.description = "Description needs 30 or more characters";
    if (!name.trim()) validationErrors.name = "Title is required";
    if (!price || price <= 0) validationErrors.price = "Price must be greater than 0";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const updatedSpot = {
      id: spotId,
      name,
      address,
      city,
      state: stateName,
      country,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      description,
      price: parseFloat(price)
    };

    try {
      const result = await dispatch(updateSpot(updatedSpot));
      if (result) {
        navigate(`/spots/${spotId}`);
      }
    } catch (err) {
      console.error('Failed to update spot:', err);
    }
  };

  if (!spot) return <p>Loading...</p>;

  return (
    <div className="update-spot-container">
      <h1>Update your Spot</h1>
      <form className="update-spot-form" onSubmit={handleSubmit}>
        <label>
          Spot Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}

        <label>
          Address
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
        </label>
        {errors.address && <p className="error">{errors.address}</p>}

        <label>
          City
          <input type="text" value={city} onChange={e => setCity(e.target.value)} />
        </label>
        {errors.city && <p className="error">{errors.city}</p>}

        <label>
          State
          <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} />
        </label>
        {errors.state && <p className="error">{errors.state}</p>}

        <label>
          Country
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} />
        </label>
        {errors.country && <p className="error">{errors.country}</p>}

        <label>
          Latitude
          <input type="number" step="any" value={lat} onChange={e => setLat(e.target.value)} />
        </label>

        <label>
          Longitude
          <input type="number" step="any" value={lng} onChange={e => setLng(e.target.value)} />
        </label>

        <label>
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}

        <label>
          Price per night (USD)
          <input
            type="number"
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price per night (USD)"
            min="0"
          />
        </label>
        {errors.price && <p className="error">{errors.price}</p>}

        <button type="submit">Update your Spot</button>
      </form>
    </div>
  );
}