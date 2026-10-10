import React, { useState } from 'react';
import { formatDate } from '../../service/board';

const BoardDetail = ({ post, onEdit, onDelete, onBack, saveError }) => {
  const [confirmingDelete, setConfirmingDelete] = useState(false);
  const edited = formatDate(post.updatedAt) !== formatDate(post.createdAt);

  return (
    <article className="board-detail">
      <div className="board-detail-head">
        {post.pinned && <span className="board-badge">공지</span>}
        <h1 className="board-detail-title">{post.title}</h1>
        <p className="board-detail-date">
          {formatDate(post.createdAt)}
          {edited && ` (수정 ${formatDate(post.updatedAt)})`}
        </p>
      </div>

      <div className="board-detail-body">
        {post.body.trim() ? (
          post.body
        ) : (
          <span className="board-muted">내용 없음</span>
        )}
      </div>

      {saveError && (
        <p className="board-message" role="alert">
          {saveError}
        </p>
      )}

      {confirmingDelete ? (
        <div className="board-confirm" role="alertdialog">
          <p>이 게시글을 삭제할까요? 삭제하면 되돌릴 수 없습니다.</p>
          <div className="board-actions">
            <button
              type="button"
              className="board-btn board-btn--danger"
              onClick={onDelete}
            >
              삭제하기
            </button>
            <button
              type="button"
              className="board-btn"
              onClick={() => setConfirmingDelete(false)}
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="board-actions board-actions--split">
          <button type="button" className="board-btn" onClick={onBack}>
            목록으로
          </button>
          <div className="board-actions">
            <button type="button" className="board-btn" onClick={onEdit}>
              수정
            </button>
            <button
              type="button"
              className="board-btn board-btn--danger"
              onClick={() => setConfirmingDelete(true)}
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default BoardDetail;
