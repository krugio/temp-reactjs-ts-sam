import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { get } from '../service/api/jasonplaceholder/toDos';




const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function Tabela() {

const[lista,setLista] = useState([]);



    const listar = async () => {

        const  retornoGet = await get('/users').then((res) => {
            setLista(res);
          })
          .catch((error) => {
            console.log(error.message)
          });
      
        

      
    
      }

useEffect(()=>{

listar();


},[]);



  return (
    <Container sx={{mt:7}}>
    <Button variant='contained' sx={{mb:2}}> NOVO RECADO</Button>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#ID</StyledTableCell>
            <StyledTableCell align="center" >TÍTULO</StyledTableCell>
            <StyledTableCell align="center">DESCRIÇÃO</StyledTableCell>
            <StyledTableCell align="center">AÇÕES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {lista.map((row:any) => (
            <StyledTableRow >
              <StyledTableCell >
               <Typography variant='h5'><b>{row.id}</b></Typography>
              </StyledTableCell>
              <StyledTableCell align="center">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, iure. Nisi totam voluptatem possimus vel voluptates explicabo architecto, quisquam, tempora cum dicta animi voluptas beatae dolores ipsam? Eligendi, perferendis possimus.</StyledTableCell>
              <StyledTableCell align="center">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Neque sed veniam voluptates ab. Ullam suscipit temporibus tenetur fuga. Sint ullam dolorem nesciunt natus harum explicabo culpa. At nobis vel culpa.
              </StyledTableCell>
              <StyledTableCell align="center"> 
                <Stack direction='row' spacing={2}>
                    <IconButton>
                        <DeleteForeverIcon sx={{fontSize:35}}/>
                    </IconButton>
                    <IconButton>
                        <EditIcon sx={{fontSize:35}}/>
                    </IconButton>
                </Stack>
              </StyledTableCell>
            </StyledTableRow>
          ))}
      
       
            
         
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}