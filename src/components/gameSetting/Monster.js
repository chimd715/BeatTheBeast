import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  deleteMonster,
  getMonsterList,
  postMonster,
} from '../../service/monster';
import { resetAllRefs, updateValueRef } from '../../utills';

const Monster = ({
  setSelectedMonster,
  setInitialMonsterHealth,
  setMonsterState,
}) => {
  const [updateMode, setUpdateMode] = useState('change');
  const [monsterList, setMonsterList] = useState([]);
  const [fetchMonster, setFetchMonster] = useState({});
  const [attackFields, setAttackFields] = useState([]);
  const [isAttackEditModeById, setIsAttackEditModeById] = useState(null);

  const attackRefs = {
    attackName: useRef(null),
    damage: useRef(null),
    numOfAttack: useRef(null),
  };

  const InfoRefs = {
    name: useRef(null),
    level: useRef(null),
    health: useRef(null),
  };

  const imgRefs = {
    normalImg: useRef(null),
    rageImg: useRef(null),
    hitImg: useRef(null),
    attackImg: useRef(null),
  };

  const imageListFormat = (images) => {
    const obj = {};
    images.forEach((img) => {
      obj[`${img.image_type}Img`] = img.url;
    });
    return obj;
  };
  const fetchMonsterImgList = useMemo(() => {
    if (!fetchMonster.name) return;
    setAttackFields(fetchMonster.attacks);
    imageListFormat(fetchMonster.images);
  }, [fetchMonster]);

  const defaultValue = useMemo(() => {
    return fetchMonster.name
      ? {
          name: fetchMonster.name,
          level: fetchMonster.level,
          health: fetchMonster.health,
          ...fetchMonsterImgList,
        }
      : {};
  }, []);

  const getMonstersData = async () => {
    const data = await getMonsterList();
    setMonsterList(data);
  };

  const resetInputData = () => {
    resetAllRefs(attackRefs);
    resetAllRefs(InfoRefs);
    resetAllRefs(imgRefs);
  };

  const updateInputData = useCallback(
    (data) => {
      resetAllRefs(attackRefs);
      updateValueRef(InfoRefs, data);
      updateValueRef(imgRefs, data);
    },
    [InfoRefs, attackRefs, imgRefs],
  );

  const dataResetAlert = () => {
    if (updateMode === 'change') return true;
    const result = window.confirm('저장하지 않은 데이터는 사라집니다.');
    return result;
  };

  // Menu Change
  const handleChangeMonster = async () => {
    const result = dataResetAlert('change');
    if (!result) return false;
    resetInputData();
    setUpdateMode('change');
    getMonstersData();
  };

  const handleCreatMonster = () => {
    const result = dataResetAlert('creat');
    if (!result) return false;
    resetInputData();
    setUpdateMode('creat');
    setAttackFields([]);
  };

  const handleFetchMonster = async () => {
    const result = dataResetAlert('fetch');
    if (!result) return false;
    getMonstersData();
    setFetchMonster({});
    setAttackFields([]);
    setUpdateMode('fetch');
  };

  // Select Monster
  const handleFetchMonsterByName = (selected) => {
    setFetchMonster(selected);
  };

  const handleChangeMonsterSubmit = (selected) => {
    const updateImageList = imageListFormat(monsterList[selected].images);
    setInitialMonsterHealth(monsterList[selected].health);
    setSelectedMonster({
      ...monsterList[selected],
      images: { ...updateImageList },
    });
    setMonsterState('normal');
  };

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

  // Submit
  const handleSubmit = async () => {
    const images = [
      {
        url: imgRefs.normalImg.current.value,
        image_type: 'normal',
      },
      { url: imgRefs.rageImg.current.value, image_type: 'rage' },
      {
        url: imgRefs.attackImg.current.value,
        image_type: 'attack',
      },
      { url: imgRefs.hitImg.current.value, image_type: 'hit' },
    ];

    const data = {
      name: InfoRefs.name.current.value,
      level: +InfoRefs.level.current.value,
      attacks: attackFields,
      health: +InfoRefs.health.current.value,
      attack: 0,
      images,
    };

    await postMonster(data);
  };

  // Delete Monster
  const handleDeleteMonster = async () => {
    const result = window.confirm(
      '정말 삭제하시겠습니까? 삭제한 몬스터는 다시 불러올 수 없습니다.',
    );
    if (!result) return false;
    await deleteMonster(fetchMonster.id);
    window.alert('삭제되었습니다.');
    await handleChangeMonster('change');
  };

  useEffect(() => {
    if (updateMode === 'fetch' && fetchMonster.name) {
      updateInputData(defaultValue);
    }
  }, [updateInputData, defaultValue, fetchMonster, updateMode]);

  return (
    <div className="data-editor-monster-content">
      <div className="sub-menu">
        <button onClick={handleChangeMonster}>몬스터 변경하기</button>
        <button onClick={handleCreatMonster}>몬스터 생성하기</button>
        <button onClick={handleFetchMonster}>몬스터 수정하기</button>
      </div>
      <div>
        {(updateMode === 'change' || updateMode === 'fetch') && (
          <div>
            {monsterList.map((item, index) => (
              <button
                key={item.name}
                onClick={() =>
                  updateMode === 'change'
                    ? handleChangeMonsterSubmit(index)
                    : handleFetchMonsterByName(item)
                }
              >
                {item.name}
              </button>
            ))}
          </div>
        )}
        {(updateMode === 'creat' ||
          (updateMode === 'fetch' && fetchMonster.name)) && (
          <div className="input-container">
            저장하지 않고 이탈할경우 데이터는 사라집니다. 모든 데이터는
            필수값입니다.
            {updateMode === 'fetch' && (
              <button onClick={handleDeleteMonster}>삭제</button>
            )}
            <div className="monster-data-container">
              <section>
                <p>몬스터 정보</p>
                <div>
                  {Object.keys(InfoRefs).map((fieldName) => (
                    <div key={fieldName}>
                      <span>{fieldName}</span>
                      <input
                        defaultValue={defaultValue[fieldName] ?? ''}
                        ref={InfoRefs[fieldName]}
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <p>이미지</p>
                <div>
                  {Object.keys(imgRefs).map((fieldName) => (
                    <div key={fieldName}>
                      <span>{fieldName}</span>
                      <input
                        defaultValue={defaultValue[fieldName] ?? ''}
                        ref={imgRefs[fieldName]}
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <p>공격</p>
                <div>
                  {Object.keys(attackRefs).map((fieldName) => (
                    <div key={fieldName}>
                      <span>{fieldName}</span>
                      <input
                        defaultValue={defaultValue[fieldName]}
                        ref={attackRefs[fieldName]}
                      />
                    </div>
                  ))}

                  {isAttackEditModeById ? (
                    <button onClick={updateAttackField}>update Attack</button>
                  ) : (
                    <button onClick={addAttackField}>Add Attack</button>
                  )}
                </div>
                {attackFields.map(
                  ({ name, damage, num_of_attack }, index, { length }) => {
                    return (
                      <div>
                        이름{name} 데미지 {damage} 횟수{num_of_attack}
                        {length !== 1 && (
                          <button onClick={() => removeAttackField(index)}>
                            Remove
                          </button>
                        )}
                        <button onClick={() => handleSetEditData(index)}>
                          edit
                        </button>
                      </div>
                    );
                  },
                )}
              </section>
            </div>
            <button onClick={handleSubmit}>저장</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monster;
