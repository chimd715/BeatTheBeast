import React, { useState } from 'react';
import { changeStudentStat, updateStudent } from '../../service/students';
import { STATS } from './stats';

// 숫자를 눌러 직접 고칠 수 있는 능력치 값
const StatValue = ({ value, label, onCommit }) => {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');

  const startEdit = () => {
    setDraft(String(value));
    setEditing(true);
  };

  const commit = () => {
    const number = Math.floor(Number(draft));
    if (draft.trim() !== '' && Number.isFinite(number) && number >= 0) {
      onCommit(number);
    }
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        className="stat-value-input"
        type="number"
        min="0"
        inputMode="numeric"
        value={draft}
        autoFocus
        aria-label={`${label} 값 입력`}
        onChange={(event) => setDraft(event.target.value)}
        onFocus={(event) => event.target.select()}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === 'Enter') commit();
          if (event.key === 'Escape') setEditing(false);
        }}
      />
    );
  }

  return (
    <button
      type="button"
      className="stat-value"
      title="눌러서 숫자 직접 입력"
      aria-label={`${label} ${value}, 눌러서 직접 입력`}
      onClick={startEdit}
    >
      {value}
    </button>
  );
};

const StudentCard = ({ student }) => {
  return (
    <div className="student-card">
      <div className="student-card-name">{student.name}</div>
      {STATS.map((stat) => (
        <div key={stat.key} className={`stat-row stat-row--${stat.key}`}>
          <span className="stat-chip">
            <strong>{stat.label}</strong>
            <small>{stat.meaning}</small>
          </span>
          <button
            type="button"
            className="stat-step"
            aria-label={`${student.name} ${stat.label} 1 빼기`}
            disabled={student[stat.key] <= 0}
            onClick={() => changeStudentStat(student.id, stat.key, -1)}
          >
            −1
          </button>
          <StatValue
            value={student[stat.key]}
            label={`${student.name} ${stat.label}`}
            onCommit={(number) =>
              updateStudent(student.id, { [stat.key]: number })
            }
          />
          <button
            type="button"
            className="stat-step stat-step--plus"
            aria-label={`${student.name} ${stat.label} 1 더하기`}
            onClick={() => changeStudentStat(student.id, stat.key, 1)}
          >
            +1
          </button>
        </div>
      ))}
    </div>
  );
};

export default StudentCard;
