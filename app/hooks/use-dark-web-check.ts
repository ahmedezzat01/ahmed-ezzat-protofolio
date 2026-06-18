'use client';
import { useState } from 'react';
import { BreachResult } from '@/types';

export function useDarkWebCheck() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<BreachResult | null>(null);

  const checkEmail = async (email: string) => {
    if (!email || !email.includes('@')) {
      setResult({ breached: false, count: 0, error: 'Please enter a valid email' });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/check-breach?email=${encodeURIComponent(email)}`);
      const data = await response.json();
      setResult(data);
    } catch {
      setResult({ breached: false, count: 0, error: 'Failed to check email' });
    }
    setIsLoading(false);
  };

  const reset = () => {
    setResult(null);
    setIsLoading(false);
  };

  return { checkEmail, isLoading, result, reset };
}
