// src/routes/PrivateRoutes.jsx
import { Route } from 'react-router-dom';
import RutaPrivada from '../components/RutaPrivada';
import PrivateLayout from '../layouts/PrivateLayout';
import Dashboard from '../pages/Dashboard';
import Postulantes from '../pages/Postulantes';
import Usuarios from '../pages/Usuarios';
import Roles from '../pages/Roles';
import Reportes from '../pages/Reportes';
import NotFound from '../pages/NotFound';

const PrivateRoutes = () => (
  <Route
    path="/dashboard"
    element={
      <RutaPrivada>
        <PrivateLayout />
      </RutaPrivada>
    }
  >
    <Route index element={<Dashboard />} />
    <Route path="postulantes" element={<Postulantes />} />
    <Route path="usuarios" element={<Usuarios />} />
    <Route path="roles" element={<Roles />} />
    <Route path="reportes" element={<Reportes />} />
    <Route path="*" element={<NotFound />} />
  </Route>
);

export default PrivateRoutes;
