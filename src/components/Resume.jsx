import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const MyComponent = () => {
  const dispatchedData = useSelector((state) => state.dispatchedData);

  return (
    <div>
      {dispatchedData.map((data, index) => (
        <p key={index}>{data}</p>
      ))}
    </div>
  );
};

export default MyComponent;