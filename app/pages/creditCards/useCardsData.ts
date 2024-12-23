import { useState, useEffect } from 'react';

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

interface UseCardsDataProps {
  initialData: CardData[] | null;
  ssrConfig: {
    CARDS_SSR_ENABLED: boolean;
  };
}

export const useCardsData = ({ initialData, ssrConfig }: UseCardsDataProps) => {
  const [cardsData, setCardsData] = useState<CardData[]>(initialData || []);
  const [isLoading, setIsLoading] = useState(!initialData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      // Only fetch if we don't have initial data and SSR is disabled
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

    void fetchCards();
  }, [ssrConfig.CARDS_SSR_ENABLED]);

  return { cardsData, isLoading, error };
};