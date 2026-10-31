/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {
  Post,
  ThemeSettings,
  SeoSettings,
  CurriculumTrack,
  SuccessStory,
  FacultyMember,
  ConsultationBooking,
} from '../types';

export const initialThemeSettings: ThemeSettings = {
  primaryColor: '#ff6b00',
  accentGlow: 'rgba(255, 107, 0, 0.25)',
  bgTone: 'pure-black',
  fontFamily: 'pretendard',
  academyName: '그레이드원 대치10관 수학학원',
  subTitle: '초·중·고 내신대비 & 1:1 개별맞춤 & 명문고·국제학교 전문',
  heroHeadline: '그레이드원 대치10관 수학학원, 수학의 한계를 넘는 개별 맞춤 솔루션',
  heroSubheadline: '대치동 최상위 1%가 증명한 킬러문항 정복 로드맵과 강남 8학군 내신·특목고·국제학교(IB/AP) 완벽 대비',
  phone: '02-573-3133',
  address: '서울특별시 강남구 도곡로 184 (도곡동 544) 4층',
  detailAddress: '강남세브란스 사거리 인근, 도곡1동 주민센터 맞은편 4층 (기계식 주차 가능)',
  businessHours: '평일 14:00 - 22:00 | 주말 10:00 - 21:00 (사전예약 상담제)',
  notificationBanner: '📢 2026학년도 1학기 내신대비반 & 국제학교(IB/AP) 봄학기 소수정예 6인 마감 임박',
  showNotificationBanner: true,
};

export const initialSeoSettings: SeoSettings = {
  metaTitle: '그레이드원 대치10관 수학학원 | 초중고 내신대비·개별맞춤·국제학교 전문',
  metaDescription: '대치동 초중고 내신 1등급 완성, 개별맞춤 클리닉, 명문고/특목고 합격 다수 배출, 국제학교 IB·AP·SAT 수학 전문. 서울 강남구 도곡로 184 4층. 상담문의 02-573-3133',
  metaKeywords: '그레이드원 대치10관, 대치동 수학학원, 도곡동 수학학원, 강남8학군 내신대비, 대치동 1:1 수학, IB Math 대치, AP Calculus, 외대부고 수학, 휘문고 수학, 중동고 수학',
  ogTitle: '그레이드원 대치10관 수학학원 - 대치동 수학의 절대 기준',
  ogDescription: '오직 1:1 학생 맞춤형 커리큘럼과 철저한 오답 역추적 클리닉. 명문고·의대·해외 명문대 합격생들이 선택한 학원.',
  siteUrl: 'https://gradeone-daechi10.edu',
};

export const initialPosts: Post[] = [
  {
    id: 'post-1',
    title: '[필독] 2026학년도 1학기 중간고사 강남8학군(휘문·중동·단대부·숙명) 내신 만점 대비반 개강',
    category: '공지사항',
    summary: '단순 양치기가 아닌 10개년 기출 변형과 대치동 킬러 문항 1:1 오답 역추적 시스템으로 내신 1등급을 결정짓습니다.',
    content: `안녕하세요, 그레이드원 대치10관 수학학원입니다.

2026학년도 1학기 내신에서 확실한 1등급과 전교권을 목표로 하는 학생들을 위한 '강남 8학군 내신 압도적 1등급 대비반'이 전격 개강합니다.

■ 대상 고교: 휘문고, 중동고, 단대부고, 경기고, 숙명여고, 중산고, 은광여고, 진선여고 등
■ 핵심 프로그램:
1. 학교별 최근 10개년 기출 경향 및 변형 문항 완전 정복
2. 부교재 및 자체 프린트 쌍둥이/유사 변형 문항 실전 테스트
3. 시험 4주 전부터 매주 주말 100분 실전 모의고사 & 1:1 클리닉
4. 서술형 감점 제로(Zero)를 위한 스텝별 풀이과정 정밀 첨삭

■ 수업 인원: 클래스당 최대 6인 소수정예 (선착순 마감)
■ 문의 및 레벨테스트 예약: 02-573-3133 (도곡로 184 4층)`,
    author: '대치10관 원장단',
    date: '2026-03-02',
    views: 1420,
    isPinned: true,
    tags: ['내신대비', '강남8학군', '중간고사', '휘문고', '중동고', '숙명여고'],
    imageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
  },
  {
    id: 'post-2',
    title: '[합격스토리] 2025학년도 서울과고 & 외대부고 동시 합격생의 3개년 개별맞춤 로드맵 대공개',
    category: '입시/합격소식',
    summary: '중1 수학 70점대에서 출발하여 대치10관의 1:1 개념 역추적과 심화 KMO 클리닉을 거쳐 영재·자사고 합격 신화를 만든 실제 사례입니다.',
    content: `“처음 그레이드원에 왔을 때 아이는 계산 실수가 잦고 고난도 문항만 보면 얼어붙었습니다. 하지만 원장님의 1:1 역추적 오답노트와 자체 변형 심화 훈련 덕분에 서울과고 3단계 캠프까지 거뜬히 통과했습니다.” (합격생 K군 학부모님 수기 中)

■ 합격생 이력:
- 입학 당시: 중1 1학기 내신 78점 (개념 부실 및 복합 응용력 부족)
- 그레이드원 처방:
  1) 연산/공식 암기 탈피 → 유도 원리 증명 중심 개별 티칭
  2) 오답이 발생한 사고 과정(Thinking Trace)을 직접 말로 설명하는 메타인지 클리닉
  3) KMO 및 고등 수학(상/하) 심화 연계 문제풀이
- 최종 결과: 서울과학고등학교 합격 & 외대부고 자연계열 최종 합격!

그레이드원 대치10관은 공장식 대형 강의가 아닌, 학생 한 명 한 명의 학습 성향과 취약점에 맞춘 정밀 설계를 약속합니다.`,
    author: '입시전략연구소',
    date: '2026-02-18',
    views: 2890,
    isPinned: true,
    tags: ['합격수기', '서울과고', '외대부고', '영재고합격', '개별맞춤'],
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
  },
  {
    id: 'post-3',
    title: '[국제학교] IB Math AA HL 7점 만점 & AP Calculus BC 5점 연속 배출 전략',
    category: '국제학교',
    summary: 'Chadwick, SIS, KIS, NLCS, BHA 등 국내외 명문 국제학교 학생들을 위한 영어-한국어 병용 수학 전문 클리닉.',
    content: `국제학교 수학은 국내 일반고 수학과 평가 방식 및 요구되는 수학적 사고의 결이 완전히 다릅니다.

■ 국제학교 전문 프로그램의 특장점:
1. IB DP Mathematics: Analysis and Approaches (AA) HL & SL / Applications and Interpretation (AI)
   - Internal Assessment (IA) 주제 선정부터 통계적 모델링 및 첨삭 지도
   - Paper 1 (Non-Calculator) 발상력 & Paper 2, 3 (Calculator & Proof) 고득점 훈련
2. AP Calculus AB / BC & AP Statistics
   - 5점(Extremely Well Qualified) 달성을 위한 FRQ(자유응답형) 정밀 채점 기준 분석
3. AMC 10 / 12 & AIME 경시대회 집중반
   - 미국 명문대 공대 및 컴퓨터과학과 입시 필수 스펙 대비

대치10관의 국제학교 전담 강사진은 전원 영미권 명문대 공학/수학 전공자로서 수준 높은 이중언어 코칭을 제공합니다.`,
    author: '국제수학전문센터',
    date: '2026-02-05',
    views: 1850,
    isPinned: false,
    tags: ['IB수학', 'APCalculus', '국제학교', 'AMC10', '채드윅', 'KIS', 'SIS'],
    imageUrl: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
  },

  {
    id: 'post-6',
    title: '[초등심화] 초등 5·6학년 영재원 및 중등 선행 심화 클리닉 10인 소수정예 모집',
    category: '공지사항',
    summary: '초등 시기 잘못 들인 연산 습관을 바로잡고 증명 기반 논리적 사고력을 극대화하는 최상위 도약 프로그램.',
    content: `초등 고학년 시기는 단순 진도빼기보다 '깊게 생각하는 끈기'를 형성하는 가장 결정적인 골든타임입니다.

■ 프로그램 특징:
- 점프셈, 디딤돌 최상위, 3% 올림피아드 단계별 마스터
- 스스로 질문하고 풀이 경로를 도식화하는 생각하는 수학 노트 훈련
- 중등 대수와 기하의 유기적 연결로 중·고등 진학 시 내신 흔들림 제로화

■ 개강일: 매주 화/목 또는 수/금 선택제 (주말 클리닉 무료 지원)`,
    author: '초중등영재센터',
    date: '2025-12-28',
    views: 1670,
    isPinned: false,
    tags: ['초등수학', '영재원', '중등선행', '대치초등수학'],
    imageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=1200&q=80',
    isPublished: true,
  },
];

export const initialCurriculum: CurriculumTrack[] = [
  {
    id: 'track-1',
    title: '초등 최상위 심화 & KMO 기초반',
    target: '초등 4학년 ~ 6학년',
    badge: '영재·사고력 완성',
    description: '기계적 문제풀이를 지양하고 수학적 원리와 정의를 스스로 유도하는 논리 중심 심화 클리닉.',
    features: [
      '최상위 수학 / 에이급 수학 / 3% 올림피아드 정밀 분석',
      '문장제 서술형 풀이 1:1 정밀 첨삭 지도',
      '단순 연산 탈피, 중등 대수와의 유기적 개념 연계',
      '매 단원 통과 인증제 및 오답 역추적 3회 반복',
    ],
    recommendedFor: '영재교육원, 특목고 장기 로드맵을 설계하는 초등 최상위권',
    subjects: ['초등 심화수학', 'KMO/성대경시 기초', '중등 1·2 대수 연계'],
    icon: 'Sparkles',
  },
  {
    id: 'track-2',
    title: '중등 내신 올A & 고등 조기선행반',
    target: '중학교 1학년 ~ 3학년',
    badge: '대치동 내신 만점',
    description: '대치·도곡·역삼 주요 중학교 기출 100% 분석 및 고등 수학 1등급을 위한 탄탄한 기반 구축.',
    features: [
      '대치중, 역삼중, 도곡중, 휘문중, 단대부중 기출 완벽 대비',
      '공통수학1·2 개념 원리 정밀 증명 및 자체 N제 훈련',
      '실전 시간 배분(45분 시험 대비 35분 마킹 훈련) 시스템',
      '취약 단원 1:1 맞춤형 보충 및 무한 유사변형 클리닉',
    ],
    recommendedFor: '중등 내신 만점 유지 및 고교 진학 전 고등수학 심화 완성을 노리는 학생',
    subjects: ['중등 심화 기하/대수', '공통수학1', '공통수학2', '수학I 선행'],
    icon: 'GraduationCap',
  },
  {
    id: 'track-3',
    title: '강남 8학군 고등 내신 1등급 집중반',
    target: '고등학교 1학년 ~ 2학년',
    badge: '명문고 내신 1등급',
    description: '휘문, 중동, 단대부, 숙명, 경기 등 전국 최고 난도 내신 시험에서 실수 없는 1등급 달성.',
    features: [
      '강남 8학군 15개 고교 최근 7개년 기출 DB 전면 분석',
      '학교별 부교재(올림포스, EBS, 수능완성) 고난도 변형 문제 제공',
      '1등급을 가르는 서술형 감점 요소 사전 차단 첨삭',
      '주말 무료 심야 클리닉 운영 및 개인별 밀착 질의응답',
    ],
    recommendedFor: '대치동 내신 등급을 2~3등급에서 확실한 1등급으로 끌어올리고자 하는 학생',
    subjects: ['공통수학1·2', '수학I', '수학II', '미적분', '확률과 통계'],
    icon: 'Flame',
  },
  {
    id: 'track-4',
    title: '영재고 · 과고 · 전국자사고 대비반',
    target: '초등 6학년 ~ 중학교 3학년',
    badge: '특목고 합격률 90%+',
    description: '서울과고, 경기과고, 하나고, 외대부고, 상산고 입학 전형별 맞춤 수학 심층 구술 및 창의 문제 해결력.',
    features: [
      '영재학교 2·3단계 창의적 문제해결력 검사 기출 완벽 분해',
      '전국단위 자사고 수학 심층 면접 구술 모의평가',
      '대학 수준의 고급 수학 개념을 중학생 눈높이로 시각화 티칭',
      '합격 선배들의 1:1 멘토링 및 자기소개서 수학 영역 조언',
    ],
    recommendedFor: '영재고/과고 2차 지필 및 자사고 심층 면접에서 차별화된 역량을 증명할 학생',
    subjects: ['고등 KMO 1차', '창의융합수학', '기하학 증명', '조합론'],
    icon: 'Trophy',
  },
  {
    id: 'track-5',
    title: '국제학교 & 유학 수학 전문관',
    target: '국제학교 (G6-G12) & 해외 유학생',
    badge: 'IB 7점 만점 & AP 5점',
    description: 'Chadwick, SFS, SIS, KIS, NLCS, 미국 보딩스쿨 재학생을 위한 영어 기반 프리미엄 수학 코칭.',
    features: [
      'IB DP Math AA / AI (Higher Level & Standard Level) 전담 지도',
      'AP Calculus AB/BC, AP Statistics 만점 대비 FRQ 집중 분석',
      'SAT Math 800점 만점 및 AMC 10/12, AIME 대비 클리닉',
      '수학 Internal Assessment (IA) 데이터 분석 및 구조화 컨설팅',
      '방학 특강 및 학기 중 온라인/오프라인 하이브리드 수업 가능',
    ],
    recommendedFor: '해외 명문대(Ivy League, Top 30) 및 명문 공대 진학을 목표로 하는 국제학교 학생',
    subjects: ['IB Math AA HL/SL', 'AP Calculus BC', 'SAT Math', 'AMC 10/12', 'IGCSE Math'],
    icon: 'Globe',
  },
  {
    id: 'track-6',
    title: '수능 & 평가원 킬러/준킬러 극복반',
    target: '고등 3학년 & N수생',
    badge: '수능 수학 만점',
    description: 'EBS 연계와 최신 평가원 트렌드를 반영한 킬러 22번, 30번 15분 컷 솔루션 및 시간 단축 테크닉.',
    features: [
      '최근 5개년 6·9·수능 평가원 전 문항 행동영역별 알고리즘 체화',
      '자체 제작 고퀄리티 파이널 실전 모의고사 30회분',
      '준킬러(12~14번, 20~21번) 풀이 시간 25분 이내 단축 훈련',
      '수능 당일 멘탈 관리 및 오답 빈도 역추적 카드',
    ],
    recommendedFor: '수능 1등급 안정화 및 원점수 96~100점 의치한약수 진학을 목표로 하는 수험생',
    subjects: ['수능 수학I·II', '미적분 킬러', '기하 킬러', '확통 실전'],
    icon: 'Target',
  },
];

export const initialSuccessStories: SuccessStory[] = [
  {
    id: 'succ-1',
    studentName: '김○우 학생',
    previousSchool: '역삼중 졸업',
    admittedSchool: '서울과학고등학교 최종 합격',
    year: '2025학년도',
    scoreJump: '중1 78점 → 영재고 캠프 최고등급',
    badge: '서울과고 합격',
    quote: '대치10관의 오답 역추적 클리닉이 없었다면 제 증명력의 구멍을 결코 찾지 못했을 것입니다.',
    curriculumUsed: '초등 심화 → 영재고 심화 구술 클리닉 3년 집중 과정',
    reviewDetail: '기존 대형학원에서는 질문하기 눈치보이고 숙제 양만 과도했습니다. 그레이드원에서는 1:1로 원장님께서 제가 왜 이 풀이를 떠올렸는지 역질문해주셔서 논리적 사고의 틀이 잡혔습니다.',
  },
  {
    id: 'succ-2',
    studentName: '이○서 학생',
    previousSchool: '휘문고 2학년',
    admittedSchool: '전교 1등 (1등급 유지)',
    year: '2025학년도',
    scoreJump: '내신 3등급(68점) → 1등급(98.5점)',
    badge: '휘문고 전교 1등',
    quote: '휘문고 내신은 타 학교보다 킬러가 훨씬 잔인합니다. 학교 부교재 쌍둥이 변형 문제 덕분에 시험장에서 웃으며 풀었습니다.',
    curriculumUsed: '강남 8학군 고등 내신 1등급 집중반',
    reviewDetail: '대치10관만의 학교별 킬러 변형 100제 훈련을 거치며 시험장에서 문제만 봐도 출제의도가 한눈에 보였습니다.',
  },
  {
    id: 'succ-3',
    studentName: '최○원 학생',
    previousSchool: '채드윅 송도국제학교 (Chadwick)',
    admittedSchool: 'Cornell University (공과대학) 합격',
    year: '2025학년도',
    scoreJump: 'IB Math Predicted 5점 → Final 7점 만점',
    badge: '아이비리그 코넬대 합격',
    quote: 'IB Math AA HL의 방대한 분량과 까다로운 IA 작성까지 완벽하게 밀착 가이드해주셨습니다.',
    curriculumUsed: '국제학교 IB DP Math AA HL & AP Calculus BC',
    reviewDetail: '영어로 진행되는 수업과 IA 주제에 대한 피드백이 미국 대학 원서 제출 시 가장 강력한 수학적 무기가 되었습니다.',
  },
  {
    id: 'succ-4',
    studentName: '박○준 학생',
    previousSchool: '도곡중 졸업',
    admittedSchool: '외대부고(자연계열) 최종 합격',
    year: '2025학년도',
    scoreJump: '중등 내신 3년 전과목 All A 및 심화 면접 통과',
    badge: '외대부고 합격',
    quote: '자사고 구술 면접에서 제시된 변별력 수학 문제를 그레이드원에서 연습한 발상법 그대로 막힘없이 답변했습니다.',
    curriculumUsed: '중등 심화 & 전국자사고 심층 구술반',
    reviewDetail: '면접관의 꼬리질문에 당황하지 않고 개념의 본질로 돌아가 답변하는 훈련을 매주 실전처럼 진행한 것이 결정적이었습니다.',
  },
  {
    id: 'succ-5',
    studentName: '정○민 학생',
    previousSchool: '단대부고 졸업',
    admittedSchool: '서울대학교 의예과 정시 합격',
    year: '2025학년도',
    scoreJump: '수능 수학 100점 만점',
    badge: '서울대 의대 합격',
    quote: '수능 22번, 30번 킬러 문항을 풀 때 10분 이상 헤매지 않고 케이스를 압축하는 훈련이 100점의 열쇠였습니다.',
    curriculumUsed: '수능·평가원 킬러/준킬러 극복반 2년 수강',
    reviewDetail: '킬러뿐만 아니라 준킬러를 20분 내에 무결점으로 끝내는 스피드 훈련 덕분에 킬러에 35분을 온전히 쏟을 수 있었습니다.',
  },
];

export const initialFaculty: FacultyMember[] = [
  {
    id: 'fac-1',
    name: '이선규 대표원장',
    role: '대치10관 총괄 대표원장 / 고등·내신 최상위반 직강',
    education: '수학 전문 교육과정 총괄 디렉터',
    career: [
      '대치동, 압구정, 반포 최상위권 수학 전문지도 12년',
      '전) 대치그레이드원 부원장',
      '전) 반포수상 중고등부 부원장',
      '휘문, 진선, 세화, 현대 내신만점자 다수 지도',
      '즉각적인 1:1 오답 클리닉 및 복원 변형문항 시스템 총괄',
    ],
    specialty: '1:1 사고과정 역추적 클리닉, 강남 핵심 고교 내신 만점 솔루션',
    quote: '수학은 문제를 푸는 행위가 아니라, 주어진 조건과 필연적으로 대화하는 훈련입니다.',
    image: '/assets/images/director_korean_young_navy_1793451453083.jpg',
  },
];

export const initialBookings: ConsultationBooking[] = [
  {
    id: 'book-101',
    studentName: '이민호',
    parentName: '이선영',
    phone: '010-3849-1928',
    grade: '고등 1학년',
    targetTrack: '강남 8학군 고등 내신 1등급 집중반',
    currentLevel: '중등 내신 95점이었으나 3월 모의고사 3등급 불안',
    mathConcern: '휘문고 1학년 입학 예정. 고난도 킬러 문항에서 시간이 턱없이 부족하고 서술형 감점이 많습니다.',
    preferredDate: '2026-03-08',
    preferredTime: '15:30',
    status: '상담확정',
    createdAt: '2026-03-01 11:20',
    adminNote: '휘문고 기출 10개년 분석 자료 및 부교재 변형 테스트 지참 안내 완료.',
  },
  {
    id: 'book-102',
    studentName: 'Chloe Park',
    parentName: '박은경',
    phone: '010-9182-3746',
    grade: '국제학교 / 유학생 (IB, AP, SAT)',
    targetTrack: '국제학교 IB DP Math (AA/AI HL·SL)',
    currentLevel: 'G10 수료 후 11학년 IB Diploma 시작 예정',
    mathConcern: 'IB Math AA HL 선택 예정인데 IA(소논문) 주제 선정이 막막하고 Paper 3 증명 문제 대비가 필요합니다.',
    preferredDate: '2026-03-10',
    preferredTime: '18:00',
    status: '접수대기',
    createdAt: '2026-03-02 09:45',
    adminNote: 'David Kang 수석 강사 1:1 진단 미팅 배정 예정.',
  },
  {
    id: 'book-103',
    studentName: '정성우',
    parentName: '김혜진',
    phone: '010-4491-0921',
    grade: '중등 3학년',
    targetTrack: '영재고·과고·전국자사고 대비반',
    currentLevel: 'KMO 1차 장려상, 공통수학1 심화 2회독 완료',
    mathConcern: '외대부고 자연계열 진학 희망. 심층 구술 면접과 고등수학2 심화 선행 균형을 잡고 싶습니다.',
    preferredDate: '2026-03-12',
    preferredTime: '17:00',
    status: '상담확정',
    createdAt: '2026-03-02 14:15',
    adminNote: '원장님 1:1 상담 예약 확정 SMS 발송.',
  },
];
