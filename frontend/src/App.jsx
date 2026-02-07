import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Referral from './pages/Referral';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container py-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/refer" element={<Referral />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
