/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  X, Calendar, Eye, User, Share2, Check, ArrowRight, Tag, 
  FileText, Maximize2, ZoomIn, ZoomOut, ExternalLink, ShieldCheck
} from 'lucide-react';
import { Post, ThemeSettings } from '../types';

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onOpenBooking: () => void;
  theme: ThemeSettings;
  onOpenNoticePage?: (postId: string) => void;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onOpenBooking,
  theme,
  onOpenNoticePage,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomScale, setZoomScale] = useState(1);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.25, 0.75));
  const handleZoomReset = () => setZoomScale(1);

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
        <div className="bg-[#0f0f16] border border-[#26263a] w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
          {/* Top Header */}
          <div className="p-5 sm:p-6 border-b border-[#1f1f2e] flex items-center justify-between bg-[#13131e]">
            <div className="flex items-center gap-2">
              <span 
                className="text-xs font-bold px-2.5 py-1 rounded-full text-black uppercase"
                style={{ backgroundColor: theme.primaryColor }}
              >
                {post.category}
              </span>
              <span className="text-xs text-zinc-400 font-mono">
                작성일: {post.date}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {onOpenNoticePage && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenNoticePage(post.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-[#1a1a28] hover:bg-[#252538] text-orange-400 border border-orange-500/30 transition-all cursor-pointer"
                  title="공지사항 전용 페이지에서 크게 보기"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">새 페이지로 열기</span>
                </button>
              )}
              <button
                onClick={handleShare}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-[#1a1a26] hover:bg-[#252538] transition-colors cursor-pointer"
                title="링크 복사"
              >
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-zinc-400 hover:text-white bg-[#1a1a26] hover:bg-[#252538] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
            {/* Post Image */}
            {post.imageUrl && (
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-[#242436] relative">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f16] via-transparent to-transparent opacity-60" />
              </div>
            )}

            {/* Title & Metadata */}
            <div>
              <h2 className="text-xl sm:text-3xl font-black text-white tracking-tight leading-snug mb-4">
                {post.title}
              </h2>

              <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400 pb-4 border-b border-[#202030]">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-orange-400" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-orange-400" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-orange-400" />
                  조회수 {post.views}
                </span>
                {post.attachmentImage && (
                  <span className="flex items-center gap-1 text-orange-400 font-semibold bg-orange-500/10 px-2.5 py-0.5 rounded-full border border-orange-500/30">
                    <FileText className="w-3 h-3" />
                    교습비등 게시표 첨부
                  </span>
                )}
              </div>
            </div>

            {/* Summary Box */}
            <div className="p-4 rounded-xl bg-[#161622] border-l-4 border-orange-500 text-xs sm:text-sm text-zinc-300 italic leading-relaxed">
              "{post.summary}"
            </div>

            {/* Body formatted */}
            <div className="text-zinc-200 text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4 font-normal">
              {post.content}
            </div>

            {/* Attachment Box: Official Tuition Fee Notice */}
            {post.attachmentImage && (
              <div className="rounded-2xl bg-gradient-to-br from-[#161626] to-[#10101a] border border-orange-500/40 p-5 sm:p-6 shadow-xl space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-500/20 text-orange-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-orange-400 tracking-wide uppercase">
                          공식 공시 첨부 서류
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
                          정식 등록 인가
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-white mt-0.5">
                        {post.attachmentTitle || '[별지 제18호서식] 교습비등 게시표'}
                      </h4>
                      <p className="text-xs text-zinc-400 mt-1">
                        학원의 설립·운영 및 과외교습에 관한 법률 제15조 규정에 의한 교습과정별 분당단가 및 월 교습비 원본
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {onOpenNoticePage && (
                      <button
                        type="button"
                        onClick={() => {
                          onClose();
                          onOpenNoticePage(post.id);
                        }}
                        className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#1d1d2e] hover:bg-[#28283e] text-zinc-200 border border-[#35354c] flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow"
                      >
                        <FileText className="w-3.5 h-3.5 text-orange-400" />
                        <span>새 페이지에서 보기</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setZoomScale(1);
                        setIsLightboxOpen(true);
                      }}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold text-black flex items-center justify-center gap-1.5 transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-lg shrink-0"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>게시표 원본 크게보기</span>
                    </button>
                  </div>
                </div>

                {/* Clickable Image Preview Card */}
                <div 
                  onClick={() => {
                    setZoomScale(1);
                    setIsLightboxOpen(true);
                  }}
                  className="relative rounded-xl overflow-hidden border border-[#27273d] bg-black/70 cursor-pointer group/preview transition-all hover:border-orange-500/60"
                  title="클릭하여 고화질 원본으로 확대보기"
                >
                  <img
                    src={post.attachmentImage}
                    alt={post.attachmentTitle || '교습비등 게시표'}
                    className="w-full max-h-80 object-contain mx-auto transition-transform duration-300 group-hover/preview:scale-[1.01]"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover/preview:bg-black/15 transition-colors flex items-center justify-center">
                    <div className="px-4 py-2.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-2xl group-hover/preview:scale-105 transition-transform">
                      <ZoomIn className="w-4 h-4 text-orange-400" />
                      <span>클릭하여 고화질 원본 전체화면으로 확인</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 pt-1 border-t border-[#1f1f30]">
                  <span>※ 형제 동시 수강 시 수강료 5% 추가 할인 적용</span>
                  <span>발행: 그레이드원대치10관수학학원 (원장 이선규)</span>
                </div>
              </div>
            )}

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="pt-4 border-t border-[#1e1e2d] flex flex-wrap items-center gap-2">
                <Tag className="w-3.5 h-3.5 text-orange-400" />
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs text-zinc-300 bg-[#171724] px-2.5 py-1 rounded-lg border border-[#28283c]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Related CTA Card */}
            <div className="bg-gradient-to-r from-[#171724] to-[#12121b] border border-orange-500/30 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  이 글의 프로그램 또는 개별 클리닉 상담을 원하시나요?
                </h4>
                <p className="text-xs text-zinc-400">
                  대치10관(도곡로 184 4층) 방문 상담 시 원장단이 직접 1:1 맞춤 로드맵을 설계해 드립니다.
                </p>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenBooking();
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 transition-all hover:brightness-110 active:scale-95 cursor-pointer shrink-0"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>1:1 상담 예약하기</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* High-Resolution Document Lightbox Modal */}
      {isLightboxOpen && post.attachmentImage && (
        <div 
          className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-6 bg-black/95 backdrop-blur-lg animate-fadeIn"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div 
            className="relative max-w-5xl w-full max-h-[95vh] bg-[#0c0c12] border border-[#2a2a40] rounded-2xl sm:rounded-3xl flex flex-col overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Lightbox Header Bar */}
            <div className="px-5 py-3.5 sm:px-6 sm:py-4 bg-[#14141f] border-b border-[#242436] flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <FileText className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="text-xs sm:text-sm font-bold text-white truncate">
                  {post.attachmentTitle || '[별지 제18호서식] 교습비등 게시표'}
                </span>
                <span className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-400 border border-orange-500/30">
                  공식 원본
                </span>
              </div>

              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 sm:p-2 rounded-lg bg-[#1f1f2e] hover:bg-[#2c2c40] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="축소"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleZoomReset}
                  className="px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-lg bg-[#1f1f2e] hover:bg-[#2c2c40] text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                  title="배율 초기화"
                >
                  {Math.round(zoomScale * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 sm:p-2 rounded-lg bg-[#1f1f2e] hover:bg-[#2c2c40] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="확대"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <a
                  href={post.attachmentImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 sm:p-2 rounded-lg bg-[#1f1f2e] hover:bg-[#2c2c40] text-zinc-300 hover:text-white transition-colors cursor-pointer"
                  title="새 창에서 원본 보기"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsLightboxOpen(false)}
                  className="p-1.5 sm:p-2 rounded-lg bg-red-950/50 hover:bg-red-900/80 text-red-300 hover:text-white transition-colors ml-1 cursor-pointer border border-red-800/40"
                  title="닫기"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Scrollable Viewport */}
            <div className="p-4 sm:p-6 overflow-auto flex-1 flex items-center justify-center bg-[#07070a] min-h-[50vh]">
              <div 
                className="transition-transform duration-200 origin-center"
                style={{ transform: `scale(${zoomScale})` }}
              >
                <img
                  src={post.attachmentImage}
                  alt={post.attachmentTitle || '교습비등 게시표 원본'}
                  className="max-h-[75vh] w-auto max-w-full rounded-lg shadow-2xl object-contain border border-[#252538]"
                />
              </div>
            </div>

            {/* Lightbox Footer Bar */}
            <div className="px-5 py-2.5 bg-[#12121c] border-t border-[#1e1e2d] flex items-center justify-between text-[11px] text-zinc-400">
              <span>학원명: 그레이드원대치10관수학학원 | 원장: 이선규</span>
              <span className="hidden sm:inline">확대/축소 버튼 또는 새창보기를 활용하여 세부 내역을 확인하실 수 있습니다.</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
