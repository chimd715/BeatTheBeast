import React, { useMemo } from 'react';
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

  console.log(attacks);
  return (
    <div className="monster-container">
      <div className="img-container">
        <img src={image} alt="괴물" />
      </div>
      <div className="info">
        <p className="name">
          <p>{name}</p>
        </p>
        <div className="attack attack-legend">
          <span>공격/방어기</span>
          <span className="legend-item skill-attack">
            <span className="legend-dot" />
            공격
          </span>
          <span className="legend-item skill-defense">
            <span className="legend-dot" />
            방어
          </span>
        </div>
        <div className="attack-list-button">
          {attacks &&
            attacks.map((attack, index) => {
              const isDefense = Number(attack.damage) === 0;
              return (
                <div key={`${attack.name}-${index}`}>
                  <button
                    className={isDefense ? 'skill-defense' : 'skill-attack'}
                    onClick={() => handleAttack(attack)}
                  >
                    <span className="skill-badge">
                      {isDefense ? '방어' : '공격'}
                    </span>
                    {attack.name}{' '}
                    <span className="skill-detail">
                      {isDefense
                        ? `(${attack.num_of_attack}회 방어)`
                        : `(${attack.num_of_attack}회 공격 - 피해치 ${attack.damage})`}
                    </span>
                  </button>
                </div>
              );
            })}
        </div>
      </div>
      {selectedMonster.health <= 0 && (
        <div
          style={{
            backgroundColor: 'rgba(0,0,0,.8)',
            position: 'absolute',
            width: '100%',
            height: '100%',
            top: 0,
            fontSize: 100,
            color: 'red',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          토벌 완료
        </div>
      )}
    </div>
  );
};

export default Monster;
