import Navbar from './core/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import Products from './pages/Products';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import PostPage from './pages/PostPage';
import UserPage from './pages/UserPage';

function App() {
  return (
    <>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Search" element={<Search />} />
        <Route path="/products" element={<Products />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/user/:id" element={<UserPage />} />
      </Routes>
    </Router>
  </>
  );
}

export default App;
