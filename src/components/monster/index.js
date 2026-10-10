import React, { useMemo, useState } from 'react';
import { DEFAULT_MONSTER_IMG } from '../../monsterImages';
import './index.css';

const Monster = ({
  selectedMonster,
  monsterState,
  setMonsterState,
  setSelectedMonsterAttack,
}) => {
  const { level = 3, name = 'puppy', images, attacks } = selectedMonster;

  // 불러오지 못한 이미지 주소. 다음 후보 이미지로 넘어갈 때 사용한다.
  const [brokenImages, setBrokenImages] = useState([]);

  const image = useMemo(() => {
    let stateImage;
    switch (monsterState) {
      default:
      case 'normal':
        stateImage = images?.normalImg;
        break;
      case 'rage':
        stateImage = images?.rageImg;
        break;
      case 'hit':
        stateImage = images?.hitImg;
        break;
      case 'attack':
        stateImage = images?.attackImg;
        break;
    }
    // 상태 이미지 → 기본 이미지 → 기본 괴물 이미지 순으로 사용
    const candidates = [stateImage, images?.normalImg].filter(
      (src) => src && !brokenImages.includes(src),
    );
    return candidates[0] || DEFAULT_MONSTER_IMG;
  }, [images, monsterState, brokenImages]);

  const handleImageError = () => {
    // 기본 괴물 이미지까지 실패하면 더 바꾸지 않는다. (onError 무한 반복 방지)
    if (image === DEFAULT_MONSTER_IMG) return;
    setBrokenImages((prev) => (prev.includes(image) ? prev : [...prev, image]));
  };

  const handleAttack = (attack) => {
    setMonsterState('attack');
    setSelectedMonsterAttack(attack);
  };

  return (
    <div className="monster-container">
      <div className="img-container">
        <img src={image} alt="괴물" onError={handleImageError} />
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
            fontSize: 'min(100px, 12vw)',
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
