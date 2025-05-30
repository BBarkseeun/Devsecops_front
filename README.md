# SecureOps - AI 기반 DevSecOps 보안진단 플랫폼

AI가 제공하는 차세대 DevSecOps 보안진단 솔루션을 위한 인터렉티브 웹사이트입니다.

## 🚀 기술 스택

- **Frontend**: React 18, HTML5
- **Build Tool**: Vite
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: GSAP, ScrollTrigger, Locomotive Scroll
- **UI Components**: Lucide React (아이콘)
- **스타일링**: CSS3, CSS Variables
- **상태 관리**: React Hooks

## ✨ 주요 기능

### 🎨 인터렙티브 UI/UX
- **Three.js 3D 배경**: 파티클 시스템과 기하학적 도형 애니메이션
- **Locomotive Scroll**: 부드러운 스크롤 경험
- **GSAP 애니메이션**: 페이지 전환 및 요소 애니메이션
- **Glass Morphism**: 모던한 반투명 유리 효과
- **반응형 디자인**: 모든 디바이스에서 최적화된 경험

### 📱 섹션별 기능
1. **Hero 섹션**: AI 기반 보안 플랫폼 소개
2. **서비스**: 포괄적인 DevSecOps 보안 서비스
3. **AI 기능**: 지능형 보안 분석 기능 소개
4. **보안 대시보드**: 실시간 모니터링 대시보드
5. **기술 스택**: 사용된 최신 기술들
6. **연락처**: 문의 양식 및 연락처 정보

### 🎯 보안 서비스
- **코드 보안 분석**: SAST 스캐닝, 의존성 검사, 라이선스 검증
- **인프라 보안 검사**: 컨테이너 스캐닝, IaC 검증, 설정 감사
- **데이터 보호**: 데이터 분류, 암호화 검증, 접근 로그
- **실시간 모니터링**: 이상 탐지, 실시간 알림, 자동 대응
- **컴플라이언스 관리**: GDPR, ISO 27001, SOC 2 Type II
- **위험도 평가**: AI 기반 위험도 분석

## 🛠️ 설치 및 실행

### 필수 요구사항
- Node.js 16+
- npm 또는 yarn

### 설치
```bash
# 의존성 설치
npm install

# 또는 yarn 사용시
yarn install
```

### 개발 서버 실행
```bash
# 개발 서버 시작 (http://localhost:3000)
npm run dev

# 또는 yarn 사용시
yarn dev
```

### 빌드
```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
secureops-website/
├── src/
│   ├── components/
│   │   ├── Header.jsx           # 네비게이션 헤더
│   │   ├── Header.css
│   │   ├── Hero.jsx             # 메인 히어로 섹션
│   │   ├── Hero.css
│   │   ├── Services.jsx         # 서비스 소개
│   │   ├── Services.css
│   │   ├── AIFeatures.jsx       # AI 기능 소개
│   │   ├── SecurityDashboard.jsx # 보안 대시보드
│   │   ├── TechStack.jsx        # 기술 스택
│   │   ├── Contact.jsx          # 연락처 섹션
│   │   ├── Footer.jsx           # 푸터
│   │   └── ThreeBackground.jsx  # 3D 배경
│   ├── App.jsx                  # 메인 앱 컴포넌트
│   ├── main.jsx                 # 진입점
│   └── index.css                # 글로벌 스타일
├── index.html                   # HTML 템플릿
├── vite.config.js              # Vite 설정
├── package.json                # 패키지 정보
└── README.md                   # 프로젝트 문서
```

## 🎨 디자인 시스템

### 색상 팔레트
- **Primary**: `#00ff88` (네온 그린)
- **Secondary**: `#00d4ff` (사이버 블루)
- **Accent**: `#ff6b6b` (코랄 레드)
- **Background**: `#0a0a0a` (딥 블랙)
- **Text**: `#ffffff` / `#b0b0b0` / `#666666`

### 주요 CSS 변수
```css
--primary-color: #00ff88;
--secondary-color: #00d4ff;
--accent-color: #ff6b6b;
--bg-primary: #0a0a0a;
--text-primary: #ffffff;
--gradient-primary: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
```

## 🚀 성능 최적화

- **Vite**: 빠른 빌드 시스템
- **Code Splitting**: 컴포넌트별 청크 분할
- **Asset Optimization**: 이미지 및 폰트 최적화
- **CSS Variables**: 런타임 스타일 변경
- **Responsive Images**: 적응형 이미지 로딩

## 📱 반응형 지원

- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: ~767px

## 🔧 커스터마이징

### 색상 변경
`src/index.css`의 CSS 변수를 수정하여 브랜드 색상을 변경할 수 있습니다.

### 애니메이션 조정
`src/components/` 내의 각 컴포넌트에서 GSAP 타이밍과 이징을 조정할 수 있습니다.

### 3D 효과 수정
`src/components/ThreeBackground.jsx`에서 파티클 수, 기하학적 도형, 애니메이션을 커스터마이징할 수 있습니다.

## 🌟 라이브러리 정보

- **React Three Fiber**: Three.js를 React에서 선언적으로 사용
- **GSAP**: 고성능 애니메이션 라이브러리
- **Locomotive Scroll**: 부드러운 스크롤 효과
- **Lucide React**: 모던하고 일관된 아이콘 세트

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 👥 기여하기

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

---

**SecureOps** - AI 기반 DevSecOps 보안진단 플랫폼으로 안전한 개발 환경을 구축하세요! 🚀🔒 