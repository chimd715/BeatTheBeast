import React, { useEffect, useState } from 'react';
import {
  addStudent,
  addStudents,
  removeStudent,
  resetAllStats,
  updateStudent,
} from '../../service/students';
import { getGroupOptions } from './stats';

const GroupSelect = ({ value, options, onChange, label }) => (
  <select
    className="settings-select"
    value={value}
    aria-label={label}
    onChange={(event) => onChange(Number(event.target.value))}
  >
    {options.map((group) => (
      <option key={group} value={group}>
        {group}모둠
      </option>
    ))}
  </select>
);

// 학생 목록의 한 줄: 이름 바꾸기 / 모둠 바꾸기 / 삭제
const StudentRow = ({ student, groupOptions }) => {
  const [name, setName] = useState(student.name);

  useEffect(() => {
    setName(student.name);
  }, [student.name]);

  const commitName = () => {
    const trimmed = name.trim();
    if (!trimmed) {
      setName(student.name);
      return;
    }
    if (trimmed !== student.name) updateStudent(student.id, { name: trimmed });
  };

  const handleRemove = () => {
    const confirmed = window.confirm(
      `'${student.name}' 학생을 삭제할까요? 능력치도 함께 지워집니다.`,
    );
    if (confirmed) {
      removeStudent(student.id);
    }
  };

  return (
    <li className="settings-row">
      <input
        className="settings-input settings-row-name"
        type="text"
        value={name}
        aria-label="학생 이름"
        onChange={(event) => setName(event.target.value)}
        onBlur={commitName}
        onKeyDown={(event) => {
          if (event.key === 'Enter') event.target.blur();
          if (event.key === 'Escape') setName(student.name);
        }}
      />
      <GroupSelect
        value={student.group}
        options={groupOptions}
        label={`${student.name} 모둠`}
        onChange={(group) => updateStudent(student.id, { group })}
      />
      <button
        type="button"
        className="settings-btn settings-btn--danger"
        onClick={handleRemove}
      >
        삭제
      </button>
    </li>
  );
};

const StudentSettings = ({ students }) => {
  const groupOptions = getGroupOptions(students);
  const [newName, setNewName] = useState('');
  const [newGroup, setNewGroup] = useState(1);
  const [bulkNames, setBulkNames] = useState('');
  const [bulkGroup, setBulkGroup] = useState(1);
  const [notice, setNotice] = useState('');

  const bulkList = bulkNames
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const handleAdd = (event) => {
    event.preventDefault();
    const trimmed = newName.trim();
    if (!trimmed) {
      setNotice('이름을 입력해주세요.');
      return;
    }
    if (!addStudent(trimmed, newGroup)) return;
    setNewName('');
    setNotice(`'${trimmed}' 학생을 ${newGroup}모둠에 추가했습니다.`);
  };

  const handleBulkAdd = (event) => {
    event.preventDefault();
    if (bulkList.length === 0) {
      setNotice('한 줄에 한 명씩 이름을 입력해주세요.');
      return;
    }
    if (!addStudents(bulkList, bulkGroup)) return;
    setBulkNames('');
    setNotice(`${bulkList.length}명을 ${bulkGroup}모둠에 추가했습니다.`);
  };

  const handleReset = () => {
    if (
      window.confirm(
        '모든 학생의 지·덕·체 능력치를 0으로 초기화할까요? 학생 목록은 그대로 남습니다.'
      )
    ) {
      if (!resetAllStats()) return;
      setNotice('모든 능력치를 0으로 초기화했습니다.');
    }
  };

  return (
    <div className="settings">
      {notice && (
        <p className="settings-notice" role="status">
          {notice}
        </p>
      )}

      <div className="settings-forms">
        <form className="settings-panel" onSubmit={handleAdd}>
          <h3>학생 추가</h3>
          <div className="settings-line">
            <input
              className="settings-input"
              type="text"
              placeholder="이름"
              value={newName}
              aria-label="새 학생 이름"
              onChange={(event) => setNewName(event.target.value)}
            />
            <GroupSelect
              value={newGroup}
              options={groupOptions}
              label="새 학생 모둠"
              onChange={setNewGroup}
            />
            <button type="submit" className="settings-btn settings-btn--primary">
              추가
            </button>
          </div>
        </form>

        <form className="settings-panel" onSubmit={handleBulkAdd}>
          <h3>여러 명 한 번에 추가</h3>
          <textarea
            className="settings-textarea"
            rows={5}
            placeholder={'한 줄에 한 명씩 입력\n예)\n김호랑\n이두꺼비'}
            value={bulkNames}
            aria-label="여러 학생 이름 (한 줄에 한 명)"
            onChange={(event) => setBulkNames(event.target.value)}
          />
          <div className="settings-line">
            <GroupSelect
              value={bulkGroup}
              options={groupOptions}
              label="여러 명 추가할 모둠"
              onChange={setBulkGroup}
            />
            <button type="submit" className="settings-btn settings-btn--primary">
              {bulkList.length > 0 ? `${bulkList.length}명 추가` : '추가'}
            </button>
          </div>
        </form>
      </div>

      <div className="settings-panel">
        <h3>학생 목록 ({students.length}명)</h3>
        {students.length === 0 ? (
          <p className="settings-empty">아직 등록된 학생이 없습니다.</p>
        ) : (
          <>
            <p className="settings-hint">
              이름을 눌러 고치고, 모둠을 바꾸거나 삭제할 수 있습니다.
            </p>
            <ul className="settings-list">
              {students.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  groupOptions={groupOptions}
                />
              ))}
            </ul>
          </>
        )}
      </div>

      {students.length > 0 && (
        <div className="settings-panel settings-panel--danger">
          <h3>능력치 초기화</h3>
          <p className="settings-hint">
            모든 학생의 지·덕·체를 0으로 되돌립니다. 학생 목록은 지워지지 않습니다.
          </p>
          <button
            type="button"
            className="settings-btn settings-btn--danger"
            onClick={handleReset}
          >
            능력치 초기화
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentSettings;
