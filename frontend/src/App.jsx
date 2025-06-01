import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import LandingPage from './components/LandingPage';
import SpotsListPage from './components/SpotsListPage';
import SpotDetailPage from './components/SpotDetailPage';
import CreateSpotFormPage from './components/CreateSpotFormPage';
import ReviewFormPage from './components/ReviewFormPage';
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
    element: <LandingPage />
  },
  {
    path: '/spots',
    element: <SpotsListPage />
  },
  {
    path: '/spots/:spotId',
    element: <SpotDetailPage />
  },
  {
    path: '/spots/new',
    element: <CreateSpotFormPage />
  },
  {
    path: '/spots/:spotId/reviews/new',
    element: <ReviewFormPage />
  }
 ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;