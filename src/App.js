import React, { useMemo, useState } from 'react';
import HealthBar from './HealthBar'; // Assuming HealthBar component is in HealthBar.js
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
    <div>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        {selectedMonster.name ? (
          <HealthBar
            health={selectedMonster.health}
            initialHealth={initialHealth}
            setMonsterState={setMonsterState}
          />
        ) : (
          <div className="intro">
            '몬스터를 세팅해주세요.'
            <GameSetting
              player={player}
              setPlayer={setPlayer}
              setSelectedMonster={setSelectedMonster}
              setInitialMonsterHealth={setInitialMonsterHealth}
              setMonsterState={setMonsterState}
            />
          </div>
        )}
        <GameSetting
          player={player}
          setPlayer={setPlayer}
          setSelectedMonster={setSelectedMonster}
          setInitialMonsterHealth={setInitialMonsterHealth}
          setMonsterState={setMonsterState}
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
          selectedMonsterAttack={selectedMonsterAttack}
          setSelectedMonsterAttack={setSelectedMonsterAttack}
        />
        <MonsterAttack
          setMonster={setSelectedMonster}
          setMonsterState={setMonsterState}
        />
      </div>
    </div>
  );
};

export default App;
