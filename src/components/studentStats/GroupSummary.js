import React from 'react';
import { getGroupTotals } from '../../service/students';
import { STATS } from './stats';

// 모둠별 합산: 지 합계(공격력), 덕 합계(방어력), 체 합계(체력), 인원
const GroupSummary = ({ students }) => {
  const totals = getGroupTotals(students);
  const groups = Object.keys(totals)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="group-summary">
      {groups.map((group) => (
        <div key={group} className="group-summary-card">
          <div className="group-summary-title">
            {group}모둠
            <span className="group-summary-count">
              {totals[group].count}명
            </span>
          </div>
          {STATS.map((stat) => (
            <div
              key={stat.key}
              className={`group-summary-row stat-row--${stat.key}`}
            >
              <span className="stat-chip">
                <strong>{stat.label}</strong>
              </span>
              <span className="group-summary-label">
                {stat.label} 합계 ({stat.total})
              </span>
              <span className="group-summary-value">
                {totals[group][stat.key]}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupSummary;
