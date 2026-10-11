import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HealthBar from './components/healthBar/HealthBar'; // Assuming HealthBar component is in HealthBar.js
import Wheel from './components/wheel'; // Assuming RouletteWheel component is in RouletteWheel.js
import Monster from './components/monster';
import GameSetting from './components/gameSetting';
import MonsterAttack from './components/monsterAttack';
import Landing from './components/landing';
import HomeButton from './components/landing/HomeButton';
import StudentStats from './components/studentStats';
import Board from './components/board';
import { getRestState } from './monsterState';
import './App.css';

// 화면 전환: 'landing' | 'battle' | 'stats' | 'board' (URL hash로 뒤로가기 지원)
const VIEWS = ['battle', 'stats', 'board'];
const getViewFromHash = () => {
  const hash = window.location.hash.replace(/^#/, '');
  return VIEWS.includes(hash) ? hash : 'landing';
};

const App = () => {
  const [view, setView] = useState(getViewFromHash);
  const [selectedMonster, setSelectedMonster] = useState({});
  const [initialHealth, setInitialMonsterHealth] = useState(100);
  const [player, setPlayer] = useState(6);
  const [monsterState, setMonsterState] = useState('normal');
  const [selectedMonsterAttack, setSelectedMonsterAttack] = useState({});
  const group = useMemo(() => {
    return Array.from({ length: player }, (_, index) => index + 1);
  }, [player]);

  useEffect(() => {
    const syncView = () => setView(getViewFromHash());
    window.addEventListener('hashchange', syncView);
    window.addEventListener('popstate', syncView);
    return () => {
      window.removeEventListener('hashchange', syncView);
      window.removeEventListener('popstate', syncView);
    };
  }, []);

  const navigate = useCallback((nextView) => {
    if (nextView === 'landing') {
      const { pathname, search } = window.location;
      window.history.pushState(null, '', pathname + search);
    } else {
      window.location.hash = nextView;
    }
    setView(VIEWS.includes(nextView) ? nextView : 'landing');
  }, []);

  const goHome = useCallback(() => navigate('landing'), [navigate]);

  // 전투 화면을 벗어나면 룰렛 결과창·피격 타이머가 사라지므로,
  // 괴물이 공격/피격 이미지에 멈추지 않도록 체력에 맞는 상태로 되돌린다.
  useEffect(() => {
    if (view === 'battle') return;
    setMonsterState(getRestState(selectedMonster.health, initialHealth));
  }, [view, selectedMonster.health, initialHealth]);

  if (view === 'stats') {
    return <StudentStats onHome={goHome} />;
  }

  if (view === 'board') {
    return <Board onHome={goHome} />;
  }

  if (view !== 'battle') {
    return <Landing onNavigate={navigate} />;
  }

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
            <HomeButton onClick={goHome} />
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
              restState={getRestState(selectedMonster.health, initialHealth)}
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
          <HomeButton onClick={goHome} floating />
          <h1>괴물을 선택해주세요</h1>
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
