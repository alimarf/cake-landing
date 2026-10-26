import type { ImageMetadata } from 'astro';
import bolen from '../assets/images/bolen.webp';
import brownies from '../assets/images/brownies.webp';
import cookies from '../assets/images/cookies.webp';
import hero from '../assets/images/hero.webp';
import journey_bersama from '../assets/images/journey-bersama.webp';
import journey_dapur from '../assets/images/journey-dapur.webp';
import klepon from '../assets/images/klepon.webp';
import roll_cake from '../assets/images/roll-cake.webp';
import roti_abon from '../assets/images/roti-abon.webp';

export const images: Record<string, ImageMetadata> = {
  'bolen': bolen,
  'brownies': brownies,
  'cookies': cookies,
  'hero': hero,
  'journey-bersama': journey_bersama,
  'journey-dapur': journey_dapur,
  'klepon': klepon,
  'roll-cake': roll_cake,
  'roti-abon': roti_abon,
};
