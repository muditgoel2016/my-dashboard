// hooks/useCardsData.ts
import { useState, useEffect } from 'react';

import type { CardTheme } from '@/app/components/dashboard/CreditCard';
import { dashboardDataService } from '@/app/services/dataServices/dashboard/dashboardDataService';

interface CardData {
  balance: number;
  holder: string;
  validThru: string;
  cardNumber: string;
  theme: CardTheme;
}

export const useCardsData = () => {
  const [cardsData, setCardsData] = useState<CardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        setIsLoading(true);
        const cards = await dashboardDataService.getCardsData();
        setCardsData(cards);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch cards data'));
      } finally {
        setIsLoading(false);
      }
    };

    void fetchCards();
  }, []);

  return { cardsData, isLoading, error };
};