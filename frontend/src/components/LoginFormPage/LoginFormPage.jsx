import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import './LoginForm.css';

function LoginFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Navigate to="/" replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();

        if (data?.errors) {
          setErrors(data.errors);
      } else if (data?.message) {
        setErrors({general: data.message });
      }
     }
    );
  };

  return (
    <>
      <h1>Log In</h1>
      <form className="login-form" onSubmit={handleSubmit}>
  <label htmlFor="credential">Username or Email</label>
  <input
    id="credential"
    type="text"
    value={credential}
    onChange={(e) => setCredential(e.target.value)}
    required
  />

  <label htmlFor="password">Password</label>
  <input
    id="password"
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
  />

  {errors.credential && <p className="error">{errors.credential}</p>}
  {errors.general && <p className="error">{errors.general}</p>}

  <button className="login-button" type="submit">Log In</button>
</form>
    </>
  );
}

export default LoginFormPage;