import React, { useRef, useState } from 'react';
import { monsterDirectory } from '../../monsterDirectory';
import { getMonsterList } from '../../service/monster';

const Monster = ({ setCurrentMonster }) => {
  const [updateMode, setUpdateMode] = useState(undefined);
  const [message, setMessage] = useState('');
  const name = useRef('');
  const level = useRef('');
  const strength = useRef('');
  const health = useRef('');

  const normal = useRef('');
  const angry = useRef('');
  const hit = useRef('');
  const attack = useRef('');

  const [inputValue, setInputValue] = useState('');

  const handleChangeMonster = () => {
    setUpdateMode('change');
    const data = getMonsterList();
  };

  const handleChangeMonsterSubmit = (selected) => {
    setCurrentMonster(monsterDirectory[selected]);
  };

  const handleCreatMonster = () => {
    setUpdateMode('creat');
  };
  const handleEditMonster = () => {
    setUpdateMode('edit');
  };

  const handleSubmit = () => {
    const data = {
      name: name.current.value,
      level: level.current.value,
      strength: strength.current.value,
      health: health.current.value,
    };
    if (updateMode === 'creat') {
      localStorage.setItem([name.current.value], JSON.stringify(data));
    }

    setUpdateMode(false);
  };

  const handleGenerateJson = () => {
    try {
      localStorage.setItem('myData', inputValue);
    } catch (error) {
      console.error('Error generating JSON:', error);
    }
  };

  return (
    <div>
      <button onClick={handleChangeMonster}>몬스터 변경하기</button>
      {updateMode === 'change' && (
        <div>
          {Object.keys(monsterDirectory).map((name) => (
            <button key={name} onClick={() => handleChangeMonsterSubmit(name)}>
              {name}
            </button>
          ))}
        </div>
      )}

      <button onClick={handleCreatMonster}>몬스터 생성하기</button>
      <button onClick={handleEditMonster}>몬스터 수정하기</button>

      {updateMode !== 'change' && updateMode && (
        <div className="input-container">
          저장하지 않고 이탈할경우 데이터는 사라집니다.
          <div>
            <span>name: </span>
            <input defaultValue={name.current} ref={name} />
          </div>
          <div>
            <span>level: </span>
            <input defaultValue={level.current} ref={level} />
          </div>
          <div>
            <span>strength: </span>
            <input defaultValue={strength.current} ref={strength} />
          </div>
          <div>
            <span>health: </span>
            <input defaultValue={health.current} ref={health} />
          </div>
          <p>이미지 link</p>
          <div>
            <span>기본: </span>
            <input defaultValue={normal.current} ref={normal} />
          </div>
          <div>
            <span>분노상태: </span>
            <input defaultValue={angry.current} ref={angry} />
          </div>
          <div>
            <span>피격시: </span>
            <input defaultValue={hit.current} ref={hit} />
          </div>
          <div>
            <span>공격시: </span>
            <input defaultValue={attack.current} ref={attack} />
          </div>
          <button onClick={handleSubmit}>저장</button>
          {updateMode === 'edit' && (
            <button onClick={handleSubmit}>삭제</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Monster;
