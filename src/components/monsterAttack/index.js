import React, { useEffect, useRef, useState } from 'react';
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

    setMonsterState('hit');
    setMonster((prev) => {
      return { ...prev, health: prev.health - damage };
    });
    showDamage(damage);

    // Reset monster state after 1 second
    const current_health = health - damage;
    const remainHealth = (current_health / initialHealth) * 100;
    addTimer(() => {
      remainHealth < 30 ? setMonsterState('rage') : setMonsterState('normal');
    }, 1000);
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
