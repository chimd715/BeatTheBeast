import React, {
  forwardRef,
  useImperativeHandle,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { resetAllRefs } from '../../utills';
import { KR_MAP } from './assets';

const MonsterAttckList = ({ patchMonster }, ref) => {
  const [attackFields, setAttackFields] = useState([]);
  const [isAttackEditModeById, setIsAttackEditModeById] = useState(null);

  useImperativeHandle(ref, () => ({
    attackFields,
  }));

  const attackRefs = {
    attackName: useRef(null),
    damage: useRef(null),
    numOfAttack: useRef(null),
  };

  const patchMonsterImgList = useMemo(() => {
    if (!patchMonster.name) return;
    setAttackFields(patchMonster.attacks);
  }, [patchMonster]);

  const defaultValue = useMemo(() => {
    return patchMonster.name
      ? {
          name: patchMonster.name,
          level: patchMonster.level,
          health: patchMonster.health,
          ...patchMonsterImgList,
        }
      : {};
  }, [patchMonster]);

  // Attack
  const addAttackField = () => {
    const attackData = {
      name: attackRefs.attackName.current.value,
      damage: +attackRefs.damage.current.value,
      num_of_attack: +attackRefs.numOfAttack.current.value,
    };
    setAttackFields((prev) => {
      return [...prev, attackData];
    });
    resetAllRefs(attackRefs);
  };

  const updateAttackField = () => {
    const updatedAttackFields = attackFields.map((item, i) => {
      const attackData = {
        name: attackRefs.attackName.current.value,
        damage: +attackRefs.damage.current.value,
        num_of_attack: +attackRefs.numOfAttack.current.value,
      };
      if (i === isAttackEditModeById) {
        return attackData;
      } else {
        return item;
      }
    });
    setAttackFields(updatedAttackFields);
    setIsAttackEditModeById(null);
    resetAllRefs(attackRefs);
  };

  const resetAttackField = () => {
    setIsAttackEditModeById(null);
    resetAllRefs(attackRefs);
  };

  const removeAttackField = (index) => {
    const updatedAttackFields = attackFields.filter((_, i) => i !== index);
    setAttackFields(updatedAttackFields);
  };

  const handleSetEditData = (index) => {
    setIsAttackEditModeById(index);
    attackRefs.attackName.current.value = attackFields[index].name;
    attackRefs.damage.current.value = +attackFields[index].damage;
    attackRefs.numOfAttack.current.value = +attackFields[index].num_of_attack;
  };

  return (
    <section>
      <p>
        <span className="require">*</span>공격
      </p>
      <div className="attack-input-container">
        {Object.keys(attackRefs).map((fieldName) => (
          <div key={fieldName} className="input-felid">
            <span>{KR_MAP[fieldName]}</span>
            <input
              defaultValue={defaultValue[fieldName]}
              ref={attackRefs[fieldName]}
            />
          </div>
        ))}
        <div className="option-button">
          {isAttackEditModeById !== null ? (
            <div className="update-option">
              <button onClick={updateAttackField}>변경</button>
              <button onClick={resetAttackField}>취소</button>
            </div>
          ) : (
            <button onClick={addAttackField}>추가</button>
          )}
        </div>
      </div>
      <div className="saved-attack">
        <div className="th">
          <div>이름</div>
          <div>피해량</div>
          <div>횟수</div>
          <div>옵션</div>
        </div>
        <div className="tb">
          {attackFields.map(
            ({ name, damage, num_of_attack }, index, { length }) => {
              return (
                <div className="colum">
                  <div>{name}</div>
                  <div>{damage}</div>
                  <div>{num_of_attack}</div>
                  <div>
                    {length !== 1 && (
                      <button
                        style={{ marginRight: '10px' }}
                        onClick={() => removeAttackField(index)}
                      >
                        삭제
                      </button>
                    )}
                    <button onClick={() => handleSetEditData(index)}>
                      수정
                    </button>
                  </div>
                </div>
              );
            },
          )}
        </div>
      </div>
    </section>
  );
};

export default forwardRef(MonsterAttckList);
