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
        <p className="attack">공격/방어기</p>
        <div className="attack-list-button">
          {attacks &&
            attacks.map((attack) => (
              <div>
                <button key={attack.name} onClick={() => handleAttack(attack)}>
                  {attack.name}{' '}
                  <span style={{ fontSize: 18 }}>
                    ({attack.num_of_attack}회{' '}
                    {attack.damage === 0 ? '방어' : '공격'} / 피해치{' '}
                    {attack.damage})
                  </span>
                </button>
              </div>
            ))}
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
