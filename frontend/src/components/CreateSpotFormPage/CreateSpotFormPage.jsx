import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createSpot } from '../../store/spots';
import { useNavigate } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
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
  const [imageUrls, setImageUrls] = useState(['']);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    return () => {
      setName('');
      setAddress('');
      setCity('');
      setStateName('');
      setCountry('');
      setLat('');
      setLng('');
      setDescription('');
      setPrice('');
      setImageUrls(['']);
      setPreviewIndex(0);
      setErrors({});
    };
  }, []);

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

    const validationErrors = {};
    if (!country.trim()) validationErrors.country = "Country is required";
    if (!address.trim()) validationErrors.address = "Street address is required";
    if (!city.trim()) validationErrors.city = "City is required";
    if (!stateName.trim()) validationErrors.state = "State is required";
    if (!description.trim() || description.length < 30)
      validationErrors.description = "Description needs 30 or more characters";
    if (!name.trim()) validationErrors.name = "Title is required";
    if (!price || price <= 0) validationErrors.price = "Price must be greater than 0";
    if (!imageUrls[0].trim()) validationErrors.previewImage = "Preview image is required";
    imageUrls.forEach((url, i) => {
      if (url && !url.match(/^https?:\/\/.+\.(jpg|jpeg|png)$/i)) {
        validationErrors[`image-${i}`] = "Image URL must end in .jpg, .jpeg, or .png";
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const createdSpot = await dispatch(createSpot(newSpot));

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

      navigate(`/spots/${createdSpot.id}`);
    } catch (err) {
      console.error('Error creating spot or image:', err);
    }
  };

  return (
    <div className="create-spot-container">
      <h1>Create a New Spot</h1>
      <form className="create-spot-form" onSubmit={handleSubmit}>
        <section>
          <h2>Create a title for your spot</h2>
          <p>Catch guests attention with a spot title that highlights what makes your place special</p>
        </section>
        <label>
          Spot Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name of your spot" />
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

        <section>
          <h2>Where&aposs your place located?</h2>
          <p>Guests will only get your exact address once they booked a reservation.</p>
        </section>
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

        <section>
          <h2>Describe your place to guests</h2>
          <p>Mention the best features of your space, any special amenities, and what you love about the neighborhood</p>
        </section>
        <label>
          Description
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Please write at least 30 characters"
          />
        </label>
        {errors.description && <p className="error">{errors.description}</p>}

        <section>
          <h2>Set a base price for your spot</h2>
          <p>Competitive pricing can help your listing stand out and rank higher in search results.</p>
        </section>
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

        <section>
          <h2>Liven up your spot with photos</h2>
          <p>Submit a link to at least one photo to publish your spot.</p>
        </section>
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
              required={idx === 0}
              placeholder={idx === 0 ? "Preview Image URL" : `Image URL #${idx + 1}`}
            />
            {errors[`image-${idx}`] && <p className="error">{errors[`image-${idx}`]}</p>}
            {idx === 0 && errors.previewImage && <p className="error">{errors.previewImage}</p>}
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
                  if (previewIndex === idx) setPreviewIndex(0);
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

        <button type="submit">Create Spot</button>
      </form>
    </div>
  );
}