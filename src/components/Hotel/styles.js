import styled from 'styled-components';
import { Card, CardMedia } from '@material-ui/core';

export const Name = styled.div`
  font-size: 16px;
`;

export const Location = styled.div`
  margin-bottom: 5px;
`;

export const Rooms = styled.div`
  color: #FF0000;
`;

export const Description = styled.div``;

export const Wrapper = styled.div`
  width: 100%;
  margin: 5px 0;
  padding: 10px;
  border: 1px solid #C4C4C4;
  border-radius: 5px;
`;

export const StyledCard = styled(Card)`
  width: 100%;
`;

export const StyledCardMedia = styled(CardMedia)`
  height: 200px;
`;
