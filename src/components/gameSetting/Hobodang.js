import React, { useRef, useState } from 'react';
import { SETTING_KEYS, useSetting } from '../../settings';

const Hobodang = ({ setPlayer, player, setVisible }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const updateCount = useRef();
  const [showHealthNumber, setShowHealthNumber] = useSetting(
    SETTING_KEYS.SHOW_HEALTH_NUMBER,
    true
  );

  const handleSubmit = () => {
    const inputValue = +updateCount.current.value;
    if (!inputValue) return setMessage('0이상의 숫자를 입력해주세요.');
    if (inputValue > 99) return setMessage('99이하의 숫자를 입력해주세요.');

    setPlayer(updateCount.current.value);
    setIsEditMode(false);
    setVisible(false);
  };

  const handleChangePlayerCount = () => {
    !isEditMode ? setIsEditMode(true) : handleSubmit();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center' }}>
        <h2>호보당</h2>
        <div
          style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}
        >
          <div style={{ display: 'flex' }}>
            {isEditMode ? (
              <>
                <input
                  style={{ fontSize: 25, width: 100 }}
                  defaultValue={player}
                  ref={updateCount}
                  onChange={() => setMessage('')}
                />
              </>
            ) : (
              <p style={{ fontSize: 25, marginRight: 10 }}>{player}</p>
            )}
            <button onClick={handleChangePlayerCount} style={{ fontSize: 25 }}>
              {!isEditMode ? '수정' : '완료'}
            </button>
          </div>
          {message && <p style={{ color: 'red', marginTop: 10 }}>{message}</p>}
        </div>
      </div>
      <label
        style={{
          marginLeft: 10,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontSize: 25,
          cursor: 'pointer',
        }}
      >
        <input
          type="checkbox"
          checked={showHealthNumber}
          onChange={(e) => setShowHealthNumber(e.target.checked)}
          style={{ width: 25, height: 25, cursor: 'pointer' }}
        />
        체력 수치 표시
      </label>
    </div>
  );
};

export default Hobodang;
