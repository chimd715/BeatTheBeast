import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';

import winAsset from '../../img/win.png';
import { assetUrl } from '../../assetUrl';
import { SETTING_KEYS, useSetting } from '../../settings';
import { RAGE_HEALTH_PERCENT } from '../../monsterState';

const HealthBar = ({ health, initialHealth, setMonsterState }) => {
  const [winningModalVisible, setWinningModalVisible] = useState(false);
  const [showHealthNumber] = useSetting(SETTING_KEYS.SHOW_HEALTH_NUMBER, true);
  const remainHealth = (health / initialHealth) * 100;
  const displayHealth = health < 0 ? 0 : Math.floor(health);
  const barStyle = {
    width: `${health < 0 ? 0 : Math.floor(remainHealth)}%`,
  };

  const progressBarColor = useMemo(() => {
    switch (true) {
      default:
      case remainHealth >= 70:
        return 'green';
      case remainHealth >= RAGE_HEALTH_PERCENT && remainHealth < 70:
        return 'yellow';
      case remainHealth < RAGE_HEALTH_PERCENT:
        // setMonsterState('rage');
        return 'red';
    }
  }, [remainHealth]);

  // 승리 창은 이 화면에서 체력이 0이 되는 순간에만 띄운다.
  // (처치한 괴물로 전투 화면에 다시 들어올 때마다 뜨지 않도록)
  const prevHealthRef = useRef(displayHealth);
  useEffect(() => {
    const wasAlive = prevHealthRef.current > 0;
    prevHealthRef.current = displayHealth;
    if (!wasAlive || displayHealth !== 0) return;
    const timer = setTimeout(() => {
      setWinningModalVisible(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [displayHealth]);

  return (
    <div
      style={{
        margin: '10px',
        marginTop: 15,
        flexGrow: 1,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ verticalAlign: 'top', margin: '10px', fontSize: 30 }}>
        체력
      </span>
      <div
        style={{
          display: 'inline-block',
          border: '1px solid black',
          flex: 1,
          minWidth: 120,
          borderRadius: 8,
        }}
      >
        <div
          style={{
            height: '25px',
            borderRadius: 8,
            background: progressBarColor,
            ...barStyle,
            transition: '0.3s',
          }}
        ></div>
      </div>
      {showHealthNumber && (
        <span style={{ verticalAlign: 'top', margin: '10px', fontSize: 30 }}>
          {displayHealth} / {initialHealth}
        </span>
      )}
      {winningModalVisible && (
        <div className="winning-modal">
          <div className="winning-modal-content">
            <div
              className="winning-modal-close"
              onClick={() => setWinningModalVisible(false)}
            >
              x
            </div>
            <img src={assetUrl(winAsset)} alt="승리" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthBar;
