import React, { useState, useCallback, useMemo } from 'react';
import './index.css';

const Monster = ({
  selectedMonster,
  monsterState,
  setMonsterState,
  setSelectedMonsterAttack,
}) => {
  const { level = 3, name = 'puppy', images, attacks } = selectedMonster;

  const image = useMemo(() => {
    switch (monsterState) {
      default:
      case 'normal':
        return images?.normalImg;
      case 'rage':
        return images?.rageImg;
      case 'hit':
        return images?.hitImg;
      case 'attack':
        return images?.attackImg;
    }
  }, [images, monsterState]);

  const handleAttack = (attack) => {
    setMonsterState('attack');
    setSelectedMonsterAttack(attack);
  };

  return (
    <div className="monster-container">
      <div className="img-container">
        <img src={image} alt="괴물" />
      </div>
      <div className="info">
        <p className="name">{name}</p>
        <p>Lv {level}</p>
        <p>공격기</p>
        {attacks &&
          attacks.map((attack) => (
            <button key={attack.name} onClick={() => handleAttack(attack)}>
              {attack.name}
            </button>
          ))}
      </div>
    </div>
  );
};

export default Monster;
