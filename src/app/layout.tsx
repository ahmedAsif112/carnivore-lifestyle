'use client';
import './globals.css';
import { ConfigProvider } from 'antd';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loading from './loading';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // 1 seconds loading time

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, [pathname]); // Trigger on route change

  return (
    <html lang="en">
      <body className="antialiased">
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: '#4658A4',
              colorText: '#6B7A99',
              colorTextSecondary: '#6B7A99',
              colorLink: '#4658A4',
              borderRadius: 5,
            },
          }}
        >
          {isLoading ? <Loading /> : children}{' '}
        </ConfigProvider>
      </body>
    </html>
  );
}
