import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../Components/SideBar';


const SchoolManagement = () => {
  return (
    <div>
      <ToastContainer />
      <main className='bg-[#EAEAEA]'>
        <SideBar />
        <Outlet />
      </main>
    </div>
  );
};

export default SchoolManagement;