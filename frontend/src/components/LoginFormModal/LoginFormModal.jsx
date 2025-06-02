import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { useEffect } from 'react';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    return () => {
      setCredential("");
      setPassword("");
      setErrors({});
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
        setErrors(data.errors);
      }
     });
  };

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.credential && (
          <p>{errors.credential}</p>
        )}
        <button 
           type="submit"
           disabled={credential.length < 4 || password.length < 6}
        >
        Log In
      </button>
      <button
  type="button"
  onClick={() =>
    dispatch(sessionActions.login({
      credential: "demo@user.io",
      password: "password"
    })).then(closeModal)
  }
>
  Log in as Demo User
</button>
      </form>
    </>
  );
}

export default LoginFormModal;