import { useMemo } from 'react';

import type { CartLine } from '@/state/cart';

export type CartSummary = { qty: number; total: number; saving: number };

export function useCartSummary(lines: CartLine[], deselected: Record<string, true>) {
  return useMemo(() => {
    const selected = lines.filter((line) => !deselected[line.id]);
    const summary = selected.reduce<CartSummary>(
      (acc, { product, qty }) => ({
        qty: acc.qty + qty,
        total: acc.total + product.price * qty,
        saving: acc.saving + (product.originalPrice - product.price) * qty,
      }),
      { qty: 0, total: 0, saving: 0 },
    );
    return { summary, allSelected: lines.length > 0 && selected.length === lines.length };
  }, [deselected, lines]);
}
