import React from 'react';

import { Button, Box, NativeSelect, Grid, Typography } from '@material-ui/core';
import { spacing } from '@material-ui/system';
import { Header, Form, BootstrapInput, Input, FormDiv } from './styles';
import brasil from '../assets/brasil.svg';

import Logo from '../assets/logo.png';

const Home: React.FC = () => {
  const [country, setCountry] = React.useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string);
  };

  return (
    <>
      <Header>
        <header>
          <img src={Logo} alt="Lugares que quero conhecer" />
        </header>
      </Header>

      <Form>
        <FormDiv>
          <Input shrink htmlFor="select-country">
            País
          </Input>
          <NativeSelect
            id="select-country"
            value={country}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormDiv>

        <FormDiv>
          <Input shrink htmlFor="input-local">
            Local
          </Input>
          <BootstrapInput
            placeholder="Digite o local que deseja conhecer"
            id="input-local"
          />
        </FormDiv>

        <FormDiv>
          <Input shrink htmlFor="input-date">
            Meta
          </Input>
          <BootstrapInput placeholder="mês/ano" id="input-date" />
        </FormDiv>

        <Button>Adicionar</Button>
      </Form>

      <Box>
        <Grid container>
          <Grid item lg={2} md={4} sm={6} xs={12}>
            <Box boxShadow={4} borderRadius={10} m={2} p={2}>
              <Box borderBottom={1}>
                <img src={brasil} alt="" />
                <Typography>Brasil</Typography>
              </Box>
              <Box>
                <Typography>Local: Balneario Camboriu </Typography>
                <Typography>Meta: 04/2022</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item lg={2} md={4} sm={6} xs={12}>
            <Box boxShadow={4} borderRadius={10} m={2} p={2}>
              <Box borderBottom={1}>
                <img src={brasil} alt="" />
                <Typography>Brasil</Typography>
              </Box>
              <Box>
                <Typography>Local: Balneario Camboriu </Typography>
                <Typography>Meta: 04/2022</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
