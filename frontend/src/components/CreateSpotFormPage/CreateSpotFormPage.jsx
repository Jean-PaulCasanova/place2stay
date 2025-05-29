import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf'; // ✅ Needed to post the image
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
  const [imageUrls, setImageUrls] = useState(['']); // Start with one input
  const [previewIndex, setPreviewIndex] = useState(0); // First image is preview by default
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
      price: parseFloat(price)
    };

    try {
      // Step 1: Create the spot
      const createdSpot = await dispatch(createSpot(newSpot));

// Upload images if the spot was created successfully
if (createdSpot && imageUrls.length > 0) {
  await Promise.all(imageUrls.map((url, index) =>
    csrfFetch(`/api/spots/${createdSpot.id}/images`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url,
        preview: index === previewIndex
      })
    })
  ));
}

      // Step 3: Redirect to new spot page
      navigate(`/spots/${createdSpot.id}`);
    } catch (err) {
      console.error('Error creating spot or image:', err);
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
  Image URLs (add at least one)
  {imageUrls.map((url, idx) => (
    <div key={idx}>
      <input
        type="url"
        value={url}
        onChange={(e) => {
          const newUrls = [...imageUrls];
          newUrls[idx] = e.target.value;
          setImageUrls(newUrls);
        }}
        required={idx === 0} // Require the first one
        placeholder={`Image URL #${idx + 1}`}
      />
      <label>
        <input
          type="radio"
          name="preview"
          checked={previewIndex === idx}
          onChange={() => setPreviewIndex(idx)}
        />
        Preview Image
      </label>
      {imageUrls.length > 1 && (
        <button
          type="button"
          onClick={() => {
            const newUrls = imageUrls.filter((_, i) => i !== idx);
            setImageUrls(newUrls);
            if (previewIndex === idx) setPreviewIndex(0); // Reset preview index if removed
            else if (previewIndex > idx) setPreviewIndex(previewIndex - 1);
          }}
        >
          Remove
        </button>
      )}
    </div>
  ))}
  <button
    type="button"
    onClick={() => setImageUrls([...imageUrls, ''])}
  >
    Add Another Image
  </button>
</label>
        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}