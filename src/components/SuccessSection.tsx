/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Trophy, Award, Star, Quote, ChevronRight, CheckCircle2 } from 'lucide-react';
import { SuccessStory, ThemeSettings } from '../types';

interface SuccessSectionProps {
  stories: SuccessStory[];
  theme: ThemeSettings;
  onOpenBooking: () => void;
}

export const SuccessSection: React.FC<SuccessSectionProps> = ({
  stories,
  theme,
  onOpenBooking,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('전체');

  const categories = ['전체', '영재·과고·자사고', '강남 8학군 내신 1등급', '의대·명문대/해외대'];

  const filteredStories = stories.filter((story) => {
    if (activeCategory === '전체') return true;
    if (activeCategory === '영재·과고·자사고') return story.admittedSchool.includes('과고') || story.admittedSchool.includes('외대부고');
    if (activeCategory === '강남 8학군 내신 1등급') return story.admittedSchool.includes('전교') || story.previousSchool.includes('휘문고');
    if (activeCategory === '의대·명문대/해외대') return story.admittedSchool.includes('Cornell') || story.admittedSchool.includes('의예과');
    return true;
  });

  const cumulativeNumbers = [
    { label: '영재고·과고 합격', count: '89명' },
    { label: '전국단위 자사고(외대부·하나·상산)', count: '142명' },
    { label: '강남8학군 내신 1등급 누적', count: '420건+' },
    { label: '의치한약수 & SKY 합격', count: '197명' },
  ];

  return (
    <section id="success" className="py-20 md:py-28 bg-[#0a0a10] border-t border-[#1c1c28] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181826] border border-[#27273c] mb-4">
            <Trophy className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Hall of Excellence
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            숫자와 실명으로 증명하는 <br />
            <span style={{ color: theme.primaryColor }}>명문고 & 명문대 합격 신화</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            대치10관의 1:1 역추적 클리닉을 거친 학생들이 만들어낸 압도적인 결과입니다.
            다음 합격의 주인공은 바로 여러분의 자녀입니다.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {cumulativeNumbers.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#12121a] border border-[#222232] rounded-2xl p-4 sm:p-5 text-center"
            >
              <div 
                className="text-2xl sm:text-3xl font-black mb-1"
                style={{ color: theme.primaryColor }}
              >
                {stat.count}
              </div>
              <div className="text-xs text-zinc-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'text-black font-bold shadow'
                  : 'text-zinc-400 bg-[#14141e] hover:bg-[#1b1b28] border border-[#262638]'
              }`}
              style={
                activeCategory === cat
                  ? { backgroundColor: theme.primaryColor }
                  : {}
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredStories.map((story) => (
            <div
              key={story.id}
              className="bg-[#111118] border border-[#20202e] hover:border-orange-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span 
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full text-black"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {story.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{story.year}</span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                    {story.admittedSchool}
                  </h3>
                  <div className="text-xs text-zinc-400 mt-1 flex items-center gap-2">
                    <span>{story.previousSchool}</span>
                    <span>•</span>
                    <span className="font-semibold text-zinc-200">{story.studentName}</span>
                  </div>
                </div>

                {story.scoreJump && (
                  <div className="bg-[#181824] rounded-xl px-3.5 py-2 border border-[#28283c] mb-4">
                    <span className="text-[11px] font-semibold text-orange-400 block mb-0.5">성적 도약:</span>
                    <span className="text-xs text-white font-medium">{story.scoreJump}</span>
                  </div>
                )}

                <div className="relative pl-3 border-l-2 border-orange-500/50 my-4 italic text-xs text-zinc-300 leading-relaxed">
                  "{story.quote}"
                </div>

                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  {story.reviewDetail}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-[#1c1c28] flex items-center justify-between text-[11px] text-zinc-500">
                <span>과정: {story.curriculumUsed.slice(0, 18)}...</span>
                <span className="text-orange-400 font-medium">검증 완료</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-[#171724] to-[#12121b] border border-[#29293e] rounded-3xl p-8 text-center max-w-3xl mx-auto">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            우리 아이의 수학 성적도 1:1 맞춤 설계로 바뀔 수 있습니다.
          </h3>
          <p className="text-xs sm:text-sm text-zinc-400 mb-6">
            현재 풀이 노트와 최근 시험지를 지참하시면 취약점과 1년 목표 로드맵을 무료로 컨설팅해 드립니다.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl text-xs sm:text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-lg"
            style={{ backgroundColor: theme.primaryColor }}
          >
            1:1 심층 상담 & 레벨진단 예약하기
          </button>
        </div>
      </div>
    </section>
  );
};
