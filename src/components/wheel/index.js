import React, { useState, useCallback, useEffect, useRef } from 'react';
import './index.css';

const SPIN_TIMER = 2000;

const Wheel = ({
  items,
  setMonsterState,
  selectedMonsterAttack,
  setSelectedMonsterAttack,
}) => {
  const [counter, setCounter] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedList, setSelectedList] = useState([]);
  const [monsterDamage, setMonsterDamage] = useState(0);
  const [selectedListModalVisible, setSelectedListModalVisible] =
    useState(false);
  const attackCountRef = useRef(0);

  const selectItem = useCallback(() => {
    const selectedItemIndex = Math.floor(Math.random() * items.length);
    setSelectedItem(selectedItemIndex);
    setSelectedList((prev) => [...prev, selectedItemIndex + 1]);
    setCounter((currentCounter) => currentCounter + 0.4);
    setIsSpinning(true);
    setTimeout(() => {
      setIsSpinning(false);
    }, SPIN_TIMER);
  }, [items.length]);

  const handleCloseModal = () => {
    setSelectedListModalVisible(false);
    setSelectedList([]);

    // Reset monster state when closing modal
    setMonsterState('normal');
  };

  useEffect(() => {
    if (selectedMonsterAttack.num_of_attack > 0) {
      for (let i = 0; i < selectedMonsterAttack.num_of_attack; i++) {
        setTimeout(() => selectItem(), i * SPIN_TIMER);
        attackCountRef.current = i + 1;
      }
      setMonsterDamage(selectedMonsterAttack.damage);
      setSelectedMonsterAttack({});
    } else {
      console.log(
        selectedMonsterAttack.num_of_attack,
        'selectedMonsterAttack.num_of_attack',
      );
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

  useEffect(() => {
    if (!isSpinning) return;
    setTimeout(() => {
      setSelectedListModalVisible(true);
    }, attackCountRef.current * SPIN_TIMER + 500);
  }, [attackCountRef.current, isSpinning]);

  return (
    <>
      <div className="wheel-bg">
        <div className="wheel-container">
          <div className={`wheel ${spinning}`} style={wheelVars}>
            {items.map((item, index) => (
              <div
                className="wheel-item nanumbrushscript"
                key={index}
                style={{ '--item-nb': index }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
      {selectedListModalVisible && selectedList.length && !isSpinning && (
        <div className="attack-modal">
          <div className="attack-modal-content">
            <span className="attack-modal-close" onClick={handleCloseModal}>
              x
            </span>
            <p>{selectedList.join(',')}</p>
            <p className="attack-info">
              {monsterDamage === 0
                ? '안 아프지롱~'
                : '피해량 -' + monsterDamage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Wheel;
