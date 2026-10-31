/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Target, Search, CheckCircle2, FileText, Users, Cpu, Sparkles, ArrowRight, Zap } from 'lucide-react';
import { ThemeSettings } from '../types';

interface IndividualSystemProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
}

export const IndividualSystemSection: React.FC<IndividualSystemProps> = ({
  theme,
  onOpenBooking,
}) => {
  const steps = [
    {
      step: '01',
      title: '정밀 진단 테스트 & 사고 패턴 분석',
      desc: '단순 맞고 틀림이 아닌, 연산 오류인지, 개념의 부재인지, 복합 발상 한계인지 학생의 사고 패턴과 취약점을 다각도로 정밀 진단합니다.',
      icon: Search,
      badge: '진단 단계',
    },
    {
      step: '02',
      title: '개별맞춤 커리큘럼 & 전담 교재 편성',
      desc: '같은 학년이라도 학생의 목표 학교(휘문고, 하나고, 서울예고, 서울국제학교 등)와 취약 단원에 맞추어 전용 교재 및 N제를 독립 편성합니다.',
      icon: Target,
      badge: '설계 단계',
    },
    {
      step: '03',
      title: '즉각적인 오답 클리닉',
      desc: '학생이 시간낭비 하지 않도록 선생님의 즉각적인 오답 후, 복원 및 변형문항으로 스스로 해결할 수 있을 때까지 점검합니다.',
      icon: Zap,
      badge: '클리닉 단계',
    },
    {
      step: '04',
      title: '주간 학부모 리포트 & 실전 모의고사',
      desc: '매주 학습 성취도, 풀이 속도, 오답률 변화 추이를 학부모님께 투명하게 보고하고 매주 강남 기출 모의고사를 치릅니다.',
      icon: FileText,
      badge: '피드백 단계',
    },
  ];

  const highlights = [
    {
      title: '클래스당 최대 6인 소수정예',
      desc: '대형 학원의 들러리가 되지 않도록 원장과 강사진이 모든 학생의 풀이 노트를 직접 감수합니다.',
    },
    {
      title: '대치동 10개년 기출 변형 4만 제',
      desc: '강남 8학군 15개교 및 전국 영재·자사고 기출 문제의 조건과 숫자를 변형한 자체 킬러 DB 보유.',
    },
    {
      title: '국내 일반고 & 국제학교 듀얼 전문성',
      desc: '한국 수능·내신 최고난도 문항과 해외 IB DP / AP Calculus를 모두 마스터한 엘리트 강사진.',
    },
  ];

  return (
    <section id="system" className="py-20 md:py-28 bg-[#0a0a0f] border-t border-[#1c1c28] relative">
      <div id="curriculum" className="absolute -top-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#171724] border border-[#26263a] mb-4">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Individual Coaching Philosophy
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            왜 대치동 학부모들은 <br className="hidden sm:inline" />
            <span style={{ color: theme.primaryColor }}>'그레이드원 1:1 개별맞춤'</span>을 신뢰하는가?
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            100명이 앉아있는 대형 강의로는 결코 채울 수 없는 취약점을 집요하게 파고듭니다.
            학생 한 명의 오답 습관을 뿌리부터 교정하는 대치10관의 독자적 시스템입니다.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-[#12121a] hover:bg-[#161622] border border-[#232333] hover:border-orange-500/40 rounded-2xl p-6 transition-all relative group"
              >
                <div className="flex items-center justify-between mb-5">
                  <span 
                    className="text-xs font-bold px-2.5 py-1 rounded-md text-black"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    STEP {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#1b1b26] flex items-center justify-center text-orange-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight 3 Pillars Box */}
        <div className="bg-gradient-to-r from-[#14141e] via-[#161624] to-[#14141e] rounded-3xl border border-[#26263a] p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((h, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-black font-bold text-sm"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  ✓
                </div>
                <div>
                  <h4 className="text-base font-bold text-white mb-1.5">{h.title}</h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">{h.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-[#262638] flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-zinc-300">
              * 학생의 현재 성적표 및 풀이 노트를 지참하시면 원장단이 직접 1:1 심층 분석을 진행합니다.
            </span>
            <button
              onClick={onOpenBooking}
              className="px-5 py-2.5 rounded-xl text-xs font-bold text-black flex items-center gap-2 transition-all hover:brightness-110 cursor-pointer shrink-0"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <span>1:1 진단 테스트 예약</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
