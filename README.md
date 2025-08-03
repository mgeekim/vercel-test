# Stockcircle - 투자자 포트폴리오 추적 웹사이트

Stockcircle은 세계 최고의 투자자들의 포트폴리오를 추적하고 탐색할 수 있는 웹사이트입니다. 이 프로젝트는 Next.js와 TypeScript를 사용하여 구축되었으며, Vercel을 통해 배포됩니다.

## 주요 기능

- **투자자 포트폴리오 추적**: Warren Buffett, Michael Burry, Cathie Wood 등 유명 투자자들의 포트폴리오 정보
- **실시간 검색**: 주식과 투자자를 검색할 수 있는 기능
- **필터링 시스템**: 다양한 투자 스타일에 따른 필터링
- **반응형 디자인**: 모바일과 데스크톱에서 최적화된 사용자 경험

## 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Deployment**: Vercel

## 로컬 개발

1. 의존성 설치:
```bash
npm install
```

2. 개발 서버 실행:
```bash
npm run dev
```

3. 브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

## Vercel 배포

이 프로젝트는 Vercel을 통해 자동으로 배포됩니다:

1. GitHub 저장소를 Vercel에 연결
2. 자동 배포 설정 확인
3. 코드 푸시 시 자동 배포

## 프로젝트 구조

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
└── components/
    ├── Header.tsx
    ├── Hero.tsx
    ├── NavigationTabs.tsx
    ├── InvestorFilters.tsx
    └── InvestorCards.tsx
```

## 라이센스

MIT License
