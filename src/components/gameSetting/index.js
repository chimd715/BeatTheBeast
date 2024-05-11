import React, { useState } from 'react';
import Hobodang from './Hobodang';
import Monster from './Monster';
import settingImg from '../../img/setting.png';
import './index.css';
const GameSetting = ({
  setPlayer,
  player = 6,
  setSelectedMonster,
  setInitialMonsterHealth,
  setMonsterState,
  customButton,
  selectedMonster,
}) => {
  const [visible, setVisible] = useState(false);
  const [tab, setTab] = useState('player');

  return (
    <>
      <div onClick={() => setVisible(true)} className="setting-btn">
        {customButton || (
          <div
            className="setting-icon-container"
            style={{ width: 20, height: 20 }}
          >
            <img src={settingImg} alt="설정" />
          </div>
        )}
      </div>
      {visible && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-close" onClick={() => setVisible(false)}>
              닫기
            </div>
            <p className="content-main-noti">
              수정된 데이터는 즉시 반영됩니다.
            </p>
            <div className="content">
              <nav className={`menu ${tab}`}>
                <button className="player" onClick={() => setTab('player')}>
                  <h2>호보당</h2>
                </button>
                <button className="monster" onClick={() => setTab('monster')}>
                  <h2>괴물</h2>
                </button>
              </nav>
              <div className="data-editor">
                {tab === 'player' && (
                  <Hobodang
                    setPlayer={setPlayer}
                    player={player}
                    setVisible={setVisible}
                  />
                )}
                {tab === 'monster' && (
                  <Monster
                    setSelectedMonster={setSelectedMonster}
                    setInitialMonsterHealth={setInitialMonsterHealth}
                    setMonsterState={setMonsterState}
                    selectedMonster={selectedMonster}
                    setVisible={setVisible}
                  />
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
