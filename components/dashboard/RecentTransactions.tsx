import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const RecentTransactions = ({ transactions }) => {
  return (
    <Card className="rounded-2xl bg-white">
      <CardContent className="p-6">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center gap-4">
            <div className="w-12 h-12 flex items-center justify-center rounded-full" style={{ backgroundColor: transaction.icon.bg }}>
              <div style={{ color: transaction.icon.color }}>{transaction.icon.svg}</div>
            </div>
            <div className="flex-1">
              <p className="font-medium text-[#1A1F36]">{transaction.title}</p>
              <p className="text-sm text-[#718EBF]">{transaction.date}</p>
            </div>
            <div>
              <span className={`font-medium ${transaction.type === "credit" ? "text-[#35C28F]" : "text-[#F23838]"}`}>
                {transaction.type === "credit" ? "+ " : "- "}${transaction.amount}
              </span>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentTransactions;
