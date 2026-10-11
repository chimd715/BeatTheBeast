'use client';

import dynamic from 'next/dynamic';

// 게임은 localStorage·window.location.hash 를 처음 렌더부터 읽기 때문에
// 서버 렌더링 없이 브라우저에서만 그린다.
const App = dynamic(() => import('../src/App'), { ssr: false });

export default function Page() {
  return <App />;
}
