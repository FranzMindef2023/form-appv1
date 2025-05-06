import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  MenuItem,
  Box,
  Snackbar, Alert 
} from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const departamentos = ['La Paz', 'Cochabamba', 'Santa Cruz'];
const lugaresNacimiento = ['Oruro', 'Tarija', 'Potosí'];
const fuerzasEspeciales = ['Fuerza A', 'Fuerza B', 'Fuerza C'];

const ModalPreRegistro = ({ open, onClose }) => {
  const [recaptchaToken, setRecaptchaToken] = React.useState(null);
  const [alertOpen, setAlertOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      nombres: '',
      apellido1: '',
      apellido2: '',
      ci: '',
      fechaNacimiento: '',
      departamento: '',
      lugarNacimiento: '',
      fuerza: ''
    },
    validationSchema: Yup.object({
      nombres: Yup.string()
        .matches(/^[A-ZÁÉÍÓÚÑ ]+$/, 'Solo letras mayúsculas y espacios')
        .min(2, 'Mínimo 2 caracteres')
        .max(30, 'Máximo 30 caracteres')
        .required('Requerido'),
      apellido1: Yup.string()
        .matches(/^[A-ZÁÉÍÓÚÑ ]*$/, 'Solo letras mayúsculas y espacios')
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres')
        .nullable(),
      apellido2: Yup.string()
        .matches(/^[A-ZÁÉÍÓÚÑ ]*$/, 'Solo letras mayúsculas y espacios')
        .min(3, 'Mínimo 3 caracteres')
        .max(30, 'Máximo 30 caracteres')
        .nullable(),
      ci: Yup.string()
        .matches(/^\d+$/, 'Solo números')
        .required('Requerido'),
      fechaNacimiento: Yup.date()
        .max(new Date(), 'No se permite una fecha futura')
        .required('Requerido'),
      departamento: Yup.string().required('Requerido'),
      lugarNacimiento: Yup.string().required('Requerido'),
      fuerza: Yup.string().required('Requerido')
    }),
    onSubmit: (values) => {
      if (!recaptchaToken) {
        setAlertOpen(true); // Muestra el snackbar
        return;
      }

      console.log('Pre-registro:', values, 'Token:', recaptchaToken);

      // Reset form and token
      formik.resetForm();
      setRecaptchaToken(null);
      onClose();
    }
  });

  const toUpper = (e) => {
    const value = e.target.value.toUpperCase();
    formik.setFieldValue(e.target.name, value);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          backgroundImage: 'url(/mnt/data/944c8238-bd51-4b47-a20b-25047e4d4486.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          position: 'relative',
          overflow: 'hidden',
          color: '#FAFBFC'
        }
      }}
    >
      <Box sx={{
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        zIndex: 0
      }} />

      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          textAlign: 'center',
          color: '#F4511E',
          zIndex: 1
        }}
      >
        DATOS PERSONALES
      </DialogTitle>


      <DialogContent sx={{ position: 'relative', zIndex: 1 }}>
        {/* Snackbar fuera del Dialog */}
    <Snackbar
      open={alertOpen}
      autoHideDuration={4000}
      onClose={() => setAlertOpen(false)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        severity="warning"
        variant="filled"
        onClose={() => setAlertOpen(false)}
        sx={{ width: '100%' }}
      >
        Por favor complete el reCAPTCHA para continuar
      </Alert>
    </Snackbar>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} mt={1}>
            {[
              { label: 'Nombres', name: 'nombres' },
              { label: 'Primer Apellido', name: 'apellido1' },
              { label: 'Segundo Apellido', name: 'apellido2' },
              { label: 'Cédula de Identidad', name: 'ci' }
            ].map(({ label, name }) => (
              <Grid  xs={12} sm={name === 'apellido2' ? 12 : 6} key={name}>
                <TextField
                  fullWidth
                  sx={{ width: 265 }}
                  size="small"
                  label={label}
                  name={name}
                  variant="filled"
                  value={formik.values[name]}
                  onChange={toUpper}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                  InputProps={{
                    style: {
                      backgroundColor: '#000',
                      color: '#FAFBFC',
                      borderRadius: 8
                    }
                  }}
                  InputLabelProps={{ style: { color: '#FAFBFC' } }}
                />
              </Grid>
            ))}

            <Grid  xs={12} sm={6}>
              <TextField
                fullWidth
                sx={{ width: 265 }}
                size="small"
                type="date"
                label="Fecha de Nacimiento"
                name="fechaNacimiento"
                variant="filled"
                InputLabelProps={{ shrink: true, style: { color: '#FAFBFC' } }}
                InputProps={{
                  style: {
                    backgroundColor: '#000',
                    color: '#FAFBFC',
                    borderRadius: 8
                  }
                }}
                value={formik.values.fechaNacimiento}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fechaNacimiento && Boolean(formik.errors.fechaNacimiento)}
                helperText={formik.touched.fechaNacimiento && formik.errors.fechaNacimiento}
              />
            </Grid>

            {[
              { label: 'Departamento', name: 'departamento', options: departamentos },
              { label: 'Lugar de Nacimiento', name: 'lugarNacimiento', options: lugaresNacimiento },
              { label: 'Fuerzas Especiales', name: 'fuerza', options: fuerzasEspeciales }
            ].map(({ label, name, options }) => (
              <Grid  xs={12} sm={6} key={name}>
                <TextField
                  fullWidth
                  sx={{ width: 265 }}
                  size="small"
                  select
                  label={label}
                  name={name}
                  variant="filled"
                  value={formik.values[name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[name] && Boolean(formik.errors[name])}
                  helperText={formik.touched[name] && formik.errors[name]}
                  InputProps={{
                    style: {
                      backgroundColor: '#000',
                      color: '#FAFBFC',
                      borderRadius: 8
                    }
                  }}
                  InputLabelProps={{ style: { color: '#FAFBFC' } }}
                >
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>{option}</MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}
          </Grid>

          {/* ReCAPTCHA */}
          <Box mt={3} display="flex" justifyContent="center">
            <ReCAPTCHA
              sitekey="6LcCiC8rAAAAAEz-52pmoQgeuoJDdKnIK9QikqcV" // ← reemplaza con tu clave pública real
              onChange={(token) => setRecaptchaToken(token)}
              theme="dark"
            />
          </Box>

          <DialogActions sx={{ mt: 3, justifyContent: 'center' }}>
            <Button
              onClick={() => {
                formik.resetForm();
                setRecaptchaToken(null);
                onClose();
              }}
              sx={{
                color: '#FAFBFC',
                borderColor: '#FAFBFC',
                borderRadius: 9999,
                zIndex: 1
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              sx={{
                backgroundColor: '#F4511E',
                borderRadius: 9999,
                px: 4,
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#e64a19'
                },
                zIndex: 1
              }}
            >
              Enviar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
      
    </Dialog>
  );
};

export default ModalPreRegistro;
