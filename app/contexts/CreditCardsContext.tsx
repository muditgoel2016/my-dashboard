'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';

interface CardTheme {
  bgColor: string;
  textPrimaryColor: string;
}

interface CardData {
  balance: number;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
}

interface CreditCardsContextState {
  cardsData: CardData[];
  isLoading: boolean;
  error: Error | null;
  setCardsData: (data: CardData[]) => void;
}

interface CreditCardsProviderProps {
  children: React.ReactNode;
  initialData?: CardData[] | null;
  ssrConfig: {
    CARDS_SSR_ENABLED: boolean;
  };
}

const CreditCardsContext = createContext<CreditCardsContextState | undefined>(undefined);

export const CreditCardsProvider: React.FC<CreditCardsProviderProps> = ({ 
  children, 
  initialData = null, 
  ssrConfig 
}) => {
  const [cardsData, setCardsData] = useState<CardData[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      if (!ssrConfig.CARDS_SSR_ENABLED) {
        try {
          setIsLoading(true);
          const cards = await dashboardDataService.getCardsData(false);
          setCardsData(cards);
        } catch (err) {
          setError(err instanceof Error ? err : new Error('Failed to fetch cards data'));
        } finally {
          setIsLoading(false);
        }
      }
    };

    if (!ssrConfig.CARDS_SSR_ENABLED) {
      void fetchCards();
    }
  }, [initialData, ssrConfig.CARDS_SSR_ENABLED]);

  return (
    <CreditCardsContext.Provider value={{ cardsData, isLoading, error, setCardsData }}>
      {children}
    </CreditCardsContext.Provider>
  );
};

export const useCreditCards = (): CreditCardsContextState => {
  const context = useContext(CreditCardsContext);
  if (!context) {
    throw new Error('useCreditCards must be used within a CreditCardsProvider');
  }
  return context;
};
