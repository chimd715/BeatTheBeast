// 이미지 import 결과를 주소 문자열로 바꾼다.
// (Next.js 는 이미지 import 를 { src, width, height } 객체로 돌려준다)
export const assetUrl = (asset) =>
  typeof asset === 'string' ? asset : asset?.src || '';
