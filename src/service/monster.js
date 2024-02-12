import axios from 'axios';

const instance = axios.create();
export async function getMonsterList() {
  try {
    const res = await instance.get(`http://localhost:8000/api/monsters/`);
    return res.data;
  } catch (err) {
    return err;
  }
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
  try {
    const res = await instance.post(
      `http://localhost:8000/api/monsters/`,
      data,
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function fetchMonster(id, data) {
  try {
    const res = await instance.put(
      `http://localhost:8000/api/monsters/${id}`,
      data,
    );
    return res.data;
  } catch (err) {
    return err;
  }
}

export async function deleteMonster(id) {
  try {
    const res = await instance.delete(
      `http://localhost:8000/api/monsters/${id}`,
    );
    return res.data;
  } catch (err) {
    return err;
  }
}
