import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Box, NativeSelect, Grid, Typography } from '@material-ui/core';

import api from '../services/api';

import Logo from '../assets/logo.png';

import { Header, Form, BootstrapInput, Label, FormDiv } from './styles';

interface Country {
  name: string;
  flag: string;
  translations: {
    br: string;
  };
  alpha3Code: string;
}

interface Location {
  country: string;
  place: string;
  goal: string;
  countryBR: string;
  flag: string;
}

const Home: React.FC = () => {
  const [newPlace, setNewPlace] = useState('');
  const [newGoal, setNewGoal] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [countries, setCountries] = useState<Country[]>([]);
  const [locations, setLocations] = useState<Location[]>(() => {
    const storagedLocations = localStorage.getItem(
      '@LugaresConhecer:locations',
    );

    if (storagedLocations) {
      return JSON.parse(storagedLocations);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem(
      '@LugaresConhecer:locations',
      JSON.stringify(locations),
    );
  }, [locations]);

  async function handleAddForm(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const [apiResponse] = await (await api.get(`/name/${newCountry}`)).data;

    const response = {
      country: newCountry,
      place: newPlace,
      goal: newGoal,
      countryBR: apiResponse.translations.br,
      flag: apiResponse.flag,
    };

    setLocations([...locations, response]);
  }

  useEffect(() => {
    api.get('/all').then(response => {
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

      <Form onSubmit={handleAddForm}>
        <FormDiv>
          <Label shrink htmlFor="select-country">
            País
          </Label>
          <NativeSelect
            onChange={e => setNewCountry(e.target.value)}
            id="select-country"
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            {countries.map(country => (
              <option key={country.alpha3Code} value={country.name}>
                {country.translations.br}
              </option>
            ))}
          </NativeSelect>
        </FormDiv>

        <FormDiv>
          <Label shrink htmlFor="input-local">
            Local
          </Label>
          <BootstrapInput
            value={newPlace}
            onChange={e => setNewPlace(e.target.value)}
            placeholder="Digite o local que deseja conhecer"
            id="input-local"
          />
        </FormDiv>

        <FormDiv>
          <Label shrink htmlFor="input-date">
            Meta
          </Label>
          <BootstrapInput
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            placeholder="mês/ano"
            id="input-date"
          />
        </FormDiv>

        <Button type="submit">Adicionar</Button>
      </Form>

      <Box>
        <Grid container>
          {locations.map((location, index) => (
            <Grid key={index} item lg={2} md={4} sm={6} xs={12}>
              <Box boxShadow={4} borderRadius={10} m={2} p={2}>
                <Box borderBottom={1}>
                  <img src={location.flag} alt="" />
                  <Typography>{location.countryBR}</Typography>
                </Box>
                <Box>
                  <Typography>
                    Local:
                    {location.place}
                  </Typography>
                  <Typography>
                    Meta:
                    {location.goal}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}

          {/* <Grid item lg={2} md={4} sm={6} xs={12}>
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
          </Grid> */}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
