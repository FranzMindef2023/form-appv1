import { Route, Navigate } from 'react-router-dom';
import FormularioPostulacion from '../pages/FormularioPostulacion';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound'; // 👈 Importar componente 404

const PublicRoutes = () => (
  <>
    <Route path="/" element={<Navigate to="/login" replace />} />
    <Route path="/postulacion" element={<FormularioPostulacion />} />
    <Route path="/login" element={<Login />} />
    <Route path="*" element={<NotFound />} /> {/* 👈 Captura rutas públicas desconocidas */}
  </>
);

export default PublicRoutes;
