/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PostCategory = '공지사항' | '입시/합격소식' | '국제학교';

export interface Post {
  id: string;
  title: string;
  category: PostCategory;
  summary: string;
  content: string;
  author: string;
  date: string;
  views: number;
  isPinned?: boolean;
  tags: string[];
  imageUrl?: string;
  attachmentImage?: string;
  attachmentTitle?: string;
  hasAttachmentNotice?: boolean;
  isPublished: boolean;
}

export type GradeLevel = 
  | '초등 4~5학년'
  | '초등 6학년'
  | '중등 1학년'
  | '중등 2학년'
  | '중등 3학년'
  | '고등 1학년'
  | '고등 2학년'
  | '고등 3학년 / N수'
  | '국제학교 / 유학생 (IB, AP, SAT)';

export type TargetTrack =
  | '대치동 1:1 개별맞춤 클리닉'
  | '초등 최상위 심화 & KMO'
  | '중등 내신 만점 & 고등 선행'
  | '강남 8학군 고등 내신 1등급 집중반'
  | '수능·평가원 수학 킬러 극복반'
  | '영재고·과고·전국자사고 대비반'
  | '국제학교 IB DP Math (AA/AI HL·SL)'
  | '국제학교 AP Calculus AB·BC / SAT Math';

export interface ConsultationBooking {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  grade: GradeLevel;
  targetTrack: TargetTrack;
  currentLevel?: string;
  mathConcern?: string;
  preferredDate: string;
  preferredTime: string;
  status: '접수대기' | '상담확정' | '상담완료' | '취소';
  createdAt: string;
  adminNote?: string;
}

export interface ThemeSettings {
  primaryColor: string; // e.g. '#ff6b00'
  accentGlow: string;
  bgTone: 'pure-black' | 'deep-charcoal' | 'midnight-navy';
  fontFamily: 'pretendard' | 'serif-luxury' | 'modern-mono';
  academyName: string;
  subTitle: string;
  heroHeadline: string;
  heroSubheadline: string;
  phone: string;
  address: string;
  detailAddress: string;
  businessHours: string;
  notificationBanner: string;
  showNotificationBanner: boolean;
}

export interface SeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  ogTitle: string;
  ogDescription: string;
  siteUrl: string;
}

export interface CurriculumTrack {
  id: string;
  title: string;
  target: string;
  badge: string;
  description: string;
  features: string[];
  recommendedFor: string;
  subjects: string[];
  icon: string;
}

export interface SuccessStory {
  id: string;
  studentName: string;
  previousSchool: string;
  admittedSchool: string;
  year: string;
  scoreJump?: string;
  badge: string;
  quote: string;
  curriculumUsed: string;
  reviewDetail: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  education: string;
  career: string[];
  specialty: string;
  quote: string;
  image: string;
}
