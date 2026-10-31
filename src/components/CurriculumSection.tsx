/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { CurriculumTrack, ThemeSettings, TargetTrack } from '../types';

interface CurriculumSectionProps {
  curriculum: CurriculumTrack[];
  theme: ThemeSettings;
  onSelectTrackForBooking: (trackTitle: TargetTrack) => void;
}

export const CurriculumSection: React.FC<CurriculumSectionProps> = ({
  curriculum,
  theme,
  onSelectTrackForBooking,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('전체');

  const filters = ['전체', '초등심화', '중등내신', '고등내신/수능', '영재/자사고', '국제학교'];

  const filteredTracks = curriculum.filter((track) => {
    if (selectedFilter === '전체') return true;
    if (selectedFilter === '초등심화') return track.target.includes('초등');
    if (selectedFilter === '중등내신') return track.target.includes('중학교');
    if (selectedFilter === '고등내신/수능') return track.target.includes('고등학교') || track.title.includes('수능');
    if (selectedFilter === '영재/자사고') return track.title.includes('영재고') || track.title.includes('자사고');
    if (selectedFilter === '국제학교') return track.title.includes('국제학교');
    return true;
  });

  return (
    <section id="curriculum" className="py-20 md:py-28 bg-[#07070a] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161622] border border-[#252538] mb-4">
            <Layers className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Curriculum Roadmap
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            초등 심화부터 명문고 내신, 국제학교까지 <br />
            <span style={{ color: theme.primaryColor }}>단계별 최상위 커리큘럼</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            대치동 10관의 축적된 노하우로 설계된 6대 맞춤형 코스입니다.
            학생의 역량과 진로 목표에 따라 유기적으로 조합됩니다.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedFilter === filter
                  ? 'text-black shadow-lg font-bold'
                  : 'text-zinc-400 bg-[#12121a] hover:bg-[#1a1a26] border border-[#222232]'
              }`}
              style={
                selectedFilter === filter
                  ? { backgroundColor: theme.primaryColor }
                  : {}
              }
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTracks.map((item) => (
            <div
              key={item.id}
              className="bg-[#101017] border border-[#20202e] hover:border-orange-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:-translate-y-1 group relative overflow-hidden shadow-xl"
            >
              {/* Subtle top glow bar */}
              <div 
                className="absolute top-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: theme.primaryColor }}
              />

              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span 
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full text-black uppercase tracking-wider"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {item.badge}
                  </span>
                  <span className="text-xs font-medium text-zinc-400">
                    {item.target}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Features List */}
                <div className="space-y-2.5 mb-6">
                  {item.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5">
                      <div 
                        className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-black"
                        style={{ backgroundColor: `${theme.primaryColor}dd` }}
                      >
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="text-xs text-zinc-300 leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Subjects tags */}
                <div className="mb-6 pt-4 border-t border-[#1c1c28]">
                  <span className="text-[11px] text-zinc-400 font-semibold block mb-2">학습 영역:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {item.subjects.map((sub, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#181822] text-zinc-300 border border-[#262638]"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => {
                  let mappedTarget: TargetTrack = '대치동 1:1 개별맞춤 클리닉';
                  if (item.title.includes('초등')) mappedTarget = '초등 최상위 심화 & KMO';
                  else if (item.title.includes('중등')) mappedTarget = '중등 내신 만점 & 고등 선행';
                  else if (item.title.includes('강남 8학군')) mappedTarget = '강남 8학군 고등 내신 1등급 집중반';
                  else if (item.title.includes('영재고')) mappedTarget = '영재고·과고·전국자사고 대비반';
                  else if (item.title.includes('국제학교')) mappedTarget = '국제학교 IB DP Math (AA/AI HL·SL)';
                  else if (item.title.includes('수능')) mappedTarget = '수능·평가원 수학 킬러 극복반';
                  
                  onSelectTrackForBooking(mappedTarget);
                }}
                className="w-full py-3 rounded-xl text-xs font-bold text-zinc-200 bg-[#161622] hover:bg-[#1f1f2e] border border-[#2b2b3d] hover:border-orange-500/50 flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:text-white"
              >
                <span>이 과정 1:1 상담 신청</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
