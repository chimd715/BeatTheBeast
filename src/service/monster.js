import axios from 'axios';
import { DOKKAEBI_IMAGES } from '../monsterImages';

const instance = axios.create();

const STORAGE_KEY = 'monsters';

export const QUOTA_EXCEEDED_MESSAGE =
  '저장 공간이 부족합니다. 더 작은 이미지를 사용하거나 다른 괴물을 삭제해주세요.';
export const SAVE_FAILED_MESSAGE =
  '저장하지 못했습니다. 브라우저의 사이트 데이터(저장소) 설정을 확인해주세요.';

// 누구나 볼 수 있는 기본 제공 괴물. localStorage 에 저장되지 않으며 수정·삭제할 수 없다.
export const DEFAULT_MONSTERS = [
  {
    id: 'default-1',
    name: '꼬마 도깨비',
    level: '하',
    health: 100,
    attack: 0,
    attacks: [
      { name: '도깨비 방망이', damage: 5, num_of_attack: 1 },
      { name: '도깨비 방패', damage: 0, num_of_attack: 1 },
    ],
    images: [
      { url: DOKKAEBI_IMAGES.normalImg, image_type: 'normal' },
      { url: DOKKAEBI_IMAGES.rageImg, image_type: 'rage' },
      { url: DOKKAEBI_IMAGES.attackImg, image_type: 'attack' },
      { url: DOKKAEBI_IMAGES.hitImg, image_type: 'hit' },
    ],
  },
];

export function isDefaultMonster(id) {
  return DEFAULT_MONSTERS.some((monster) => monster.id === id);
}

// 삭제 후에도 기존 괴물과 겹치지 않는 id
function createMonsterId(monsters) {
  const usedIds = new Set(monsters.map((monster) => monster.id));
  let id = Date.now();
  while (usedIds.has(id)) id += 1;
  return id;
}

// 예전 방식(목록 길이 + 1)으로 만들어져 겹친 id 를 고친다.
function fixDuplicateIds(monsters) {
  const seenIds = new Set();
  let changed = false;
  monsters.forEach((monster) => {
    if (
      monster.id === undefined ||
      monster.id === null ||
      seenIds.has(monster.id) ||
      isDefaultMonster(monster.id)
    ) {
      monster.id = createMonsterId(monsters);
      changed = true;
    }
    seenIds.add(monster.id);
  });
  if (changed) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(monsters));
    } catch (err) {
      // 다음 저장 때 다시 시도된다.
    }
  }
  return monsters;
}

function getLocalMonsters() {
  let monsters;
  try {
    monsters = JSON.parse(localStorage.getItem(STORAGE_KEY));
  } catch (err) {
    return [];
  }
  if (!Array.isArray(monsters)) return [];
  return fixDuplicateIds(monsters.filter((monster) => monster));
}

function isQuotaExceededError(err) {
  return (
    !!err &&
    (err.name === 'QuotaExceededError' ||
      err.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
      err.code === 22 ||
      err.code === 1014)
  );
}

/**
 * 괴물 목록을 저장한다. 저장하지 못하면 안내 후 false 를 반환한다.
 * @param {Array} monsters
 * @returns {boolean}
 */
function saveLocalMonsters(monsters) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(monsters));
    return true;
  } catch (err) {
    window.alert(
      isQuotaExceededError(err) ? QUOTA_EXCEEDED_MESSAGE : SAVE_FAILED_MESSAGE,
    );
    return false;
  }
}

export async function getMonsterList() {
  return [
    ...DEFAULT_MONSTERS.map((monster) => ({ ...monster })),
    ...getLocalMonsters(),
  ];

  // try {
  //   const res = await instance.get(`http://localhost:8000/api/monsters/`);
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
}

/**
 *
 * @param {Object} data
 * @param {string} data.name
 * @param {number} data.level
 * @param {number} data.health
 * @param {string} data.description
 * @param {Array} data.attacks
 * @param {Array} data.images
 * @returns {Promise<Array|null>} 저장된 괴물 목록. 저장하지 못하면 null
 */
export async function postMonster(data) {
  const monsters = getLocalMonsters();
  // 기본 제공 괴물은 덮어쓰지 않고 새 괴물로 저장한다.
  const index =
    data.id && !isDefaultMonster(data.id)
      ? monsters.findIndex((monster) => monster.id === data.id)
      : -1;
  if (index === -1) {
    monsters.push({ ...data, id: createMonsterId(monsters) });
  } else {
    monsters[index] = { ...data };
  }
  if (!saveLocalMonsters(monsters)) return null;
  return monsters;

  // try {
  //   const res = await instance.post(
  //     `http://localhost:8000/api/monsters/`,
  //     data,
  //   );
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
}

export async function patchMonster(id, data) {
  if (isDefaultMonster(id)) return null;
  const monsters = getLocalMonsters();
  const index = monsters.findIndex((monster) => monster.id === id);
  if (index === -1) return null;
  monsters[index] = data;
  if (!saveLocalMonsters(monsters)) return null;
  return monsters;

  // try {
  //   const res = await instance.put(
  //     `http://localhost:8000/api/monsters/${id}`,
  //     data,
  //   );
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
}

export async function deleteMonster(id) {
  const monsters = getLocalMonsters();
  if (isDefaultMonster(id)) return monsters;
  const remainMonsters = monsters.filter((monster) => monster.id !== id);
  if (!saveLocalMonsters(remainMonsters)) return null;
  return remainMonsters;

  // try {
  //   const res = await instance.delete(
  //     `http://localhost:8000/api/monsters/${id}`,
  //   );
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
}
