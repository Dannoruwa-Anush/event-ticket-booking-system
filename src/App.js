import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';

import Layout from './pages/common/Layout';
import Home from './pages/Home';
import Login from './pages/Login'

import './pages/styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pages that use the common Layout */}
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>

          {/* Login page without the common Layout */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
