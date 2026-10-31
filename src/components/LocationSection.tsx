/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MapPin, Phone, Navigation, Bus, Train, Car, Copy, Check, ExternalLink, Clock, ShieldAlert } from 'lucide-react';
import { ThemeSettings } from '../types';

interface LocationSectionProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  theme,
  onOpenBooking,
  onOpenCallModal,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('서울특별시 강남구 도곡로 184 (도곡동 544) 4층');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="location" className="py-20 md:py-28 bg-[#07070b] border-t border-[#1a1a26] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#181826] border border-[#27273c] mb-4">
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-xs font-semibold tracking-wider text-orange-400 uppercase">
              Location & Campus Tour
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            대치10관 <span style={{ color: theme.primaryColor }}>오시는 길 & 약도</span>
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            강남세브란스병원 사거리 인근, 도곡로 대로변 4층에 위치하고 있습니다.
            방문 전 1:1 상담 예약을 완료하시면 원장단이 준비된 맞춤 분석지와 함께 맞이합니다.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          {/* Visual Interactive Map Graphic (SVG/Vector styled dark map) */}
          <div className="lg:col-span-7 bg-[#0e0e16] border border-[#222232] rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-2">
                <Navigation className="w-4 h-4 text-orange-400" />
                대치10관 주변 상세 약도 (도곡로 184 4F)
              </span>
              <span className="text-[11px] text-orange-400 font-semibold bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/30">
                원클릭 지도 연결 가능
              </span>
            </div>

            {/* Dark Styled Map Canvas */}
            <div className="relative w-full h-[320px] sm:h-[420px] bg-[#14141e] rounded-2xl overflow-hidden border border-[#242436]">
              {/* Grid Roads */}
              <svg 
                className="w-full h-full" 
                viewBox="0 0 800 450" 
                preserveAspectRatio="xMidYMid slice" 
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Major Roads */}
                {/* Dogok-ro (Horizontal main avenue) */}
                <path d="M 0 200 L 800 200" stroke="#2c2c40" strokeWidth="40" strokeLinecap="round" />
                <path d="M 0 200 L 800 200" stroke="#ff6b00" strokeWidth="2" strokeDasharray="10 8" opacity="0.3" />

                {/* Eonju-ro (Gangnam Severance Intersection) */}
                <path d="M 160 0 L 180 450" stroke="#252535" strokeWidth="32" strokeLinecap="round" />
                
                {/* Seolleung-ro (Hanti Station Intersection) */}
                <path d="M 640 0 L 620 450" stroke="#252535" strokeWidth="32" strokeLinecap="round" />

                {/* Road Labels */}
                <text x="400" y="175" fill="#a1a1aa" fontSize="16" fontWeight="bold" textAnchor="middle">도곡로 (Dogok-ro)</text>

                {/* Landmark: Gangnam Severance Hospital */}
                <g transform="translate(30, 60)">
                  <rect width="120" height="80" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="1" />
                  <text x="60" y="38" fill="#94a3b8" fontSize="14" fontWeight="bold" textAnchor="middle">강남세브란스</text>
                  <text x="60" y="58" fill="#64748b" fontSize="12" textAnchor="middle">병원</text>
                </g>

                {/* Landmark: Dogok 1-dong Community Center */}
                <g transform="translate(220, 260)">
                  <rect width="130" height="70" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                  <text x="65" y="32" fill="#a1a1aa" fontSize="13" fontWeight="bold" textAnchor="middle">도곡1동</text>
                  <text x="65" y="52" fill="#71717a" fontSize="12" textAnchor="middle">주민센터</text>
                </g>

                {/* Landmark: Yeoksam Lucky Apartment */}
                <g transform="translate(420, 30)">
                  <rect width="110" height="60" rx="8" fill="#18181b" stroke="#27272a" strokeWidth="1" />
                  <text x="55" y="28" fill="#a1a1aa" fontSize="13" fontWeight="bold" textAnchor="middle">역삼럭키</text>
                  <text x="55" y="46" fill="#71717a" fontSize="12" textAnchor="middle">아파트</text>
                </g>

                {/* Landmark: Daiso (Side by Side) */}
                <g transform="translate(350, 135)">
                  <rect width="85" height="50" rx="6" fill="#450a0a" stroke="#991b1b" strokeWidth="1" />
                  <text x="42.5" y="32" fill="#fca5a5" fontSize="13" fontWeight="bold" textAnchor="middle">다이소</text>
                </g>

                {/* TARGET PIN: GRADE ONE DAECHI 10 */}
                <g transform="translate(470, 185)">
                  <circle cx="0" cy="0" r="32" fill="#ff6b00" opacity="0.15" className="animate-ping" />
                  <circle cx="0" cy="0" r="10" fill="#ff6b00" opacity="0.4" />
                  <path d="M-8,-8 L8,-8 L0,12 Z" fill="#ff6b00" transform="translate(0, -4)" />
                  <circle cx="0" cy="-8" r="6" fill="#ff6b00" stroke="#fff" strokeWidth="2" />
                </g>

                {/* Academy Info Label */}
                <g transform="translate(440, 90)">
                  <rect x="0" y="0" width="180" height="60" rx="10" fill="#09090b" stroke="#ff6b00" strokeWidth="2" />
                  <text x="90" y="26" fill="#ff6b00" fontSize="15" fontWeight="900" textAnchor="middle">그레이드원 대치10관</text>
                  <text x="90" y="46" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">도곡로 184 (4층)</text>
                </g>

                {/* Landmark: Hanti Station */}
                <g transform="translate(630, 240)">
                  <rect width="140" height="80" rx="10" fill="#1c1917" stroke="#44403c" strokeWidth="1.5" />
                  <circle cx="25" cy="40" r="12" fill="#facc15" />
                  <text x="25" y="44" fill="#000" fontSize="11" fontWeight="900" textAnchor="middle">K</text>
                  <text x="80" y="36" fill="#fde68a" fontSize="14" fontWeight="bold" textAnchor="middle">한티역</text>
                  <text x="80" y="56" fill="#a8a29e" fontSize="11" textAnchor="middle">7번출구 도보7분</text>
                </g>

                {/* Landmark: BEK (In front) */}
                <g transform="translate(340, 250)">
                  <rect width="90" height="50" rx="8" fill="#1e1b4b" stroke="#4338ca" strokeWidth="1" />
                  <text x="45" y="32" fill="#e0e7ff" fontSize="13" fontWeight="bold" textAnchor="middle">BEK</text>
                </g>

                {/* Landmark: Starbucks (In front) */}
                <g transform="translate(445, 250)">
                  <rect width="100" height="50" rx="8" fill="#064e3b" stroke="#059669" strokeWidth="1" />
                  <text x="50" y="24" fill="#ecfdf5" fontSize="13" fontWeight="bold" textAnchor="middle">스타벅스</text>
                  <text x="50" y="40" fill="#6ee7b7" fontSize="11" textAnchor="middle">역삼럭키점</text>
                </g>
              </svg>
            </div>

            {/* Quick Map Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-5">
              <a
                href="https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%8F%84%EA%B3%A1%EB%A1%9C%20184"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#161624] hover:bg-[#1f1f33] border border-[#2b2b40] text-xs font-semibold text-green-400 hover:text-green-300 transition-all cursor-pointer"
              >
                <span>네이버 지도 길찾기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <a
                href="https://map.kakao.com/link/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%8F%84%EA%B3%A1%EB%A1%9C%20184"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#161624] hover:bg-[#1f1f33] border border-[#2b2b40] text-xs font-semibold text-yellow-400 hover:text-yellow-300 transition-all cursor-pointer"
              >
                <span>카카오맵 길찾기</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={handleCopyAddress}
                className="col-span-2 sm:col-span-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#161624] hover:bg-[#1f1f33] border border-[#2b2b40] text-xs font-semibold text-zinc-200 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-green-400" />
                    <span className="text-green-400">주소 복사됨!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-orange-400" />
                    <span>주소 복사</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Contact & Transit Details */}
          <div className="lg:col-span-5 space-y-5">
            {/* Direct Big Call Action Card */}
            <div 
              className="bg-gradient-to-br from-[#181826] to-[#111119] border border-orange-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden"
              style={{ boxShadow: `0 8px 30px ${theme.accentGlow}` }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">
                  상담 및 등록 문의
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
              </div>

              <div className="mb-4">
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight mb-1">
                  {theme.phone}
                </div>
                <p className="text-xs text-zinc-400">
                  대치10관 직통 상담 데스크 (평일 14:00~22:00, 주말 10:00~21:00)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={onOpenCallModal}
                  className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  <Phone className="w-4 h-4" />
                  <span>전화 상담 연결</span>
                </button>

                <button
                  onClick={onOpenBooking}
                  className="py-3 px-4 rounded-xl font-bold text-xs sm:text-sm text-white bg-[#222232] hover:bg-[#2c2c40] border border-[#37374e] flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>1:1 방문예약</span>
                </button>
              </div>
            </div>

            {/* Address Box */}
            <div className="bg-[#101018] border border-[#212130] rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-white mb-1">상세 도로명 & 지번 주소</h4>
                  <p className="text-xs text-zinc-300 font-medium">
                    서울특별시 강남구 도곡로 184 (도곡동 544) 4층
                  </p>
                  <p className="text-xs text-zinc-400 mt-1">
                    강남세브란스 사거리 인근, 도곡1동 주민센터 맞은편 4층
                  </p>
                </div>
              </div>
            </div>

            {/* Transit Guide */}
            <div className="bg-[#101018] border border-[#212130] rounded-2xl p-5 space-y-4">
              <div className="flex items-start gap-3">
                <Train className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">지하철 이용 시</h5>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                    • 수인분당선 <strong className="text-zinc-200">한티역 7번 출구</strong>에서 도보 7분 (도곡로 방면)<br />
                    • 3호선·신분당선 <strong className="text-zinc-200">양재역 3번 출구</strong>에서 버스 2정거장 환승
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Bus className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">시내버스 이용 시</h5>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                    • 정류장: <strong className="text-zinc-200">'도곡1동주민센터'</strong> 또는 <strong className="text-zinc-200">'역삼럭키아파트앞'</strong> 하차<br />
                    • 간선버스: 147, 461, 340번 / 지선버스: 4432번
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Car className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white">주차 안내</h5>
                  <p className="text-xs text-zinc-400 leading-relaxed mt-0.5">
                    • 학원 건물 내 <strong className="text-zinc-200">기계식 주차타워 완비</strong> (상담 방문 고객 무료 주차 지원)<br />
                    • 대형 SUV 또는 외제 대형 세단의 경우 인근 유료 공영주차장 지원 가능
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
