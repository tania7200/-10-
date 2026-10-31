/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Phone, Clock, MapPin, Copy, Check, MessageSquare } from 'lucide-react';
import { ThemeSettings } from '../types';

interface PhoneCallModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
  theme: ThemeSettings;
}

export const PhoneCallModal: React.FC<PhoneCallModalProps> = ({
  isOpen,
  onClose,
  onOpenBooking,
  theme,
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(theme.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const cleanPhone = theme.phone.replace(/[^0-9]/g, '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#101018] border border-[#28283e] w-full max-w-md rounded-3xl overflow-hidden shadow-2xl relative">
        {/* Header */}
        <div className="p-5 border-b border-[#202030] flex items-center justify-between bg-[#141422]">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-black font-bold"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Phone className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-white">상담 전화 안내</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#202030] cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 text-center">
          <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider block mb-1">
            그레이드원 대치10관 입학상담실
          </span>
          <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight my-2">
            {theme.phone}
          </div>
          <p className="text-xs text-zinc-400 mb-6">
            모바일 기기에서는 아래 버튼을 누르면 전화 앱으로 즉시 연결됩니다.
          </p>

          <div className="flex flex-col gap-3 mb-6">
            <a
              href={`tel:${cleanPhone}`}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              style={{ backgroundColor: theme.primaryColor }}
            >
              <Phone className="w-4 h-4" />
              <span>바로 전화 걸기 ({theme.phone})</span>
            </a>

            <button
              onClick={handleCopy}
              className="w-full py-3 rounded-xl font-semibold text-xs text-zinc-300 bg-[#161622] hover:bg-[#202030] border border-[#2a2a3e] flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400 font-bold">번호가 복사되었습니다!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-orange-400" />
                  <span>전화번호 복사하기</span>
                </>
              )}
            </button>
          </div>

          {/* Info cards */}
          <div className="bg-[#151520] border border-[#242436] rounded-2xl p-4 text-left space-y-2.5 text-xs">
            <div className="flex items-start gap-2.5 text-zinc-300">
              <Clock className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">상담 가능 시간</strong>
                {theme.businessHours}
              </div>
            </div>

            <div className="flex items-start gap-2.5 text-zinc-300 pt-2 border-t border-[#202030]">
              <MapPin className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">학원 위치</strong>
                {theme.address}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-[#1e1e2d] flex items-center justify-between text-xs">
            <span className="text-zinc-400">통화가 어려우신가요?</span>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="text-orange-400 font-bold hover:underline cursor-pointer"
            >
              1:1 온라인 예약 남기기 →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
