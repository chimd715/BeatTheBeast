import React, { useRef, useState } from 'react';

const Hobodang = ({ setPlayer, player, setVisible }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const updateCount = useRef();

  const handleSubmit = () => {
    const inputValue = +updateCount.current.value;
    if (!inputValue) return setMessage('0이상의 숫자를 입력해주세요.');
    if (inputValue > 99) return setMessage('99이하의 숫자를 입력해주세요.');

    setPlayer(updateCount.current.value);
    setIsEditMode(false);
    setVisible(false)
  };

  const handleChangePlayerCount = () => {
    !isEditMode ? setIsEditMode(true) : handleSubmit();
  };

  return (
    <div style={{ marginLeft: 10, display: 'flex', alignItems: 'center' }}>
      <h2>호보당</h2>
      <div style={{ marginLeft: 10, display: 'flex', flexDirection: 'column' }}>
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
  );
};

export default Hobodang;
