import React, { useCallback, useEffect, useMemo, useState } from 'react';
import HomeButton from '../landing/HomeButton';
import BoardList from './BoardList';
import BoardDetail from './BoardDetail';
import BoardForm from './BoardForm';
import {
  BOARD_STORAGE_KEY,
  createPostId,
  loadPosts,
  savePosts,
  sortPosts,
} from '../../service/board';
import './index.css';

// 화면 모드: 'list' | 'detail' | 'form'
const Board = ({ onHome }) => {
  const [initial] = useState(loadPosts);
  const [posts, setPosts] = useState(initial.posts);
  const [loadError, setLoadError] = useState(initial.error);
  const [saveError, setSaveError] = useState(null);
  const [mode, setMode] = useState('list');
  const [selectedId, setSelectedId] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const sortedPosts = useMemo(() => sortPosts(posts), [posts]);
  const selectedPost = posts.find((post) => post.id === selectedId) || null;
  const editingPost = posts.find((post) => post.id === editingId) || null;
  // 수정하던 글이 다른 탭에서 지워졌으면, 쓰던 내용은 그대로 두고 새 글로 저장하게 한다.
  const editingPostDeleted = mode === 'form' && editingId && !editingPost;

  // 다른 탭에서 게시글을 바꾸면 다시 읽어온다.
  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key !== BOARD_STORAGE_KEY && event.key !== null) return;
      const next = loadPosts();
      setPosts(next.posts);
      setLoadError(next.error);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // 화면이 바뀌면 맨 위부터 보이도록
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [mode, selectedId]);

  // 보고 있던 글이 사라졌으면(다른 탭에서 삭제 등) 목록으로 돌아간다.
  useEffect(() => {
    if (mode === 'detail' && !selectedPost) setMode('list');
  }, [mode, selectedPost]);

  const commit = useCallback((nextPosts) => {
    const error = savePosts(nextPosts);
    if (error) {
      setSaveError(error);
      return false;
    }
    setPosts(nextPosts);
    setSaveError(null);
    setLoadError(null);
    return true;
  }, []);

  const goList = () => {
    setSaveError(null);
    setMode('list');
    setSelectedId(null);
    setEditingId(null);
  };

  const openPost = (id) => {
    setSaveError(null);
    setSelectedId(id);
    setMode('detail');
  };

  const openWrite = () => {
    setSaveError(null);
    setEditingId(null);
    setMode('form');
  };

  const openEdit = (id) => {
    setSaveError(null);
    setEditingId(id);
    setMode('form');
  };

  const handleSubmit = ({ title, body, pinned }) => {
    const now = Date.now();
    if (editingPost) {
      const nextPosts = posts.map((post) =>
        post.id === editingPost.id
          ? { ...post, title, body, pinned, updatedAt: now }
          : post
      );
      if (!commit(nextPosts)) return;
      openPost(editingPost.id);
      setEditingId(null);
      return;
    }
    const newPost = {
      id: createPostId(),
      title,
      body,
      pinned,
      createdAt: now,
      updatedAt: now,
    };
    if (!commit([...posts, newPost])) return;
    openPost(newPost.id);
  };

  const handleCancel = () => {
    if (editingPost) {
      openPost(editingPost.id);
      setEditingId(null);
      return;
    }
    goList();
  };

  const handleDelete = (id) => {
    if (!commit(posts.filter((post) => post.id !== id))) return;
    goList();
  };

  let content;
  if (mode === 'form') {
    content = (
      <BoardForm
        key={editingId || 'new'}
        initialPost={editingPost}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
        saveError={
          saveError ||
          (editingPostDeleted
            ? '수정하던 글이 다른 곳에서 삭제되었습니다. 저장하면 새 글로 저장됩니다.'
            : null)
        }
      />
    );
  } else if (mode === 'detail' && selectedPost) {
    content = (
      <BoardDetail
        key={selectedPost.id}
        post={selectedPost}
        onEdit={() => openEdit(selectedPost.id)}
        onDelete={() => handleDelete(selectedPost.id)}
        onBack={goList}
        saveError={saveError}
      />
    );
  } else {
    content = (
      <BoardList
        posts={sortedPosts}
        onOpen={openPost}
        onWrite={openWrite}
        loadError={loadError}
      />
    );
  }

  return (
    <div className="board-page">
      <HomeButton onClick={onHome} floating />
      <div className="board-panel">{content}</div>
    </div>
  );
};

export default Board;
