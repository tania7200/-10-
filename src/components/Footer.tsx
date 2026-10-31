/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, MapPin, Clock, Shield, Sparkles, ChevronUp } from 'lucide-react';
import { ThemeSettings } from '../types';

interface FooterProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
  onOpenAdmin: () => void;
  onOpenLegal: (type: 'terms' | 'privacy') => void;
  onOpenTuitionNotice?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  theme,
  onOpenBooking,
  onOpenCallModal,
  onOpenAdmin,
  onOpenLegal,
  onOpenTuitionNotice,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050508] border-t border-[#1a1a24] text-zinc-400 text-xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Brand info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div 
                className="w-8 h-8 rounded-xl flex items-center justify-center font-black text-black text-sm"
                style={{ backgroundColor: theme.primaryColor }}
              >
                G1
              </div>
              <span className="text-lg font-black text-white tracking-tight">
                {theme.academyName}
              </span>
            </div>

            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              초·중·고 내신 1등급 완성 및 영재·특목고 합격, 국제학교(IB/AP/SAT) 전문 1:1 개별맞춤 클리닉 대치10관.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={onOpenCallModal}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#151520] hover:bg-[#1e1e2d] border border-[#272738] flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Phone className="w-3.5 h-3.5 text-orange-400" />
                <span>상담전화: {theme.phone}</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="px-4 py-2 rounded-xl text-xs font-bold text-black flex items-center gap-1.5 transition-all hover:brightness-110 cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <span>상담예약</span>
              </button>
            </div>
          </div>

          {/* Location & Hours */}
          <div className="md:col-span-4 space-y-2.5">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              캠퍼스 위치 및 운영 안내
            </h4>
            <p className="flex items-start gap-2 text-zinc-300">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <span>{theme.address}</span>
            </p>
            <p className="text-zinc-500 pl-6 text-[11px]">
              {theme.detailAddress}
            </p>
            <p className="flex items-center gap-2 text-zinc-300 pt-1">
              <Clock className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{theme.businessHours}</span>
            </p>
          </div>

          {/* Legal and Quick link */}
          <div className="md:col-span-3 space-y-2">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              학원 정보 고지
            </h4>
            <p className="text-[11px] text-zinc-500">
              등록번호: 제12125호 | 사업자등록: 8519901866
            </p>
            <p className="text-[11px] text-zinc-500">
              교습과정: 초·중·고 학교교과교습학원(수학)
            </p>
            <p className="text-[11px] text-zinc-500">
              대표자: 이선규 | 개인정보보호책임자: 송유진
            </p>
            <div className="flex items-center gap-2 text-[11px] text-zinc-500 pt-1">
              <button 
                onClick={() => onOpenLegal('terms')}
                className="hover:text-white transition-colors cursor-pointer"
              >
                이용약관
              </button>
              <span>|</span>
              <button 
                onClick={() => onOpenLegal('privacy')}
                className="hover:text-white transition-colors cursor-pointer font-bold"
              >
                개인정보처리방침
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="text-[11px] text-orange-400 hover:text-orange-300 underline font-medium cursor-pointer"
              >
                관리자 CMS / 테마 설정 열기
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-[#14141e] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-600">
          <p>© 2026 {theme.academyName}. All Rights Reserved.</p>
          
          <div className="flex items-center gap-4">
            <span 
              onClick={() => onOpenLegal('terms')}
              className="hover:text-zinc-400 cursor-pointer transition-colors"
            >
              이용약관
            </span>
            <span>•</span>
            <span 
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-zinc-400 cursor-pointer transition-colors"
            >
              개인정보처리방침
            </span>
            <span>•</span>
            <span 
              onClick={onOpenTuitionNotice}
              className="hover:text-white cursor-pointer transition-colors text-zinc-400 hover:underline"
              title="학원법에 따른 교습비등 게시표 공시 확인"
            >
              교습비등 게시표 안내
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded-lg bg-[#14141e] hover:bg-[#1e1e2c] text-zinc-400 hover:text-white transition-colors ml-2 cursor-pointer"
              title="맨 위로"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
