import { useMemo } from 'react';

import { normalizeSearch } from '@/lib/search';
import { catalog, type SubGroup } from '@/mocks/data';

function filterGroups(groups: SubGroup[], needle: string): SubGroup[] {
  if (!needle) return groups;
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) => normalizeSearch(item.name).includes(needle)),
    }))
    .filter((group) => group.items.length > 0);
}

export function useCategorySearch(query: string, active: number) {
  const needle = normalizeSearch(query);
  const results = useMemo(() => catalog.map((item) => filterGroups(item.groups, needle)), [needle]);
  const groups = results[active] ?? [];
  const fallbackIndex =
    needle && groups.length === 0 ? results.findIndex((item) => item.length > 0) : -1;

  return {
    groups,
    fallbackIndex,
    isDimmed: (index: number) => Boolean(needle) && results[index]?.length === 0,
  };
}
