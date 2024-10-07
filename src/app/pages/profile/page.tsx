"use client";
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Box, Paper, TextField,  } from "@mui/material";
import Grid from '@mui/material/Grid2';

interface FormData {
  name: string;
  cpf: string; 
  birthdate: string;
  email: string;
  password: string;
}

export default function Profile() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    cpf: '', 
    birthdate: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    if (!isLoggedIn) {
      redirect('/pages/login')
    }else{
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const userData = JSON.parse(storedUserData);
        setFormData(userData)
        } 
    }
  }, [router]);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = ()=>{
    localStorage.removeItem('isLoggedIn');
    router.push('/pages/login')
  }

  return (
    <div> 
      <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {formData.name}
          </Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleLogout}>Sair</MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
    </Box>
    <Box style={{textAlign:'center', marginTop:10}}>
      <h2 style={{fontWeight:'bold', fontSize:'1.8rem'}}>Meu perfil</h2>
    </Box>
    <Paper style={{margin:10}}>
    <Grid container spacing={2} style={{margin:10, padding:10}}>
          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
            disabled
              fullWidth
              label="Nome e sobrenome"
              name="name"
              value={formData.name}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12 }}>
          <TextField
          disabled
              fullWidth
              label="CPF"
              name="cpf"
              value={formData.cpf}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
            disabled
              fullWidth
              label="Data de Nascimento"
              name="birthdate"
              type="date"
              value={formData.birthdate}
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
            disabled
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
            />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <TextField
            disabled
              fullWidth
              label="Senha"
              name="password"
              type="password"
              value={formData.password}
            />
          </Grid>
        </Grid>
    </Paper>
    </div>
  )
}
