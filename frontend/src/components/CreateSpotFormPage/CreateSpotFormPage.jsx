import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import './CreateSpotForm.css';

export default function CreateSpotFormPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('');
  const [country, setCountry] = useState('');
  const [lat, setLat] = useState('');
  const [lng, setLng] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [previewImage, setPreviewImage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSpot = {
      name,
      address,
      city,
      state: stateName,
      country,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      description,
      price: parseFloat(price),
      previewImage
    };

    console.log('Submitting spot:', newSpot);

    try {
      const createdSpot = await dispatch(createSpot(newSpot));
      navigate(`/spots/${createdSpot.id}`);
    } catch (err) {
      console.error('Error creating spot:', err);
    }
  };

  return (
    <div className="create-spot-container">
      <h1>Create a New Spot</h1>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <label>
          Spot Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Address
          <input type="text" value={address} onChange={e => setAddress(e.target.value)} required />
        </label>
        <label>
          City
          <input type="text" value={city} onChange={e => setCity(e.target.value)} required />
        </label>
        <label>
          State
          <input type="text" value={stateName} onChange={e => setStateName(e.target.value)} required />
        </label>
        <label>
          Country
          <input type="text" value={country} onChange={e => setCountry(e.target.value)} required />
        </label>
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
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </label>
        <label>
          Price per night
          <input type="number" value={price} onChange={e => setPrice(e.target.value)} min="0" required />
        </label>
        <label>
          Preview Image URL
          <input type="url" value={previewImage} onChange={e => setPreviewImage(e.target.value)} />
        </label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}