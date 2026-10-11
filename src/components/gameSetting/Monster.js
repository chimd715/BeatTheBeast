import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  deleteMonster,
  getMonsterList,
  isDefaultMonster,
  postMonster,
} from '../../service/monster';
import { fileToResizedDataURL } from '../../imageUtils';
import { IMAGE_GALLERY } from '../../monsterImages';
import { resetAllRefs, updateValueRef } from '../../utills';
import { KR_MAP, LEVEL_ORDER, sortMonstersByLevel } from './assets';
import MonsterAttckList from './MonsterAttckList';

const IMAGE_FIELDS = ['normalImg', 'rageImg', 'hitImg', 'attackImg'];
// 기본 제공 이미지 주소 모음 (사용자가 직접 넣은 이미지와 구분하기 위해)
const GALLERY_IMAGE_URLS = new Set(
  IMAGE_GALLERY.flatMap((item) => Object.values(item.images)),
);

const createRefs = (fieldNames) =>
  fieldNames.reduce((refs, fieldName) => {
    refs[fieldName] = createRef();
    return refs;
  }, {});

// 이미지 칸 옆에 보여주는 작은 미리보기
const ImageThumb = ({ src, emptyText }) => {
  const [brokenSrc, setBrokenSrc] = useState(null);

  if (!src) {
    return <div className="image-thumb empty">{emptyText}</div>;
  }
  if (brokenSrc === src) {
    return <div className="image-thumb broken">불러올 수 없음</div>;
  }
  return (
    <img
      className="image-thumb"
      src={src}
      alt="미리보기"
      onError={() => setBrokenSrc(src)}
    />
  );
};

const Monster = ({
  setSelectedMonster,
  setInitialMonsterHealth,
  setMonsterState,
  selectedMonster,
  setVisible,
}) => {
  const [updateMode, setUpdateMode] = useState('change');
  const [monsterList, setMonsterList] = useState([]);
  const [patchMonster, setPatchMonster] = useState({});
  const [attackFields, setAttackFields] = useState([]);
  const [isAttackEditModeById, setIsAttackEditModeById] = useState(null);

  const [imagePreview, setImagePreview] = useState({});
  // 파일을 이미지로 변환 중인 개수. 변환이 끝나기 전에 저장하면 새 이미지가 빠지므로 막는다.
  const [convertingCount, setConvertingCount] = useState(0);

  const savedAttackFieldsRef = useRef();
  // 수정 대상 괴물이나 모드가 바뀔 때마다 올라간다. (이미지 변환 중 대상이 바뀌었는지 확인용)
  const formVersionRef = useRef(0);

  useEffect(() => {
    formVersionRef.current += 1;
  }, [patchMonster, updateMode]);

  // 렌더링마다 새로 만들어지지 않도록 한 번만 생성한다.
  const [attackRefs] = useState(() =>
    createRefs(['attackName', 'damage', 'numOfAttack']),
  );
  const [InfoRefs] = useState(() => createRefs(['name', 'level', 'health']));
  const [imgRefs] = useState(() => createRefs(IMAGE_FIELDS));

  const syncImagePreview = useCallback(() => {
    const preview = {};
    IMAGE_FIELDS.forEach((fieldName) => {
      preview[fieldName] = imgRefs[fieldName].current?.value || '';
    });
    setImagePreview(preview);
  }, [imgRefs]);

  const setImageValue = (fieldName, value) => {
    if (imgRefs[fieldName].current) {
      imgRefs[fieldName].current.value = value;
    }
    setImagePreview((prev) => ({ ...prev, [fieldName]: value }));
  };

  const imageListFormat = (images) => {
    const obj = {};
    (images || []).forEach((img) => {
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
    setImagePreview({});
  };

  const updateInputData = useCallback(
    (data) => {
      resetAllRefs(attackRefs);
      updateValueRef(InfoRefs, data);
      updateValueRef(imgRefs, data);
      syncImagePreview();
    },
    [InfoRefs, attackRefs, imgRefs, syncImagePreview],
  );

  const dataResetAlert = () => {
    if (updateMode === 'change') return true;
    const result = window.confirm('저장하지 않은 데이터는 사라집니다.');
    return result;
  };

  // Menu Change
  const handleChangeMonster = async (from) => {
    if (from !== 'remove') {
      const result = dataResetAlert('change');
      if (!result) return false;
    }
    resetInputData();
    setUpdateMode('change');
    getMonstersData();
    setPatchMonster({});
  };

  const handleCreateMonster = () => {
    const result = dataResetAlert('create');
    if (!result) return false;
    resetInputData();
    setUpdateMode('create');
    setAttackFields([]);
    setPatchMonster({});
  };

  const handlePatchMonster = async () => {
    const result = dataResetAlert('patch');
    if (!result) return false;
    getMonstersData();
    setPatchMonster({});
    setAttackFields([]);
    setUpdateMode('patch');
  };

  // Select Monster
  const handlePatchMonsterByName = (selected) => {
    setPatchMonster(selected);
  };

  const handleChangeMonsterSubmit = (selected) => {
    const updateImageList = imageListFormat(selected.images);
    setInitialMonsterHealth(selected.health);
    setSelectedMonster({
      ...selected,
      images: { ...updateImageList },
    });
    setMonsterState('normal');
    setVisible(false);
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

  // Image
  const handleImageFile = async (fieldName, event) => {
    const input = event.target;
    const file = input.files && input.files[0];
    // 같은 파일을 다시 골라도 onChange 가 동작하도록 비운다.
    input.value = '';
    if (!file) return;
    const formVersion = formVersionRef.current;
    setConvertingCount((count) => count + 1);
    try {
      const dataUrl = await fileToResizedDataURL(file);
      // 변환하는 동안 다른 괴물로 바뀌었으면 그 괴물의 입력칸에 넣지 않는다.
      if (formVersion !== formVersionRef.current) return;
      setImageValue(fieldName, dataUrl);
    } catch (err) {
      window.alert(err?.message || '이미지를 불러오지 못했습니다.');
    } finally {
      setConvertingCount((count) => count - 1);
    }
  };

  const handlePickGalleryImage = (galleryItem) => {
    IMAGE_FIELDS.forEach((fieldName) => {
      const url = galleryItem.images[fieldName];
      const currentValue = imgRefs[fieldName].current?.value;
      if (url) {
        // 기본 이미지는 항상 바꾸고, 나머지는 비어 있거나 다른 기본 제공 이미지일 때만 바꾼다.
        if (
          fieldName === 'normalImg' ||
          !currentValue ||
          GALLERY_IMAGE_URLS.has(currentValue)
        ) {
          setImageValue(fieldName, url);
        }
      } else if (GALLERY_IMAGE_URLS.has(currentValue)) {
        // 새로 고른 세트에 없는 칸에 이전 세트의 이미지가 남아 있으면 비운다. (비우면 기본 이미지 사용)
        setImageValue(fieldName, '');
      }
    });
  };

  // 전투 중인 괴물을 고치면 전투 화면에도 바로 반영한다. (현재 체력은 새 최대 체력을 넘지 않게)
  const applyToBattle = (monster) => {
    setInitialMonsterHealth(monster.health);
    setSelectedMonster((prev) => ({
      ...monster,
      images: imageListFormat(monster.images),
      health: Math.min(prev.health, monster.health),
    }));
  };

  // Submit
  const handleSubmit = async () => {
    if (convertingCount > 0) {
      return window.alert(
        '이미지를 변환하는 중입니다. 잠시 후 다시 저장해주세요.',
      );
    }
    const getImageUrl = (fieldName) =>
      (imgRefs[fieldName].current?.value || '').trim();
    const images = [
      { url: getImageUrl('normalImg'), image_type: 'normal' },
      { url: getImageUrl('rageImg'), image_type: 'rage' },
      { url: getImageUrl('attackImg'), image_type: 'attack' },
      { url: getImageUrl('hitImg'), image_type: 'hit' },
    ];

    const data = {
      id: patchMonster.id,
      name: InfoRefs.name.current.value,
      level: InfoRefs.level.current.value,
      attacks: savedAttackFieldsRef.current.attackFields,
      health: +InfoRefs.health.current.value,
      attack: 0,
      images,
    };

    if (!InfoRefs.name.current.value)
      return window.alert('이름을 입력해주세요.');
    if (!InfoRefs.level.current.value)
      return window.alert('난이도를 입력해주세요.');
    if (!InfoRefs.health.current.value)
      return window.alert('체력을 입력해주세요.');
    // 분노/피해/공격 이미지는 비워두면 전투 화면에서 기본 이미지를 사용한다.
    if (!images[0].url) return window.alert('기본 이미지를 입력해주세요.');
    if (!savedAttackFieldsRef.current.attackFields.length)
      return window.alert('공격을 추가해주세요.');

    const saved = await postMonster(data);
    if (!saved) return;
    if (
      updateMode === 'patch' &&
      selectedMonster?.id !== undefined &&
      selectedMonster.id === patchMonster.id
    ) {
      const savedMonster = saved.find((monster) => monster.id === data.id);
      if (savedMonster) applyToBattle(savedMonster);
    }
    window.alert(
      `괴물을 ${updateMode === 'create' ? '생성' : '수정'}하였습니다.`,
    );
    setUpdateMode('change');
  };

  // Delete Monster
  const handleDeleteMonster = async () => {
    if (isDefaultMonster(patchMonster.id)) {
      return window.alert('기본 제공 괴물은 삭제할 수 없습니다.');
    }
    const result = window.confirm(
      '정말 삭제하시겠습니까? 삭제한 괴물은 다시 불러올 수 없습니다.',
    );
    if (!result) return false;
    const remainMonsters = await deleteMonster(patchMonster.id);
    if (!remainMonsters) return;
    window.alert('삭제되었습니다.');
    // 전투 중인 괴물을 지웠으면 전투 화면을 '괴물을 선택해주세요'로 되돌린다.
    if (
      selectedMonster?.id !== undefined &&
      selectedMonster.id === patchMonster.id
    ) {
      setSelectedMonster({});
      setMonsterState('normal');
      return;
    }
    await handleChangeMonster('remove');
  };

  // 기본 제공 괴물은 수정 목록에서 숨긴다.
  const visibleMonsterList = useMemo(
    () =>
      sortMonstersByLevel(
        updateMode === 'patch'
          ? monsterList.filter((item) => !isDefaultMonster(item.id))
          : monsterList,
      ),
    [monsterList, updateMode],
  );

  useEffect(() => {
    if (updateMode === 'patch' && patchMonster.name) {
      updateInputData(defaultValue);
    }
  }, [updateInputData, defaultValue, patchMonster, updateMode]);

  useEffect(() => {
    if (updateMode === 'change') {
      getMonstersData();
    }
  }, [updateMode]);

  return (
    <div className="data-editor-monster-content">
      <div className={`sub-menu ${updateMode}`}>
        <button className="secondary change" onClick={handleChangeMonster}>
          괴물 변경하기
        </button>
        <button className="secondary create" onClick={handleCreateMonster}>
          괴물 생성하기
        </button>
        <button className="secondary patch" onClick={handlePatchMonster}>
          괴물 수정하기
        </button>
      </div>
      <div>
        {(updateMode === 'change' || updateMode === 'patch') && (
          <div className="local-monster">
            {visibleMonsterList.map((item) => {
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
                  key={item.id}
                  onClick={() =>
                    updateMode === 'change'
                      ? handleChangeMonsterSubmit(item)
                      : handlePatchMonsterByName(item)
                  }
                >
                  {item.name} (난이도: {item.level})
                  {isDefaultMonster(item.id) && (
                    <span className="default-monster-badge">기본</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        {updateMode === 'patch' && (
          <p className="monster-list-note">
            {visibleMonsterList.length
              ? '기본 제공 괴물은 수정·삭제할 수 없어 목록에 보이지 않습니다.'
              : '수정할 수 있는 괴물이 없습니다. 괴물 생성하기에서 새 괴물을 만들어 보세요. (기본 제공 괴물은 수정·삭제할 수 없습니다.)'}
          </p>
        )}
        {(updateMode === 'create' ||
          (updateMode === 'patch' && patchMonster.name)) && (
          <div className="input-container">
            <p style={{ marginTop: '28px', position: 'relative' }}>
              저장하지 않고 이탈할경우 데이터는 사라집니다.
            </p>
            {updateMode === 'patch' && (
              <button className="remove-monster" onClick={handleDeleteMonster}>
                괴물 삭제
              </button>
            )}
            <div className="monster-data-container">
              <section>
                <p>
                  <span className="require">*</span>괴물 정보
                </p>
                <div style={{ display: 'flex' }}>
                  {Object.keys(InfoRefs).map((fieldName) => {
                    // Input based on field name
                    let input_element = (
                      <input
                        defaultValue={defaultValue[fieldName] ?? ''}
                        ref={InfoRefs[fieldName]}
                      />
                    );
                    if (fieldName === 'level') {
                      input_element = (
                        <select
                          defaultValue={defaultValue[fieldName] ?? ''}
                          ref={InfoRefs[fieldName]}
                        >
                          <option value="">선택</option>
                          {LEVEL_ORDER.map((level) => (
                            <option key={level} value={level}>
                              {level}
                            </option>
                          ))}
                        </select>
                      );
                    }

                    return (
                      <div key={fieldName} className="input-field">
                        <span>{KR_MAP[fieldName]}</span>
                        {input_element}
                      </div>
                    );
                  })}
                </div>
              </section>
              <section>
                <p>
                  <span className="require">*</span>이미지
                  <span style={{ fontSize: 12, fontWeight: 300 }}>
                    ( 권장 이미지 : 높이 800px 이하 / 분노·피해·공격 이미지를
                    비워두면 기본 이미지가 사용됩니다 )
                  </span>
                </p>
                <div>
                  {IMAGE_FIELDS.map((fieldName) => (
                    <div key={fieldName} className="input-field image-field">
                      <span>
                        {KR_MAP[fieldName]}
                        {fieldName === 'normalImg' ? ' (필수)' : ' (선택)'}
                      </span>
                      <div className="image-input-row">
                        <ImageThumb
                          src={imagePreview[fieldName]}
                          emptyText={
                            fieldName === 'normalImg' ? '없음' : '기본 이미지'
                          }
                        />
                        <input
                          placeholder="이미지 주소(URL) 입력 또는 파일 선택"
                          defaultValue={defaultValue[fieldName] ?? ''}
                          ref={imgRefs[fieldName]}
                          onChange={(e) =>
                            setImagePreview((prev) => ({
                              ...prev,
                              [fieldName]: e.target.value,
                            }))
                          }
                        />
                        <label className="image-file-button">
                          파일 선택
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFile(fieldName, e)}
                          />
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="image-gallery">
                  <span>기본 이미지 고르기</span>
                  <div className="image-gallery-list">
                    {IMAGE_GALLERY.map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        title={item.name}
                        onClick={() => handlePickGalleryImage(item)}
                      >
                        <img src={item.images.normalImg} alt={item.name} />
                      </button>
                    ))}
                  </div>
                </div>
              </section>
              <MonsterAttckList
                ref={savedAttackFieldsRef}
                patchMonster={patchMonster}
              />
            </div>
            <button
              className="submit"
              onClick={handleSubmit}
              disabled={convertingCount > 0}
            >
              {convertingCount > 0 ? '이미지 변환 중…' : '데이터 저장'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Monster;
