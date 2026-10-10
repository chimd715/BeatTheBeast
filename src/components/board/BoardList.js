import React from 'react';
import { formatDate } from '../../service/board';

const BoardList = ({ posts, onOpen, onWrite, loadError }) => {
  return (
    <>
      <div className="board-header">
        <h1 className="board-heading">게시판</h1>
        <button
          type="button"
          className="board-btn board-btn--primary"
          onClick={onWrite}
        >
          글쓰기
        </button>
      </div>

      {loadError && (
        <p className="board-message" role="alert">
          {loadError}
        </p>
      )}

      {posts.length === 0 ? (
        <div className="board-empty">
          <p>아직 게시글이 없습니다.</p>
          <p className="board-empty-sub">
            ‘글쓰기’를 눌러 첫 공지를 남겨 보세요.
          </p>
        </div>
      ) : (
        <ul className="board-list">
          {posts.map((post) => (
            <li key={post.id}>
              <button
                type="button"
                className={`board-item${
                  post.pinned ? ' board-item--pinned' : ''
                }`}
                onClick={() => onOpen(post.id)}
              >
                {post.pinned && <span className="board-badge">공지</span>}
                <span className="board-item-title">{post.title}</span>
                <span className="board-item-date">
                  {formatDate(post.createdAt)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      <p className="board-note">게시글은 이 브라우저에만 저장됩니다.</p>
    </>
  );
};

export default BoardList;
