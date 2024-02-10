import React, { useState } from 'react';
import HealthBar from './HealthBar'; // Assuming HealthBar component is in HealthBar.js
import MonsterModal from './components/create_monster_modal/MonsterModal'; // Assuming MonsterModal component is in MonsterModal.js
import Wheel from './components/wheel'; // Assuming RouletteWheel component is in RouletteWheel.js
import HealthReduction from './components/attack_btn/MonsterAttackBtn'; // Assuming HealthReduction component is in HealthReduction.js
import Monster from './components/monster';

const App = () => {
  // Initial monster data could also be fetched from an API or other sources.
  const [monster, setMonster] = useState({
    image: '',
    strength: 0,
    level: 0,
    health: 100,
  });

  const handleHealthChange = (damage) => {
    setMonster({ ...monster, health: Math.max(monster.health - damage, 0) });
  };

  const handleSaveMonster = (monsterData) => {
    setMonster({ ...monster, ...monsterData });
  };

  return (
    <div style={{ margin: '20px' }}>
      {/* Monster Info and Health Bar */}
      <div style={{ width: '100%' }}>
        <HealthBar health={monster.health} initialHealth={monster.health} />
      </div>
      <div className="main-container">
        <Monster />
        <div
          className="game-tools-container"
          style={{ display: 'inline-flex', flexDirection: 'column' }}
        >
          {/* Wheel */}
          <Wheel items={[1, 2, 3, 4, 5, 6]} />
        </div>
      </div>
      {/* Health Reduction Input */}
      <div>{/* <HealthReduction onHealthChange={handleHealthChange} /> */}</div>
      {/* Modal for setting monster */}
      {/* <div>
                <MonsterModal onSave={handleSaveMonster} />
            </div> */}
    </div>
  );
};

export default App;
