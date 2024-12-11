import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const QuickTransfer = ({ users, defaultAmount }) => {
  return (
    <div>
      <div className="flex gap-4">
        {users.map((user, index) => (
          <div key={index} className="flex flex-col items-center">
            <Avatar className="w-12 h-12 mb-2">
              <AvatarImage src={`/api/placeholder/48/48`} />
              <AvatarFallback>{user.initial}</AvatarFallback>
            </Avatar>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-sm text-gray-500">{user.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <span className="text-gray-500">Write Amount</span>
        <div className="flex-1 flex rounded-full bg-gray-100">
          <Input defaultValue={defaultAmount} className="flex-1 h-12 text-lg border-none bg-transparent" />
          <Button className="h-12 px-8 rounded-full">
            Send
            <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickTransfer;
