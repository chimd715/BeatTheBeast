# 호보당 (Beat the Beast) — Vercel 배포 브랜치

모둠이 힘을 합쳐 괴물을 무찌르는 교실 게임입니다. 이 `vercel-deploy` 브랜치는 Vercel 배포용으로 Next.js(App Router) 위에서 실행되도록 옮긴 버전입니다. 게임 코드(`src/`)는 `main` 브랜치(CRA)와 같고, 진입점과 빌드 설정만 다릅니다.

## 실행

```bash
npm install
npm run dev     # 개발 서버 (http://localhost:3000)
npm run build   # 배포용 빌드
npm run start   # 빌드 결과 실행
```

Node.js 20.9 이상이 필요합니다.

## Vercel 배포

1. Vercel에서 이 저장소를 가져오고(Import), Production Branch를 `vercel-deploy`로 지정합니다.
2. Framework Preset은 Next.js로 자동 인식됩니다. Build Command, Output Directory, 환경 변수는 따로 설정하지 않아도 됩니다.

## 구조

- `app/layout.js`, `app/page.js`: Next.js 진입점. 게임은 브라우저 저장소(localStorage)를 처음부터 읽기 때문에 서버 렌더링 없이 브라우저에서만 그립니다.
- `src/`: 게임 코드. 화면 전환은 주소의 `#battle`, `#stats`, `#board`로 합니다.
- `src/design-drafts/`: 메인 페이지 디자인 시안(앱에서 사용하지 않음). Next.js가 `pages` 폴더를 라우터로 인식하지 않도록 이름을 바꿨습니다.

## 데이터

괴물, 학생 능력치, 게시글은 모두 접속한 브라우저에만 저장됩니다. 주소(도메인)가 다르면 데이터가 따로 저장되므로, GitHub Pages 주소에서 쓰던 데이터는 Vercel 주소에서 보이지 않습니다.
