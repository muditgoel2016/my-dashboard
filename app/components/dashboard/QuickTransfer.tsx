import { Send, Loader2 } from 'lucide-react';
import React, { useState, useRef, useCallback } from 'react';

import { Avatar, AvatarImage, AvatarFallback } from '@/app/components/shared/common/avatar';
import { Button } from '@/app/components/shared/common/button';
import { Input } from '@/app/components/shared/common/input';
import { useToast } from '@/services/otherServices/useToast';
import { QuickTransferProps } from './dashboardInterfaces';

const defaultTransfer = async (amount: string): Promise<void> => {
  await new Promise((resolve, reject) => {
    const shouldSucceed = Math.random() < 0.9;
    setTimeout(() => {
      if (shouldSucceed) {
        resolve(undefined);
      } else {
        reject(new Error('Network error occurred'));
      }
    }, 1500);
  });
};

const QuickTransfer: React.FC<QuickTransferProps> = ({ 
  users, 
  defaultAmount = '525.50', 
  onSend = defaultTransfer 
}) => {
  const [amount, setAmount] = useState(defaultAmount);
  const [isSending, setIsSending] = useState(false);
  const { toast } = useToast();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  }, []);

  const validateAmount = useCallback((value: string) => {
    const cleanAmount = value.replace(/[$,\s]/g, '');
    const isValid = /^\d+(\.\d{0,2})?$/.test(cleanAmount) && parseFloat(cleanAmount) > 0;
    return { isValid, cleanAmount };
  }, []);

  const handleSend = useCallback(() => {
    void (async () => {
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
        await onSend(cleanAmount);
        toast({
          title: 'Transfer Initiated',
          description: `$${cleanAmount} has been successfully submitted`,
          variant: 'success',
        });
      } catch (error) {
        console.error('Transfer error:', error);
        toast({
          title: 'Transfer Failed',
          description: error instanceof Error ? error.message : 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsSending(false);
      }
    })();
  }, [amount, toast, onSend, validateAmount]);

  return (
    <div 
      className='flex flex-col gap-8 p-5'
      role='region'
      aria-label='Quick Transfer Interface'>
      {/* Profile Section */}
      <div 
        className='flex items-center'
        role='region'
        aria-label='Recipients List'>
        <div 
          ref={scrollContainerRef}
          className='flex-1 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-400 w-[22rem]'
          role='listbox'
          aria-label='Transfer recipients'
          tabIndex={0}>
          <div className='flex min-w-max px-1'>
            {users.map((user, index) => (
              <div 
                key={index} 
                className='flex flex-col items-center min-w-[120px]'
                role='option'
                aria-selected='false'
                tabIndex={-1}>
                <Avatar 
                  className='w-[4.5rem] h-[4.5rem] mb-3 ring-4 ring-white'>
                  <AvatarImage 
                    src={user.avatarUrl} 
                    alt={`Profile picture of ${user.name}`}
                    className='object-cover'/>
                  <AvatarFallback aria-label={`${user.name}'s initials`}>
                    {user.name[0]}
                  </AvatarFallback>
                </Avatar>
                <span 
                  className='text-sm font-semibold text-[#1A1F36] mb-1'
                  aria-label={`Recipient name: ${user.name}`}>
                  {user.name}
                </span>
                <span 
                  className='text-xs text-[#718EBF]'
                  aria-label={`Position: ${user.title}`}>
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
            type='button'
            aria-label='Scroll to see more recipients'
            className='w-full h-full rounded-full bg-[#FFF] flex items-center justify-center hover:bg-[#F0F3F9] transition-colors'>
            <svg
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#718EBF'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              role='img'
              aria-hidden='true'>
              <path d='M9 18l6-6-6-6' />
            </svg>
          </button>
        </div>
      </div>

      {/* Amount Input Section */}
      <div 
        className='flex items-center w-full'
        role='group'
        aria-label='Transfer Amount Input'>
        <label 
          htmlFor='transferAmount'
          className='text-sm text-[#718EBF] whitespace-nowrap'>
          Write Amount
        </label>
        <div className='flex-1 ml-4'>
          <div className='flex h-[3.125rem] bg-[#F7F9FC] rounded-full'>
            <div className='flex-1 relative flex items-center'>
              <span 
                className='absolute left-5 text-[#1A1F36] text-lg'
                aria-hidden='true'>
                $
              </span>
              <Input
                id='transferAmount'
                value={amount}
                onChange={handleAmountChange}
                disabled={isSending}
                aria-label='Transfer amount in dollars'
                aria-describedby='amountHint'
                className='border-0 h-full pl-10 text-base bg-transparent focus:ring-0 text-[#718EBF]'/>
              <span id='amountHint' className='sr-only'>
                Enter amount in dollars. Use numbers and up to 2 decimal places.
              </span>
            </div>
            <Button
              onClick={handleSend}
              type='button'
              disabled={isSending}
              aria-label={isSending ? 'Sending transfer' : 'Send transfer'}
              className='h-[3.125rem] px-6 bg-[#1A1F36] hover:bg-[#1A1F36]/90 
                       text-white rounded-full flex items-center gap-2
                       disabled:opacity-50 disabled:cursor-not-allowed'>
              {isSending ? (
                <>
                  <Loader2 className='w-5 h-5 animate-spin' aria-hidden='true' />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Send</span>
                  <Send size={20} aria-hidden='true' />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;