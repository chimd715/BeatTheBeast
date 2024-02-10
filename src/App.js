import React, { useMemo, useState } from 'react';
import HealthBar from './HealthBar'; // Assuming HealthBar component is in HealthBar.js
import Wheel from './components/wheel'; // Assuming RouletteWheel component is in RouletteWheel.js
import Monster from './components/monster';
import GameSetting from './components/gameSetting';
import MonsterAttack from './components/monsterAttack';
import { monsterDirectory } from './monsterDirectory';

const App = () => {
  // Initial monster data could also be fetched from an API or other sources.
  const [currentMonster, setCurrentMonster] = useState(
    monsterDirectory.default,
  );
  const [selectedMonster, setSelectedMonster] = useState({ ...currentMonster });
  const [player, setPlayer] = useState(6);

  const group = useMemo(() => {
    return Array.from({ length: player }, (_, index) => index + 1);
  }, [player]);

  return (
    <body>
      <div
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginBottom: 40,
        }}
      >
        <HealthBar
          health={selectedMonster.health}
          initialHealth={monsterDirectory[selectedMonster.name].health}
        />
        <GameSetting
          player={player}
          setPlayer={setPlayer}
          setCurrentMonster={setSelectedMonster}
        />
      </div>
      <div className="main-container">
        <Monster selectedMonster={selectedMonster} />
        <Wheel items={group} />
        <MonsterAttack setMonster={setSelectedMonster} />
      </div>
    </body>
  );
};

export default App;
