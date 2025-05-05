import React, { useState,useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Divider,
  Grid
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Cookies from 'js-cookie';
import api from '../services/api';
import { useNavigate } from 'react-router-dom'; // ⬅️ importa esto


const Background = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  minHeight: '100vh',
  width: '100vw',
  backgroundColor: '#191c1f',
  color: '#FAFBFC',
  overflowY: 'auto',
  overflowX: 'clip',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const LoginBox = styled(Box)(({ theme }) => ({
  flex: '0 0 25%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#191c1f',
  color: '#FAFBFC',
  padding: '2rem 1rem',
  borderRadius: '0',
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
    padding: '2.5rem'
  }
}));

const ImageSide = styled('div')(({ theme }) => ({
  flex: '1 1 75%',
  backgroundImage: 'url(https://sso.hotmart.com/themes/hotmart-custom/images/fire.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const SocialButton = styled(Button)({
  flex: 1,
  border: '1px solid #555',
  color: '#FAFBFC',
  borderRadius: 8,
  padding: '10px 0',
  textTransform: 'none'
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ⬅️ inicializa el navegador
  const [error, setError] = useState('');


  const formik = useFormik({
    initialValues: {
      email: 'juan@example.com',
      password: 'password123'
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo inválido').required('Email es obligatorio'),
      password: Yup.string().required('Campo obligatorio')
    }),
    onSubmit:async (values) => {
      try {
        const response = await api.post('/auth/login', values);
        const token = response.data.access_token;
        const user=response.data.post;
        console.log(user);
        Cookies.set('token', token, { expires: 7 });
        Cookies.set('user', JSON.stringify(user)); // ← serializar objeto
        navigate('/dashboard'); // ⬅️ redirige aquí directamente
        setError('');
      } catch (err) {
        console.error(err);
        setError('Credenciales inválidas o error de servidor');
      }

    }
  });

  const toUpper = (e) => {
    const value = e.target.value.toUpperCase();
    formik.setFieldValue(e.target.name, value);
  };
  useEffect(() => {
    if (Cookies.get('token')) {
      navigate('/dashboard'); // Redirige si ya hay sesión activa
    }
  }, []);
  return (
    <Background>
      <LoginBox>
        <Container maxWidth="xs">
          <Box display="flex" justifyContent="center" mb={2}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/5977/5977575.png"
              alt="Logo"
              width="40"
              style={{ maxWidth: '100%' }}
            />
          </Box>

          <Typography variant="h6" fontWeight="bold" gutterBottom>
            PRE REGISTRO DE ESPECIALIDAD
          </Typography>

          <Typography variant="body2" mb={3}>
            Inicia sesión con tu cuenta social o escribe tu información abajo.
          </Typography>

          <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center">
            <SocialButton startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" width="18" />}>Facebook</SocialButton>
            <SocialButton startIcon={<img src="https://www.svgrepo.com/show/13671/youtube.svg" width="18" />}>Youtube</SocialButton>
          </Box>
          <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center">
            <SocialButton startIcon={<img src="https://www.svgrepo.com/show/431991/tiktok.svg" width="18" />}>Tik Tok</SocialButton>
            <SocialButton startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="18" />}>WhatsApp</SocialButton>
          </Box>
          <Box display="flex" gap={2} mb={3} flexWrap="wrap" justifyContent="center">
            <SocialButton startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" width="18" />}>Apple</SocialButton>
            <SocialButton startIcon={<img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" width="18" />}>Google</SocialButton>
          </Box>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid  xs={12}>
              <TextField
                size="small"
                fullWidth
                label="Correo electrónico"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}  // <-- aquí está el cambio
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                variant="filled"
                margin="normal"
                InputProps={{ style: { backgroundColor: '#000', color: '#FAFBFC', borderRadius: 8 } }}
                InputLabelProps={{ style: { color: '#FAFBFC' } }}
              />

                <TextField
                  size="small"
                  fullWidth
                  label="Contraseña"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  variant="filled"
                  margin="normal"
                  InputProps={{
                    style: { backgroundColor: '#000', color: '#FAFBFC', borderRadius: 2 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? (
                            <VisibilityOff sx={{ color: '#FAFBFC' }} />
                          ) : (
                            <Visibility sx={{ color: '#FAFBFC' }} />
                          )}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  InputLabelProps={{ style: { color: '#FAFBFC' } }}
                />
              </Grid>
              <Grid  xs={12}>
                
              </Grid>
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                width: '100%',
                backgroundColor: '#F4511E',
                color: '#fff',
                borderRadius: 9999,
                fontWeight: 'bold',
                py: 1.5,
                mt: 2,
                '&:hover': { backgroundColor: '#e64a19' }
              }}
            >
              Ingresar
            </Button>
          </form>

          <Box mt={6} textAlign="center" fontSize="12px" color="#777">
            <Divider sx={{ backgroundColor: '#333', my: 2 }} />
            <Typography variant="caption" display="block">
              Soporte — Términos de Uso — Política de Privacidad
            </Typography>
            <Typography variant="caption" display="block">
              Desarrollado por <strong>Unidad de Sistemas e Informatica Ministerio de Defensa</strong>
            </Typography>
          </Box>
        </Container>
      </LoginBox>

      <ImageSide />
    </Background>
  );
};

export default Login;
