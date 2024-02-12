import React, { useRef } from 'react';
import './index.css';

const MonsterAttack = ({ setMonster, setMonsterState }) => {
  const inputRef = useRef();
  const handleSubmit = () => {
    setMonsterState('hit');
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
