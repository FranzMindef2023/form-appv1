import { BrowserRouter, Routes } from 'react-router-dom';
import PublicRoutes from './routes/PublicRoutes';
import PrivateRoutes from './routes/PrivateRoutes';

function App() {
  return (
    <BrowserRouter basename="/simon">
      <Routes>
        {PublicRoutes()}    {/* ✅ Llama la función directamente */}
        {PrivateRoutes()}   {/* ✅ Lo mismo con las privadas */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
