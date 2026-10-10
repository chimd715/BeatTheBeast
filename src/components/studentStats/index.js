import React, { useState } from 'react';
import HomeButton from '../landing/HomeButton';
import { getGroupTotals, useStudents } from '../../service/students';
import StudentCard from './StudentCard';
import GroupSummary from './GroupSummary';
import StudentSettings from './StudentSettings';
import { STATS, groupStudents } from './stats';
import '../landing/index.css';
import './index.css';

const TABS = [
  { key: 'points', label: '개인별 포인트' },
  { key: 'summary', label: '모둠별 합산' },
  { key: 'settings', label: '학생 설정' },
];

const StatLegend = () => (
  <div className="stat-legend" aria-label="능력치 안내">
    {STATS.map((stat) => (
      <span key={stat.key} className={`stat-legend-item stat-row--${stat.key}`}>
        <span className="stat-chip">
          <strong>{stat.label}</strong>
        </span>
        = {stat.meaning}
      </span>
    ))}
  </div>
);

const StudentStats = ({ onHome }) => {
  const [students] = useStudents();
  const [tab, setTab] = useState(() =>
    students.length > 0 ? 'points' : 'settings'
  );
  const hasStudents = students.length > 0;
  const totals = getGroupTotals(students);

  const renderEmpty = () => (
    <div className="stats-empty">
      <p>아직 등록된 학생이 없습니다.</p>
      <p>
        <strong>학생 설정</strong>에서 학생 이름과 모둠을 먼저 등록해주세요.
      </p>
      <button
        type="button"
        className="settings-btn settings-btn--primary"
        onClick={() => setTab('settings')}
      >
        학생 등록하러 가기
      </button>
    </div>
  );

  return (
    <div className="stats-page">
      <HomeButton onClick={onHome} floating />
      <header className="stats-header">
        <h1>학생 능력치</h1>
        <p className="stats-subtitle">평소 임무를 통해 지·덕·체 능력치를 쌓아요</p>
        <StatLegend />
      </header>

      <nav className="stats-tabs" role="tablist">
        {TABS.map((item) => (
          <button
            key={item.key}
            type="button"
            role="tab"
            aria-selected={tab === item.key}
            className={`stats-tab${tab === item.key ? ' is-active' : ''}`}
            onClick={() => setTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main className="stats-content">
        {tab === 'points' &&
          (hasStudents
            ? groupStudents(students).map(({ group, students: members }) => (
                <section key={group} className="stats-group">
                  <h2 className="stats-group-title">
                    {group}모둠
                    <span className="stats-group-totals">
                      {STATS.map((stat) => (
                        <span
                          key={stat.key}
                          className={`stats-group-total stat-row--${stat.key}`}
                        >
                          {stat.label} {totals[group][stat.key]}
                        </span>
                      ))}
                    </span>
                  </h2>
                  <div className="student-grid">
                    {members.map((student) => (
                      <StudentCard key={student.id} student={student} />
                    ))}
                  </div>
                </section>
              ))
            : renderEmpty())}

        {tab === 'summary' &&
          (hasStudents ? (
            <>
              <p className="stats-note">
                전투 화면에서 지 합계는 모둠 공격 버튼으로, 덕 합계는 괴물
                공격 피해를 줄이는 데 쓰입니다.
              </p>
              <GroupSummary students={students} />
            </>
          ) : (
            renderEmpty()
          ))}

        {tab === 'settings' && <StudentSettings students={students} />}
      </main>
    </div>
  );
};

export default StudentStats;
