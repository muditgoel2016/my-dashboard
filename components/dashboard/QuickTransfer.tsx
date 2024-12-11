import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const DEFAULT_AVATAR_URL = "https://avatar.iran.liara.run/public";

const QuickTransfer = ({ users, defaultAmount }) => {
  return (
    <div className="p-6 flex flex-col h-[calc(100%-48px)]">
      {/* First Row - 2/3 of total height */}
      <div className="flex gap-4 h-2/3 mb-4">
        {/* Profile Section - 3/4 width */}
        <div className="flex-[3] m-auto overflow-hidden">
          <div className="flex gap-4 justify-around overflow-x-hidden">
            {users.map((user, index) => (
              <div key={index} className="flex flex-col items-center flex-shrink-0">
                <Avatar className="w-12 h-12 mb-2">
                  <AvatarImage 
                    src={user.avatarUrl || DEFAULT_AVATAR_URL} 
                    alt={user.name}
                  />
                  <AvatarFallback>
                    <img 
                      src={DEFAULT_AVATAR_URL} 
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Arrow Section - 1/4 width */}
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-200">
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Second Row - 1/3 of total height */}
      <div className="h-1/3">
        <div className="flex items-center gap-4">
          <span className="text-gray-500 whitespace-nowrap">Write Amount</span>
          <div className="flex flex-1 overflow-hidden rounded-full bg-gray-100">
            <Input 
              defaultValue={defaultAmount}
              className="flex-1 h-12 text-lg border-none bg-transparent focus:ring-0" 
            />
            <Button className="h-12 px-8 rounded-full">
              Send
              <svg 
                className="ml-2 w-4 h-4" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;