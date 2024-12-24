import React from 'react';
import { Inter } from 'next/font/google';

import Sidenav from '@/app/components/shared/desktop/nav';
import TopBar from '@/app/components/shared/desktop/top-bar';
import { Card, CardContent } from '@/app/components/shared/common/card';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const NotFound: React.FC = () => {
  return (
    <div 
      className={`${inter.variable} font-sans min-h-screen bg-gray-50 flex`}
      role="application"
      aria-label="Page not found">
      <Sidenav />
      <div className="ml-64 flex-1">
        <TopBar title="Page Not Found" />
        <main 
          className="p-8"
          role="main"
          aria-label="404 Page Not Found">
          <Card className="rounded-[25px]">
            <CardContent>
              <div className="flex flex-col items-center gap-6 p-6 text-center">
                <h1 className="text-3xl font-bold text-[#343C6A]">
                  404: Page Not Found
                </h1>
                <p className="text-gray-600">
                  Sorry, the page you are looking for does not exist.
                </p>
                <a 
                  href="/" 
                  className="text-indigo-600 font-medium hover:underline">
                  Go back to the homepage
                </a>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default NotFound;
