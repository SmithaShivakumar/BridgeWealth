**BridgeWealth** is a modern, full-stack financial advisory platform built with Next.js (App Router), React, Zustand, and Tailwind CSS. 
It enables advisors and clients to interact with financial data, upload documents, visualize portfolios, and leverage AI-powered insights via LLM integration.


**Key Features**

*Two Portals*

Advisor (/advisor): Uploads, simulated parsing, filters (date/account/risk), insights builder, charts, compliance notes, KPI panels.

Client (/client): Uploads, health score gauge, simplified insights, comfort slider, task checklist, NPS prompt.

*Document Flow (Simulated)*

Upload PDF/CSV/XLSX → “Parsed” status → Extracted Data (identity, accounts, investments, events timeline).

Local rule engine recomputes Insights & Financial Health Score; charts update instantly.

Fast GraphRAG + Basic Query

Client-side chunking, entity extraction, inverted+entity indexes, TF-IDF scoring + graph priors.

Local query → top snippets → template-based synthesis (no LLM calls, no APIs).

*NLWeb-Style Chat*

Chat about the parsed data with a floating ChatDock (both portals).

Right-side “Context Used” panel shows cited snippets driving each answer.

*Visualizations*

Allocation Pie, Performance Sparkline, Debt Bar, Emergency Fund Progress, Health Gauge (0–100).

Compliance + KPIs (Mock)

Timestamped notes with “Include disclosure” toggle.

KPIs: Hours Saved (docs × 0.5h), Docs Processed, Insights Generated, Avg Health Score / Tasks %.

**Tech Stack**

•	Frontend (Next.js + React)
•	Advisor Dashboard:
•	Upload financial documents (PDF, CSV, XLSX)
•	View extracted client and portfolio data
•	Visualize allocations, performance, and debt
•	Generate AI-powered insights and compliance notes
•	Search and filter client data
•	Client Dashboard:
•	Upload documents and view extracted data
•	NLWeb-style chat interface for conversational financial guidance
•	Visualizations and insights tailored for clients
•	State Management
•	Zustand:
•	Centralized store for client, portfolio, compliance, and UI state
•	Actions for uploading, parsing, note management, and chat
•	Document Parsing & RAG Pipeline
•	RAG (Retrieval-Augmented Generation):
•	Parses uploaded documents into text chunks
•	Extracts entities (tickers, dates, accounts, etc.)
•	Builds a semantic graph and fast indexes (inverted, entity, tf-idf)
•	Enables search, query, and context-aware insights
•	AI Integration
•	LLM API (OpenAI):
•	Next.js API route proxies requests to OpenAI
•	Generates actionable financial insights based on client and portfolio context
•	Error handling for quota, billing, and network issues
•	UI & Visualization
•	Tailwind CSS:
•	Responsive, accessible, and modern UI components
•	Recharts:
•	Interactive charts for allocation, performance, and debt

**Data Flow**

1.	Document Upload:
User uploads a financial document via the dashboard.

2.	Parsing & Extraction:
RAG pipeline parses the document, extracts entities, and updates the store.

3.	Visualization:
Extracted data is visualized in charts and summary cards.

4.	AI Insights:
User requests insights; dashboard calls the LLM API route, which returns tailored recommendations.

5.	Compliance & Notes:
Advisors can add, view, and manage compliance notes linked to insights.

**Technologies**

•	Next.js (App Router)
•	React (Client Components)
•	Zustand (State Management)
•	Tailwind CSS (Styling)
•	Recharts (Data Visualization)
•	OpenAI API (LLM Integration)
•	TypeScript (Type Safety)

**Architecture Overview**

•	app/ contains all Next.js routes, including API endpoints and pages for advisor/client.
•	components/ holds all reusable React components.
•	lib/ contains business logic, state management, RAG pipeline, and LLM utilities.
•	public/ for static assets.
•	styles/ for global or custom CSS (if needed).
•	.env.local for secrets like your OpenAI API key.
•	tailwind.config.js and tsconfig.json for configuration.
•	README.md for documentation.

BridgeWealth/
├── app/
│   ├── api/
│   │   └── llm-insight/
│   │       └── route.ts
│   ├── advisor/
│   │   └── page.tsx
│   ├── client/
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── AddNoteModal.tsx
│   ├── AllocationPie.tsx
│   ├── ChatBox.tsx
│   ├── ComplianceNotesTable.tsx
│   ├── DebtBar.tsx
│   ├── ExtractedDataCard.tsx
│   ├── PerformanceSparkline.tsx
│   ├── SearchBox.tsx
│   └── UploadButton.tsx
├── lib/
│   ├── llm.ts
│   ├── rag/
│   │   ├── computeTfIdf.ts
│   │   └── index.ts
│   ├── store.ts
│   └── types.ts
├── public/
│   └── (static assets, logos, etc.)
├── styles/
│   └── (global.css, tailwind.css if needed)
├── tailwind.config.js
├── tsconfig.json
├── package.json
├── .env.local
└── README.md


**Getting Started**
# 1) Install
npm install

# 2) Dev server
npm run dev
# Visit http://localhost:3000

# 3) Lint & type-check (optional)
npm run lint
npm run typecheck

# 4) Tests (Playwright)
npx playwright install
npm run test:e2e


No environment variables required. Everything runs locally in the browser.
