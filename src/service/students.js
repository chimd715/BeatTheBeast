import { useCallback, useEffect, useState } from 'react';

// 학생 능력치 저장소 (localStorage)
// 학생: { id, name, group, ji, deok, che }
//  - 지(ji) = 공격, 덕(deok) = 방어, 체(che) = 체력
export const STUDENTS_STORAGE_KEY = 'hobodang-students';
const CHANGE_EVENT = 'hobodang-students-change';

export const STAT_KEYS = ['ji', 'deok', 'che'];

const toNonNegativeInt = (value, fallback = 0) => {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number >= 0 ? number : fallback;
};

const toGroup = (value) => {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number >= 1 ? number : 1;
};

const createId = () =>
  `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

// 저장된 값이 깨져 있어도 화면이 죽지 않도록 항상 올바른 형태로 맞춘다.
const normalizeStudent = (raw, index) => {
  if (!raw || typeof raw !== 'object') return null;
  const name = typeof raw.name === 'string' ? raw.name.trim() : '';
  if (!name) return null;
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : `student-${index}`,
    name,
    group: toGroup(raw.group),
    ji: toNonNegativeInt(raw.ji),
    deok: toNonNegativeInt(raw.deok),
    che: toNonNegativeInt(raw.che),
  };
};

const normalizeStudents = (list) =>
  Array.isArray(list) ? list.map(normalizeStudent).filter(Boolean) : [];

export const getStudents = () => {
  try {
    const raw = window.localStorage.getItem(STUDENTS_STORAGE_KEY);
    return raw === null ? [] : normalizeStudents(JSON.parse(raw));
  } catch (e) {
    return [];
  }
};

const isQuotaError = (error) =>
  !!error &&
  (error.name === 'QuotaExceededError' ||
    error.name === 'NS_ERROR_DOM_QUOTA_REACHED' ||
    error.code === 22 ||
    error.code === 1014);

// 저장에 성공하면 저장된 목록을, 실패하면 안내 후 null 을 돌려준다.
// 실패했을 때는 화면도 바꾸지 않는다. (새로고침하면 사라질 값을 저장된 것처럼 보이지 않도록)
export const saveStudents = (students) => {
  const normalized = normalizeStudents(students);
  try {
    window.localStorage.setItem(
      STUDENTS_STORAGE_KEY,
      JSON.stringify(normalized)
    );
  } catch (error) {
    window.alert(
      isQuotaError(error)
        ? '저장 공간이 부족해 학생 정보를 저장하지 못했습니다. 괴물 이미지를 작은 것으로 바꾸거나 쓰지 않는 괴물을 삭제해주세요.'
        : '학생 정보를 저장하지 못했습니다. 브라우저의 사이트 데이터(저장소) 설정을 확인해주세요.'
    );
    return null;
  }
  window.dispatchEvent(
    new CustomEvent(CHANGE_EVENT, { detail: { students: normalized } })
  );
  return normalized;
};

// 학생 추가. name 하나 또는 이름 배열을 받아 같은 모둠에 추가한다.
export const addStudents = (names, group) => {
  const list = (Array.isArray(names) ? names : [names])
    .map((name) => (typeof name === 'string' ? name.trim() : ''))
    .filter(Boolean);
  if (list.length === 0) return getStudents();
  const added = list.map((name) => ({
    id: createId(),
    name,
    group: toGroup(group),
    ji: 0,
    deok: 0,
    che: 0,
  }));
  return saveStudents([...getStudents(), ...added]);
};

export const addStudent = (name, group) => addStudents([name], group);

// changes 예: { name }, { group }, { ji: 3 }. 빈 이름으로는 바꾸지 않는다.
export const updateStudent = (id, changes) => {
  const next = { ...changes };
  if ('name' in next) {
    const name = typeof next.name === 'string' ? next.name.trim() : '';
    if (name) next.name = name;
    else delete next.name;
  }
  return saveStudents(
    getStudents().map((student) =>
      student.id === id ? { ...student, ...next, id: student.id } : student
    )
  );
};

export const removeStudent = (id) =>
  saveStudents(getStudents().filter((student) => student.id !== id));

// 능력치를 delta만큼 바꾼다 (0 아래로는 내려가지 않음).
export const changeStudentStat = (id, stat, delta) =>
  saveStudents(
    getStudents().map((student) =>
      student.id === id
        ? {
            ...student,
            [stat]: Math.max(0, toNonNegativeInt(student[stat]) + delta),
          }
        : student
    )
  );

// 학생은 그대로 두고 모든 능력치를 0으로.
export const resetAllStats = () =>
  saveStudents(
    getStudents().map((student) => ({ ...student, ji: 0, deok: 0, che: 0 }))
  );

// 모둠별 합계: { [group]: { ji, deok, che, count } }
export const getGroupTotals = (students) => {
  const totals = {};
  (students || []).forEach((student) => {
    const group = toGroup(student.group);
    if (!totals[group]) totals[group] = { ji: 0, deok: 0, che: 0, count: 0 };
    totals[group].ji += toNonNegativeInt(student.ji);
    totals[group].deok += toNonNegativeInt(student.deok);
    totals[group].che += toNonNegativeInt(student.che);
    totals[group].count += 1;
  });
  return totals;
};

// 학생 목록 hook. 같은 탭의 다른 컴포넌트(전투 화면 등)와 다른 탭 모두 동기화된다.
export const useStudents = () => {
  const [students, setStudents] = useState(getStudents);

  useEffect(() => {
    const handleChange = (event) => {
      setStudents(event.detail?.students ?? getStudents());
    };
    const handleStorage = (event) => {
      if (event.key === STUDENTS_STORAGE_KEY || event.key === null) {
        setStudents(getStudents());
      }
    };
    window.addEventListener(CHANGE_EVENT, handleChange);
    window.addEventListener('storage', handleStorage);
    // 마운트 사이에 바뀐 값이 있을 수 있으니 한 번 다시 읽는다.
    setStudents(getStudents());
    return () => {
      window.removeEventListener(CHANGE_EVENT, handleChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

  const update = useCallback((nextStudents) => {
    const resolved =
      typeof nextStudents === 'function'
        ? nextStudents(getStudents())
        : nextStudents;
    return saveStudents(resolved);
  }, []);

  return [students, update];
};
