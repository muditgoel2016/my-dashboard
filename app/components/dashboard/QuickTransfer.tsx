import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/app/components/shared/common/avatar";
import { Input } from "@/app/components/shared/common/input";
import { Button } from "@/app/components/shared/common/button";
import { Send } from "lucide-react"; // Added this import

const DEFAULT_AVATAR_URL = "https://avatar.iran.liara.run/public";

interface User {
  name: string;
  title: string;
  avatarUrl: string;
}

interface QuickTransferProps {
  users: User[];
  defaultAmount?: string;
}

// Update QuickTransfer component to be more fluid:
export default function QuickTransfer({ users, defaultAmount = "525.50" }: QuickTransferProps) {
  return (
    <div className="w-full max-w-[445px] flex flex-col gap-8 bg-white rounded-tl-[25px] p-6">
      {/* Profile Section */}
      <div className="flex items-center">
        <div className="flex-1 grid grid-cols-3 gap-6">
          {users.map((user, index) => (
            <div key={index} className="flex flex-col items-center">
              <Avatar className="w-[4.5rem] h-[4.5rem] mb-3 ring-4 ring-white">
                <AvatarImage 
                  src={user.avatarUrl} 
                  alt={user.name}
                  className="object-cover" 
                />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-semibold text-[#1A1F36] mb-1">
                {user.name}
              </span>
              <span className="text-xs text-[#718EBF]">
                {user.title}
              </span>
            </div>
          ))}
        </div>

        {/* Scroll Arrow */}
        <div className="ml-4 bg-white rounded-full w-[3.125rem] h-[3.125rem] flex items-center justify-center shadow-[4px_4px_18px_-2px_#E7E4E8CC]">
          <button className="w-full h-full rounded-full bg-[#FFF] flex items-center justify-center hover:bg-[#F0F3F9] transition-colors">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#718EBF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Amount Input Section */}
      <div className="flex items-center w-full">
        <span className="text-sm text-[#718EBF] whitespace-nowrap">Write Amount</span>
        <div className="flex-1 ml-4">
          <div className="flex h-[3.125rem] bg-[#F7F9FC] rounded-full">
            <div className="flex-1 relative flex items-center">
              <span className="absolute left-5 text-[#1A1F36] text-lg">$</span>
              <Input
                defaultValue={defaultAmount}
                className="border-0 h-full pl-10 text-base bg-transparent focus:ring-0 text-[#718EBF]"
              />
            </div>
            <Button className="h-[3.125rem] px-6 bg-[#1A1F36] hover:bg-[#1A1F36]/90 text-white rounded-full flex items-center">
              Send
              <Send size={20} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}