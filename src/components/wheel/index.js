import React, { useState, useCallback, useEffect, useRef } from 'react';
import { getGroupTotals, useStudents } from '../../service/students';
import './index.css';

// 뽑힌 모둠별로 덕(방어) 합계를 뺀 피해량: [{ group, hits, defense, damage }]
const getGroupDamages = (selectedList, damage, groupTotals) => {
  const hitsByGroup = new Map();
  selectedList.forEach((group) => {
    hitsByGroup.set(group, (hitsByGroup.get(group) || 0) + 1);
  });
  return Array.from(hitsByGroup.entries()).map(([group, hits]) => {
    const defense = groupTotals[group]?.deok ?? 0;
    return { group, hits, defense, damage: Math.max(0, damage - defense) };
  });
};

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
  const [students] = useStudents();

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
            {monsterDamage > 0 && students.length > 0 && (
              <ul className="attack-group-damage">
                {getGroupDamages(
                  selectedList,
                  monsterDamage,
                  getGroupTotals(students)
                ).map(({ group, hits, defense, damage }) => (
                  <li key={group}>
                    {group}모둠: 피해 {damage}
                    {hits > 1 && ` × ${hits}번`}
                    <span className="attack-group-damage-defense">
                      {` (덕 방어 ${defense} 적용)`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Wheel;
