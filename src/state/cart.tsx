import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { useReducedMotion, useSharedValue, withSequence, withTiming } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

import { cartSeed, type Product } from '@/mocks/data';

export type CartLine = {
  id: string;
  product: Product;
  qty: number;
};

export type AddedEvent = { product: Product; at: number };

type CartValue = {
  lines: CartLine[];
  count: number;
  bump: SharedValue<number>;
  deselected: Record<string, true>;
  lastAdded: AddedEvent | null;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  removeLine: (id: string) => void;
  restoreLine: (line: CartLine, index: number) => void;
  remove: (id: string) => void;
  toggleSelected: (id: string) => void;
  setAllSelected: (selected: boolean) => void;
};

const CartContext = createContext<CartValue | null>(null);

const lineId = (productId: string) => `line-${productId}`;

const seed: CartLine[] = cartSeed.map(({ product, qty }) => ({ id: lineId(product.id), product, qty }));

function without(map: Record<string, true>, id: string) {
  if (!map[id]) return map;
  const next = { ...map };
  delete next[id];
  return next;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(seed);
  const [deselected, setDeselected] = useState<Record<string, true>>({});
  const [lastAdded, setLastAdded] = useState<AddedEvent | null>(null);
  const reduced = useReducedMotion();
  const bump = useSharedValue(1);

  const add = useCallback(
    (product: Product) => {
      const id = lineId(product.id);
      setLines((current) => {
        const found = current.find((line) => line.id === id);
        if (!found) return [...current, { id, product, qty: 1 }];
        return current.map((line) => (line.id === id ? { ...line, qty: line.qty + 1 } : line));
      });
      setDeselected((current) => without(current, id));
      setLastAdded({ product, at: Date.now() });
      if (!reduced) {
        bump.value = withSequence(withTiming(1.12, { duration: 90 }), withTiming(1, { duration: 140 }));
      }
    },
    [bump, reduced],
  );

  const setQty = useCallback((id: string, qty: number) => {
    setLines((current) =>
      current.flatMap((line) => {
        if (line.id !== id) return [line];
        if (qty <= 0) return [];
        return [{ ...line, qty }];
      }),
    );
  }, []);

  const removeLine = useCallback((id: string) => {
    setLines((current) => current.filter((line) => line.id !== id));
  }, []);

  const restoreLine = useCallback((line: CartLine, index: number) => {
    setLines((current) =>
      current.some((item) => item.id === line.id)
        ? current
        : [...current.slice(0, index), line, ...current.slice(index)],
    );
  }, []);

  const remove = useCallback((id: string) => {
    setLines((current) =>
      current.flatMap((line) => {
        if (line.id !== id) return [line];
        if (line.qty <= 1) return [];
        return [{ ...line, qty: line.qty - 1 }];
      }),
    );
  }, []);

  const toggleSelected = useCallback((id: string) => {
    setDeselected((current) => (current[id] ? without(current, id) : { ...current, [id]: true }));
  }, []);

  const setAllSelected = useCallback(
    (selected: boolean) => {
      setDeselected(selected ? {} : Object.fromEntries(lines.map((line) => [line.id, true as const])));
    },
    [lines],
  );

  const count = lines.reduce((sum, line) => sum + line.qty, 0);

  const value = useMemo(
    () => ({
      lines,
      count,
      bump,
      deselected,
      lastAdded,
      add,
      setQty,
      removeLine,
      restoreLine,
      remove,
      toggleSelected,
      setAllSelected,
    }),
    [lines, count, bump, deselected, lastAdded, add, setQty, removeLine, restoreLine, remove, toggleSelected, setAllSelected],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useCart phải nằm trong CartProvider');
  return value;
}
