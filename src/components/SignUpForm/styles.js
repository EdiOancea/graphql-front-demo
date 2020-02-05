import styled from 'styled-components';
import { Avatar } from '@material-ui/core';

export const Wrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledAvatar = styled(Avatar)`
  margin-top: 60px;
  margin-bottom: 10px;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 400;
`;
