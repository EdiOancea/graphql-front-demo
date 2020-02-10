import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  CardActions,
  CardContent,
  Typography,
  Button,
} from '@material-ui/core';
import { StyledCard, StyledCardMedia } from './styles';

const Hotel = ({
  id,
  name,
  location,
  description,
  roomCount,
}) => {
  const history = useHistory();

  return (
    <StyledCard>
      <CardContent>
        <Typography gutterBottom variant="h4" component="h2">
          {name}
        </Typography>
        <Typography component="p">
          {location}
        </Typography>
        <Typography component="p">
          {description}
        </Typography>
        <Typography component="p">
          {`Rooms left: ${roomCount}`}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          {...{
            onClick: () => history.push(`/hotels/${id}`),
            variant: 'text',
            color: 'primary',
          }}
        >
          Book
        </Button>
      </CardActions>
    </StyledCard>
  )
};

export default Hotel;
