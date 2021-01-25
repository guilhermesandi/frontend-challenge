import styled from 'styled-components';
import { Button } from '@material-ui/core';

export const Header = styled.div`
  background: #000000;
  padding: 30px 0;
  filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

  header {
    margin: 0 auto;
    padding: 0 53px;
    height: 82px;
    display: flex;
    align-items: center;
  }
`;

export const Form = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-around;
  align-content: center;

  background: #4f9419;
  padding: 60px 20px;

  div {
    flex-grow: 1;
    margin: 0 30px;
  }

  input {
    width: 100%;
  }

  Button {
    width: 100%;
    background: #006c18;
    color: #fff;
    border-radius: 7px;

    text-transform: none;
    font-size: 18px;
    line-height: 21px;
    font-weight: 400;
  }
`;
