/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, ArrowRight, Award, ShieldCheck, Globe2, BookOpen, Compass, ChevronDown } from 'lucide-react';
import { ThemeSettings } from '../types';

interface HeroSectionProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  theme,
  onOpenBooking,
  onOpenCallModal,
}) => {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 md:pt-20 md:pb-32 dark-grid-bg">
      {/* Background radial orange aura */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] md:w-[900px] md:h-[500px] pointer-events-none rounded-full blur-[140px] opacity-25"
        style={{ backgroundColor: theme.primaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#161622] border border-[#2b2b3f] mb-6 shadow-inner animate-fadeIn">
            <span 
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <span className="text-xs font-semibold tracking-wide text-zinc-300">
              대치동 1:1 개별맞춤 클리닉 & 명문고·국제학교 입시 명가
            </span>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded-full text-black"
              style={{ backgroundColor: theme.primaryColor }}
            >
              대치10관
            </span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.18] mb-6">
            {(theme.heroHeadline.includes('1:1 초밀착')
              ? theme.heroHeadline.replace('1:1 초밀착 개별맞춤', '개별 1:1 맞춤')
              : theme.heroHeadline
            ).split(' ').map((word, i) => {
              if (word === '개별' || word.startsWith('개별')) {
                return (
                  <span 
                    key={i} 
                    className="relative inline-block px-2.5 py-0.5 mx-1 rounded-xl bg-orange-500/15 border border-orange-500/40 font-black tracking-tight align-middle shadow-[0_0_25px_rgba(255,107,0,0.3)] transition-transform hover:scale-105"
                    style={{ 
                      color: theme.primaryColor,
                      textShadow: `0 0 30px ${theme.accentGlow}`
                    }}
                  >
                    {word}
                  </span>
                );
              }
              if (word.includes('1:1') || word.includes('한계를')) {
                return (
                  <span 
                    key={i} 
                    className="inline-block px-1"
                    style={{ 
                      color: theme.primaryColor,
                      textShadow: `0 0 35px ${theme.accentGlow}`
                    }}
                  >
                    {word}{' '}
                  </span>
                );
              }
              return <span key={i}>{word} </span>;
            })}
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto font-normal leading-relaxed mb-10">
            {theme.heroSubheadline}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-base text-black flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer shadow-xl"
              style={{
                backgroundColor: theme.primaryColor,
                boxShadow: `0 10px 25px ${theme.accentGlow}`,
              }}
            >
              <Calendar className="w-5 h-5" />
              <span>1:1 심층 상담예약 신청</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenCallModal}
              className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-base text-zinc-100 bg-[#14141d] hover:bg-[#1c1c28] border border-[#2b2b3f] flex items-center justify-center gap-3 transition-all hover:border-orange-500/40 cursor-pointer shadow-lg"
            >
              <Phone className="w-5 h-5 text-orange-400" />
              <span>상담전화: <span className="font-mono text-orange-400">{theme.phone}</span></span>
            </button>
          </div>

          {/* Quick Highlight Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto">
            <div className="bg-[#101017]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#222230] text-left transition-all hover:border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">강남 8학군 내신</span>
                <Award className="w-4 h-4 text-orange-400" />
              </div>
              <div 
                className="text-2xl sm:text-3xl font-black text-white"
                style={{ color: theme.primaryColor }}
              >
                94.2%
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">1·2등급 진입 및 유지율</p>
            </div>

            <div className="bg-[#101017]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#222230] text-left transition-all hover:border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">명문고·자사고</span>
                <ShieldCheck className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                8<span className="text-orange-400">+</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">명문고·자사고 합격</p>
            </div>

            <div className="bg-[#101017]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#222230] text-left transition-all hover:border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">개별맞춤 클리닉</span>
                <BookOpen className="w-4 h-4 text-orange-400" />
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white">
                6인 <span className="text-xs text-zinc-400 font-normal">정원</span>
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">1:1 오답 역추적 밀착 케어</p>
            </div>

            <div className="bg-[#101017]/80 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-[#222230] text-left transition-all hover:border-orange-500/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">국제학교·유학</span>
                <Globe2 className="w-4 h-4 text-orange-400" />
              </div>
              <div 
                className="text-2xl sm:text-3xl font-black"
                style={{ color: theme.primaryColor }}
              >
                IB 7 · AP 5
              </div>
              <p className="text-xs text-zinc-400 mt-1 font-medium">SIS·KIS·유학 수학</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Scroll indicator */}
      <div className="flex justify-center mt-12">
        <a 
          href="#system" 
          className="flex flex-col items-center text-xs text-zinc-500 hover:text-orange-400 transition-colors gap-1 animate-bounce"
        >
          <span>더 알아보기</span>
          <ChevronDown className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
};
