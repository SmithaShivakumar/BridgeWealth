**BridgeWealth** is a modern, full-stack financial advisory platform built with Next.js (App Router), React, Zustand, and Tailwind CSS. 
It enables advisors and clients to interact with financial data, upload documents, visualize portfolios, and leverage AI-powered insights via LLM integration.


# **Key Features**

•	Frontend (Next.js + React)

*Advisor Dashboard:*
•	Upload financial documents (PDF, CSV, XLSX)
•	View extracted client and portfolio data
•	Visualize allocations, performance, and debt
•	Generate AI-powered insights and compliance notes
•	Search and filter client data

*Client Dashboard:*
•	Upload documents and view extracted data
•	NLWeb-style chat interface for conversational financial guidance
•	Visualizations and insights tailored for clients
•	State Management

*Zustand:*
•	Centralized store for client, portfolio, compliance, and UI state
•	Actions for uploading, parsing, note management, and chat
•	Document Parsing & RAG Pipeline

*RAG (Retrieval-Augmented Generation):*
•	Parses uploaded documents into text chunks
•	Extracts entities (tickers, dates, accounts, etc.)
•	Builds a semantic graph and fast indexes (inverted, entity, tf-idf)
•	Enables search, query, and context-aware insights
•	AI Integration

*LLM API (OpenAI):*
•	Next.js API route proxies requests to OpenAI
•	Generates actionable financial insights based on client and portfolio context
•	Error handling for quota, billing, and network issues
•	UI & Visualization

*Tailwind CSS:*
•	Responsive, accessible, and modern UI components

*Recharts:*
•	Interactive charts for allocation, performance, and debt

# **Data Flow**

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

# **Technologies**

•	Next.js (App Router)
•	React (Client Components)
•	Zustand (State Management)
•	Tailwind CSS (Styling)
•	Recharts (Data Visualization)
•	OpenAI API (LLM Integration)
•	TypeScript (Type Safety)

# **Architecture Overview**

•	app/ contains all Next.js routes, including API endpoints and pages for advisor/client.
•	components/ holds all reusable React components.
•	lib/ contains business logic, state management, RAG pipeline, and LLM utilities.
•	public/ for static assets.
•	styles/ for global or custom CSS (if needed).
•	.env.local for secrets like your OpenAI API key.
•	tailwind.config.js and tsconfig.json for configuration.
•	README.md for documentation.

<img width="392" height="616" alt="Screenshot 2025-09-09 at 12 01 26 AM" src="https://github.com/user-attachments/assets/3698d434-2209-4026-8316-8644ae8d0575" />



# **Getting Started**

## 1) Install
npm install

## 2) Dev server
npm run dev
# Visit http://localhost:3000

## 3) Lint & type-check (optional)
npm run lint
npm run typecheck

## 4) Tests (Playwright)
npx playwright install
npm run test:e2e


No environment variables required. Everything runs locally in the browser.
