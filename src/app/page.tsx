"use client";
import { Box, Button, Card,  CardActions, CardContent,  IconButton,  InputAdornment,  TextField, Typography } from "@mui/material";
import Grid from '@mui/material/Grid2';
import Link from "next/link";
import CustomizedSnackbars from "./components/alert/Alert";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface FormData {
  name: string;
  cpf: string; 
  birthdate: string;
  email: string;
  password: string;
  confirmPassword: string;
}

let  text = "";
let errorType = "";

export default function Home() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '', 
    birthdate: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<{
    nameError: string;
    emailError: string;
    passwordError: string;
  }>({
    nameError: '',
    emailError: '',
    passwordError: '',
  });
  const [alerta, setAlerta] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (isLoggedIn) {
      redirect('/pages/profile')
    }
  }, [router]);


  const formatCPF = (value: string) => {
    let cpf = value.replace(/\D/g, '');

    if (cpf.length > 11) {
      cpf = cpf.slice(0, 11);
    }

    if (cpf.length > 9) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    } else if (cpf.length > 6) {
      cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3');
    } else if (cpf.length > 3) {
      cpf = cpf.replace(/(\d{3})(\d{3})/, '$1.$2');
    }

    return cpf;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      setFormData({
        ...formData,
        cpf: formatCPF(value),  
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = () => {
    const nameParts = formData.name.trim().split(' ');
    if (nameParts.length < 2) {
      text = 'O nome deve conter pelo menos nome e sobrenome.';
      errorType = 'warning'
      alertMsg()
      return;
    }

    if (formData.cpf.length !== 14) {
      text = 'CPF inválido!';
      errorType = 'warning'
      alertMsg()
      return;
    }

    if (!formData.birthdate) {
      text = 'Selecione uma data de nascimento';
      errorType = 'warning'
      alertMsg()
      return;
    }

    if (!validateEmail(formData.email)) {
      text = 'Por favor, insira um endereço de email válido.';
      errorType = 'warning'
      alertMsg()
      return;
    }

    if (!validatePassword(formData.password)) {
      text = 'A senha deve ter pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas, números e caracteres especiais.';
      errorType = 'warning'
      alertMsg()
      return;
    } 

    if (formData.password !== formData.confirmPassword) {
      setErrors({
        ...errors,
        passwordError: 'As senhas não coincidem.',
      });
      return;
    }
    
    const userData = {
      name: formData.name,
      birthdate: formData.birthdate,
      email: formData.email,
      cpf: formData.cpf,
      password: formData.password,
    };

    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('logado', 'true');

    text = 'Usuário cadastrado com sucesso!';
    errorType = 'success'
    alertMsg()
    router.push('/pages/login')
    return;
  };

  const alertMsg = () => {
    setAlerta(true);
    setTimeout(() => setAlerta(false), 3000);
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword); 
  };
  
  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); 
  };

  return (
    <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    minHeight={window.innerWidth > 600 ? "100vh":window.innerHeight} 
  >
    <Card sx={{ 
      maxWidth:400
       }}>
      <CardContent>
      <Typography variant="h5" component="div">
          Painel de cadastro projeto IESDE
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5, marginTop:1 }}>Preencha os campos abaixo para criar sua conta.</Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Nome e sobrenome"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
          <TextField
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Data de Nascimento"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Senha"
              name="password"
              type={showPassword ? 'text' : 'password'} 
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <Visibility />  :  <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
              fullWidth
              label="Confirmar Senha"
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              error={!!errors.passwordError}
              helperText={errors.passwordError ? "As senhas não coincidem" : ""}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleToggleConfirmPasswordVisibility}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> :  <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions style={{justifyContent:'space-between'}}>
        <Button onClick={handleSubmit} variant="contained" color="primary" >
          Crie uma conta
        </Button>
        <Button component={Link}
          href='/pages/login' size="small" variant="text" color="primary">Já tenho uma conta</Button>
      </CardActions>
    </Card>
    {alerta && (
      <CustomizedSnackbars
        texto={text}
        errorType={errorType}
      ></CustomizedSnackbars>
    )}
  </Box>
  );
}
