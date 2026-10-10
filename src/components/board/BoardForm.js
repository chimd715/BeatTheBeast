import React, { useState } from 'react';

const TITLE_MAX_LENGTH = 100;

const BoardForm = ({ initialPost, onSubmit, onCancel, saveError }) => {
  const [title, setTitle] = useState(initialPost ? initialPost.title : '');
  const [body, setBody] = useState(initialPost ? initialPost.body : '');
  const [pinned, setPinned] = useState(
    initialPost ? initialPost.pinned : false
  );
  const [titleError, setTitleError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setTitleError('제목을 입력해 주세요.');
      return;
    }
    onSubmit({ title: trimmedTitle, body: body.replace(/\s+$/, ''), pinned });
  };

  return (
    <form className="board-form" onSubmit={handleSubmit} noValidate>
      <h1 className="board-heading">
        {initialPost ? '게시글 수정' : '새 게시글'}
      </h1>

      <label className="board-field">
        <span className="board-label">제목</span>
        <input
          type="text"
          className="board-input"
          value={title}
          maxLength={TITLE_MAX_LENGTH}
          placeholder="제목을 입력하세요"
          autoFocus
          aria-invalid={titleError ? 'true' : 'false'}
          onChange={(event) => {
            setTitle(event.target.value);
            if (titleError) setTitleError(null);
          }}
        />
      </label>
      {titleError && (
        <p className="board-message" role="alert">
          {titleError}
        </p>
      )}

      <label className="board-field">
        <span className="board-label">내용</span>
        <textarea
          className="board-input board-textarea"
          value={body}
          placeholder="내용을 입력하세요"
          onChange={(event) => setBody(event.target.value)}
        />
      </label>

      <label className="board-check">
        <input
          type="checkbox"
          checked={pinned}
          onChange={(event) => setPinned(event.target.checked)}
        />
        <span>공지로 고정</span>
      </label>

      {saveError && (
        <p className="board-message" role="alert">
          {saveError}
        </p>
      )}

      <div className="board-actions board-actions--end">
        <button type="button" className="board-btn" onClick={onCancel}>
          취소
        </button>
        <button type="submit" className="board-btn board-btn--primary">
          저장
        </button>
      </div>
    </form>
  );
};

export default BoardForm;
