import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from './Auth/Login';
import NewUser from './NewUser';
import { ErrorBoundary } from './ErrorBoundary';
import store from './redux/store';
import './index.css'
import TrainerRegister from './Auth/TrainerSignup';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NewUser />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route path='trainer-register' element={<TrainerRegister />} />

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