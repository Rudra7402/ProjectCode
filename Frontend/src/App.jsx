import { Routes,Route, Navigate } from "react-router";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"; 
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './authslice';
import { useEffect } from "react"; 
import ProblemPage from "./pages/ProblemPage";
import AdminPanel from "./pages/AdminPanel";
import Admin from "./pages/Admin";
import AdminDelete from "./components/AdminDelete";

function App(){

  const dispatch = useDispatch();
  const {isAuthenticated,user,loading} = useSelector((state)=>state.auth);

  // check initial authentication
  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <span className="loading loading-spinner loading-lg"></span>
    </div>;
  }

  return(
    <>
      <Routes>
        <Route path="/" element={isAuthenticated ?<Homepage></Homepage>:<Navigate to="/signup" />}></Route>
        <Route path="/login" element={isAuthenticated?<Navigate to="/" />:<Login></Login>}></Route>
        <Route path="/signup" element={isAuthenticated?<Navigate to="/" />:<Signup></Signup>}></Route>
        <Route path="/admin/delete" element={isAuthenticated && user?.role === 'admin' ? <AdminDelete /> : <Navigate to="/" />} />
        <Route path="problem/:problemId" element={<ProblemPage/>}></Route>
        <Route path="/admin" element={<Admin/>}></Route>
      </Routes>
    </>
  )
}

export default App;