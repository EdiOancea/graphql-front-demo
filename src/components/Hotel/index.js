import React from 'react';
import { useHistory } from 'react-router-dom';

const Hotel = ({ name, id }) => {
  const history = useHistory();

  return (
    <div onClick={() => history.push(`/hotels/${id}`)}>{name}</div>
  );
};

export default Hotel;
