'use client';
import React from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleNavigation = (newPath: string) => {
    // Preserve the existing query parameters (id and country)
    const queryString = searchParams.toString();
    router.push(`${newPath}?${queryString}`);
  };

  return (
    <div>
      <nav className="flex items-center justify-between border-b p-3 gap-8">
        <div className="flex gap-8 items-center">
          <div className="flex items-center text-xl font-bold">
            <span className="text-gray-600 text-2xl">🌱</span>
          </div>
          <div className="flex space-x-6">
            {/* Calendar Link */}
            <a
              href="#"
              className={`pb-1 transition-all mobile:text-[12px] duration-100 ${
                pathname === '/calendar'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-green-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/calendar');
              }}
            >
              Calendar
            </a>

            {/* Forecast Link */}
            <a
              href="#"
              className={`pb-1 transition-all mobile:text-[12px] duration-100 ${
                pathname === '/forecast'
                  ? 'text-green-500 border-b-2 border-green-500'
                  : 'text-gray-700 hover:text-green-500 hover:border-b-2 hover:border-green-500'
              }`}
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/forecast');
              }}
            >
              Weather Forecast
            </a>
          </div>
        </div>
        <div>
          <Button
            type="dashed"
            onClick={() => router.push('/')}
            className="mobile:!hidden"
          >
            Select New Plant
          </Button>
          <Tooltip title="Select New Plant">
            <Button
              type="dashed"
              onClick={() => router.push('/')}
              className="mobile:!flex hidden rounded-full h-[30px] w-[30px]"
            >
              <PlusOutlined />
            </Button>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
