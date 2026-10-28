import { useEffect, useState } from 'react';

import { useCart } from '@/state/cart';

const ADDED_TOAST_MS = 2500;

export function useAddedToast() {
  const { lastAdded } = useCart();
  const [dismissedAt, setDismissedAt] = useState(0);
  const added = lastAdded && lastAdded.at > dismissedAt ? lastAdded : null;

  useEffect(() => {
    if (!added) return;
    const timer = setTimeout(() => setDismissedAt(added.at), ADDED_TOAST_MS);
    return () => clearTimeout(timer);
  }, [added]);

  const dismiss = () => {
    if (added) setDismissedAt(added.at);
  };

  return { added, dismiss };
}
