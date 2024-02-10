import React, { useRef, useState } from 'react';

const Hobodang = ({ setPlayer, player }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const updateCount = useRef();

  const handleSubmit = () => {
    const inputValue = +updateCount.current.value;
    if (!inputValue) return setMessage('0이상의 숫자를 입력해주세요.');
    if (inputValue > 99) return setMessage('99이하의 숫자를 입력해주세요.');

    setPlayer(updateCount.current.value);
    setIsEditMode(false);
  };

  const handleChangePlayerCount = () => {
    !isEditMode ? setIsEditMode(true) : handleSubmit();
  };

  return (
    <div>
      호보당 : {player}
      <button onClick={handleChangePlayerCount}>
        {!isEditMode ? '수정' : '완료'}
      </button>
      {isEditMode && (
        <>
          <input
            defaultValue={player}
            ref={updateCount}
            onChange={() => setMessage('')}
          />
          <p>{message}</p>
        </>
      )}
    </div>
  );
};

export default Hobodang;
