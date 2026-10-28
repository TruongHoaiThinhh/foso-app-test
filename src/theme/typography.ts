export const fonts = {
  regular: 'Epilogue_400Regular',
  medium: 'Epilogue_500Medium',
  semibold: 'Epilogue_600SemiBold',
  bold: 'Epilogue_700Bold',
} as const;

export const typography = {
  h3: { fontFamily: fonts.semibold, fontSize: 18, lineHeight: 24 },
  title: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20, letterSpacing: 0.15 },
  bodyBold: { fontFamily: fonts.bold, fontSize: 14, lineHeight: 20 },
  caption: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
  small: { fontFamily: fonts.medium, fontSize: 10, lineHeight: 16 },
  tiny: { fontFamily: fonts.semibold, fontSize: 8, lineHeight: 10 },
} as const;
