/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Globe, Award, BookCheck, Sparkles, CheckCircle, ArrowRight, FileCheck } from 'lucide-react';
import { ThemeSettings, TargetTrack } from '../types';

interface InternationalSchoolProps {
  theme: ThemeSettings;
  onSelectTrackForBooking: (trackTitle: TargetTrack) => void;
}

export const InternationalSchoolSection: React.FC<InternationalSchoolProps> = ({
  theme,
  onSelectTrackForBooking,
}) => {
  const internationalPrograms = [
    {
      title: 'IB DP Mathematics',
      subtitle: 'Analysis and Approaches (AA) & Applications (AI) HL / SL',
      points: [
        'Internal Assessment (IA) 주제 설정부터 통계적 모델링 & 최종 첨삭 지도',
        'Paper 1 (Non-Calculator) 발상력 & Paper 2, 3 (Calculator & Proof) 고득점',
        '최근 10년 역대 IB Final Exam 유형별 체계적 정리',
      ],
      badge: 'Final 7점 만점반',
    },
    {
      title: 'AP Calculus & Statistics',
      subtitle: 'AP Calculus AB / BC & AP Statistics 5점 만점',
      points: [
        'College Board 최신 기출 FRQ(자유응답형) 단계별 채점 기준 완벽 분석',
        'Series & Differential Equations 등 까다로운 단원 1:1 개별 클리닉',
        '매년 5월 본시험 대비 4월 집중 실전 모의고사 파이널',
      ],
      badge: '5점 만점 대비',
    },
    {
      title: 'SAT Math & 경시(AMC/AIME)',
      subtitle: 'Digital SAT Math 800점 & AMC 10/12 AIME 진출',
      points: [
        'Desmos 공학용 계산기 활용 테크닉 및 시간 단축 알고리즘 체화',
        '아이비리그 및 Top 20 미국 명문대 공대 진학을 위한 경시 포트폴리오',
        '기출 함정 문항 및 논리적 오류 1:1 디버깅',
      ],
      badge: '만점 및 스펙 완성',
    },
  ];

  const targetSchools = [
    'Chadwick International (채드윅)',
    'Seoul International School (SIS)',
    'Korea International School (KIS 판교/제주)',
    'Seoul Foreign School (SFS)',
    'NLCS Jeju',
    'Branksome Hall Asia (BHA)',
    'Dulwich College Seoul',
    'US/UK Boarding Schools (Andover, Exeter, Deerfield 등)',
  ];

  return (
    <section id="international" className="py-20 md:py-28 bg-[#09090f] border-t border-[#1e1e2d] relative overflow-hidden">
      {/* Decorative background glow */}
      <div 
        className="absolute top-1/2 right-0 w-96 h-96 rounded-full blur-[160px] opacity-20 pointer-events-none"
        style={{ backgroundColor: theme.primaryColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181826] border border-[#27273c] mb-4">
              <Globe className="w-3.5 h-3.5 text-orange-400" />
              <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
                International School Math Division
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              국내외 명문 국제학교 학생을 위한 <br />
              <span style={{ color: theme.primaryColor }}>IB · AP · SAT 수학 전문관</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
            미국·영국 명문대 이공계 및 경제학부 진학을 목표로 하는 학생들에게
            영미권 수학의 깊이 있는 논증과 GPA 만점, 공인시험 고득점을 보장합니다.
          </p>
        </div>

        {/* 3 Core Programs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {internationalPrograms.map((prog, idx) => (
            <div
              key={idx}
              className="bg-[#12121b] border border-[#232334] hover:border-orange-500/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all hover:-translate-y-1 group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span 
                    className="text-[11px] font-bold px-2.5 py-1 rounded-full text-black uppercase"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    {prog.badge}
                  </span>
                  <Award className="w-5 h-5 text-orange-400 group-hover:rotate-12 transition-transform" />
                </div>

                <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-orange-400 transition-colors">
                  {prog.title}
                </h3>
                <p className="text-xs text-orange-300/80 font-medium mb-5">
                  {prog.subtitle}
                </p>

                <div className="space-y-3 mb-6">
                  {prog.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5">
                      <CheckCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-zinc-300 leading-snug">{pt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onSelectTrackForBooking('국제학교 IB DP Math (AA/AI HL·SL)')}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-zinc-200 bg-[#191925] hover:bg-[#222233] border border-[#2c2c40] flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>프로그램 1:1 상담</span>
                <ArrowRight className="w-3.5 h-3.5 text-orange-400" />
              </button>
            </div>
          ))}
        </div>

        {/* Target Schools Ticker / Grid */}
        <div className="bg-[#111119] rounded-2xl border border-[#222232] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
            <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-orange-400" />
              주요 수강 학교 (GPA 내신 & Exam 관리)
            </span>
            <span className="text-[11px] text-zinc-400">
              * 영·한 이중언어(Bilingual) 수업 및 실시간 온라인 줌 하이브리드 지원
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {targetSchools.map((school, sIdx) => (
              <div
                key={sIdx}
                className="bg-[#171722] border border-[#242436] rounded-xl px-3.5 py-2.5 text-xs text-zinc-300 font-medium text-center truncate hover:border-orange-500/30 transition-colors"
              >
                {school}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
