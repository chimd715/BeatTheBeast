import React, { useState, useCallback } from 'react';
import './index.css';

const Monster = ({ level, name, strength, health }) => {
  return (
    <div className="zz">
      <image />
      <div className="info">
        <p>name: {name}</p>
        <p>Level: {level}</p>
        <p>Strength: {strength}</p>
        <p>health: {health}</p>
      </div>
    </div>
  );
};

export default Monster;
