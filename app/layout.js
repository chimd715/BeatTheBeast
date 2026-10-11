import '../src/index.css';

export const metadata = {
  title: '호보당',
  description: '모둠이 힘을 합쳐 괴물을 무찌르는 교실 게임',
  icons: { icon: '/favicon.ico', apple: '/logo192.png' },
  manifest: '/manifest.json',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
