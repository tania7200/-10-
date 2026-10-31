/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Eye, User, Share2, Check, ArrowRight, BookOpen, Tag, Phone } from 'lucide-react';
import { Post, ThemeSettings } from '../types';

interface PostDetailModalProps {
  post: Post | null;
  onClose: () => void;
  onOpenBooking: () => void;
  theme: ThemeSettings;
}

export const PostDetailModal: React.FC<PostDetailModalProps> = ({
  post,
  onClose,
  onOpenBooking,
  theme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!post) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
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
  );
};
