import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Link,
  Divider
} from '@mui/material';
import { styled } from '@mui/system';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ModalPreRegistro from '../components/ModalPreRegistro';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Background = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  position: 'relative',
  minHeight: '100vh',
  width: '100vw',
  overflow: 'hidden',
  backgroundColor: '#191c1f',
  color: '#FAFBFC',
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
  padding: '2rem 1rem',
  zIndex: 2,
  [theme.breakpoints.up('md')]: {
    maxWidth: '400px',
    padding: '2.5rem'
  }
}));

const ImageSide = styled('div')(({ theme }) => ({
  flex: '1 1 75%',
  minHeight: '100vh',
  backgroundImage: 'url(https://sso.hotmart.com/themes/hotmart-custom/images/fire.jpg)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  zIndex: 1,
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const SliderOverlay = styled('div')({
  position: 'absolute',
  top: 0,
  left: '25%',
  right: 0,
  bottom: 0,
  zIndex: 3,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  pointerEvents: 'none',
  padding: '2rem'
});

const SocialButton = styled(Button)({
  flex: 1,
  border: '1px solid #555',
  color: '#FAFBFC',
  borderRadius: 8,
  padding: '10px 0',
  textTransform: 'none'
});

const FormularioPostulacion = () => {
  const [openModal, setOpenModal] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Correo inválido').required('Email es obligatorio'),
      password: Yup.string().required('Campo obligatorio')
    }),
    onSubmit: (values) => {
      console.log('Login exitoso:', values);
      setOpenModal(true);
    }
  });

  const sliderVideos = [
    'https://www.youtube.com/embed/NhNC_-ukn7Y',
    'https://www.youtube.com/embed/vmsW8uJLNc8',
    'https://www.youtube.com/embed/nhf6rWnKFbw'
  ];

  const sliderSettings = {
    autoplay: true,
    autoplaySpeed: 6000,
    infinite: true,
    arrows: false,
    dots: false,
    pauseOnHover: false
  };

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

          <Button
            type="button"
            fullWidth
            onClick={() => setOpenModal(true)}
            variant="contained"
            sx={{
              width: '100%',
              backgroundColor: '#F4511E',
              color: '#fff',
              borderRadius: 9999,
              fontWeight: 'bold',
              py: 1.5,
              '&:hover': { backgroundColor: '#e64a19' }
            }}
          >
            Regístrate
          </Button>

          <Box mt={6} textAlign="center" fontSize="12px" color="#777">
            <Divider sx={{ backgroundColor: '#333', my: 2 }} />
            <Typography variant="caption" display="block">
              Soporte — Términos de Uso — Política de Privacidad
            </Typography>
            <Typography variant="caption" display="block">
              Desarrollado por <strong>Unidad de Sistemas e Informática Ministerio de Defensa</strong>
            </Typography>
          </Box>
        </Container>
      </LoginBox>

      <ImageSide />

      {/* Carrusel de videos */}
      <SliderOverlay>
        <Box sx={{ width: '90%', maxWidth: 720 }}>
          <Slider {...sliderSettings}>
            {sliderVideos.map((url, idx) => (
              <Box
                key={idx}
                sx={{
                  position: 'relative',
                  paddingTop: '56.25%', // 16:9 aspect ratio
                  borderRadius: 8,
                  overflow: 'hidden',
                  boxShadow: '0 0 10px #000'
                }}
              >
                <iframe
                  src={url}
                  title={`Video institucional ${idx + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%'
                  }}
                />
              </Box>
            ))}
          </Slider>
        </Box>
      </SliderOverlay>

      <ModalPreRegistro open={openModal} onClose={() => setOpenModal(false)} />
    </Background>
  );
};

export default FormularioPostulacion;
