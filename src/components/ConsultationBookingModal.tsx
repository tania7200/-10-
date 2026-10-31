/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Clock, User, Phone, CheckCircle, ArrowRight, ShieldCheck, MapPin, Sparkles } from 'lucide-react';
import { ConsultationBooking, GradeLevel, TargetTrack, ThemeSettings } from '../types';

interface ConsultationBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitBooking: (booking: ConsultationBooking) => void;
  defaultTrack?: TargetTrack;
  theme: ThemeSettings;
}

export const ConsultationBookingModal: React.FC<ConsultationBookingModalProps> = ({
  isOpen,
  onClose,
  onSubmitBooking,
  defaultTrack = '대치동 1:1 개별맞춤 클리닉',
  theme,
}) => {
  const [step, setStep] = useState<number>(1);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string>('');

  const [studentName, setStudentName] = useState<string>('');
  const [schoolName, setSchoolName] = useState<string>('');
  const [grade, setGrade] = useState<GradeLevel>('고등 1학년');
  const [targetTrack, setTargetTrack] = useState<TargetTrack>(defaultTrack);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [mathConcern, setMathConcern] = useState<string>('');
  const [parentName, setParentName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [preferredDate, setPreferredDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [preferredTime, setPreferredTime] = useState<string>('16:00');

  if (!isOpen) return null;

  const grades: GradeLevel[] = [
    '초등 4~5학년',
    '초등 6학년',
    '중등 1학년',
    '중등 2학년',
    '중등 3학년',
    '고등 1학년',
    '고등 2학년',
    '고등 3학년 / N수',
    '국제학교 / 유학생 (IB, AP, SAT)',
  ];

  const tracks: TargetTrack[] = [
    '대치동 1:1 개별맞춤 클리닉',
    '강남 8학군 고등 내신 1등급 집중반',
    '초등 최상위 심화 & KMO',
    '중등 내신 만점 & 고등 선행',
    '영재고·과고·전국자사고 대비반',
    '국제학교 IB DP Math (AA/AI HL·SL)',
    '국제학교 AP Calculus AB·BC / SAT Math',
    '수능·평가원 수학 킬러 극복반',
  ];

  const timeSlots = [
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName || !phone || !parentName) {
      alert('학생 이름, 학부모 성함, 연락처를 모두 입력해 주세요.');
      return;
    }

    setIsSubmitting(true);
    const newId = `G1-${Date.now().toString().slice(-6)}`;
    const fullCurrentLevel = `${schoolName ? `[${schoolName}] ` : ''}${currentLevel}`;

    try {
      // 1. Send to Formspree
      await fetch('https://formspree.io/f/myeedlql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bookingId: newId,
          studentName,
          parentName,
          phone,
          grade,
          targetTrack,
          currentLevel: fullCurrentLevel,
          mathConcern,
          preferredDate,
          preferredTime,
          _subject: `[신규 상담예약] ${studentName} 학생 (${grade})`,
        }),
      });

      // 2. Local State & Storage Update
      const newBooking: ConsultationBooking = {
        id: newId,
        studentName,
        parentName,
        phone,
        grade,
        targetTrack,
        currentLevel: fullCurrentLevel,
        mathConcern,
        preferredDate,
        preferredTime,
        status: '접수대기',
        createdAt: new Date().toISOString().replace('T', ' ').slice(0, 16),
        adminNote: '',
      };

      onSubmitBooking(newBooking);
      setBookingId(newId);
      setIsSuccess(true);
    } catch (error) {
      console.error('Form submission failed', error);
      alert('상담 예약 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setStep(1);
    setStudentName('');
    setSchoolName('');
    setCurrentLevel('');
    setMathConcern('');
    setParentName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#101018] border border-[#27273c] w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[92vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#202030] flex items-center justify-between bg-[#141420]">
          <div className="flex items-center gap-3">
            <div 
              className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-black text-sm"
              style={{ backgroundColor: theme.primaryColor }}
            >
              G1
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">1:1 심층 상담 & 레벨테스트 예약</h3>
              <p className="text-xs text-zinc-400">그레이드원 대치10관 (도곡로 184 4층)</p>
            </div>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#202030] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-6">
              <div 
                className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-5 text-black"
                style={{ backgroundColor: theme.primaryColor }}
              >
                <CheckCircle className="w-10 h-10" />
              </div>

              <h4 className="text-2xl font-black text-white mb-2">상담 예약이 정상 접수되었습니다!</h4>
              <p className="text-xs text-orange-400 font-mono mb-4">예약 번호: {bookingId}</p>

              <div className="bg-[#161622] border border-[#262638] rounded-2xl p-5 text-left mb-6 space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">학생명:</span>
                  <span className="text-white font-semibold">{studentName} ({grade})</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">희망 과정:</span>
                  <span className="text-orange-400 font-semibold">{targetTrack}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">예약 일시:</span>
                  <span className="text-white font-semibold">{preferredDate} {preferredTime}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-zinc-400">학부모 연락처:</span>
                  <span className="text-white font-semibold">{phone}</span>
                </div>
                <div className="flex justify-between text-xs pt-2 border-t border-[#252536]">
                  <span className="text-zinc-400">방문 위치:</span>
                  <span className="text-zinc-200">서울시 강남구 도곡로 184 4층</span>
                </div>
              </div>

              <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-left text-xs text-orange-200 mb-6">
                💡 <strong>방문 시 지참물 안내:</strong> 학생의 최근 학교 시험지(중간/기말)와 평소 풀이 연습장을 지참해 주시면 원장단이 1:1 사고과정 역추적 진단을 더욱 정확하게 진행해 드립니다.
              </div>

              <button
                onClick={handleResetAndClose}
                className="w-full py-3.5 rounded-xl text-sm font-bold text-black transition-all hover:brightness-110 cursor-pointer"
                style={{ backgroundColor: theme.primaryColor }}
              >
                확인 및 완료
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Stepper progress */}
              <div className="flex items-center justify-between mb-2">
                {[
                  { num: 1, label: '학생 정보' },
                  { num: 2, label: '희망 과정' },
                  { num: 3, label: '일시 및 연락처' },
                ].map((s) => (
                  <div key={s.num} className="flex items-center gap-2">
                    <div 
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        step >= s.num ? 'text-black font-extrabold' : 'bg-[#1e1e2c] text-zinc-500'
                      }`}
                      style={step >= s.num ? { backgroundColor: theme.primaryColor } : {}}
                    >
                      {s.num}
                    </div>
                    <span className={`text-xs ${step >= s.num ? 'text-white font-semibold' : 'text-zinc-500'}`}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      학생 성함 <span className="text-orange-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="예: 김민우"
                      className="w-full px-4 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      재학 중인 학교명 (선택)
                    </label>
                    <input
                      type="text"
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      placeholder="예: 휘문고, 하나고, 서울예고, 서울국제학교 등"
                      className="w-full px-4 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      학년 구분 <span className="text-orange-400">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {grades.map((g) => (
                        <button
                          type="button"
                          key={g}
                          onClick={() => setGrade(g)}
                          className={`py-2 px-2.5 rounded-xl text-xs font-medium text-center border transition-all cursor-pointer ${
                            grade === g
                              ? 'border-orange-500 text-white bg-orange-500/15 font-bold'
                              : 'border-[#262638] text-zinc-400 bg-[#161622] hover:bg-[#1e1e2c]'
                          }`}
                        >
                          {g}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={!studentName.trim()}
                    onClick={() => setStep(2)}
                    className="w-full mt-4 py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    style={{ backgroundColor: theme.primaryColor }}
                  >
                    <span>다음: 과정 선택</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-2">
                      희망 커리큘럼 <span className="text-orange-400">*</span>
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                      {tracks.map((t) => (
                        <div
                          key={t}
                          onClick={() => setTargetTrack(t)}
                          className={`p-3 rounded-xl border text-xs cursor-pointer flex items-center justify-between transition-all ${
                            targetTrack === t
                              ? 'border-orange-500 bg-orange-500/15 text-white font-bold'
                              : 'border-[#242436] bg-[#161622] text-zinc-400 hover:bg-[#1b1b28]'
                          }`}
                        >
                          <span>{t}</span>
                          {targetTrack === t && <CheckCircle className="w-4 h-4 text-orange-400" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      현재 성적 또는 진도 상황 (선택)
                    </label>
                    <input
                      type="text"
                      value={currentLevel}
                      onChange={(e) => setCurrentLevel(e.target.value)}
                      placeholder="예: 중등 95점 / 모의고사 2등급 / 수I 1회독 완료"
                      className="w-full px-4 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                      가장 고민되는 수학적 약점
                    </label>
                    <textarea
                      rows={2}
                      value={mathConcern}
                      onChange={(e) => setMathConcern(e.target.value)}
                      placeholder="예: 고난도 킬러문항에서 시간이 부족하고 서술형 풀이가 불안합니다."
                      className="w-full px-4 py-2 bg-[#171724] border border-[#28283c] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-1/3 py-3 rounded-xl text-xs font-semibold text-zinc-400 bg-[#161622] border border-[#28283c] hover:bg-[#1d1d2b] cursor-pointer"
                    >
                      이전
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="w-2/3 py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 cursor-pointer"
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <span>다음: 상담 일정</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        학부모 성함 <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={parentName}
                        onChange={(e) => setParentName(e.target.value)}
                        placeholder="예: 이선영"
                        className="w-full px-4 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        학부모 연락처 <span className="text-orange-400">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="010-0000-0000"
                        className="w-full px-4 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-sm text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        희망 상담 날짜
                      </label>
                      <input
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="w-full px-3 py-2 bg-[#171724] border border-[#28283c] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-300 mb-1.5">
                        희망 시간대
                      </label>
                      <select
                        value={preferredTime}
                        onChange={(e) => setPreferredTime(e.target.value)}
                        className="w-full px-3 py-2.5 bg-[#171724] border border-[#28283c] rounded-xl text-xs text-white focus:outline-none focus:border-orange-500"
                      >
                        {timeSlots.map((t) => (
                          <option key={t} value={t} className="bg-[#171724] text-white">
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="p-3.5 bg-[#161622] rounded-xl border border-[#242436] text-[11px] text-zinc-400 space-y-1">
                    <p className="flex items-center gap-1.5 text-zinc-300 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-orange-400" />
                      개인정보 수집 및 상담 안내
                    </p>
                    <p>
                      입력하신 정보는 오직 1:1 진단 상담 안내 및 일정 확인을 위해서만 활용되며 안전하게 보호됩니다.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="w-1/3 py-3 rounded-xl text-xs font-semibold text-zinc-400 bg-[#161622] border border-[#28283c] hover:bg-[#1d1d2b] cursor-pointer"
                    >
                      이전
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-2/3 py-3 rounded-xl text-sm font-bold text-black flex items-center justify-center gap-2 transition-all hover:brightness-110 shadow-lg ${
                        isSubmitting ? 'opacity-70 cursor-wait' : 'cursor-pointer'
                      }`}
                      style={{ backgroundColor: theme.primaryColor }}
                    >
                      <span>{isSubmitting ? '처리 중...' : '1:1 상담 예약 신청 완료'}</span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
