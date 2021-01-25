import React from 'react';

import { Button, Box, FormControl, NativeSelect } from '@material-ui/core';
import { Header, Form, BootstrapInput, Input } from './styles';

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
        <FormControl>
          <Input shrink htmlFor="bootstrap-input">
            País
          </Input>
          <NativeSelect
            id="demo-customized-select-native"
            value={country}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option aria-label="None" value="" />
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>

        <FormControl>
          <Input shrink htmlFor="bootstrap-input">
            Local
          </Input>
          <BootstrapInput
            placeholder="Digite o local que deseja conhecer"
            id="bootstrap-input"
          />
        </FormControl>

        <FormControl>
          <Input shrink htmlFor="bootstrap-input">
            Meta
          </Input>
          <BootstrapInput placeholder="mês/ano" id="bootstrap-input" />
        </FormControl>

        <Button>Adicionar</Button>
      </Form>
      {/* <Box>
        <div>
          <p>Bandeira</p>
          <p>Brasil</p>
        </div>
        <div>Icons</div>
      </Box> */}
    </>
  );
};

export default Home;
