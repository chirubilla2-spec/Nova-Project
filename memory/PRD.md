# NOVACNKT Business Vertical — PRD

## Original Problem
Build app exactly matching the Canva whiteboard reference (Project Nova / NOVACNKT BUSSINESS VERTICAL). Mobile phone-frame UI on web, light cream theme with peach blocks, purple gradient on highlighted plan + Pay Now.

## Personas
- Business owners exploring NOVA's services
- Subscribers managing plans / portfolio / profile

## Architecture
- Backend: FastAPI + MongoDB, /api/* endpoints serving seed data
- Frontend: React 19 + react-router + Tailwind + shadcn/ui (Sheet, Button, Sonner)
- Single phone-frame layout, max-width 420px

## Implemented (2026-12)
- Routes: / (Splash), /home, /explore, /plans, /portfolio, /ai
- Backend endpoints: services, industries, testimonials, blogs, plans, portfolio, profile, payments (POST/GET)
- Profile slide-out drawer (Edit profile, Verification, Business Details, Payment history, Invoices, FAQ's, Customer Support, Refer & earn, Logout)
- Bottom nav with active pill, plan switching, mock payments, portfolio filters
- Manrope + Work Sans typography; cream/peach palette + black ink + purple gradient
- Verified by testing_agent_v3: 9/9 backend, 95% frontend (nested-button warning fixed post-test)

## Backlog
- P1: Real auth (JWT or Emergent Google)
- P1: Real Stripe checkout for Plans
- P1: Hook /ai page to Gemini/GPT/Claude via Emergent LLM key
- P2: Per-section detail pages (service detail, blog detail, portfolio detail)
- P2: Refer & earn flow
