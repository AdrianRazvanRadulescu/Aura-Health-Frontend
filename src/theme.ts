// src/theme.ts
import { createTheme } from '@mantine/core';

export const theme = createTheme({
  fontFamily: 'Nunito Sans, sans-serif',
  headings: {
    fontFamily: 'Poppins, sans-serif',
  },
  colors: {
    'deep-forest': ['#E9EBEA', '#CFD4D2', '#B5BDBA', '#9CA6A2', '#828F8B', '#687873', '#51615C', '#3A4F41', '#233C2A', '#0F2914'],
    'sage-green': ['#EBF0EC', '#D7E1D9', '#C3D2C6', '#AFC3B3', '#9BAFA1', '#87AC8F', '#739B7D', '#5A8B6B', '#417A59', '#286A47'],
    'linen': ['#FDFDFD', '#F9F8F7', '#F5F4F3', '#F2F0EF', '#EFECEB', '#F8F7F2', '#F8F7F2', '#F8F7F2', '#F8F7F2', '#F8F7F2'],
  },
  primaryColor: 'sage-green',
  primaryShade: 7,
  defaultRadius: 'md',
});