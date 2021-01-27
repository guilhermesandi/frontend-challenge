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
  const [country, setCountry] = useState('');
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCountry(event.target.value as string);
  };

  const [count, setCount] = useState<Country[]>([]);

  // useEffect(() => {
  //   async function loadCountries(): Promise<void> {
  //     const response = await api.get<Country>('');

  //     const allApi = response.data;
  //     console.log(allApi);

  //     setCount([...count, allApi]);
  //   }

  //   loadCountries();
  // });

  // console.log(count);

  async function handleLoadCountries(): Promise<void> {
    const response = await api.get<Country>('');

    const allApi = response.data;

    setCount([...count, allApi]);
  }

  window.addEventListener('load', handleLoadCountries);

  console.log(count);

  const [newCountry, setNewCountry] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);

  async function handleAddCountry(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const response = await api.get<Country>(`name/${newCountry}`);

    const countryy = response.data;

    setCountries([...countries, countryy]);
  }

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
          <NativeSelect
            id="select-country"
            value={country}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            {count.map(countrye => (
              <option key={countrye.alpha3Code} value={countrye.name}>
                {countrye.name}
              </option>
            ))}
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
