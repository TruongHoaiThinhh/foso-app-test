import { useEffect, useState } from 'react';

export function useMockLoad() {
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const [refreshing, setRefreshing] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStatus('ready');
      setRefreshing(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [attempt]);

  return {
    status,
    refreshing,
    reload: () => {
      setRefreshing(true);
      setAttempt((value) => value + 1);
    },
    retry: () => {
      setStatus('loading');
      setAttempt((value) => value + 1);
    },
  };
}
