import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './components/User/Signup';
import Login from './components/User/Login';
import Home from './components/Home/Home';
import Header from './components/Header/Header'; // Import the Header component

function App() {
  return (
    <>
    <BrowserRouter>
      <Header /> {/* Include Header so it appears on all pages */}
      <main >
        <Routes>
          <Route path="/register" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          {/* Add more routes as needed */}
        </Routes>
      </main>
    </BrowserRouter>
    </>
  );
}

export default App;
