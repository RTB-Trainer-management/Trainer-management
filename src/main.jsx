import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Login from './Auth/Login';
import NewUser from './NewUser';
import Signup from './Auth/School-management';
import Dde from './Auth/Dde';
import Rtb from './Auth/Rtb';
import Mayor from './Auth/Mayor';
import Seo from './Auth/SEO';
import TrainerRegister from './Auth/TrainerSignup';
import ResetPassword from './Auth/ResetPassword';
import ChangePassword from './Auth/ChangePassword';
import CheckEmail from './Auth/CheckEmail';
import VerifyCode from './Auth/VerifyCode';
import { ErrorBoundary } from './ErrorBoundary';
import store from './redux/store';
import './index.css';
import SchoolManagement from './School Manager/SchoolManagement';
import Trainers from './Trainers/Trainers';
import ManagerDashboard from './School Manager/Dashboard';
import Performance from './School Manager/Perfomance';
import Vacant from './Recruitments/Vacant';
import Trainers2 from './Recruitments/Trainers';
import Transfers from './Recruitments/Transfers';
import RequireAuth from './Components/RequireAuth';
import TrainerDashboard from './Trainers/Dashboard';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route path="/user" element={<NewUser />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="school-management" element={<Signup />} />
        <Route path="dde" element={<Dde />} />
        <Route path="rtb" element={<Rtb />} />
        <Route path="mayor" element={<Mayor />} />
        <Route path="seo" element={<Seo />} />
        <Route path="trainer-register" element={<TrainerRegister />} />
        <Route path="reset" element={<ResetPassword />} />
        <Route path="change-password" element={<ChangePassword />} />
        <Route path="email" element={<CheckEmail />} />
        <Route path="verify" element={<VerifyCode />} />
      </Route>

      <Route element={<RequireAuth allowedRoles={['school_manager']} />}>
        <Route path='/' element={<SchoolManagement />} >
          <Route index element={<ManagerDashboard />} />
          <Route path='performance' element={<Performance />} />
          <Route path='recruitments/vacant-posts' element={<Vacant />} />
          <Route path='recruitments/trainers' element={<Trainers2 />} />
          <Route path='recruitments/transfers' element={<Transfers />} />
        </Route>
      </Route>

      <Route element={<RequireAuth allowedRoles={['trainer']} />}>
        <Route path='/trainers' element={<Trainers />} >
          <Route index element={<TrainerDashboard />} />
        </Route>
      </Route>
    </Route>
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
  console.warn('main.jsx: createRoot already called, skipping');
}
