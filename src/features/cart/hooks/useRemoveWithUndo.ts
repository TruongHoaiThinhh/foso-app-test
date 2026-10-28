import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

import { useCart, type CartLine } from '@/state/cart';

const UNDO_MS = 4000;

type Removed = { line: CartLine; index: number };

export function useRemoveWithUndo() {
  const { removeLine, restoreLine } = useCart();
  const [removed, setRemoved] = useState<Removed | null>(null);

  const remove = useCallback(
    (line: CartLine, index: number) => {
      removeLine(line.id);
      setRemoved({ line, index });
    },
    [removeLine],
  );

  const confirmRemove = useCallback(
    (line: CartLine, index: number) => {
      Alert.alert('Xoá sản phẩm?', line.product.name, [
        { text: 'Huỷ', style: 'cancel' },
        { text: 'Xoá', style: 'destructive', onPress: () => remove(line, index) },
      ]);
    },
    [remove],
  );

  const undo = () => {
    if (!removed) return;
    restoreLine(removed.line, removed.index);
    setRemoved(null);
  };

  useEffect(() => {
    if (!removed) return;
    const timer = setTimeout(() => setRemoved(null), UNDO_MS);
    return () => clearTimeout(timer);
  }, [removed]);

  return { removed, remove, confirmRemove, undo };
}
