import React, { useState, useEffect, FormEvent } from 'react';
import { Button, Box, NativeSelect, Grid, IconButton } from '@material-ui/core';
import InputMask from 'react-input-mask';
import { MdEdit, MdClose } from 'react-icons/md';

import api from '../services/api';

import Logo from '../assets/logo.png';

import {
  Header,
  Form,
  BootstrapInput,
  Label,
  FormDiv,
  GridData,
  CountryFormat,
  LocationFormat,
} from './styles';

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

  // const removeGoal = (id: string) => {};

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
          <InputMask
            mask="99/9999"
            value={newGoal}
            onChange={e => setNewGoal(e.target.value)}
            placeholder="mês/ano"
            id="input-date"
          >
            {() => <BootstrapInput placeholder="mês/ano" />}
          </InputMask>
        </FormDiv>

        <Button type="submit">Adicionar</Button>
      </Form>

      <Box>
        <Grid container>
          {locations.map((location, index) => (
            <GridData key={index} item lg={2} md={4} sm={6} xs={12}>
              <Box borderRadius={10} m={2} p={1}>
                <CountryFormat>
                  <div>
                    <img src={location.flag} alt={location.countryBR} />
                    <p>{location.countryBR}</p>
                  </div>
                  <div>
                    <IconButton aria-label="change">
                      <MdEdit size={18} />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      // onClick={() => removeGoal(location.country)}
                    >
                      <MdClose size={18} />
                    </IconButton>
                  </div>
                </CountryFormat>
                <LocationFormat>
                  <p>
                    <span>Local: </span>
                    {location.place}
                  </p>
                  <p>
                    <span>Meta: </span>
                    {location.goal}
                  </p>
                </LocationFormat>
              </Box>
            </GridData>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
