import { Send, Loader2 } from 'lucide-react';
import React, { useState, useRef } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/shared/common/avatar';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { useToast } from '@/services/otherServices/useToast';

interface User {
  name: string;
  title: string;
  avatarUrl: string;
}

interface QuickTransferProps {
  users: User[];
  defaultAmount?: string;
  onSend?: (amount: string) => void;
}

/**
 *
 * @param root0
 * @param root0.users
 * @param root0.defaultAmount
 * @param root0.onSend
 */
export default function QuickTransfer({ users, defaultAmount = '525.50', onSend }: QuickTransferProps) {
  const [amount, setAmount] = useState(defaultAmount);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240; // This will scroll about 2 users worth
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const validateAmount = (value: string) => {
    const cleanAmount = value.replace(/[$,\s]/g, '');
    const isValid = /^\d+(\.\d{0,2})?$/.test(cleanAmount) && parseFloat(cleanAmount) > 0;
    return { isValid, cleanAmount };
  };

  const handleSend = async () => {
    const { isValid, cleanAmount } = validateAmount(amount);

    if (!isValid) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid positive number with up to 2 decimal places',
        variant: 'destructive',
      });
      return;
    }

    setIsSending(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: 'Transfer Initiated',
        description: `$${cleanAmount} has been successfully submitted`,
        variant: 'success',
      });
      onSend(cleanAmount);
    } catch (error) {
      toast({
        title: 'Transfer Failed',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='flex flex-col gap-8 p-5'>
      {/* Profile Section */}
      <div className='flex items-center'>
        <div 
          ref={scrollContainerRef}
          className='flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 w-72'>
          <div className='flex gap-6 min-w-max px-1'>
            {users.map((user, index) => (
              <div key={index} className='flex flex-col items-center min-w-[120px]'>
                <Avatar className='w-[4.5rem] h-[4.5rem] mb-3 ring-4 ring-white'>
                  <AvatarImage 
                    src={user.avatarUrl} 
                    alt={user.name}
                    className='object-cover'/>
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <span className='text-sm font-semibold text-[#1A1F36] mb-1'>
                  {user.name}
                </span>
                <span className='text-xs text-[#718EBF]'>
                  {user.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Arrow */}
        <div className='ml-4 bg-white rounded-full w-[3.125rem] h-[3.125rem] flex items-center justify-center shadow-[4px_4px_18px_-2px_#E7E4E8CC]'>
          <button 
            onClick={handleScroll}
            className='w-full h-full rounded-full bg-[#FFF] flex items-center justify-center hover:bg-[#F0F3F9] transition-colors'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#718EBF'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>
        </div>
      </div>

      {/* Amount Input Section */}
      <div className='flex items-center w-full'>
        <span className='text-sm text-[#718EBF] whitespace-nowrap'>Write Amount</span>
        <div className='flex-1 ml-4'>
          <div className='flex h-[3.125rem] bg-[#F7F9FC] rounded-full'>
            <div className='flex-1 relative flex items-center'>
              <span className='absolute left-5 text-[#1A1F36] text-lg'>$</span>
              <Input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={isSending}
                className='border-0 h-full pl-10 text-base bg-transparent focus:ring-0 text-[#718EBF]'/>
            </div>
            <Button
              onClick={handleSend}
              disabled={isSending}
              className='h-[3.125rem] px-6 bg-[#1A1F36] hover:bg-[#1A1F36]/90 
                       text-white rounded-full flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed'>
              {isSending ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' />
                  Sending...
                </>
              ) : (
                <>
                  Send
                  <Send size={20} />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}