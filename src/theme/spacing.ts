export const spacing = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 16, xl: 24 } as const;
export const radius = { xxs: 2, xs: 4, sm: 8, md: 12, lg: 20, pill: 999 } as const;
export const shadows = {
  card: {
    boxShadow: '0px 0px 2px rgba(145,158,171,0.2), 0px 12px 24px -4px rgba(145,158,171,0.12)',
  },
  soft: { boxShadow: '0px 4px 16px rgba(0,0,0,0.08)' },
  sheet: { boxShadow: '0px 4px 32px rgba(0,0,0,0.08)' },
} as const;
