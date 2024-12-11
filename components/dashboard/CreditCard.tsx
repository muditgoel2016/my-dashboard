import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const CreditCard = ({
  balance,
  holder,
  validThru,
  cardNumber,
  theme = {
    bgColor: "bg-[#f8faff]",
    textPrimaryColor: "text-[#1a1f36]",
    textSecondaryColor: "text-[#1a1f36]",
    logo: null,
  },
}) => {
  const {
    bgColor,
    textPrimaryColor,
    textSecondaryColor,
    logo,
  } = theme;

  return (
    <Card className={`${bgColor} flex-1 rounded-2xl`}>
      <CardContent className="p-6 h-[235px] flex flex-col">
        {/* Top Row - Balance and Chip */}
        <div className="flex-1 flex justify-between">
          <div>
            <p className={`text-sm ${textPrimaryColor}`}>Balance</p>
            <h2 className={`text-2xl font-bold ${textPrimaryColor}`}>${balance}</h2>
          </div>
          <div className="w-12 h-12">
            <svg className="w-full h-full" />
          </div>
        </div>

        {/* Middle Row - Card Holder and Valid Info */}
        <div className="flex-[2] flex justify-between items-center">
          <div>
            <p className={`text-xs ${textSecondaryColor}`}>CARD HOLDER</p>
            <p className={`font-medium ${textSecondaryColor}`}>{holder}</p>
          </div>
          <div>
            <p className={`text-xs ${textSecondaryColor}`}>VALID THRU</p>
            <p className={`font-medium ${textSecondaryColor}`}>{validThru}</p>
          </div>
        </div>

        {/* Bottom Row - Card Number and Logo */}
        <div className="flex-1 flex justify-between items-center">
          <p className={`text-xl tracking-wider mb-4 ${textPrimaryColor}`}>{cardNumber}</p>
          {logo}
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditCard;
