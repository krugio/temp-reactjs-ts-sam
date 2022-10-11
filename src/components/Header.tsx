import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { CssBaseline } from '@mui/material';



export default function Header() {
  return (

    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar position="static">
        <Grid container>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <AutorenewIcon sx={{ fontSize: 40, color: 'white' }} />
            <Typography variant='h4' sx={{ color: 'white' }}> <b>API/CRUD</b></Typography>
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant='subtitle1'>Trabalho final módulo IV</Typography>
          </Grid>
        </Grid>
      </AppBar>
    </Box>
  );
}