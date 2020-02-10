import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Button } from '@material-ui/core';

import { Wrapper, Title, ButtonsWrapper } from './styles';

const AppBar = ({ title = '', actions = [] }) => (
  <Wrapper>
    <MuiAppBar position="static">
      <Toolbar>
        <Title variant="h6">
          {title}
        </Title>
        <ButtonsWrapper>
          {actions.map(({ onClick, buttonText }) => (
            <Button
              {...{
                color: 'inherit',
                onClick,
                key: buttonText,
              }}
            >
              {buttonText}
            </Button>
          ))}
        </ButtonsWrapper>
      </Toolbar>
    </MuiAppBar>
  </Wrapper>
);

export default AppBar;
