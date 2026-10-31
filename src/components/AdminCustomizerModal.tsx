/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  X,
  Palette,
  FileEdit,
  Users,
  Search,
  Plus,
  Trash2,
  Edit,
  Save,
  RotateCcw,
  Check,
  Globe,
  Sliders,
  Pin,
  Image as ImageIcon,
  CheckCircle2,
  Clock,
  Phone,
  FileText,
  Download,
} from 'lucide-react';
import { Post, PostCategory, ThemeSettings, SeoSettings, ConsultationBooking } from '../types';
import { initialThemeSettings, initialSeoSettings, initialPosts } from '../data/mockData';

interface AdminCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: ThemeSettings;
  seo: SeoSettings;
  posts: Post[];
  bookings: ConsultationBooking[];
  onUpdateTheme: (newTheme: ThemeSettings) => void;
  onUpdateSeo: (newSeo: SeoSettings) => void;
  onSavePost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
  onUpdateBookingStatus: (bookingId: string, status: ConsultationBooking['status'], adminNote?: string) => void;
  editingPostData?: Post | null;
  initialTab?: 'theme' | 'posts' | 'bookings' | 'seo';
}

export const AdminCustomizerModal: React.FC<AdminCustomizerModalProps> = ({
  isOpen,
  onClose,
  theme,
  seo,
  posts,
  bookings,
  onUpdateTheme,
  onUpdateSeo,
  onSavePost,
  onDeletePost,
  onUpdateBookingStatus,
  editingPostData,
  initialTab = 'theme',
}) => {
  const [activeTab, setActiveTab] = useState<'theme' | 'posts' | 'bookings' | 'seo'>(initialTab);

  // Theme local states
  const [localTheme, setLocalTheme] = useState<ThemeSettings>(theme);

  // SEO local states
  const [localSeo, setLocalSeo] = useState<SeoSettings>(seo);

  // Post Editor state
  const [isCreatingPost, setIsCreatingPost] = useState<boolean>(false);
  const [currentPostId, setCurrentPostId] = useState<string>('');
  const [postTitle, setPostTitle] = useState<string>('');
  const [postCategory, setPostCategory] = useState<PostCategory>('공지사항');
  const [postSummary, setPostSummary] = useState<string>('');
  const [postContent, setPostContent] = useState<string>('');
  const [postAuthor, setPostAuthor] = useState<string>('대치10관 원장단');
  const [postTags, setPostTags] = useState<string>('');
  const [postImageUrl, setPostImageUrl] = useState<string>('');
  const [postIsPinned, setPostIsPinned] = useState<boolean>(false);
  const [postIsPublished, setPostIsPublished] = useState<boolean>(true);

  // Saved notification
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  if (!isOpen) return null;

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2500);
  };

  const handleSaveTheme = () => {
    onUpdateTheme(localTheme);
    triggerToast('테마 및 학원 정보 설정이 저장되었습니다.');
  };

  const handleResetTheme = () => {
    if (confirm('모든 테마와 디자인을 초기 기본값으로 리셋하시겠습니까?')) {
      setLocalTheme(initialThemeSettings);
      onUpdateTheme(initialThemeSettings);
      triggerToast('기본값으로 복원되었습니다.');
    }
  };

  const handleSaveSeo = () => {
    onUpdateSeo(localSeo);
    triggerToast('SEO 및 검색 메타 정보가 저장되었습니다.');
  };

  const handleStartNewPost = () => {
    setIsCreatingPost(true);
    setCurrentPostId('');
    setPostTitle('');
    setPostCategory('공지사항');
    setPostSummary('');
    setPostContent('');
    setPostAuthor('대치10관 원장단');
    setPostTags('');
    setPostImageUrl('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80');
    setPostIsPinned(false);
    setPostIsPublished(true);
  };

  const handleEditPostInForm = (p: Post) => {
    setIsCreatingPost(true);
    setCurrentPostId(p.id);
    setPostTitle(p.title);
    setPostCategory(p.category);
    setPostSummary(p.summary);
    setPostContent(p.content);
    setPostAuthor(p.author);
    setPostTags(p.tags.join(', '));
    setPostImageUrl(p.imageUrl || '');
    setPostIsPinned(p.isPinned || false);
    setPostIsPublished(p.isPublished);
  };

  const handleSavePostForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim()) {
      alert('게시글 제목을 입력해 주세요.');
      return;
    }

    const tagsArray = postTags
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const postToSave: Post = {
      id: currentPostId || `post-${Date.now()}`,
      title: postTitle,
      category: postCategory,
      summary: postSummary || postTitle,
      content: postContent,
      author: postAuthor || '대치10관 원장단',
      date: new Date().toISOString().split('T')[0],
      views: currentPostId ? (posts.find((p) => p.id === currentPostId)?.views || 100) : 1,
      isPinned: postIsPinned,
      tags: tagsArray,
      imageUrl: postImageUrl || undefined,
      attachmentImage: currentPostId ? posts.find((p) => p.id === currentPostId)?.attachmentImage : undefined,
      attachmentTitle: currentPostId ? posts.find((p) => p.id === currentPostId)?.attachmentTitle : undefined,
      isPublished: postIsPublished,
    };

    onSavePost(postToSave);
    setIsCreatingPost(false);
    triggerToast('게시글이 성공적으로 발행되었습니다.');
  };

  // Preset Orange colors
  const colorPresets = [
    { label: '시그니처 오렌지', hex: '#ff6b00', glow: 'rgba(255, 107, 0, 0.25)' },
    { label: '네온 일렉트릭', hex: '#ff5100', glow: 'rgba(255, 81, 0, 0.3)' },
    { label: '골든 선셋', hex: '#f59e0b', glow: 'rgba(245, 158, 11, 0.25)' },
    { label: '딥 버밀리온', hex: '#ea580c', glow: 'rgba(234, 88, 12, 0.25)' },
    { label: '루비 앰버', hex: '#e11d48', glow: 'rgba(225, 29, 72, 0.25)' },
  ];

  // Preset images for posts
  const imagePresets = [
    { label: '수학 시험지/노트', url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80' },
    { label: '열공 학생들', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80' },
    { label: '국제학교/칠판', url: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80' },
    { label: '고난도 기하학', url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80' },
    { label: '도서관/자료', url: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=1200&q=80' },
  ];

  const exportBookingsToCSV = () => {
    const headers = ['예약번호', '학생명', '학년', '희망과정', '학부모명', '연락처', '희망일시', '상태', '고민사항', '관리자메모'];
    const rows = bookings.map((b) => [
      b.id,
      b.studentName,
      b.grade,
      `"${b.targetTrack}"`,
      b.parentName,
      b.phone,
      `"${b.preferredDate} ${b.preferredTime}"`,
      b.status,
      `"${(b.mathConcern || '').replace(/"/g, '""')}"`,
      `"${(b.adminNote || '').replace(/"/g, '""')}"`,
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `그레이드원_대치10관_상담예약목록_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    triggerToast('CSV 파일이 다운로드되었습니다.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f0f17] border border-[#27273c] w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl flex flex-col h-[90vh]">
        {/* Top Header */}
        <div className="px-6 py-4 border-b border-[#202030] flex items-center justify-between bg-[#131320]">
          <div className="flex items-center gap-3">
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center text-black font-extrabold text-xs"
              style={{ backgroundColor: theme.primaryColor }}
            >
              CMS
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white">
                대치10관 관리자 & 디자인 커스터마이저
              </h3>
              <p className="text-[11px] text-zinc-400">
                게시글 작성관리, 텍스트/테마 색상/폰트 커스터마이징, 상담 예약 CRM, SEO 도구
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {showSavedToast && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-semibold animate-pulse">
                <Check className="w-3.5 h-3.5" />
                {toastMessage}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#202030] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center px-6 bg-[#11111a] border-b border-[#1f1f2e] gap-2 overflow-x-auto scrollbar-none">
          <button
            onClick={() => { setActiveTab('theme'); setIsCreatingPost(false); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'theme'
                ? 'border-orange-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Palette className="w-4 h-4 text-orange-400" />
            <span>테마 & 디자인 커스터마이징</span>
          </button>

          <button
            onClick={() => setActiveTab('posts')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'posts'
                ? 'border-orange-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <FileEdit className="w-4 h-4 text-orange-400" />
            <span>게시글 작성 & 관리 (CMS)</span>
            <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-[#222234] text-zinc-300">
              {posts.length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('bookings'); setIsCreatingPost(false); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'bookings'
                ? 'border-orange-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Users className="w-4 h-4 text-orange-400" />
            <span>상담 예약 관리 (CRM)</span>
            <span 
              className="px-1.5 py-0.2 rounded-full text-[10px] font-bold text-black"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {bookings.filter((b) => b.status === '접수대기').length}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('seo'); setIsCreatingPost(false); }}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'seo'
                ? 'border-orange-500 text-white'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Search className="w-4 h-4 text-orange-400" />
            <span>SEO 검색 최적화 & 미리보기</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* TAB 1: THEME & DESIGN */}
          {activeTab === 'theme' && (
            <div className="max-w-3xl space-y-8 animate-fadeIn">
              {/* Color Customizer */}
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Palette className="w-4 h-4 text-orange-400" />
                  포인트 컬러 (Accent Color) 설정
                </h4>
                <p className="text-xs text-zinc-400 mb-4">
                  로고, 버튼, 뱃지, 하이라이트 텍스트 등에 실시간 적용되는 시그니처 색상입니다.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                  {colorPresets.map((c) => (
                    <button
                      key={c.hex}
                      onClick={() => setLocalTheme({ ...localTheme, primaryColor: c.hex, accentGlow: c.glow })}
                      className={`p-3 rounded-xl border text-left flex flex-col justify-between h-20 transition-all cursor-pointer ${
                        localTheme.primaryColor === c.hex
                          ? 'border-white bg-[#1e1e2d] shadow-md'
                          : 'border-[#29293e] bg-[#171724] hover:bg-[#1c1c2a]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span 
                          className="w-5 h-5 rounded-full"
                          style={{ backgroundColor: c.hex }}
                        />
                        {localTheme.primaryColor === c.hex && <Check className="w-3.5 h-3.5 text-white" />}
                      </div>
                      <span className="text-[11px] font-semibold text-zinc-200">{c.label}</span>
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <span className="text-xs text-zinc-400">커스텀 색상 (HEX):</span>
                  <input
                    type="color"
                    value={localTheme.primaryColor}
                    onChange={(e) => setLocalTheme({ 
                      ...localTheme, 
                      primaryColor: e.target.value,
                      accentGlow: `${e.target.value}40`
                    })}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={localTheme.primaryColor}
                    onChange={(e) => setLocalTheme({ 
                      ...localTheme, 
                      primaryColor: e.target.value,
                      accentGlow: `${e.target.value}40`
                    })}
                    className="px-3 py-1.5 bg-[#1a1a28] border border-[#2d2d42] rounded-lg text-xs font-mono text-white w-28 uppercase"
                  />
                </div>
              </div>

              {/* Background Tone */}
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-orange-400" />
                  배경 다크 테마 농도
                </h4>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'pure-black', name: '딥 퓨어 블랙', desc: '#07070a 깊은 블랙' },
                    { id: 'deep-charcoal', name: '차콜 나이트', desc: '#101016 중후한 차콜' },
                    { id: 'midnight-navy', name: '미드나이트 옵시디언', desc: '#0a0e17 푸른빛 블랙' },
                  ].map((bg) => (
                    <button
                      key={bg.id}
                      onClick={() => setLocalTheme({ ...localTheme, bgTone: bg.id as any })}
                      className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                        localTheme.bgTone === bg.id
                          ? 'border-orange-500 bg-[#1d1d2c]'
                          : 'border-[#262638] bg-[#161622] hover:bg-[#1a1a28]'
                      }`}
                    >
                      <strong className="text-xs text-white block mb-0.5">{bg.name}</strong>
                      <span className="text-[10px] text-zinc-400">{bg.desc}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Academy Text Content */}
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white mb-2">학원 주요 문구 & 정보 실시간 편집</h4>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">학원명</label>
                  <input
                    type="text"
                    value={localTheme.academyName}
                    onChange={(e) => setLocalTheme({ ...localTheme, academyName: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">학원 부제 / 슬로건</label>
                  <input
                    type="text"
                    value={localTheme.subTitle}
                    onChange={(e) => setLocalTheme({ ...localTheme, subTitle: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">메인 헤드라인</label>
                  <input
                    type="text"
                    value={localTheme.heroHeadline}
                    onChange={(e) => setLocalTheme({ ...localTheme, heroHeadline: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">서브 헤드라인</label>
                  <textarea
                    rows={2}
                    value={localTheme.heroSubheadline}
                    onChange={(e) => setLocalTheme({ ...localTheme, heroSubheadline: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">상담 직통 전화번호</label>
                    <input
                      type="text"
                      value={localTheme.phone}
                      onChange={(e) => setLocalTheme({ ...localTheme, phone: e.target.value })}
                      className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white font-mono focus:outline-none focus:border-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">학원 주소</label>
                    <input
                      type="text"
                      value={localTheme.address}
                      onChange={(e) => setLocalTheme({ ...localTheme, address: e.target.value })}
                      className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-zinc-300">상단 긴급 띠배너 공지</label>
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-400">
                      <input
                        type="checkbox"
                        checked={localTheme.showNotificationBanner}
                        onChange={(e) => setLocalTheme({ ...localTheme, showNotificationBanner: e.target.checked })}
                        className="rounded"
                      />
                      <span>배너 활성화</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    value={localTheme.notificationBanner}
                    onChange={(e) => setLocalTheme({ ...localTheme, notificationBanner: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={handleResetTheme}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-zinc-400 hover:text-white bg-[#171722] border border-[#252538] flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>기본값으로 초기화</span>
                </button>

                <button
                  type="button"
                  onClick={handleSaveTheme}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 transition-all hover:brightness-110 cursor-pointer shadow-lg"
                  style={{ backgroundColor: localTheme.primaryColor }}
                >
                  <Save className="w-4 h-4" />
                  <span>테마 설정 저장 및 적용</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: POSTS & CMS */}
          {activeTab === 'posts' && (
            <div className="space-y-6 animate-fadeIn">
              {isCreatingPost ? (
                /* Post Write/Edit Form */
                <form onSubmit={handleSavePostForm} className="bg-[#141420] border border-[#242436] rounded-2xl p-6 space-y-4 max-w-3xl">
                  <div className="flex items-center justify-between pb-3 border-b border-[#202030]">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <FileEdit className="w-4 h-4 text-orange-400" />
                      {currentPostId ? '게시글 수정하기' : '새 게시글 작성하기'}
                    </h4>
                    <button
                      type="button"
                      onClick={() => setIsCreatingPost(false)}
                      className="text-xs text-zinc-400 hover:text-white"
                    >
                      목록으로 돌아가기
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        게시글 제목 <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        placeholder="제목을 입력하세요..."
                        className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">카테고리</label>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value as PostCategory)}
                        className="w-full px-3 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        <option value="공지사항">공지사항</option>
                        <option value="입시/합격소식">입시/합격소식</option>
                        <option value="국제학교">국제학교</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      한 줄 요약 (리스트에 노출)
                    </label>
                    <input
                      type="text"
                      value={postSummary}
                      onChange={(e) => setPostSummary(e.target.value)}
                      placeholder="게시글 핵심 요약을 작성해 주세요..."
                      className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      본문 내용 (줄바꿈 및 섹션 지원)
                    </label>
                    <textarea
                      rows={8}
                      required
                      value={postContent}
                      onChange={(e) => setPostContent(e.target.value)}
                      placeholder="상세 내용을 작성하세요..."
                      className="w-full px-4 py-2.5 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 font-mono"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">작성자 명</label>
                      <input
                        type="text"
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1">
                        태그 (쉼표로 구분)
                      </label>
                      <input
                        type="text"
                        value={postTags}
                        onChange={(e) => setPostTags(e.target.value)}
                        placeholder="예: 내신대비, 휘문고, 1등급, 킬러문항"
                        className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  {/* Image Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1">
                      대표 썸네일 이미지 URL
                    </label>
                    <input
                      type="url"
                      value={postImageUrl}
                      onChange={(e) => setPostImageUrl(e.target.value)}
                      placeholder="https://images.unsplash.com/..."
                      className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500 mb-2"
                    />
                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[11px] text-zinc-400 self-center mr-1">추천 이미지:</span>
                      {imagePresets.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => setPostImageUrl(img.url)}
                          className="px-2 py-1 rounded bg-[#1f1f2e] text-[10px] text-zinc-300 hover:text-white border border-[#2d2d42] cursor-pointer"
                        >
                          {img.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Options checkbox */}
                  <div className="flex items-center gap-6 pt-2">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={postIsPinned}
                        onChange={(e) => setPostIsPinned(e.target.checked)}
                        className="rounded"
                      />
                      <span>상단 필독 공지로 고정</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer text-xs text-zinc-300">
                      <input
                        type="checkbox"
                        checked={postIsPublished}
                        onChange={(e) => setPostIsPublished(e.target.checked)}
                        className="rounded"
                      />
                      <span>즉시 공개(발행)</span>
                    </label>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t border-[#202030]">
                    <button
                      type="button"
                      onClick={() => setIsCreatingPost(false)}
                      className="px-4 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white bg-[#171722] cursor-pointer"
                    >
                      취소
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      {currentPostId ? '수정 내용 저장' : '새 글 발행하기'}
                    </button>
                  </div>
                </form>
              ) : (
                /* Post List View */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-zinc-400">
                      총 <strong className="text-white">{posts.length}</strong>개의 게시글이 등록되어 있습니다.
                    </span>
                    <button
                      onClick={handleStartNewPost}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>새 게시글 작성</span>
                    </button>
                  </div>

                  <div className="bg-[#12121a] border border-[#222232] rounded-2xl overflow-hidden divide-y divide-[#1e1e2d]">
                    {posts.map((p) => (
                      <div
                        key={p.id}
                        className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-[#161622] transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1.5">
                            <span 
                              className="text-[10px] font-bold px-2 py-0.5 rounded text-black"
                              style={{ backgroundColor: theme.primaryColor }}
                            >
                              {p.category}
                            </span>
                            {p.isPinned && (
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white flex items-center gap-1">
                                <Pin className="w-2.5 h-2.5" /> 필독
                              </span>
                            )}
                            <span className="text-[11px] text-zinc-400">{p.date}</span>
                            <span className="text-[11px] text-zinc-400">조회 {p.views}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white mb-1">{p.title}</h4>
                          <p className="text-xs text-zinc-400 line-clamp-1">{p.summary}</p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            onClick={() => handleEditPostInForm(p)}
                            className="p-2 rounded-xl bg-[#1c1c2a] text-zinc-300 hover:text-white hover:bg-[#252538] border border-[#2b2b3e] text-xs font-medium flex items-center gap-1 cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5 text-orange-400" />
                            <span>수정</span>
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`'${p.title}' 게시글을 삭제하시겠습니까?`)) {
                                onDeletePost(p.id);
                                triggerToast('게시글이 삭제되었습니다.');
                              }
                            }}
                            className="p-2 rounded-xl bg-[#1c1c2a] text-zinc-400 hover:text-red-400 hover:bg-[#252538] border border-[#2b2b3e] text-xs cursor-pointer"
                            title="삭제"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BOOKINGS CRM */}
          {activeTab === 'bookings' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h4 className="text-sm font-bold text-white">학부모 및 학생 상담예약 접수 목록</h4>
                  <p className="text-xs text-zinc-400">
                    웹사이트에서 신청된 실시간 1:1 방문 상담 명단입니다.
                  </p>
                </div>

                <button
                  onClick={exportBookingsToCSV}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-[#1a1a28] hover:bg-[#242438] border border-[#2e2e44] transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-orange-400" />
                  <span>엑셀(CSV) 다운로드</span>
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-12 bg-[#12121a] rounded-2xl border border-[#222232]">
                  <p className="text-xs text-zinc-400">접수된 상담 내역이 없습니다.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-[#13131e] border border-[#232334] rounded-2xl p-5 hover:border-orange-500/30 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3 pb-3 border-b border-[#1f1f2e]">
                        <div className="flex items-center gap-3">
                          <span 
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              booking.status === '접수대기'
                                ? 'bg-orange-500 text-black'
                                : booking.status === '상담확정'
                                ? 'bg-blue-500 text-white'
                                : booking.status === '상담완료'
                                ? 'bg-green-600 text-white'
                                : 'bg-zinc-700 text-zinc-300'
                            }`}
                          >
                            {booking.status}
                          </span>
                          <span className="text-xs font-mono text-zinc-400">
                            ID: {booking.id}
                          </span>
                          <span className="text-xs text-zinc-500 font-mono">
                            접수: {booking.createdAt}
                          </span>
                        </div>

                        {/* Status Change Buttons */}
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, '접수대기')}
                            className={`px-2 py-1 rounded text-[10px] font-medium border cursor-pointer ${
                              booking.status === '접수대기'
                                ? 'border-orange-500 text-orange-400'
                                : 'border-[#262638] text-zinc-400 hover:text-white'
                            }`}
                          >
                            접수대기
                          </button>
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, '상담확정')}
                            className={`px-2 py-1 rounded text-[10px] font-medium border cursor-pointer ${
                              booking.status === '상담확정'
                                ? 'border-blue-500 text-blue-400'
                                : 'border-[#262638] text-zinc-400 hover:text-white'
                            }`}
                          >
                            상담확정
                          </button>
                          <button
                            onClick={() => onUpdateBookingStatus(booking.id, '상담완료')}
                            className={`px-2 py-1 rounded text-[10px] font-medium border cursor-pointer ${
                              booking.status === '상담완료'
                                ? 'border-green-500 text-green-400'
                                : 'border-[#262638] text-zinc-400 hover:text-white'
                            }`}
                          >
                            상담완료
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs mb-3">
                        <div>
                          <span className="text-zinc-500 block mb-0.5">학생 정보</span>
                          <span className="text-white font-bold">{booking.studentName}</span>{' '}
                          <span className="text-zinc-400">({booking.grade})</span>
                          {booking.currentLevel && (
                            <p className="text-zinc-400 mt-1">{booking.currentLevel}</p>
                          )}
                        </div>

                        <div>
                          <span className="text-zinc-500 block mb-0.5">학부모 및 연락처</span>
                          <span className="text-white font-bold">{booking.parentName}</span>{' '}
                          <a href={`tel:${booking.phone.replace(/[^0-9]/g, '')}`} className="text-orange-400 underline font-mono ml-1">
                            {booking.phone}
                          </a>
                        </div>

                        <div>
                          <span className="text-zinc-500 block mb-0.5">희망 일정 & 과정</span>
                          <span className="text-white font-semibold">
                            {booking.preferredDate} {booking.preferredTime}
                          </span>
                          <span className="text-orange-300 block text-[11px] mt-0.5">
                            {booking.targetTrack}
                          </span>
                        </div>
                      </div>

                      {booking.mathConcern && (
                        <div className="bg-[#171724] p-3 rounded-xl border border-[#242436] text-xs text-zinc-300 mb-2">
                          <strong className="text-zinc-400 mr-2">학생 취약점 및 고민:</strong>
                          {booking.mathConcern}
                        </div>
                      )}

                      {/* Admin Note Input */}
                      <div className="flex items-center gap-2 pt-2 border-t border-[#1e1e2c]">
                        <input
                          type="text"
                          defaultValue={booking.adminNote || ''}
                          placeholder="원장 메모 입력 후 엔터 (예: 전화 통화 완료, 3월 8일 테스트 배정)"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              onUpdateBookingStatus(booking.id, booking.status, (e.target as HTMLInputElement).value);
                              triggerToast('메모가 저장되었습니다.');
                            }
                          }}
                          className="flex-1 px-3 py-1.5 bg-[#191926] border border-[#29293e] rounded-lg text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-orange-500"
                        />
                        <span className="text-[10px] text-zinc-500 shrink-0">엔터로 저장</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: SEO TOOLS & PREVIEW */}
          {activeTab === 'seo' && (
            <div className="max-w-3xl space-y-8 animate-fadeIn">
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6 space-y-4">
                <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-orange-400" />
                  검색엔진 최적화 (SEO) 메타데이터 편집
                </h4>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    페이지 메타 타이틀 (Title Tag)
                  </label>
                  <input
                    type="text"
                    value={localSeo.metaTitle}
                    onChange={(e) => setLocalSeo({ ...localSeo, metaTitle: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[10px] text-zinc-400">추천 길이: 45~65자 (현재: {localSeo.metaTitle.length}자)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    메타 설명문 (Meta Description)
                  </label>
                  <textarea
                    rows={3}
                    value={localSeo.metaDescription}
                    onChange={(e) => setLocalSeo({ ...localSeo, metaDescription: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                  <span className="text-[10px] text-zinc-400">추천 길이: 80~150자 (현재: {localSeo.metaDescription.length}자)</span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-300 mb-1">
                    검색 키워드 (Keywords)
                  </label>
                  <input
                    type="text"
                    value={localSeo.metaKeywords}
                    onChange={(e) => setLocalSeo({ ...localSeo, metaKeywords: e.target.value })}
                    className="w-full px-4 py-2 bg-[#191926] border border-[#29293e] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    onClick={handleSaveSeo}
                    className="px-6 py-2.5 rounded-xl text-xs font-bold text-black cursor-pointer shadow-md"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    SEO 설정 저장
                  </button>
                </div>
              </div>

              {/* Live SERP Preview */}
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-1">
                  네이버 / 구글 검색결과 노출 미리보기 (SERP Snippet)
                </h4>
                <p className="text-xs text-zinc-400 mb-4">
                  학부모님이 포털에서 '대치동 수학학원' 또는 '그레이드원 대치10관' 검색 시 표시되는 형태입니다.
                </p>

                <div className="bg-[#1e1e2c] border border-[#2d2d42] rounded-xl p-4 space-y-1">
                  <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded-full bg-orange-500 flex items-center justify-center text-[8px] text-black font-bold">G1</span>
                    <span>gradeone-daechi10.edu › daechi-branch</span>
                  </div>
                  <h5 className="text-sm text-[#8ab4f8] hover:underline cursor-pointer font-medium">
                    {localSeo.metaTitle}
                  </h5>
                  <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                    {localSeo.metaDescription}
                  </p>
                </div>
              </div>

              {/* KakaoTalk / Social Share OpenGraph Preview */}
              <div className="bg-[#141420] border border-[#242436] rounded-2xl p-6">
                <h4 className="text-sm font-bold text-white mb-1">
                  카카오톡 및 SNS 링크 공유 미리보기 (OpenGraph Card)
                </h4>
                <p className="text-xs text-zinc-400 mb-4">
                  학부모 단톡방이나 지인에게 학원 링크를 보낼 때 표시되는 카드입니다.
                </p>

                <div className="max-w-sm bg-[#171724] border border-[#29293e] rounded-2xl overflow-hidden shadow-lg">
                  <div className="h-40 bg-zinc-800 relative flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80"
                      alt="Thumbnail"
                      className="w-full h-full object-cover filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-black text-black"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        그레이드원 대치10관
                      </span>
                    </div>
                  </div>
                  <div className="p-4 space-y-1">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider">
                      GRADE ONE MATH ACADEMY
                    </span>
                    <h6 className="text-xs font-bold text-white leading-snug line-clamp-2">
                      {localSeo.metaTitle}
                    </h6>
                    <p className="text-[11px] text-zinc-400 line-clamp-2">
                      {localSeo.metaDescription}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
