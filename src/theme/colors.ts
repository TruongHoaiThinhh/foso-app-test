export const colors = {
  brand: { 50: '#E6F1FF', 500: '#0373F3', 600: '#025FCA', 700: '#024897', 800: '#013065' },
  text: { primary: '#1C252E', secondary: '#454F5B', muted: '#637381', disabled: '#919EAB' },
  grey: { 100: '#F9FAFB', 300: '#DFE3E8', 400: '#C4CDD5', 600: '#637381', 700: '#454F5B', 800: '#1C252E' },
  greyscale: { 400: '#9CA3AF', 900: '#111827' },
  white: '#FFFFFF',
  error: { main: '#FF5630', dark: '#B71D18', darker: '#7A0916', red700: '#E53935' },
  warning: { lighter: '#FFF5CC', light: '#FFD666', main: '#FFAB00' },
  info: { a8: '#00B8D914', a24: '#00B8D93D' },
  shadow: { a20: 'rgba(145,158,171,0.2)', a12: 'rgba(145,158,171,0.12)' },
} as const;

export const gradients = {
  timer: ['#FF5630', '#B71D18'],
  flash: ['#FFD666', '#FFAB00'],
} as const;
