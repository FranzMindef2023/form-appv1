// src/services/postulacionService.js
import api from './api';

export const enviarPostulacion = async (datos) => {
  const response = await api.post('/postulaciones', datos);
  return response.data;
};
