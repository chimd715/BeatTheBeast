import React from 'react';
import HomeButton from '../landing/HomeButton';
import '../landing/index.css';

const Board = ({ onHome }) => {
  return (
    <div className="placeholder-page">
      <HomeButton onClick={onHome} floating />
      <h1>게시판</h1>
      <p>준비 중입니다.</p>
    </div>
  );
};

export default Board;
