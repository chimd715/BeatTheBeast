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
import { KR_MAP } from './assets';

const Monster = ({
  setSelectedMonster,
  setInitialMonsterHealth,
  setMonsterState,
  selectedMonster,
}) => {
  const [updateMode, setUpdateMode] = useState('change');
  const [monsterList, setMonsterList] = useState([]);
  const [patchMonster, setpatchMonster] = useState({});
  const [attackFields, setAttackFields] = useState([]);
  const [isAttackEditModeById, setIsAttackEditModeById] = useState(null);

  useEffect(() => {
    if (updateMode === 'change') {
      getMonstersData();
    }
  }, [updateMode]);

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
  const patchMonsterImgList = useMemo(() => {
    if (!patchMonster.name) return;
    setAttackFields(patchMonster.attacks);
    return imageListFormat(patchMonster.images);
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
    setpatchMonster({});
  };

  const handleCreateMonster = () => {
    const result = dataResetAlert('create');
    if (!result) return false;
    resetInputData();
    setUpdateMode('create');
    setAttackFields([]);
    setpatchMonster({});
  };

  const handlePatchMonster = async () => {
    const result = dataResetAlert('patch');
    if (!result) return false;
    getMonstersData();
    setpatchMonster({});
    setAttackFields([]);
    setUpdateMode('patch');
  };

  // Select Monster
  const handlePatchMonsterByName = (selected) => {
    setpatchMonster(selected);
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
      id: patchMonster.id,
      name: InfoRefs.name.current.value,
      level: +InfoRefs.level.current.value,
      attacks: attackFields,
      health: +InfoRefs.health.current.value,
      attack: 0,
      images,
    };

    await postMonster(data);
    window.alert('괴수를 생성하였습니다.');
    setUpdateMode('change');
  };

  // Delete Monster
  const handleDeleteMonster = async () => {
    const result = window.confirm(
      '정말 삭제하시겠습니까? 삭제한 몬스터는 다시 불러올 수 없습니다.',
    );
    if (!result) return false;
    await deleteMonster(patchMonster.id);
    window.alert('삭제되었습니다.');
    await handleChangeMonster('change');
  };

  useEffect(() => {
    if (updateMode === 'patch' && patchMonster.name) {
      updateInputData(defaultValue);
    }
  }, [updateInputData, defaultValue, patchMonster, updateMode]);

  return (
    <div className="data-editor-monster-content">
      <div className={`sub-menu ${updateMode}`}>
        <button className="secondary change" onClick={handleChangeMonster}>
          몬스터 변경하기
        </button>
        <button className="secondary create" onClick={handleCreateMonster}>
          몬스터 생성하기
        </button>
        <button className="secondary patch" onClick={handlePatchMonster}>
          몬스터 수정하기
        </button>
      </div>
      <div>
        {(updateMode === 'change' || updateMode === 'patch') && (
          <div className="local-monster">
            {monsterList
              .sort((a, b) => a.level - b.level)
              .map((item, index) => {
                return (
                  <button
                    className={`tertiary ${
                      updateMode === 'change'
                        ? selectedMonster?.id === item.id
                          ? 'selected'
                          : 'unselected'
                        : patchMonster?.id === item.id
                        ? 'selected'
                        : 'unselected'
                    }`}
                    key={item.name}
                    onClick={() =>
                      updateMode === 'change'
                        ? handleChangeMonsterSubmit(index)
                        : handlePatchMonsterByName(item)
                    }
                  >
                    Lv{item.level}.{item.name}
                  </button>
                );
              })}
          </div>
        )}
        {(updateMode === 'create' ||
          (updateMode === 'patch' && patchMonster.name)) && (
          <div className="input-container">
            <p style={{ marginTop: '10px', position: 'relative' }}>
              저장하지 않고 이탈할경우 데이터는 사라집니다.
            </p>
            {updateMode === 'patch' && (
              <button className="remove-monster" onClick={handleDeleteMonster}>
                괴수 삭제
              </button>
            )}
            <div className="monster-data-container">
              <section>
                <p>
                  <span className="require">*</span>괴수 정보
                </p>
                <div style={{ display: 'flex' }}>
                  {Object.keys(InfoRefs).map((fieldName) => (
                    <div key={fieldName} className="input-felid">
                      <span>{KR_MAP[fieldName]}</span>
                      <input
                        defaultValue={defaultValue[fieldName] ?? ''}
                        ref={InfoRefs[fieldName]}
                      />
                    </div>
                  ))}
                </div>
              </section>
              <section>
                <p>
                  <span className="require">*</span>이미지
                </p>
                <div>
                  {Object.keys(imgRefs).map((fieldName) => (
                    <div key={fieldName} className="input-felid">
                      <span>{KR_MAP[fieldName]}</span>
                      <input
                        defaultValue={defaultValue[fieldName] ?? ''}
                        ref={imgRefs[fieldName]}
                      />
                    </div>
                  ))}
                </div>
              </section>
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
            </div>
            <button className="submit" onClick={handleSubmit}>
              데이터 저장
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monster;
