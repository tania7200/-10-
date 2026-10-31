/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, Calendar, MapPin, Settings2 } from 'lucide-react';
import { ThemeSettings } from '../types';

interface FloatingQuickBarProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
  onOpenAdmin: () => void;
}

export const FloatingQuickBar: React.FC<FloatingQuickBarProps> = ({
  theme,
  onOpenBooking,
  onOpenCallModal,
  onOpenAdmin,
}) => {
  const scrollToLocation = () => {
    const loc = document.querySelector('#location');
    if (loc) {
      loc.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 z-40 max-w-lg mx-auto sm:max-w-none">
      <div 
        className="bg-[#0e0e16]/95 backdrop-blur-xl border border-[#2b2b40] rounded-2xl p-2 sm:p-2.5 shadow-2xl flex items-center justify-between gap-2"
        style={{ boxShadow: `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${theme.accentGlow}` }}
      >
        {/* Call button */}
        <button
          onClick={onOpenCallModal}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#171724] hover:bg-[#202030] text-zinc-200 border border-[#29293e] text-xs font-semibold cursor-pointer transition-colors"
          title="상담전화 연결"
        >
          <Phone className="w-3.5 h-3.5 text-orange-400" />
          <span className="font-mono text-xs hidden sm:inline">{theme.phone}</span>
          <span className="sm:hidden text-xs">전화상담</span>
        </button>

        {/* Location button */}
        <button
          onClick={scrollToLocation}
          className="hidden sm:flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-[#171724] hover:bg-[#202030] text-zinc-300 border border-[#29293e] text-xs font-semibold cursor-pointer transition-colors"
          title="약도 보기"
        >
          <MapPin className="w-3.5 h-3.5 text-orange-400" />
          <span>도곡로 184</span>
        </button>

        {/* Booking CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black text-black cursor-pointer shadow-lg transition-transform hover:scale-105 active:scale-95"
          style={{ backgroundColor: theme.primaryColor }}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>1:1 상담예약</span>
        </button>

        {/* Admin settings button */}
        <button
          onClick={onOpenAdmin}
          className="p-2.5 rounded-xl bg-[#171724] hover:bg-[#202030] text-zinc-400 hover:text-white border border-[#29293e] cursor-pointer"
          title="디자인 / 게시글 관리"
        >
          <Settings2 className="w-4 h-4 text-orange-400" />
        </button>
      </div>
    </div>
  );
};
