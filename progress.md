# CareMatters – Project Progress

A professional care home management platform built using Next.js, Clerk, Prisma, Supabase, and TailwindCSS.

---

## ✅ Completed Tasks

### 🛠️ Project Setup
- [x] Initialized Next.js project
- [x] Installed & configured TailwindCSS
- [x] Installed ShadCN UI components
- [x] Added Lucide React for icons

### 🔐 Authentication
- [x] Integrated Clerk for auth
- [x] Set up Clerk provider and auth components
- [x] Protected routes using Clerk's middleware
- [x] Implemented auth-based redirection logic:
  - If user is signed in and has not completed onboarding → redirect to `/onboarding`
  - If user is signed in and has completed onboarding → redirect to `/dashboard/manager`
  - If user is signed in and tries to access `/`, redirect them appropriately

### 🧭 Routing Logic
- [x] Used `publicMetadata.careHome` to check onboarding status
- [x] Prevent logged-in users from accessing landing page

---

## 🚧 In Progress / Next Steps

### 👥 Onboarding Flow
- [X] Build the onboarding page UI
- [ ] Collect care home details (name, address, number of rooms, role selection)
- [ ] Save onboarding data to Supabase & update Clerk metadata

### 📋 Role-Based Dashboards
- [ ] Set up separate dashboards for:
  - [ ] Manager
  - [ ] Nurse (Lead)
  - [ ] Care Assistant (Hero)
- [ ] Implement permissions and UI components based on role

### 🗃️ Data Management
- [ ] Configure Prisma with Supabase PostgreSQL
- [ ] Create and connect care home, user, and role models

---

## 🧠 Notes

- Sign-up URLs like `https://grown-bear-62.accounts.dev/sign-up` are Clerk-hosted and can be ignored for routing logic.
- All protected route logic is centralized in `middleware.ts`.

---

Let’s build this with quality and keep shipping! 🚀
