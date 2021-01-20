import React from 'react';

import { Button } from '@material-ui/core';
import { Header, Form } from './styles';

import Logo from '../assets/logo.png';

const Home: React.FC = () => {
  return (
    <>
      <Header>
        <header>
          <img src={Logo} alt="Lugares que quero conhecer" />
        </header>
      </Header>
      <Form>
        <div>
          <h1>País</h1>
          <input placeholder="Selecione..." />
        </div>

        <div>
          <h1>Local</h1>
          <input placeholder="Digite o local que deseja conhecer" />
        </div>

        <div>
          <h1>Meta</h1>
          <input placeholder="mês/ano" />
        </div>

        <div>
          <Button>Adicionar</Button>
        </div>
      </Form>
    </>
  );
};

export default Home;
