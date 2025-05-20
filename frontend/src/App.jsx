import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import { Modal } from './context/Modal';
import SpotsListPage from './components/SpotsListPage';
import SpotDetailPage from './components/SpotDetailPage'
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
    element: <SpotsListPage /> /*we need to switch this back to just the home landing page*/
  },
  {
    path: '/spots',
    element: <SpotsListPage />
  },
  {
    path: '/spots/:spotId',
    element: <SpotDetailPage />
  }
 ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;