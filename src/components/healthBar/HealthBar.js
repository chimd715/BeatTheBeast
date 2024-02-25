import React, { useEffect, useMemo, useState } from 'react';
import './index.css';

import win from '../../img/win.png';

const HealthBar = ({ health, initialHealth, setMonsterState }) => {
  const [winningModalVisible, setWinningModalVisible] = useState(false);
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
      case remainHealth >= 30 && remainHealth < 70:
        return 'yellow';
      case remainHealth < 30:
        setMonsterState('rage');
        return 'red';
    }
  }, [remainHealth]);

  useEffect(() => {
    if (displayHealth === 0) {
      setTimeout(() => {
        setWinningModalVisible(true);
      }, 1000);
    }
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
      }}
    >
      <span style={{ verticalAlign: 'top', margin: '10px', fontSize: 30 }}>
        체력
      </span>
      <div
        style={{
          display: 'inline-block',
          border: '1px solid black',
          width: '80%',
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
      <span style={{ verticalAlign: 'top', margin: '10px', fontSize: 30 }}>
        {displayHealth} / {initialHealth}
      </span>
      {winningModalVisible && (
        <div className="winning-modal">
          <div className="winning-modal-content">
            <div
              className="winning-modal-close"
              onClick={() => setWinningModalVisible(false)}
            >
              x
            </div>
            <img src={win} alt="승리" />
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthBar;
