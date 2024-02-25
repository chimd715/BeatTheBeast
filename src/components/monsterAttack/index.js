import React, { useRef } from 'react';
import './index.css';

const MonsterAttack = ({ setMonster, setMonsterState }) => {
  const inputRef = useRef();
  const handleSubmit = () => {
    if(!inputRef.current.value ) return;
    setMonsterState('hit');
    setMonster((prev) => {
      return { ...prev, health: prev.health - inputRef.current.value };
    });
  };
  return (
    <div className="attack-hobodang">
      <input ref={inputRef} />
      <button onClick={handleSubmit}>호보당 공격</button>
    </div>
  );
};

export default MonsterAttack;
