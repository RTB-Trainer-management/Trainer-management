import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../Components/SideBar';
import TopBar from '../Components/TopBar';


const SchoolManagement = () => {
  return (
    <div> 
      <ToastContainer />
      <main className='bg-gray-300 flex w-screen h-screen'>
        <SideBar />
        <div className='w-full' >
          <TopBar />
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default SchoolManagement;