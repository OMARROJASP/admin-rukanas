import {Roboto, Bebas_Neue} from 'next/font/google';

export const roboto = Roboto({
  weight: ['100', '400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
});

export const bebas = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-roboto'
});