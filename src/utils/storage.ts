/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Post, PostCategory, ThemeSettings, SeoSettings, ConsultationBooking } from '../types';
import { initialPosts, initialThemeSettings, initialSeoSettings, initialBookings } from '../data/mockData';

const STORAGE_KEYS = {
  POSTS: 'gradeone_posts_v7',
  THEME: 'gradeone_theme_v3',
  SEO: 'gradeone_seo_v2',
  BOOKINGS: 'gradeone_bookings_v2',
};

export const loadStoredPosts = (): Post[] => {
  try {
    // Clean up older keys that cause unwanted reversion
    ['gradeone_posts_v1', 'gradeone_posts_v2', 'gradeone_posts_v3', 'gradeone_posts_v4', 'gradeone_posts_v5', 'gradeone_posts_v6'].forEach((k) => {
      localStorage.removeItem(k);
    });

    const data = localStorage.getItem(STORAGE_KEYS.POSTS);
    if (data) {
      const parsed: Post[] = JSON.parse(data);
      const validCategories: PostCategory[] = ['공지사항', '입시/합격소식', '국제학교'];
      return parsed
        .filter((p) => validCategories.includes(p.category))
        .map((p) => {
          // Ensure post-1 does not retain old attachment if cached
          if (p.id === 'post-1') {
            return {
              ...p,
              attachmentImage: undefined,
              attachmentTitle: undefined,
              attachmentName: undefined,
              hasAttachmentNotice: false,
              imageUrl: '/assets/images/korean_students_uniforms_1793451652162.jpg',
            };
          }
          // Ensure post-6 has official attachment
          if (p.id === 'post-6') {
            return {
              ...p,
              imageUrl: '/assets/images/korean_students_uniforms_1793451652162.jpg',
              attachmentImage: '/assets/aistudio/KakaoTalk_20261030_210917341_02_f133293f.jpg',
              hasAttachmentNotice: true,
            };
          }
          return p;
        });
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
    const data = localStorage.getItem(STORAGE_KEYS.THEME) || localStorage.getItem('gradeone_theme_v2');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed.notificationBanner && (parsed.notificationBanner.includes('1학기 내신대비반') || parsed.notificationBanner.includes('봄학기'))) {
        parsed.notificationBanner = initialThemeSettings.notificationBanner;
      }
      return { ...initialThemeSettings, ...parsed };
    }
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
