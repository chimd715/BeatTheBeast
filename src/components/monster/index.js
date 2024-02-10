import React, { useState, useCallback } from 'react';
import './index.css';

const Monster = ({ selectedMonster }) => {
  const { level = 3, name = 'puppy', strength = 100 } = selectedMonster;
  return (
    <div className="monster-container">
      <div className="img-container">
        <img src={`img/${name}/${level}.jpeg`} alt="괴물" />
      </div>
      <div className="info">
        <p className="name">{name}</p>
        <p>Lv {level}</p>
        <p>공격력 {strength}</p>
      </div>
    </div>
  );
};

export default Monster;
