/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Post, PostCategory, ThemeSettings, SeoSettings, ConsultationBooking } from '../types';
import { initialPosts, initialThemeSettings, initialSeoSettings, initialBookings } from '../data/mockData';

const STORAGE_KEYS = {
  POSTS: 'gradeone_posts_v3',
  THEME: 'gradeone_theme_v2',
  SEO: 'gradeone_seo_v2',
  BOOKINGS: 'gradeone_bookings_v2',
};

export const loadStoredPosts = (): Post[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (data) {
      const parsed: Post[] = JSON.parse(data);
      const validCategories: PostCategory[] = ['공지사항', '입시/합격소식', '국제학교'];
      return parsed
        .filter((p) => validCategories.includes(p.category))
        .map((p) => ({
          ...p,
          content: p.content.replace(/뇌\s*구조/g, '학습 성향과 취약점'),
        }));
    }
  } catch (e) {
    console.error('Failed to load posts from storage', e);
  }
  return initialPosts;
};

export const saveStoredPosts = (posts: Post[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));
  } catch (e) {
    console.error('Failed to save posts', e);
  }
};

export const loadStoredTheme = (): ThemeSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.THEME);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load theme from storage', e);
  }
  return initialThemeSettings;
};

export const saveStoredTheme = (theme: ThemeSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, JSON.stringify(theme));
  } catch (e) {
    console.error('Failed to save theme', e);
  }
};

export const loadStoredSeo = (): SeoSettings => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SEO);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load seo from storage', e);
  }
  return initialSeoSettings;
};

export const saveStoredSeo = (seo: SeoSettings): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seo));
  } catch (e) {
    console.error('Failed to save seo', e);
  }
};

export const loadStoredBookings = (): ConsultationBooking[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    if (data) return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load bookings from storage', e);
  }
  return initialBookings;
};

export const saveStoredBookings = (bookings: ConsultationBooking[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (e) {
    console.error('Failed to save bookings', e);
  }
};
