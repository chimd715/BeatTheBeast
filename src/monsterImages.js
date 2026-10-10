import dokkaebiNormal from './img/default-monster.svg';
import dokkaebiRage from './img/default-monster-rage.svg';
import dokkaebiHit from './img/default-monster-hit.svg';
import dokkaebiAttack from './img/default-monster-attack.svg';
import puppy1 from './img/puppy/1.jpeg';
import puppy2 from './img/puppy/2.jpeg';
import puppy3 from './img/puppy/3.jpeg';

// 괴물 이미지가 비어 있거나 불러오지 못할 때 대신 보여주는 이미지
export const DEFAULT_MONSTER_IMG = dokkaebiNormal;

// 기본 제공 괴물(꼬마 도깨비)의 상태별 이미지
export const DOKKAEBI_IMAGES = {
  normalImg: dokkaebiNormal,
  rageImg: dokkaebiRage,
  hitImg: dokkaebiHit,
  attackImg: dokkaebiAttack,
};

// '기본 이미지 고르기' 목록. images 에 들어 있는 필드만 채운다.
export const IMAGE_GALLERY = [
  {
    id: 'dokkaebi',
    name: '꼬마 도깨비 (분노·피해·공격 이미지 포함)',
    images: DOKKAEBI_IMAGES,
  },
  { id: 'puppy-1', name: '강아지 1', images: { normalImg: puppy1 } },
  { id: 'puppy-2', name: '강아지 2', images: { normalImg: puppy2 } },
  { id: 'puppy-3', name: '강아지 3', images: { normalImg: puppy3 } },
];
