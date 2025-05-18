import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import SignupFormModal from './components/SignupFormModal';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import * as sessionActions from './store/session';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && <Outlet />}
      <Modal /> {/* <-- This is critical for modals to actually render */}
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
    path: '/',
    element: <h1>Welcome!</h1>
  },
  {
    path: "/signup",
    element: <SignupFormPage />
  }
 ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;