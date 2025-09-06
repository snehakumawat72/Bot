import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebaseconfig';

import Frontend from './components/Frontend';
import Backend from './components/Backend';
import FullStack from './components/FullStack';
import DataScience from './components/DataScience';
import ML from './components/ML';
import HR from './components/HR';
import Cards from './components/Card';
import AuthPage from './components/AuthPage';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import History from './components/History';

function Home({ onLogout, user }) {
  return (
    <div className="App" style={{ padding: '2rem' }}>
     <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <h1 className="display-4">🎯AceBOT</h1>
  <div>
    <button
      onClick={() => window.location.href = '/history'}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'royalblue',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        marginRight: '1rem'
      }}
    >
      User History
    </button>
    <button
      onClick={onLogout}
      style={{
        padding: '0.5rem 1rem',
        backgroundColor: 'crimson',
        color: 'white',
        border: 'none',
        borderRadius: '4px'
      }}
    >
      Logout
    </button>
  </div>
  </div>


      <p className="lead text-center mb-5">
        Welcome to <strong>AceBOT</strong> – your ultimate companion for mastering interviews across diverse domains!
        Whether you're preparing for your first job, transitioning into a new tech role, or aiming to sharpen your communication and problem-solving skills, AceBOT is here to guide you every step of the way.
      </p>

      <div className="cardgrid">
        <Cards title="Frontend" path="/frontend" name="Start Frontend Interview" src="/frontend.jpg" email={user.email} />
        <Cards title="Backend" path="/backend" name="Start Backend Interview" src="/backend.jpg" email={user.email} />
        <Cards title="Full Stack" path="/fullstack" name="Start Full Stack Interview" src="/fullstack.jpg" email={user.email} />
        <Cards title="Machine Learning" path="/machinelearning" name="Start ML Interview" src="/machinelearning.jpg" email={user.email} />
        <Cards title="Data Science" path="/datascience" name="Start DataScience Interview" src="/datascience.jpg" email={user.email} />
        <Cards title="HR" path="/hr" name="Start HR Interview" src="/HR.jpg" email={user.email} />
      </div>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curr) => {
      setUser(curr);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      alert('Logout failed:', err.message);
    }
  };

  if (!user) return <AuthPage onAuthSuccess={() => setUser(auth.currentUser)} />;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home onLogout={handleLogout} user={user} />} />
        <Route path="/frontend" element={<Frontend />} />
        <Route path="/backend" element={<Backend />} />
        <Route path="/fullstack" element={<FullStack />} />
        <Route path="/machinelearning" element={<ML />} />
        <Route path="/datascience" element={<DataScience />} />
        <Route path="/hr" element={<HR />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/history" element={<History email={user.email} />} />
      </Routes>
    </Router>
  );
}

export default App;
