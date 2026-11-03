import { BrowserRouter, Routes, Route } from 'react-router';

import Layout from './pages/common/Layout';
import Home from './pages/Home';
import './pages/styles/main.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
