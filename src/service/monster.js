import axios from 'axios';

const instance = axios.create();

function getLocalMonsters() {
  return JSON.parse(localStorage.getItem('monsters')) || [];
}

export async function getMonsterList() {
  return getLocalMonsters();

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
 * @returns
 */
export async function postMonster(data) {
  let monsters = getLocalMonsters();
  if (data.id) {
    const index = monsters.findIndex((monster) => monster.id === data.id);
    monsters[index] = data;
  } else {
    data.id = monsters.length + 1;
    monsters.push(data);
  }
  localStorage.setItem('monsters', JSON.stringify(monsters));
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
  let monsters = getLocalMonsters();
  const index = monsters.findIndex((monster) => monster.id === id);
  monsters[index] = data;
  localStorage.setItem('monsters', JSON.stringify(monsters));

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
  let monsters = getLocalMonsters();
  monsters = monsters.filter((monster) => monster.id !== id);
  localStorage.setItem('monsters', JSON.stringify(monsters));
  return monsters;

  // try {
  //   const res = await instance.delete(
  //     `http://localhost:8000/api/monsters/${id}`,
  //   );
  //   return res.data;
  // } catch (err) {
  //   return err;
  // }
}
