import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../Components/SideBar';


const Trainers = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer />
      <main className="flex w-full h-full">
        <SideBar />
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Trainers;