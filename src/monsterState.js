// 체력이 이 비율(%) 미만이면 괴물이 분노 상태가 된다.
export const RAGE_HEALTH_PERCENT = 30;

// 공격·피격 같은 순간 동작이 끝난 뒤 괴물이 돌아갈 상태 ('rage' | 'normal')
export const getRestState = (health, initialHealth) =>
  initialHealth > 0 && (health / initialHealth) * 100 < RAGE_HEALTH_PERCENT
    ? 'rage'
    : 'normal';
