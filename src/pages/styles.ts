import {
  createStyles,
  fade,
  FormControl,
  InputBase,
  InputLabel,
  Theme,
  withStyles,
} from '@material-ui/core';
import styled from 'styled-components';

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

export const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;

  background: #4f9419;
  padding: 70px;

  Button {
    background: #006c18;
    border-radius: 7px;

    color: #fff;
    font-size: 18px;
    font-weight: 400;
    text-transform: none;
    height: 48px;
    width: 200px;
    margin-top: 24px;
  }
`;

export const Label = styled(InputLabel)`
  color: #fff;
  line-height: 19px;

  font-size: 16px;
  font-weight: 400;
`;

export const FormDiv = styled(FormControl)`
  /* flex: 1; */
  #select-country {
    width: 300px;
  }

  #input-local {
    width: 450px;
  }

  #input-date {
    width: 240px;
  }
`;

export const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      'label + &': {
        marginTop: theme.spacing(3),
        marginRight: 30,
      },
    },
    input: {
      borderRadius: 7,
      position: 'relative',
      backgroundColor: theme.palette.common.white,
      fontSize: 16,
      width: 'auto',
      height: 28,
      padding: '10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      '&:focus': {
        boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
      flex: 1,
    },
  }),
)(InputBase);
