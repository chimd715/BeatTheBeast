import React, { useState, useCallback, useRef } from 'react';
import './index.css';

const MonsterAttack = ({ setMonster }) => {
  const inputRef = useRef();

  const handleSubmit = () => {
    console.log(inputRef.current.value);
    setMonster((prev) => {
      return { ...prev, health: prev.health - inputRef.current.value };
    });
  };
  return (
    <>
      <button onClick={handleSubmit}>호보당 공격</button>
      <input ref={inputRef} />
    </>
  );
};

export default MonsterAttack;
