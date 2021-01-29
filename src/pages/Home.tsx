import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Box, NativeSelect, Grid, Typography } from '@material-ui/core';

import api from '../services/api';

import Logo from '../assets/logo.png';
import brasil from '../assets/brasil.svg';

import { Header, Form, BootstrapInput, Input, FormDiv } from './styles';

interface Country {
  name: string;
  flag: string;
  translations: {
    br: string;
  };
  alpha3Code: string;
}

const Home: React.FC = () => {
  const [newCountry, setNewCountry] = useState('');
  const [places, setPlaces] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  async function handleAddCountry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    console.log(newCountry);

    const response = await api.get<Country>(`name/${newCountry}`);

    const country = response.data;

    setCountries([...countries, country]);
  }

  useEffect(() => {
    api.get('').then(response => {
      setCountries(response.data);
    });
  }, []);

  return (
    <>
      <Header>
        <header>
          <img src={Logo} alt="Lugares que quero conhecer" />
        </header>
      </Header>

      <Form onSubmit={handleAddCountry}>
        <FormDiv>
          <Input shrink htmlFor="select-country">
            País
          </Input>
          <NativeSelect id="select-country" input={<BootstrapInput />}>
            <option aria-label="None" value="" />
            {countries.map(country => (
              <option key={country.alpha3Code} value={country.name}>
                {country.translations.br}
              </option>
            ))}
          </NativeSelect>
        </FormDiv>

        <FormDiv>
          <Input shrink htmlFor="input-local">
            Local
          </Input>
          <BootstrapInput
            value={newCountry}
            onChange={e => setNewCountry(e.target.value)}
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

        <Button type="submit">Adicionar</Button>
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
