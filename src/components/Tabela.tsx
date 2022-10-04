import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container, Dialog, DialogTitle, Grid, IconButton, TextField, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { api, get } from '../service/api/jasonplaceholder/toDos';
import axios from 'axios';




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

  const [lista, setLista] = useState([]);
  const [modalNovo, setModalNovo] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);

  const [id, setId] = useState('');
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');






  const listar = () => {

    const resultado = get('/all').then((response) => {
      setLista(response);
    })


  }


  const salvarRecado = () => {

    api.post('', {

      titulo: titulo,
      descricao: descricao
    })
      .then(function (response) {
        alert('Recado criado com sucesso!')
        listar();
        setModalNovo(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }



  function salvarRecadoEditado() {

    axios.put(`https://api-andre-2029.herokuapp.com/sistemaRecados/recado/${id}`, {
      id: id,
      titulo: titulo,
      descricao: descricao
    })
      .then(function (response) {
        console.log(response);
        listar();
        alert("Recado editado!");
        setModalEditar(false);

      })
      .catch(function (error) {
        console.log(error);
      });


  }


  function editarRecado(id: any, titulo: any, descricao: any) {

    setId(id);
    setTitulo(titulo);
    setDescricao(descricao);
    setModalEditar(true);





  }


  function deletarRecado(id: number) {
    axios
      .delete(
        `https://api-andre-2029.herokuapp.com/sistemaRecados/recado/${id}`
      )
      .then(function (response) {
        console.log(response);
        listar();

      })
      .catch(function (error) {
        console.log(error);
      });
  }






  useEffect(() => {

    listar();


  }, []);



  return (
    <>
      <Grid container>
        <Grid item xs={12} >
          <Container sx={{ mt: 7 }}>
            <Button variant='contained' sx={{ mb: 2 }} onClick={() => setModalNovo(true)}> NOVO RECADO</Button>
            <TableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>#ID</StyledTableCell>
                    <StyledTableCell align="center" >TÍTULO</StyledTableCell>
                    <StyledTableCell align="center">DESCRIÇÃO</StyledTableCell>
                    <StyledTableCell align="center">AÇÕES</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  {lista.map((row: any) => (
                    <StyledTableRow >
                      <StyledTableCell >
                        <Typography variant='h5'><b>{row.id}</b></Typography>
                      </StyledTableCell>
                      <StyledTableCell align="center">{row.titulo}</StyledTableCell>
                      <StyledTableCell align="center">{row.descricao}
                      </StyledTableCell>
                      <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Stack direction='row' spacing={2}>
                          <IconButton onClick={() => deletarRecado(row.id)}>
                            <DeleteForeverIcon sx={{ fontSize: 35 }} />
                          </IconButton>
                          <IconButton onClick={() => editarRecado(row.id, row.titulo, row.descricao)}>
                            <EditIcon sx={{ fontSize: 35 }} />
                          </IconButton>
                        </Stack>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}




                </TableBody>
              </Table>
            </TableContainer>
          </Container>
        </Grid>
      </Grid>


      {/* MODAL NOVO RECADO */}
      <Dialog open={modalNovo}>
        <DialogTitle>Novo recado</DialogTitle>
        <Container>
          <Typography variant='subtitle1'>Titulo</Typography>
          <TextField onChange={(e) => setTitulo(e.target.value)} fullWidth />
          <Typography variant='subtitle1'>Descricao</Typography>
          <TextField onChange={(e) => setDescricao(e.target.value)} fullWidth />
          <Container sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button variant="contained" onClick={() => salvarRecado()}>Salvar</Button>
              <Button variant="outlined" onClick={() => setModalNovo(false)}>Cancelar</Button>
            </Stack>
          </Container>
        </Container>
      </Dialog>
      {/* Final modal nov recacado */}


      {/* MODAL Editar */}
      <Dialog open={modalEditar}>
        <DialogTitle>Editar Recado</DialogTitle>
        <Container>
          <Typography variant='subtitle1'>Titulo</Typography>
          <TextField value={titulo} onChange={(e) => setTitulo(e.target.value)} fullWidth />
          <Typography variant='subtitle1'>Descricao</Typography>
          <TextField value={descricao} onChange={(e) => setDescricao(e.target.value)} fullWidth />
          <Container sx={{ mt: 2 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
              <Button variant="contained" onClick={() => salvarRecadoEditado()} > Salvar</Button>
              <Button variant="outlined" onClick={() => setModalEditar(false)}>Cancelar</Button>
            </Stack>
          </Container>
        </Container>
      </Dialog>
      {/* Final ediatr */}



    </>


  );
}