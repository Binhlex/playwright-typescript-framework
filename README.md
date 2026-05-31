# Playwright TypeScript Test Framework

![CI](https://github.com/YOUR_USERNAME/playwright-typescript-framework/actions/workflows/playwright.yml/badge.svg)
![Playwright](https://img.shields.io/badge/Playwright-1.44+-2EAD33?logo=playwright)
![TypeScript](https://img.shields.io/badge/TypeScript-5.4+-3178C6?logo=typescript)

A production-grade test automation framework built with **Playwright** and **TypeScript**, covering both UI and API testing with a clean, scalable architecture.

---

## Architecture

```
playwright-typescript-framework/
├── tests/
│   ├── ui/                   # UI end-to-end tests
│   └── api/                  # API tests (no browser)
├── pages/                    # Page Object Models
│   ├── BasePage.ts           # Shared base class
│   └── LoginPage.ts          # Feature-specific POMs
├── fixtures/
│   └── base.ts               # Custom Playwright fixtures
├── helpers/
│   ├── WaitHelper.ts         # Reusable wait utilities
│   └── ApiHelper.ts          # Typed API request wrapper
├── utils/                    # Generic utility functions
├── test-data/                # JSON test data files
├── .github/workflows/        # GitHub Actions CI pipeline
├── playwright.config.ts      # Playwright configuration
└── tsconfig.json             # TypeScript configuration
```

---

## Features

| Feature | Details |
|---|---|
| **Multi-browser** | Chromium, Firefox, WebKit |
| **Mobile emulation** | Pixel 5, iPhone 13 |
| **UI testing** | POM pattern, custom fixtures, locator strategies |
| **API testing** | Typed ApiHelper, status/schema/timing assertions |
| **Hybrid tests** | API seeding + UI verification |
| **Network mocking** | `page.route()` request interception |
| **Visual testing** | `toHaveScreenshot()` pixel-diff snapshots |
| **CI/CD** | GitHub Actions with HTML report artifacts |
| **Test tagging** | `@smoke` and `@regression` grep filtering |
| **Reporting** | HTML, JSON, list reporters |

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation

```bash
git clone https://github.com/YOUR_USERNAME/playwright-typescript-framework.git
cd playwright-typescript-framework
npm install
npx playwright install
cp .env.example .env
```

### Running Tests

```bash
# All tests
npm test

# UI tests only (chromium)
npm run test:ui

# API tests only
npm run test:api

# Smoke tests only
npm run test:smoke

# With browser visible
npm run test:headed

# Debug mode
npm run test:debug

# View HTML report
npm run test:report
```

---

## CI/CD

Tests run automatically on every push and pull request via GitHub Actions:
- Chromium smoke tests
- All API tests
- HTML report uploaded as an artifact (14-day retention)

---

## Target Applications

| Layer | URL |
|---|---|
| UI | [saucedemo.com](https://www.saucedemo.com) |
| API | [reqres.in](https://reqres.in) |

---

## Built by
[Your Name] — Built as part of a 30-day Playwright learning plan.
```
