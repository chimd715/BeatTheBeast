// 게시판(공지글) 저장소. 이 브라우저의 localStorage에만 저장된다.
const STORAGE_KEY = 'hobodang-board';

export const SAVE_ERROR_MESSAGES = {
  QUOTA:
    '저장 공간이 부족해 게시글을 저장하지 못했습니다. 오래된 게시글을 삭제한 뒤 다시 시도해 주세요.',
  UNKNOWN:
    '게시글을 저장하지 못했습니다. 브라우저의 저장소 사용 설정을 확인해 주세요.',
};

export const LOAD_ERROR_MESSAGE =
  '저장된 게시글 일부를 읽지 못했습니다. 새로 저장하면 읽을 수 있는 게시글만 남습니다.';

const toTimestamp = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? number : Date.now();
};

// 저장된 값이 깨져 있어도 화면이 죽지 않도록 필드를 하나씩 정리한다.
const normalizePost = (raw) => {
  if (!raw || typeof raw !== 'object') return null;
  if (typeof raw.id !== 'string' && typeof raw.id !== 'number') return null;
  const title = typeof raw.title === 'string' ? raw.title.trim() : '';
  if (!title) return null;
  const createdAt = toTimestamp(raw.createdAt);
  return {
    id: String(raw.id),
    title,
    body: typeof raw.body === 'string' ? raw.body : '',
    pinned: raw.pinned === true,
    createdAt,
    updatedAt: raw.updatedAt ? toTimestamp(raw.updatedAt) : createdAt,
  };
};

// { posts, error } 형태로 돌려준다. error는 화면에 그대로 보여줄 한국어 문구.
export const loadPosts = () => {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch (e) {
    return { posts: [], error: LOAD_ERROR_MESSAGE };
  }
  if (raw === null) return { posts: [], error: null };

  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch (e) {
    return { posts: [], error: LOAD_ERROR_MESSAGE };
  }
  if (!Array.isArray(parsed)) return { posts: [], error: LOAD_ERROR_MESSAGE };

  const posts = parsed.map(normalizePost).filter(Boolean);
  return {
    posts,
    error: posts.length === parsed.length ? null : LOAD_ERROR_MESSAGE,
  };
};

const isQuotaError = (error) =>
  error instanceof DOMException &&
  (error.code === 22 ||
    error.code === 1014 ||
    error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED');

// 저장에 성공하면 null, 실패하면 화면에 보여줄 한국어 문구를 돌려준다.
export const savePosts = (posts) => {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    return null;
  } catch (e) {
    return isQuotaError(e)
      ? SAVE_ERROR_MESSAGES.QUOTA
      : SAVE_ERROR_MESSAGES.UNKNOWN;
  }
};

export const createPostId = () =>
  `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

// 공지(고정)글 먼저, 그다음 최신 글 순서.
export const sortPosts = (posts) =>
  [...posts].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    if (a.createdAt !== b.createdAt) return b.createdAt - a.createdAt;
    return b.id < a.id ? -1 : b.id > a.id ? 1 : 0;
  });

const pad = (number) => String(number).padStart(2, '0');

// YYYY.MM.DD
export const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) return '';
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(
    date.getDate()
  )}`;
};

export const BOARD_STORAGE_KEY = STORAGE_KEY;
