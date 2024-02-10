import axios from 'axios';

const instance = axios.create();
export async function getMonsterList() {
  try {
    const res = await instance.get(`http://localhost:8000/api/monsters/`);
    console.log(res);
    return res.data.data;
  } catch (err) {
    return err;
  }
}
