/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Newspaper, Search, PlusCircle, Pin, Eye, Calendar, User, Tag, ArrowRight, Edit3, Trash2 } from 'lucide-react';
import { Post, PostCategory, ThemeSettings } from '../types';

interface PostsSectionProps {
  posts: Post[];
  theme: ThemeSettings;
  onOpenPostDetail: (post: Post) => void;
  onOpenNewPostModal: () => void;
  onEditPost: (post: Post) => void;
  onDeletePost: (postId: string) => void;
}

export const PostsSection: React.FC<PostsSectionProps> = ({
  posts,
  theme,
  onOpenPostDetail,
  onOpenNewPostModal,
  onEditPost,
  onDeletePost,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories: (string | PostCategory)[] = ['전체', '공지사항', '입시/합격소식', '국제학교'];

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

  return (
    <section id="posts" className="py-20 md:py-28 bg-[#0a0a0f] border-t border-[#1c1c28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181826] border border-[#27273c] mb-4">
              <Newspaper className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
                News & Mathematical Insights
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              대치10관 <span style={{ color: theme.primaryColor }}>공지 & 입시 자료실</span>
            </h2>
            <p className="text-zinc-400 text-sm mt-2 max-w-xl">
              최신 강남8학군 내신 분석 리포트, 영재·자사고 합격 소식 및 필수 학습 정보를 매주 업데이트합니다.
            </p>
          </div>

          {/* New Post Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewPostModal}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-black transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <PlusCircle className="w-4 h-4" />
              <span>새 게시글 작성하기</span>
            </button>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 bg-[#111119] p-3 rounded-2xl border border-[#222232]">
          {/* Categories */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'text-black font-bold'
                    : 'text-zinc-400 hover:text-white bg-[#171722] hover:bg-[#20202e]'
                }`}
                style={
                  selectedCategory === cat
                    ? { backgroundColor: theme.primaryColor }
                    : {}
                }
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="제목, 내용, 태그 검색..."
              className="w-full pl-9 pr-4 py-1.5 bg-[#171724] border border-[#26263a] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
        </div>

        {/* Posts List */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-[#111118] rounded-3xl border border-[#20202e]">
            <p className="text-zinc-400 text-sm mb-3">검색 결과에 맞는 게시글이 없습니다.</p>
            <button
              onClick={() => { setSelectedCategory('전체'); setSearchQuery(''); }}
              className="text-xs text-orange-400 underline font-semibold"
            >
              전체 게시글 보기
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className={`bg-[#111119] border ${
                  post.isPinned ? 'border-orange-500/50 shadow-orange-500/5' : 'border-[#20202e]'
                } hover:border-orange-500/50 rounded-2xl overflow-hidden transition-all hover:-translate-y-1 group flex flex-col justify-between shadow-lg`}
              >
                <div>
                  {/* Thumbnail Image */}
                  {post.imageUrl && (
                    <div 
                      className="h-44 w-full overflow-hidden relative cursor-pointer"
                      onClick={() => onOpenPostDetail(post)}
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111119] via-transparent to-transparent opacity-80" />
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded text-black uppercase"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          {post.category}
                        </span>
                        {post.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                            <Pin className="w-2.5 h-2.5" /> 필독
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Body Content */}
                  <div className="p-5 sm:p-6">
                    {!post.imageUrl && (
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="text-[10px] font-bold px-2 py-0.5 rounded text-black uppercase"
                          style={{ backgroundColor: theme.primaryColor }}
                        >
                          {post.category}
                        </span>
                        {post.isPinned && (
                          <span className="flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded bg-red-600 text-white">
                            <Pin className="w-2.5 h-2.5" /> 필독
                          </span>
                        )}
                      </div>
                    )}

                    <h3 
                      onClick={() => onOpenPostDetail(post)}
                      className="text-base sm:text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-2 mb-2.5 cursor-pointer leading-snug"
                    >
                      {post.title}
                    </h3>

                    <p 
                      onClick={() => onOpenPostDetail(post)}
                      className="text-xs text-zinc-400 leading-relaxed line-clamp-2 mb-4 cursor-pointer"
                    >
                      {post.summary}
                    </p>

                    {/* Tags */}
                    {post.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] text-zinc-400 bg-[#191924] px-1.5 py-0.5 rounded border border-[#242436]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer Meta & Actions */}
                <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-3 border-t border-[#1c1c28] flex items-center justify-between text-[11px] text-zinc-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-zinc-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3 text-zinc-400" />
                      {post.views}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditPost(post);
                      }}
                      className="p-1 rounded hover:bg-[#20202e] text-zinc-400 hover:text-orange-400 transition-colors cursor-pointer"
                      title="게시글 수정"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`'${post.title}' 게시글을 삭제하시겠습니까?`)) {
                          onDeletePost(post.id);
                        }
                      }}
                      className="p-1 rounded hover:bg-[#20202e] text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                      title="게시글 삭제"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onOpenPostDetail(post)}
                      className="flex items-center gap-1 text-xs font-semibold text-orange-400 hover:text-orange-300 ml-1 cursor-pointer"
                    >
                      <span>보기</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
