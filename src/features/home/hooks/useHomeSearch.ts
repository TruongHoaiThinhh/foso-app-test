import { useDeferredValue, useMemo } from 'react';

import { normalizeSearch } from '@/lib/search';
import { articles, bestProducts, flashProducts, forYouProducts, newProducts } from '@/mocks/data';

const allProducts = [...flashProducts, ...bestProducts, ...forYouProducts, ...newProducts];

export function useHomeSearch(query: string) {
  const needle = normalizeSearch(useDeferredValue(query));
  return useMemo(() => {
    if (!needle) return null;
    return {
      products: allProducts.filter((item) => normalizeSearch(item.name).includes(needle)),
      posts: articles.filter((item) =>
        normalizeSearch(`${item.title} ${item.excerpt ?? ''}`).includes(needle),
      ),
    };
  }, [needle]);
}
