// App.jsx
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { updatePerformance } from "./Features/authSlice"; // ← ADD THIS

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const saved = localStorage.getItem("nav_performance");
    if (saved) {
      dispatch(updatePerformance({ newPerformance: saved }));
    }
  }, [dispatch]);

  return (
    <div>
      <ToastContainer />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default App;