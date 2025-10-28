import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../Components/SideBar';


const Trainers = () => {
  return (
    <div>
      <ToastContainer />
      <main>
        <SideBar />
        <Outlet />
      </main>
    </div>
  );
};

export default Trainers;