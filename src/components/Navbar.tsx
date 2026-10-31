/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Phone, Calendar, Settings2, Menu, X, Sparkles, MapPin, ChevronRight } from 'lucide-react';
import { ThemeSettings } from '../types';

interface NavbarProps {
  theme: ThemeSettings;
  onOpenBooking: () => void;
  onOpenCallModal: () => void;
  onOpenAdmin: () => void;
  currentPage?: 'home' | 'notice';
  onNavigateToHome?: () => void;
  onNavigateToNoticePage?: (postId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onOpenBooking,
  onOpenCallModal,
  onOpenAdmin,
  currentPage = 'home',
  onNavigateToHome,
  onNavigateToNoticePage,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: '원장소개', href: '#about' },
    { label: '1:1 맞춤 시스템', href: '#system' },
    { label: '커리큘럼', href: '#curriculum' },
    { label: '공지사항', href: '#notice', isNoticePage: true },
    { label: '오시는 길', href: '#location' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isNoticePage?: boolean) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (isNoticePage && onNavigateToNoticePage) {
      onNavigateToNoticePage();
      return;
    }

    if (currentPage === 'notice' && onNavigateToHome) {
      onNavigateToHome();
      setTimeout(() => {
        const element = document.querySelector(href);
        if (element) {
          const navHeight = 80;
          const elementPosition = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: elementPosition - navHeight,
            behavior: 'smooth',
          });
        }
      }, 50);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-[#07070a]/90 border-b border-[#1f1f2a] transition-all">
      {/* Top Notice Banner */}
      {theme.showNotificationBanner && theme.notificationBanner && (
        <div 
          className="text-xs font-medium py-2 px-4 text-center border-b border-orange-500/20 flex items-center justify-center gap-2"
          style={{ backgroundColor: `${theme.primaryColor}15`, color: '#ffedd5' }}
        >
          <span 
            className="w-2 h-2 rounded-full animate-ping"
            style={{ backgroundColor: theme.primaryColor }}
          />
          <span>{theme.notificationBanner}</span>
          <button 
            onClick={onOpenBooking}
            className="underline hover:text-white transition-colors ml-1 font-semibold cursor-pointer inline-flex items-center text-xs"
          >
            상담 신청 <ChevronRight className="w-3 h-3 ml-0.5" />
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              if (onNavigateToHome) onNavigateToHome();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-3 group"
          >
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-black text-lg shadow-lg transition-transform group-hover:scale-105"
              style={{ 
                background: `linear-gradient(135deg, ${theme.primaryColor}, #ff8833)`,
                boxShadow: `0 0 20px ${theme.accentGlow}`
              }}
            >
              G1
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  {theme.academyName}
                </span>
                <span 
                  className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider text-black"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  도곡
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 font-medium truncate max-w-[220px] sm:max-w-xs">
                {theme.subTitle}
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isNoticePage)}
                className={`text-sm font-medium transition-colors relative py-1 group ${
                  link.isNoticePage && currentPage === 'notice'
                    ? 'text-white font-bold'
                    : 'text-zinc-300 hover:text-white'
                }`}
              >
                {link.label}
                <span 
                  className={`absolute bottom-0 left-0 transition-all duration-300 ${
                    link.isNoticePage && currentPage === 'notice' ? 'w-full h-0.5' : 'w-0 h-0.5 group-hover:w-full'
                  }`}
                  style={{ backgroundColor: theme.primaryColor }}
                />
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Quick Call Button */}
            <button
              onClick={onOpenCallModal}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-zinc-200 bg-[#15151e] hover:bg-[#1f1f2d] border border-[#2b2b3b] transition-all hover:border-orange-500/40 cursor-pointer"
              title="상담전화 연결"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" />
              <span className="tracking-wide font-mono text-xs">{theme.phone}</span>
            </button>

            {/* Booking Button */}
            <button
              onClick={onOpenBooking}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-black transition-all hover:brightness-110 active:scale-95 cursor-pointer shadow-md"
              style={{
                backgroundColor: theme.primaryColor,
                boxShadow: `0 4px 14px ${theme.accentGlow}`,
              }}
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>1:1 상담예약</span>
            </button>

            {/* Admin & Customizer Settings Button */}
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-xl text-zinc-400 hover:text-white bg-[#15151e] hover:bg-[#20202e] border border-[#2b2b3b] transition-all cursor-pointer"
              title="테마 색상 / 게시글 작성 / SEO 관리자"
            >
              <Settings2 className="w-4 h-4 text-orange-400" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 rounded-lg text-zinc-400 bg-[#161622] border border-[#272738]"
              title="관리자 설정"
            >
              <Settings2 className="w-4 h-4 text-orange-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white bg-[#161622] border border-[#272738]"
              aria-label="메뉴 열기"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0c0c12] border-b border-[#252536] px-4 pt-3 pb-6 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href, link.isNoticePage)}
                className={`font-medium py-2 px-3 rounded-lg text-sm transition-colors ${
                  link.isNoticePage && currentPage === 'notice'
                    ? 'bg-orange-500/15 text-orange-400 font-bold border border-orange-500/30'
                    : 'text-zinc-200 hover:text-white hover:bg-[#1a1a26]'
                }`}
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-[#202030] flex flex-col gap-2.5">
              <a
                href={`tel:${theme.phone.replace(/[^0-9]/g, '')}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-[#161622] border border-orange-500/30 text-white font-semibold text-sm"
              >
                <Phone className="w-4 h-4 text-orange-400" />
                <span>전화 바로 걸기 ({theme.phone})</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm text-black"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <Calendar className="w-4 h-4" />
                <span>1:1 맞춤 상담예약 신청</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
