export const KR_MAP = {
  name: '이름',
  level: '난이도',
  health: '체력',
  normalImg: '기본 이미지',
  rageImg: '분노상태 이미지',
  hitImg: '피해입은 이미지',
  attackImg: '공격하는 이미지',
  attackName: '공격명 / 방어명',
  damage: '피해량',
  numOfAttack: '공격 횟수 / 방어 횟수',
};

// 난이도 순서 (쉬운 것 → 어려운 것)
export const LEVEL_ORDER = ['하', '중', '상', '특'];

const levelRank = (level) => {
  const index = LEVEL_ORDER.indexOf(level);
  // 알 수 없는 값이나 예전 숫자 난이도는 맨 뒤로
  return index === -1 ? LEVEL_ORDER.length : index;
};

export const sortMonstersByLevel = (monsters) =>
  [...monsters].sort((a, b) => levelRank(a.level) - levelRank(b.level));
