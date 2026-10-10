import React from 'react';
import howToContent from './howToContent';

// 내용 수정은 howToContent.js 파일에서 합니다.
const HowTo = () => {
  return (
    <div className="howto-container">
      {howToContent.map(({ title, body }, index) => (
        <section key={index} className="howto-section">
          <h3 className="howto-title">{title}</h3>
          <p className="howto-body">{body.trim()}</p>
        </section>
      ))}
    </div>
  );
};

export default HowTo;
