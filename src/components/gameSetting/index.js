import React, { useRef, useState } from 'react';
import Hobodang from './Hobodang';
import Monster from './Monster';
import './index.css';
const GameSetting = ({ setPlayer, player = 6, setCurrentMonster }) => {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState('player');
  return (
    <>
      <div style={{ width: 20, height: 20 }} onClick={() => setVisible(true)}>
        <img src="img/setting.png" alt="설정" />
      </div>
      {visible && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setVisible(false)}>
              <img src="img/setting.png" alt="설정" />
            </div>
            <p className="content-main-noti">
              수정된 데이터는 즉시 반영됩니다.
            </p>
            <div className="content">
              <nav className="menu">
                <button onClick={() => setTab('player')}>호보당</button>
                <button onClick={() => setTab('monster')}>괴수</button>
              </nav>
              <div className="data-editor">
                {tab === 'player' && (
                  <Hobodang setPlayer={setPlayer} player={player} />
                )}
                {tab === 'monster' && (
                  <Monster setCurrentMonster={setCurrentMonster} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GameSetting;
