import React, { useRef } from 'react';
import './index.css';

const MonsterAttack = ({
  health,
  initialHealth,
  setMonster,
  setMonsterState,
}) => {
  const inputRef = useRef();
  const handleSubmit = () => {
    if (!inputRef.current.value) return;
    setMonsterState('hit');
    setMonster((prev) => {
      return { ...prev, health: prev.health - inputRef.current.value };
    });

    // Reset monster state after 1 second
    const current_health = health - inputRef.current.value;
    const remainHealth = (current_health / initialHealth) * 100;
    setTimeout(() => {
      remainHealth < 30 ? setMonsterState('rage') : setMonsterState('normal');
    }, 1000);
  };
  return (
    <div className="attack-hobodang">
      <input ref={inputRef} />
      <button onClick={handleSubmit}>호보당 공격</button>
    </div>
  );
};

export default MonsterAttack;
