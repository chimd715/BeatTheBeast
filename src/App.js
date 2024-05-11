import React, { useMemo, useState } from 'react';
import HealthBar from './components/healthBar/HealthBar'; // Assuming HealthBar component is in HealthBar.js
import Wheel from './components/wheel'; // Assuming RouletteWheel component is in RouletteWheel.js
import Monster from './components/monster';
import GameSetting from './components/gameSetting';
import MonsterAttack from './components/monsterAttack';
import './App.css';
const App = () => {
  const [selectedMonster, setSelectedMonster] = useState({});
  const [initialHealth, setInitialMonsterHealth] = useState(100);
  const [player, setPlayer] = useState(6);
  const [monsterState, setMonsterState] = useState('normal');
  const [selectedMonsterAttack, setSelectedMonsterAttack] = useState({});
  const group = useMemo(() => {
    return Array.from({ length: player }, (_, index) => index + 1);
  }, [player]);

  return (
    <>
      {selectedMonster.name ? (
        <div className="game-container">
          <div
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              marginBottom: 10,
            }}
          >
            <HealthBar
              health={selectedMonster.health}
              initialHealth={initialHealth}
              setMonsterState={setMonsterState}
            />
            <GameSetting
              player={player}
              setPlayer={setPlayer}
              setSelectedMonster={setSelectedMonster}
              setInitialMonsterHealth={setInitialMonsterHealth}
              setMonsterState={setMonsterState}
              selectedMonster={selectedMonster}
            />
          </div>
          <div className="main-container">
            <Monster
              selectedMonster={selectedMonster}
              monsterState={monsterState}
              setMonsterState={setMonsterState}
              setSelectedMonsterAttack={setSelectedMonsterAttack}
            />
            <Wheel
              items={group}
              setMonsterState={setMonsterState}
              selectedMonsterAttack={selectedMonsterAttack}
              setSelectedMonsterAttack={setSelectedMonsterAttack}
            />
          </div>
          <MonsterAttack
            health={selectedMonster.health}
            initialHealth={initialHealth}
            setMonster={setSelectedMonster}
            setMonsterState={setMonsterState}
          />
        </div>
      ) : (
        <div className="intro">
          <h1>괴물를 선택해주세요</h1>
          <GameSetting
            player={player}
            setPlayer={setPlayer}
            setSelectedMonster={setSelectedMonster}
            setInitialMonsterHealth={setInitialMonsterHealth}
            setMonsterState={setMonsterState}
            customButton={<button className="default">괴물 선택하기</button>}
          />
        </div>
      )}
    </>
  );
};

export default App;
