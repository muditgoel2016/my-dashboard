import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RecentTransactions = ({ transactions }) => {
  return (
    <Card className="flex-1 rounded-[25px] bg-white">
      <CardContent className="p-6 h-[calc(100%-48px)] overflow-auto">
        <div className="flex flex-col gap-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center">
              {/* Icon Container */}
              <div className="flex-none w-12 h-12">
                <div 
                  className="w-full h-full rounded-full flex items-center justify-center"
                  style={{ backgroundColor: transaction.icon.bg }}
                >
                  <div style={{ color: transaction.icon.color }}>
                    {transaction.icon.svg}
                  </div>
                </div>
              </div>

              {/* Title and Date Container */}
              <div className="flex-1 ml-3">
                <p className="font-medium text-[#1A1F36]">{transaction.title}</p>
                <p className="text-sm text-[#718EBF]">{transaction.date}</p>
              </div>

              {/* Amount Container */}
              <div className="flex-none">
                <span 
                  className={`font-medium ${
                    transaction.type === 'credit' ? 'text-[#35C28F]' : 'text-[#F23838]'
                  }`}
                >
                  {transaction.type === 'credit' ? '+ ' : '- '}${transaction.amount}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;