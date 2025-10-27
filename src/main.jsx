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
import ResetPassword from './Auth/ResetPassword';
import ChangePassword from './Auth/ChangePassword';
import CheckEmail from './Auth/CheckEmail';
import VerifyCode from './Auth/VerifyCode';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<NewUser />}>
        <Route path="login" element={<Login />} />
        {/* <Route path="register" element={<Register />} /> */}
        <Route path='trainer-register' element={<TrainerRegister />} />
        <Route path='reset' element={<ResetPassword />} />
        <Route path='change-password' element={<ChangePassword /> } />
        <Route path='email' element={<CheckEmail />} />
        <Route path='verify' element={<VerifyCode />} />
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