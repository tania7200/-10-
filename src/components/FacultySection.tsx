/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, GraduationCap, CheckCircle2, UserCheck, Calendar, Phone } from 'lucide-react';
import { FacultyMember, ThemeSettings } from '../types';

interface FacultySectionProps {
  faculty: FacultyMember[];
  theme: ThemeSettings;
}

export const FacultySection: React.FC<FacultySectionProps> = ({ faculty, theme }) => {
  const director = faculty[0];

  if (!director) return null;

  return (
    <section id="about" className="py-20 md:py-28 bg-[#07070a] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161622] border border-[#252538] mb-4">
            <UserCheck className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Director Profile
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            대치10관 <span style={{ color: theme.primaryColor }}>원장 소개</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            대치동, 압구정, 반포 최상위권을 12년간 직접 이끌어온 이선규 대표원장과 전문 강사진이 학생 한 명 한 명을 1:1로 직접 지도합니다.
          </p>
        </div>

        {/* Featured Director Card */}
        <div className="bg-[#101018] border border-[#222232] rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-10 relative">
          {/* Subtle background glow */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[140px] opacity-15 pointer-events-none"
            style={{ backgroundColor: theme.primaryColor }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: High-res portrait */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden border border-[#2b2b3e] shadow-2xl group">
                <div className="aspect-[3/4] w-full overflow-hidden bg-[#161622]">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e16]/90 via-transparent to-transparent" />
                
                <div className="absolute bottom-5 left-5 right-5 text-left">
                  <span 
                    className="text-[10px] font-extrabold px-2.5 py-1 rounded-md text-black uppercase tracking-wider inline-block mb-1.5"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    대치10관 총괄 대표원장
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">{director.name}</h3>
                </div>
              </div>
            </div>

            {/* Right: Detailed Profile & Career */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider block mb-1">
                  12-Year Mastery in Top-Tier Math
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mb-2">
                  {director.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400">
                  대치동·압구정·반포 최상위권 학생들의 성적 도약을 증명해 온 실전 지도 노하우
                </p>
              </div>

              {/* Career List */}
              <div className="bg-[#151520] border border-[#242436] rounded-2xl p-5 sm:p-6">
                <span className="text-xs font-bold text-white uppercase tracking-wider block mb-3.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-orange-400" />
                  주요 약력 및 지도 실적
                </span>
                <ul className="space-y-3">
                  {director.career.map((c, i) => (
                    <li key={i} className="text-xs sm:text-sm text-zinc-200 flex items-start gap-2.5 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span className={c.includes('12년') || c.includes('내신만점자') ? 'font-bold text-white' : ''}>
                        {c}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specialty */}
              <div className="p-4 rounded-xl bg-[#171724] border border-[#26263a]">
                <span className="text-xs font-bold text-orange-400 block mb-1">전문 지도 분야:</span>
                <span className="text-xs sm:text-sm text-zinc-300 font-medium">
                  {director.specialty}
                </span>
              </div>

              {/* Quote */}
              <div className="border-l-3 border-orange-500 pl-4 py-1 italic text-xs sm:text-sm text-zinc-300">
                "{director.quote}"
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
