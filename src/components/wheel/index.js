import React, { useState, useCallback, useEffect } from 'react';
import './index.css';

const SPIN_TIMER = 2000;

const Wheel = ({ items, selectedMonsterAttack, setSelectedMonsterAttack }) => {
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const selectItem = useCallback(() => {
    const selectedItemIndex = Math.floor(Math.random() * items.length);
    setSelectedItem(selectedItemIndex);
    setCounter((currentCounter) => currentCounter + 0.4);
    setIsSpinning(true);

    // Reset spinning class after 2 seconds
    setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_TIMER);
  }, [items.length]);

  useEffect(() => {
    if (selectedMonsterAttack.num_of_attack > 0) {
      for (let i = 0; i < selectedMonsterAttack.num_of_attack; i++) {
        setTimeout(() => {
          selectItem();
        }, i * SPIN_TIMER);
      }
      setSelectedMonsterAttack({});
    }
  }, [
    selectedMonsterAttack.num_of_attack,
    selectItem,
    setSelectedMonsterAttack,
  ]);

  const wheelVars = {
    '--nb-item': items.length,
    '--selected-item': selectedItem,
    '--counter': counter,
    '--spinning-duration': `${SPIN_TIMER}ms`,
  };
  const spinning = selectedItem !== null ? 'spinning' : '';

  return (
    <div className="wheel-container">
      <div className={`wheel ${spinning}`} style={wheelVars}>
        {items.map((item, index) => (
          <div
            className="wheel-item"
            key={index}
            style={{ '--item-nb': index }}
          >
            {item}
          </div>
        ))}
      </div>
      {items[selectedItem]}
    </div>
  );
};

export default Wheel;
