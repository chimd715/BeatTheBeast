import React, { useEffect, useRef, useState } from 'react';
import { getGroupTotals, useStudents } from '../../service/students';
import { getRestState } from '../../monsterState';
import './index.css';

const DAMAGE_POPUP_DURATION = 1500;

const MonsterAttack = ({
  health,
  initialHealth,
  setMonster,
  setMonsterState,
}) => {
  const inputRef = useRef();
  const timersRef = useRef(new Set());
  const popupIdRef = useRef(0);
  const [damagePopups, setDamagePopups] = useState([]);
  const [message, setMessage] = useState('');
  const [students] = useStudents();
  const groupTotals = getGroupTotals(students);
  const groupAttacks = Object.keys(groupTotals)
    .map(Number)
    .sort((a, b) => a - b)
    .filter((group) => groupTotals[group].ji > 0);

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
      timers.clear();
    };
  }, []);

  const addTimer = (callback, delay) => {
    const timer = setTimeout(() => {
      timersRef.current.delete(timer);
      callback();
    }, delay);
    timersRef.current.add(timer);
  };

  const showDamage = (damage) => {
    popupIdRef.current += 1;
    const id = popupIdRef.current;
    setDamagePopups((prev) => [...prev, { id, damage }]);
    addTimer(() => {
      setDamagePopups((prev) => prev.filter((popup) => popup.id !== id));
    }, DAMAGE_POPUP_DURATION);
  };

  // 괴물에게 피해를 준다 (직접 입력 / 모둠 공격 버튼 공용)
  const attack = (damage) => {
    setMonsterState('hit');
    setMonster((prev) => {
      return { ...prev, health: prev.health - damage };
    });
    showDamage(damage);

    // Reset monster state after 1 second
    const restState = getRestState(health - damage, initialHealth);
    addTimer(() => setMonsterState(restState), 1000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const rawValue = inputRef.current.value.trim();
    const damage = Number(rawValue);
    if (!rawValue || !Number.isFinite(damage) || damage <= 0) {
      setMessage('0보다 큰 숫자를 입력해주세요.');
      inputRef.current.focus();
      return;
    }

    setMessage('');
    inputRef.current.value = '';
    inputRef.current.focus();

    attack(damage);
  };

  const handleGroupAttack = (group) => {
    const damage = groupTotals[group]?.ji ?? 0;
    if (damage <= 0) return;
    setMessage('');
    attack(damage);
  };

  return (
    <>
      <form className="attack-hobodang" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="number"
          min="1"
          inputMode="numeric"
          placeholder="피해량"
          onChange={() => message && setMessage('')}
        />
        <button type="submit">호보당 공격</button>
      </form>
      {groupAttacks.length > 0 && (
        <div className="attack-hobodang-groups">
          {groupAttacks.map((group) => (
            <button
              key={group}
              type="button"
              className="attack-hobodang-group-btn"
              onClick={() => handleGroupAttack(group)}
            >
              {group}모둠 공격 (지 {groupTotals[group].ji})
            </button>
          ))}
        </div>
      )}
      {message && <p className="attack-hobodang-message">{message}</p>}
      <div className="damage-popup-layer" aria-live="polite">
        {damagePopups.map((popup) => (
          <span key={popup.id} className="damage-popup">
            -{popup.damage}
          </span>
        ))}
      </div>
    </>
  );
};

export default MonsterAttack;
