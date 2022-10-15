import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Badge, Button, Container, Dialog, DialogTitle, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField, ToggleButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
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


  const [listArq, setlistArq] = useState([]);
  const [btnArq, setBtnArq] = useState(false);
  const [totArq, setTotArq] = useState('');


  const[statusRecado,setaStatusRecado] = useState('');



  const listar = () => {

    const resultado = get('/all').then((response) => {
      setLista(response);
    })


  }


  const salvarRecado = () => {

    if(statusRecado === ""){
      alert("Por favor selecione o status do recado");
      return;
    }


    api.post('', {

      titulo: titulo,
      descricao: descricao,
      status: statusRecado
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
      descricao: descricao,
    
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

  function totalArquivados() {
    let tot = JSON.parse(localStorage.getItem('arquivado') || '[]')
    let p = tot.length;

    setTotArq(p);


  }

  function arquivado(id: number, titulo: string, descricao: string) {

    let x = JSON.parse(localStorage.getItem('arquivado') || '[]');

    const novoArquivo = {
      id: id,
      titulo: titulo,
      descricao: descricao
    }

    x.push(novoArquivo);

    localStorage.setItem('arquivado', JSON.stringify(x))
    deletarRecado(id);
    totalArquivados();
    alert("Recado arquivado com sucesso!");




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

  function arqui() {
    setBtnArq(!btnArq);

    let listAr = JSON.parse(localStorage.getItem('arquivado') || '[]');

    setlistArq(listAr);



  }






  useEffect(() => {

    listar();
    totalArquivados();



  }, []);



  return (
    <>
      {btnArq ? (
        <>
          <Grid container>
            <Grid item xs={12} >
              <Container sx={{ mt: 7 }}>
                <Stack direction='row' spacing={120} sx={{ mb: 2 }}>
                  <ToggleButton value="bold" aria-label="bold" onClick={() => arqui()}>
                    <Badge badgeContent={totArq} color="secondary">
                      <DownloadForOfflineIcon sx={{ fontSize: 40 }} />
                    </Badge>
                  </ToggleButton>
                </Stack>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#ID</StyledTableCell>
                        <StyledTableCell align="center" >TÍTULO</StyledTableCell>
                        <StyledTableCell align="center">DESCRIÇÃO</StyledTableCell>

                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {listArq.map((row: any) => (
                        <StyledTableRow >
                          <StyledTableCell >
                            <Typography variant='h5'><b>{row.id}</b></Typography>
                          </StyledTableCell>
                          <StyledTableCell align="center">{row.titulo}</StyledTableCell>
                          <StyledTableCell align="center">{row.descricao}
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

      ) : (
        <>


          <Grid container>
            <Grid item xs={12} >
              <Container sx={{ mt: 7 }}>
                <Stack direction='row' spacing={120} sx={{ mb: 2 }}>

                  <ToggleButton value="bold" aria-label="bold" onClick={() => arqui()}>
                    <Badge badgeContent={totArq} color="secondary">
                      <DownloadForOfflineIcon sx={{ fontSize: 40 }} />
                    </Badge>
                  </ToggleButton>
                  <Button variant='contained' sx={{ mb: 2, color: 'white' }} onClick={() => setModalNovo(true)} > <PlaylistAddIcon /><b>NOVO RECADO</b></Button>
                </Stack>
                <TableContainer component={Paper}>
                  <Table aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell>#ID</StyledTableCell>
                        <StyledTableCell align="center" >TÍTULO</StyledTableCell>
                        <StyledTableCell align="center">DESCRIÇÃO</StyledTableCell>
                        <StyledTableCell align="center">STATUS</StyledTableCell>
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
                          <StyledTableCell align="center">{row.status}
                          </StyledTableCell>
                          <StyledTableCell align="center" sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Stack direction='row' spacing={2}>
                              <IconButton onClick={() => deletarRecado(row.id)}>
                                <DeleteForeverIcon sx={{ fontSize: 35 }} />
                              </IconButton>
                              <IconButton onClick={() => editarRecado(row.id, row.titulo, row.descricao)}>
                                <EditIcon sx={{ fontSize: 35 }} />
                              </IconButton>

                              <IconButton onClick={() => arquivado(row.id, row.titulo, row.descricao)}>
                                <DownloadForOfflineIcon sx={{ fontSize: 35 }} />
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
              <Container sx={{mt:2}}>
              <FormControl>
                <Typography align='center'>
                  <FormLabel id="demo-row-radio-buttons-group-label"><b>STATUS DO RECADO</b></FormLabel>
                  </Typography>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel value="female" control={<Radio onChange={()=> setaStatusRecado("Novo")}/>} label="Nova" />
                    <FormControlLabel value="male" control={<Radio onChange={()=> setaStatusRecado("Pendente") }/>} label="pendente" />
                    <FormControlLabel value="other" control={<Radio onChange={()=> setaStatusRecado("Concluido")} />} label="Concluido" />
                    
                  </RadioGroup>
                </FormControl>
                </Container>
             
              <Container sx={{ mt: 2, display:'flex', justifyContent:'center' }}>
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


      )}

    </>
  );
}