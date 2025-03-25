import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './Pages/Home';
import Navbar from './Components/Navbar/Navbar';
import Auth from './Pages/Auth';
import LoadDetails from './Pages/LoadDetails';
import Loads from './Pages/Loads';
import Profile from './Pages/Profile';
import JobMap from './Pages/JobMap';
import JobDetails from './Pages/JobDetails';
import TentDetails from './Pages/TentDetails';
import ProtectedRoute from './Components/ProtectedRoute';
import { io } from 'socket.io-client';
import { useSelector } from 'react-redux';
import OrderDetails from './Pages/OrderDetails';
import Orders from './Pages/Orders';

const socket = io('https://tentlify-checklist.up.railway.app');
// const socket = io('http://localhost:3001')

function App() {
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    socket.on('connect', () => {
      console.log(`Connected to server as ${socket.id} from App.jsx`);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (user?.username) {
      socket.emit('addUser', user.username);
    }
    // socket.emit('addUser', user?.username)
  }, [user]);

  return (
    <Router>
      <Navbar socket={socket} />
      <Routes>
        <Route path="/" element={<ProtectedRoute element={<Home socket={socket} />} />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/load/:id" element={<ProtectedRoute element={<LoadDetails />} />} />
        <Route path="/loads" element={<ProtectedRoute element={<Loads />} />} />
        <Route path="/profile/:id" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/map" element={<ProtectedRoute element={<JobMap />} />} />
        <Route path="/job/:id" element={<ProtectedRoute element={<JobDetails />} />} />
        <Route path="/tent/:id" element={<ProtectedRoute element={<TentDetails />} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={<OrderDetails />} />} />
        <Route path="/orders" element={<ProtectedRoute element={<Orders />} />} />
      </Routes>
    </Router>
  );
}

export default App;
