import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <NavLink to="/" className="logo">
          Place2Stay
        </NavLink>
      </div>
      <div className="nav-right">
      <ul>
  {isLoaded && sessionUser && (
    <li>
      <NavLink to="/spots/new" className="create-spot-link">
        Create a New Spot
      </NavLink>
    </li>
  )}
  {isLoaded && (
    <li>
      <ProfileButton user={sessionUser} />
    </li>
  )}
</ul>
      </div>
    </nav>
  );
}

export default Navigation;