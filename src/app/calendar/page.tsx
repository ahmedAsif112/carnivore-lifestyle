'use client';
import CropCalendar from '@/components/cropCaledar';
import Navbar from '@/components/Navbar';
import { Empty, message } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

function Calendar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  useEffect(() => {
    if (!id) {
      message.error('Please provide a valid id');
      router.push('/');
    }
  }, [id, router]);

  return (
    <div>
      <Navbar />
      {id ? (
        <CropCalendar selectedItem={id} />
      ) : (
        <div className="min-h-[60vh] flex justify-center items-center w-full">
          <Empty />
        </div>
      )}
    </div>
  );
}

export default Calendar;
