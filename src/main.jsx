import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Auth/Login';
import NewUser from './NewUser';
import Signup from './Auth/School-management';
import Dde from './Auth/Dde';
import Rtb from './Auth/Rtb';
import Mayor from './Auth/Mayor';
import Seo from './Auth/SEO';
import { ErrorBoundary } from './ErrorBoundary';
import store from './redux/store';
import './index.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NewUser />}>
        <Route path="login" element={<Login />} />
         <Route path="school-management" element={<Signup />} /> 
          <Route path="Dde" element={<Dde />} /> 
          <Route path="Rtb" element={<Rtb />} />
          <Route path="Mayor" element={<Mayor />} /> 
        <Route path="Seo" element={<Seo />} /> 
      </Route>
    </>
  )
);

const rootElement = document.getElementById('root');
if (!rootElement._reactRootContainer) {
  const root = ReactDOM.createRoot(rootElement);
  rootElement._reactRootContainer = root;
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
          <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  );
} else {
  console.warn('main.jsx: createRoot already called, skipping'); // Debug
}