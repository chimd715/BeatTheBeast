export const MAX_IMAGE_HEIGHT = 800;
const IMAGE_QUALITY = 0.85;
// 움직이는 GIF 는 캔버스를 거치면 멈추므로, 이 크기 이하면 원본 그대로 쓴다.
const MAX_ORIGINAL_GIF_SIZE = 1024 * 1024;

// 투명 배경을 가질 수 있는 형식
const TRANSPARENT_TYPES = ['image/png', 'image/gif', 'image/webp', 'image/avif'];

/**
 * 높이가 maxHeight 를 넘으면 비율을 유지한 채 줄인 크기를 돌려준다.
 */
export function calcResizedSize(width, height, maxHeight = MAX_IMAGE_HEIGHT) {
  if (!height || height <= maxHeight) return { width, height };
  const ratio = maxHeight / height;
  return {
    width: Math.max(1, Math.round(width * ratio)),
    height: maxHeight,
  };
}

/**
 * 투명 배경이 있을 수 있는 이미지는 WebP(미지원 브라우저는 PNG)로, 나머지는 JPEG 로 저장한다.
 */
export function pickOutputType(fileType) {
  return TRANSPARENT_TYPES.includes(fileType) ? 'image/webp' : 'image/jpeg';
}

function readAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('이미지를 불러올 수 없습니다.'));
    img.src = src;
  });
}

/**
 * 이미지 파일을 localStorage 에 저장하기 좋은 data URL 로 바꾼다.
 * 높이를 최대 800px 로 줄이고 JPEG/WebP 로 압축한다.
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function fileToResizedDataURL(file) {
  if (!file || !file.type.startsWith('image/')) {
    throw new Error('이미지 파일만 선택할 수 있습니다.');
  }

  const original = await readAsDataURL(file);

  // SVG 는 벡터라 크기와 상관없이 선명하므로 그대로 사용
  if (file.type === 'image/svg+xml') return original;

  const img = await loadImage(original);

  if (
    file.type === 'image/gif' &&
    img.naturalHeight <= MAX_IMAGE_HEIGHT &&
    file.size <= MAX_ORIGINAL_GIF_SIZE
  ) {
    return original;
  }

  const { width, height } = calcResizedSize(img.naturalWidth, img.naturalHeight);
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  const outputType = pickOutputType(file.type);
  if (outputType === 'image/jpeg') {
    // JPEG 는 투명도를 지원하지 않으므로 흰 배경을 깐다.
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);
  const resized = canvas.toDataURL(outputType, IMAGE_QUALITY);

  // 줄일 필요가 없었고 원본이 더 작으면 원본을 쓴다.
  if (height === img.naturalHeight && original.length <= resized.length) {
    return original;
  }
  return resized;
}
