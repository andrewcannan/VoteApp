import React from 'react';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Vote from './pages/Vote';
import Admin from './pages/Admin';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Logout from './components/Logout';
import UserDetails from './pages/UserDetails';
import VoteDetails from './pages/VoteDetails';
import { AuthProvider } from './contexts/AuthContext';
import { BrowserRouter as Router, Route, Routes,} from 'react-router-dom';


import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {
  return (
    <div className="App">
      <AuthProvider>
      <Router>
        <NavBar />
        <ToastContainer position='top-right' />
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route  path='/register' element={<Register />}/>
          <Route path='/login' element={<Login />}/>
          <Route  path='/vote' element={<Vote />}/>
          <Route  path='/admin' element={<Admin />}/>
          <Route path="/user-details/:userId" element={<UserDetails />}/>
          <Route path="/vote-details/:voteId" element={<VoteDetails />}/>
          <Route  path='/logout' element={<Logout />}/>
        </Routes>
        <Footer />
      </Router>
      </AuthProvider>

    </div>
  );
}

export default App;
