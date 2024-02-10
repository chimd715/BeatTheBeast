import React, { useMemo } from 'react';

const HealthBar = ({ health, initialHealth }) => {
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
        return 'red';
    }
  }, [remainHealth]);

  return (
    <div style={{ margin: '10px', flexGrow: 1, textAlign: 'center' }}>
      <span style={{ verticalAlign: 'top', margin: '10px' }}>체력</span>
      <div
        style={{
          display: 'inline-block',
          border: '1px solid black',
          width: '80%',
        }}
      >
        <div
          style={{
            height: '20px',
            background: progressBarColor,
            ...barStyle,
            transition: '0.3s',
          }}
        ></div>
      </div>
      <span style={{ verticalAlign: 'top', margin: '10px' }}>
        {displayHealth} / {initialHealth}
      </span>
    </div>
  );
};

export default HealthBar;
