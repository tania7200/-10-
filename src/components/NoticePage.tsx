/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Calendar,
  Eye,
  User,
  Share2,
  Check,
  FileText,
  ShieldCheck,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Printer,
  Search,
  Tag,
  ChevronRight,
  Pin,
  ExternalLink,
  MessageSquare,
  PhoneCall,
  Home,
  BookOpen,
  Filter,
} from 'lucide-react';
import { Post, PostCategory, ThemeSettings, TargetTrack } from '../types';

interface NoticePageProps {
  posts: Post[];
  selectedPostId: string | null;
  theme: ThemeSettings;
  onSelectPost: (postId: string) => void;
  onBackToHome: () => void;
  onOpenBooking: (track?: TargetTrack) => void;
  onOpenCallModal: () => void;
}

export const NoticePage: React.FC<NoticePageProps> = ({
  posts,
  selectedPostId,
  theme,
  onSelectPost,
  onBackToHome,
  onOpenBooking,
  onOpenCallModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  // Scroll to top on page load or post change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedPostId]);

  const categories: (string | PostCategory)[] = ['전체', '공지사항', '입시/합격소식', '국제학교'];

  const currentPost = selectedPostId ? posts.find((p) => p.id === selectedPostId) : null;

  const filteredPosts = posts.filter((post) => {
    if (!post.isPublished) return false;
    const matchesCategory = selectedCategory === '전체' || post.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesQuery =
      query === '' ||
      post.title.toLowerCase().includes(query) ||
      post.summary.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query));
    return matchesCategory && matchesQuery;
  });

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find next and previous posts
  const currentIndex = currentPost ? posts.findIndex((p) => p.id === currentPost.id) : -1;
  const prevPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#07070a] text-zinc-100 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Navigation Breadcrumbs & Back Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#1c1c2b]">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-400">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer group"
            >
              <Home className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
              <span>홈</span>
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <button
              onClick={() => onSelectPost('')}
              className={`hover:text-white transition-colors cursor-pointer ${
                !currentPost ? 'text-white font-bold' : ''
              }`}
            >
              공지사항 & 자료실 전용 페이지
            </button>
            {currentPost && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-zinc-200 font-semibold truncate max-w-[200px] sm:max-w-md">
                  {currentPost.title}
                </span>
              </>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onBackToHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141420] hover:bg-[#1f1f30] border border-[#27273c] text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer shadow"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-orange-400" />
              <span>메인 홈으로 이동</span>
            </button>

            {currentPost && (
              <button
                onClick={() => onSelectPost('')}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141420] hover:bg-[#1f1f30] border border-[#27273c] text-xs font-semibold text-zinc-300 hover:text-white transition-all cursor-pointer shadow"
              >
                <BookOpen className="w-3.5 h-3.5 text-orange-400" />
                <span>공지 목록 보기</span>
              </button>
            )}
          </div>
        </div>

        {/* VIEW 1: SINGLE NOTICE FULL PAGE */}
        {currentPost ? (
          <article className="space-y-8 animate-fadeIn">
            {/* Header Area */}
            <div className="bg-[#0f0f17] border border-[#242436] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: theme.primaryColor }}
              />

              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-extrabold px-3 py-1 rounded-full text-black uppercase tracking-wider"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {currentPost.category}
                  </span>
                  {currentPost.isPinned && (
                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded bg-red-600/90 text-white">
                      <Pin className="w-3 h-3" /> 필독 공지
                    </span>
                  )}
                  {currentPost.attachmentImage && (
                    <span className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded bg-orange-500/15 text-orange-400 border border-orange-500/30">
                      <FileText className="w-3 h-3" /> 공식 교습비 게시표 첨부
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#191926] hover:bg-[#252538] border border-[#2b2b3e] text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="인쇄하기"
                  >
                    <Printer className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="hidden sm:inline">인쇄</span>
                  </button>

                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#191926] hover:bg-[#252538] border border-[#2b2b3e] text-xs font-medium text-zinc-300 hover:text-white transition-colors cursor-pointer"
                    title="링크 복사"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-green-400" />
                        <span className="text-green-400 font-bold">복사완료</span>
                      </>
                    ) : (
                      <>
                        <Share2 className="w-3.5 h-3.5 text-zinc-400" />
                        <span className="hidden sm:inline">공유</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug mb-6">
                {currentPost.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-400 pt-4 border-t border-[#1e1e2d]">
                <span className="flex items-center gap-1.5 font-medium text-zinc-300">
                  <User className="w-4 h-4 text-orange-400" />
                  작성자: {currentPost.author}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  등록일: {currentPost.date}
                </span>
                <span className="flex items-center gap-1.5 font-mono">
                  <Eye className="w-4 h-4 text-orange-400" />
                  조회수: {currentPost.views}회
                </span>
              </div>
            </div>

            {/* Post Image (if present) */}
            {currentPost.imageUrl && (
              <div className="w-full max-h-[460px] rounded-3xl overflow-hidden border border-[#222234] shadow-xl relative bg-black/40">
                <img
                  src={currentPost.imageUrl}
                  alt={currentPost.title}
                  className="w-full h-full object-cover max-h-[460px]"
                />
              </div>
            )}

            {/* Summary Highlights Callout */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#171725] to-[#12121c] border-l-4 border-orange-500 shadow-md">
              <p className="text-sm sm:text-base text-zinc-200 font-medium leading-relaxed">
                "{currentPost.summary}"
              </p>
            </div>

            {/* Main Content Body */}
            <div className="bg-[#0f0f17] border border-[#222234] rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
              <div className="text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line font-normal space-y-4">
                {currentPost.content}
              </div>

              {/* Tags */}
              {currentPost.tags.length > 0 && (
                <div className="pt-6 border-t border-[#1f1f2e] flex flex-wrap items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-400" />
                  {currentPost.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs text-zinc-300 bg-[#161624] px-3 py-1 rounded-xl border border-[#27273c]"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* OFFICIAL ATTACHMENT SECTION: 교습비등 게시표 */}
            {currentPost.attachmentImage && (
              <div className="bg-[#11111c] border-2 border-orange-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#242436]">
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-2xl bg-orange-500/20 text-orange-400 shrink-0">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                          공식 법정 공시 첨부 문서
                        </span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                          강남서초교육지원청 등록 제12125호
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
                        {currentPost.attachmentTitle || '[별지 제18호서식] 교습비등 게시표 원본'}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        「학원의 설립·운영 및 과외교습에 관한 법률」 제15조 제3항 및 동법 시행규칙 제14조에 따른 정식 공시 문서입니다.
                      </p>
                    </div>
                  </div>

                  {/* Zoom & Full View Controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.max(prev - 0.2, 0.8))}
                      className="p-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-zinc-300 border border-[#2b2b40] cursor-pointer"
                      title="축소"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomScale(1)}
                      className="px-2.5 py-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-xs font-mono text-zinc-300 border border-[#2b2b40] cursor-pointer"
                      title="100% 원본 비율"
                    >
                      {Math.round(zoomScale * 100)}%
                    </button>
                    <button
                      type="button"
                      onClick={() => setZoomScale((prev) => Math.min(prev + 0.2, 2.5))}
                      className="p-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-zinc-300 border border-[#2b2b40] cursor-pointer"
                      title="확대"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsLightboxOpen(true)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-black cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>전체화면 확대</span>
                    </button>
                  </div>
                </div>

                {/* High Resolution Document Display */}
                <div
                  onClick={() => setIsLightboxOpen(true)}
                  className="relative rounded-2xl overflow-hidden border border-[#26263a] bg-black/80 cursor-pointer group shadow-inner transition-all hover:border-orange-500"
                  title="클릭하여 고화질 원본으로 확대보기"
                >
                  <div className="p-4 sm:p-8 flex items-center justify-center min-h-[380px] sm:min-h-[500px] overflow-auto">
                    <img
                      src={currentPost.attachmentImage}
                      alt={currentPost.attachmentTitle || '교습비등 게시표 원본'}
                      style={{ transform: `scale(${zoomScale})`, transformOrigin: 'center center' }}
                      className="max-h-[600px] w-auto max-w-full object-contain mx-auto transition-transform duration-200"
                    />
                  </div>

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors pointer-events-none flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity px-4 py-2 rounded-xl bg-black/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-2xl">
                      <ZoomIn className="w-4 h-4 text-orange-400" />
                      <span>클릭하여 고화질 원본 확대보기</span>
                    </div>
                  </div>
                </div>

                {/* Legal & Transparent Tuition Disclosure Table Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-zinc-300 bg-[#0e0e16] p-5 rounded-2xl border border-[#202030]">
                  <div className="space-y-2">
                    <h5 className="font-bold text-white flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-orange-400" />
                      학원 정식 등록 및 기본 공시 사항
                    </h5>
                    <ul className="space-y-1 text-zinc-400">
                      <li>• 학원명: 그레이드원대치10관수학학원</li>
                      <li>• 등록번호: 강남서초교육지원청 등록 제12125호</li>
                      <li>• 위치: 서울특별시 강남구 도곡로 184 (도곡동) 4층</li>
                      <li>• 대표자/원장: 이선규 원장</li>
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-bold text-white flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-orange-400" />
                      수강료 할인 혜택 및 반환 기준 안내
                    </h5>
                    <ul className="space-y-1 text-zinc-400">
                      <li>• <strong>형제/자매 할인</strong>: 2인 이상 동시 수강 시 수강료 5% 감면 혜택</li>
                      <li>• <strong>교습비 반환 규정</strong>: 「학원의 설립·운영 및 과외교습에 관한 법률」 제18조(교습비등의 반환 등)에 의거하여 수업 개시 전 전액 환불, 개시 후 경과 일수에 따른 정산 환불을 철저히 준수합니다.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Consultation Booking & Phone Action Banner */}
            <div className="bg-gradient-to-r from-[#171725] via-[#1b1b2d] to-[#141420] border border-orange-500/40 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  Consultation & Registration
                </span>
                <h4 className="text-lg sm:text-2xl font-black text-white mt-1">
                  대치10관 수강 문의 및 개별 맞춤 클리닉 예약
                </h4>
                <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-xl">
                  자녀의 현재 성적과 취약점을 분석하여 원장단이 직접 1:1 학습 로드맵을 설계해 드립니다.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <button
                  type="button"
                  onClick={onOpenCallModal}
                  className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-[#161624] hover:bg-[#202034] text-zinc-200 border border-[#2e2e44] text-xs font-bold transition-all cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-orange-400" />
                  <span>전화문의 02-573-3133</span>
                </button>

                <button
                  type="button"
                  onClick={() => onOpenBooking('대치동 1:1 개별맞춤 클리닉')}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs font-black text-black cursor-pointer shadow-lg hover:brightness-110 active:scale-95 transition-all"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>1:1 상담 신청하기</span>
                </button>
              </div>
            </div>

            {/* Prev & Next Notice Controls */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {prevPost ? (
                <button
                  onClick={() => onSelectPost(prevPost.id)}
                  className="p-4 rounded-2xl bg-[#0f0f17] hover:bg-[#151522] border border-[#202030] text-left transition-all cursor-pointer group flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      이전 글
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-orange-400 transition-colors line-clamp-1 mt-0.5">
                      {prevPost.title}
                    </h5>
                  </div>
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-transform group-hover:translate-x-1 rotate-180" />
                </button>
              ) : (
                <div />
              )}

              {nextPost && (
                <button
                  onClick={() => onSelectPost(nextPost.id)}
                  className="p-4 rounded-2xl bg-[#0f0f17] hover:bg-[#151522] border border-[#202030] text-right transition-all cursor-pointer group flex items-center justify-between"
                >
                  <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-orange-400 transition-transform group-hover:translate-x-1" />
                  <div>
                    <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">
                      다음 글
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-zinc-200 group-hover:text-orange-400 transition-colors line-clamp-1 mt-0.5">
                      {nextPost.title}
                    </h5>
                  </div>
                </button>
              )}
            </div>

            {/* Back to List Button */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => onSelectPost('')}
                className="px-8 py-3 rounded-2xl bg-[#141420] hover:bg-[#1e1e2d] border border-[#28283c] text-xs font-bold text-zinc-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-orange-400" />
                <span>공지사항 전체 목록으로 돌아가기</span>
              </button>
            </div>
          </article>
        ) : (
          /* VIEW 2: NOTICE BOARD LIST FULL PAGE */
          <div className="space-y-8 animate-fadeIn">
            {/* Page Title & Subtitle */}
            <div className="bg-[#0f0f17] border border-[#242436] rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <div 
                className="absolute top-0 left-0 right-0 h-1.5"
                style={{ backgroundColor: theme.primaryColor }}
              />
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold text-orange-400 tracking-wider uppercase">
                  Official Notice & Information Board
                </span>
                <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight mt-2">
                  대치10관 <span style={{ color: theme.primaryColor }}>공지사항 & 자료실</span>
                </h1>
                <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed">
                  2026학년도 내신대비반 일정, 공식 교습비등 게시표 공시, 강남8학군 기출 분석 및 영재·자사고 합격 소식을 확인하실 수 있는 전용 게시판입니다.
                </p>
              </div>
            </div>

            {/* Filter & Search Toolbar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#111119] p-3 rounded-2xl border border-[#222232]">
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'text-black font-extrabold shadow-md'
                        : 'text-zinc-400 hover:text-white bg-[#171722] hover:bg-[#20202e]'
                    }`}
                    style={selectedCategory === cat ? { backgroundColor: theme.primaryColor } : {}}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Box */}
              <div className="relative min-w-[260px]">
                <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="제목, 본문, 태그 검색..."
                  className="w-full pl-9 pr-4 py-2 bg-[#171724] border border-[#26263a] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
                />
              </div>
            </div>

            {/* Table / List of Notices */}
            <div className="bg-[#0f0f17] border border-[#222234] rounded-3xl overflow-hidden shadow-2xl divide-y divide-[#1e1e2d]">
              {/* Header Row */}
              <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3.5 bg-[#141422] text-xs font-bold text-zinc-400">
                <div className="col-span-1 text-center">번호</div>
                <div className="col-span-2 text-center">구분</div>
                <div className="col-span-6">제목</div>
                <div className="col-span-2 text-center">작성일</div>
                <div className="col-span-1 text-center">조회</div>
              </div>

              {filteredPosts.length === 0 ? (
                <div className="text-center py-20 px-4">
                  <p className="text-sm text-zinc-400 mb-3">검색 조건에 일치하는 공지사항이 없습니다.</p>
                  <button
                    onClick={() => { setSelectedCategory('전체'); setSearchQuery(''); }}
                    className="text-xs text-orange-400 underline font-semibold"
                  >
                    전체 공지사항 보기
                  </button>
                </div>
              ) : (
                filteredPosts.map((post, idx) => (
                  <div
                    key={post.id}
                    onClick={() => onSelectPost(post.id)}
                    className="px-5 py-4 sm:px-6 sm:py-5 hover:bg-[#161624] transition-colors cursor-pointer group flex flex-col sm:grid sm:grid-cols-12 gap-3 sm:gap-4 items-start sm:items-center"
                  >
                    {/* Index / Pinned */}
                    <div className="hidden sm:block col-span-1 text-center text-xs font-mono text-zinc-500">
                      {post.isPinned ? (
                        <span className="inline-block p-1 rounded-full bg-red-600/20 text-red-400">
                          <Pin className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        filteredPosts.length - idx
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="col-span-2 flex items-center sm:justify-center gap-1.5">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded text-black uppercase"
                        style={{ backgroundColor: theme.primaryColor }}
                      >
                        {post.category}
                      </span>
                      {post.isPinned && (
                        <span className="sm:hidden text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-600 text-white">
                          필독
                        </span>
                      )}
                    </div>

                    {/* Title & Preview */}
                    <div className="col-span-6 w-full">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
                          {post.title}
                        </h4>
                        {post.attachmentImage && (
                          <span className="shrink-0 p-1 rounded bg-orange-500/10 text-orange-400 border border-orange-500/30 text-[10px] flex items-center gap-0.5">
                            <FileText className="w-3 h-3" /> 게시표
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-1 group-hover:text-zinc-300">
                        {post.summary}
                      </p>
                    </div>

                    {/* Date */}
                    <div className="col-span-2 text-left sm:text-center text-xs text-zinc-400 font-mono">
                      {post.date}
                    </div>

                    {/* Views */}
                    <div className="col-span-1 text-left sm:text-center text-xs text-zinc-400 font-mono">
                      <span className="sm:hidden text-zinc-500">조회: </span>
                      {post.views}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* Fullscreen Lightbox Modal for Attachment */}
      {isLightboxOpen && currentPost?.attachmentImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col animate-fadeIn">
          {/* Lightbox Header */}
          <div className="p-4 sm:p-6 bg-[#0c0c14] border-b border-[#222234] flex items-center justify-between">
            <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-5 h-5 text-orange-400" />
              <span className="text-sm font-bold truncate max-w-sm sm:max-w-xl">
                {currentPost.attachmentTitle || '교습비등 게시표 고화질 원본'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.max(prev - 0.25, 0.5))}
                className="p-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-white border border-[#2b2b40] cursor-pointer"
                title="축소"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomScale(1)}
                className="px-3 py-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-xs font-mono text-white border border-[#2b2b40] cursor-pointer"
              >
                {Math.round(zoomScale * 100)}%
              </button>
              <button
                type="button"
                onClick={() => setZoomScale((prev) => Math.min(prev + 0.25, 3))}
                className="p-2 rounded-xl bg-[#1b1b2a] hover:bg-[#252538] text-white border border-[#2b2b40] cursor-pointer"
                title="확대"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 rounded-xl bg-orange-500 text-black hover:bg-orange-400 font-bold cursor-pointer ml-2"
                title="닫기"
              >
                닫기 ✕
              </button>
            </div>
          </div>

          {/* Lightbox Image Viewport */}
          <div className="flex-1 overflow-auto p-4 sm:p-8 flex items-center justify-center">
            <img
              src={currentPost.attachmentImage}
              alt="교습비등 게시표 원본"
              style={{
                transform: `scale(${zoomScale})`,
                transformOrigin: 'center center',
                transition: 'transform 0.15s ease-out',
              }}
              className="max-h-[85vh] max-w-[95vw] object-contain shadow-2xl rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};
