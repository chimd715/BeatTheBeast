// 능력치 표시 정보 (지 = 공격, 덕 = 방어, 체 = 체력)
export const STATS = [
  { key: 'ji', label: '지', meaning: '공격', total: '공격력' },
  { key: 'deok', label: '덕', meaning: '방어', total: '방어력' },
  { key: 'che', label: '체', meaning: '체력', total: '체력' },
];

// 학생들을 모둠 번호 순으로 묶는다: [{ group, students }]
export const groupStudents = (students) => {
  const map = new Map();
  students.forEach((student) => {
    if (!map.has(student.group)) map.set(student.group, []);
    map.get(student.group).push(student);
  });
  return Array.from(map.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([group, list]) => ({ group, students: list }));
};

// 모둠 선택지: 1 ~ max(기본 개수, 현재 가장 큰 모둠 번호 + 1)
const DEFAULT_GROUP_OPTIONS = 8;
export const getGroupOptions = (students) => {
  const maxGroup = students.reduce(
    (max, student) => Math.max(max, student.group),
    0
  );
  const count = Math.max(DEFAULT_GROUP_OPTIONS, maxGroup + 1);
  return Array.from({ length: count }, (_, index) => index + 1);
};
