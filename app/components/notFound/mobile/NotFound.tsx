import React from 'react';

import { Card, CardContent } from '@/app/components/shared/common/card';
import MobileNav from '@/app/components/shared/mobile/nav';
import TopBar from '@/app/components/shared/mobile/top-bar';

const NotFound: React.FC = () => {
  return (
    <div 
      className='min-h-screen flex flex-col bg-[#f6f7fa]' 
      role='application' 
      aria-label='Page not found'>
      {/* Top Navigation Bar */}
      <TopBar title='Not Found' />

      {/* Main Content */}
      <main 
        className='flex-1 flex items-center justify-center p-4'
        role='main'
        aria-label='404 Page Not Found'>
        <Card className='rounded-[15px] w-full max-w-md bg-white shadow-md'>
          <CardContent className='flex flex-col items-center text-center gap-4 p-6 min-h-[16rem]'>
            <h1 className='text-[36px] font-semibold text-[#343C6A]'>404</h1>
            <p className='text-gray-600 text-sm'>
              Oops! The page you are looking for isn’t available.
            </p>
            <a 
              href='/' 
              className='text-indigo-600 font-medium text-sm hover:underline'>
              Return to the homepage
            </a>
          </CardContent>
        </Card>
      </main>

      {/* Bottom Navigation Bar */}
      <MobileNav isOpen={false} />
    </div>
  );
};

export default NotFound;
