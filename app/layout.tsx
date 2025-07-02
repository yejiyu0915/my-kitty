import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
// import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

const pretendard = localFont({
  src: './fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
});

export const metadata: Metadata = {
  title: '고양이 병원',
  description: 'by 유예지',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable} bg-primary/5 antialiased`}>
        <div className="relative grid h-screen grid-rows-[1fr_auto] items-center justify-items-center gap-4 overflow-hidden p-8 pt-24 pb-6 font-[family-name:var(--font-pretendard)] md:gap-6">
          {/* <Header /> */}
          <main className="flex h-full w-full max-w-6xl flex-col items-center gap-4 overflow-y-auto sm:items-start sm:gap-8">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
