/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { X } from 'lucide-react';
import { ThemeSettings } from '../types';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'terms' | 'privacy';
  theme: ThemeSettings;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  type,
  theme,
}) => {
  if (!isOpen) return null;

  const content = {
    terms: {
      title: '이용약관',
      body: `
        제1조 (목적)
        본 약관은 그레이드원 대치10관(이하 "학원")이 제공하는 교육 서비스 및 관련 제반 서비스의 이용 조건과 절차, 이용자와 학원의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.

        제2조 (용어의 정의)
        1. "서비스"라 함은 학원이 제공하는 온/오프라인 교육 서비스 및 관련 정보를 의미합니다.
        2. "이용자"라 함은 본 약관에 따라 학원이 제공하는 서비스를 이용하는 학생 및 학부모를 의미합니다.

        제3조 (약관의 효력 및 변경)
        1. 본 약관은 서비스 화면에 게시하거나 기타의 방법으로 이용자에게 공지함으로써 효력이 발생합니다.
        2. 학원은 관련 법령을 위배하지 않는 범위에서 본 약관을 개정할 수 있습니다.

        제4조 (서비스 제공 및 중단)
        1. 학원은 연중무휴, 1일 24시간 서비스 제공을 원칙으로 하나, 시설의 보수 점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스 제공을 일시적으로 중단할 수 있습니다.
      `,
    },
    privacy: {
      title: '개인정보처리방침',
      body: `
        그레이드원 대치10관은 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.

        제1조 (개인정보의 처리 목적)
        학원은 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며 이용 목적이 변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
        1. 상담 예약 및 상담 서비스 제공
        2. 수강생 관리 및 학습 리포트 제공
        3. 학원 공지사항 및 이벤트 정보 안내

        제2조 (처리하는 개인정보의 항목)
        학원은 다음의 개인정보 항목을 처리하고 있습니다.
        - 필수항목: 이름(학생/학부모), 연락처, 학교명, 학년
        - 선택항목: 성적 정보, 학습 고민 사항

        제3조 (개인정보의 처리 및 보유 기간)
        학원은 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
      `,
    },
  };

  const active = content[type];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#101018] border border-[#27273c] w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-5 border-b border-[#202030] flex items-center justify-between bg-[#141422]">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span 
              className="w-1.5 h-6 rounded-full" 
              style={{ backgroundColor: theme.primaryColor }}
            />
            {active.title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-[#202030] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
          <div className="prose prose-invert prose-sm max-w-none">
            {active.body.split('\n').map((line, i) => (
              <p key={i} className="text-zinc-400 leading-relaxed mb-3 whitespace-pre-wrap">
                {line.trim()}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#1e1e2d] flex justify-end bg-[#0c0c14]">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl text-xs font-bold text-black transition-all hover:brightness-110 active:scale-95 cursor-pointer"
            style={{ backgroundColor: theme.primaryColor }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};
