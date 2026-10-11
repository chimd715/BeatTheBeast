/**
 * 호보당 페이지 인덱스
 *
 * Verbalized Sampling으로 생성된 4가지 메인 페이지 디자인
 */

// T-Score 0.3: 전통 계승형
// - 두루마리 + 서예 미학
// - 양피지 텍스처 + 먹물 번짐
export { default as MainPageTraditional } from './MainPage_T03';

// T-Score 0.5: 균형 혁신형
// - 모던 그리드 + 전통 타이포그래피
// - 카드 레이아웃 + 부드러운 인터랙션
export { default as MainPageBalanced } from './MainPage_T05';

// T-Score 0.7: 현대 재해석형
// - 글래스모피즘 + 한국 미학
// - 다크 모드 + Bento grid
export { default as MainPageModern } from './MainPage_T07';

// T-Score 0.9: 실험적 창작형
// - 3D 공간감 + 키네틱 타이포그래피
// - 스크롤 시차 + 파티클 시스템
export { default as MainPageExperimental } from './MainPage_T09';
