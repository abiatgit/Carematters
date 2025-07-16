# CareMatters - Care Home Management System

A comprehensive care home management application built with Next.js 15, TypeScript, Prisma, and NextAuth.js.

## File Structure

```
app/
├── (dashboard)/
│   ├── layout.tsx
│   ├── list/
│   │   ├── appoinments/
│   │   │   ├── action.tsx
│   │   │   ├── columns.tsx
│   │   │   ├── data-table.tsx
│   │   │   └── page.tsx
│   │   ├── carehome/
│   │   │   └── action.ts
│   │   ├── handover/
│   │   │   └── page.tsx
│   │   ├── houses/
│   │   │   ├── action.ts
│   │   │   └── page.tsx
│   │   ├── medication/
│   │   │   └── page.tsx
│   │   ├── messages/
│   │   │   └── [id]/
│   │   │       ├── MessageClient.tsx
│   │   │       └── page.tsx
│   │   ├── resident/
│   │   │   ├── [id]/
│   │   │   │   └── page.tsx
│   │   │   ├── action.ts
│   │   │   └── page.tsx
│   │   └── staff/
│   │       ├── [id]/
│   │       │   └── page.tsx
│   │       ├── action.ts
│   │       └── page.tsx
│   └── user/
│       ├── data.json
│       └── page.tsx
├── (pages)/
│   ├── about/
│   │   └── page.tsx
│   └── features/
│       └── page.tsx
├── api/
│   ├── appoinment/
│   │   └── route.ts
│   ├── auth/
│   │   └── [...nextauth]/
│   │       └── route.ts
│   ├── carehome/
│   │   ├── [id]/
│   │   │   └── route.ts
│   │   └── route.ts
│   ├── get-current-carehome/
│   │   └── route.ts
│   ├── get-current-user/
│   │   └── route.ts
│   ├── houses/
│   │   ├── [careHomeId]/
│   │   │   └── route.ts
│   │   └── route.ts
│   ├── incident/
│   │   └── route.ts
│   ├── resident/
│   │   └── route.ts
│   ├── staff/
│   │   └── route.ts
│   ├── upload/
│   │   └── route.ts
│   ├── uploadthing/
│   │   └── core.ts
│   └── user/
│       ├── [id]/
│       │   └── route.ts
│       └── profile/
│           └── route.ts
├── auth/
│   ├── sign-in/
│   │   └── [[...sign-in]]/
│   │       └── page.tsx
│   └── sign-up/
│       └── [[...sign-up]]/
│           └── page.tsx
├── onboarding/
│   ├── layout.tsx
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx

components/
├── ui/ (shadcn components)
│   ├── avatar.tsx
│   ├── badge.tsx
│   ├── breadcrumb.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── chart.tsx
│   ├── checkbox.tsx
│   ├── collapsible.tsx
│   ├── dialog.tsx
│   ├── dropdown-menu.tsx
│   ├── form.tsx
│   ├── google.tsx
│   ├── input.tsx
│   ├── label.tsx
│   ├── pagination.tsx
│   ├── progress.tsx
│   ├── scroll-area.tsx
│   ├── select.tsx
│   ├── separator.tsx
│   ├── sheet.tsx
│   ├── sidebar.tsx
│   ├── skeleton.tsx
│   ├── sonner.tsx
│   ├── table.tsx
│   ├── tabs.tsx
│   ├── textarea.tsx
│   ├── toggle-group.tsx
│   ├── toggle.tsx
│   └── tooltip.tsx
├── custom/
│   ├── HouseSwitcher.tsx
│   ├── InitUserClient.tsx
│   ├── MainListArea.tsx
│   ├── NavUser.tsx
│   ├── app-sidebar.tsx
│   ├── appoinmentsCard/
│   │   └── AppoinmentCards.tsx
│   ├── dashboard/
│   │   ├── Appointments.tsx
│   │   ├── DailyActivities.tsx
│   │   ├── IncidentReport.tsx
│   │   ├── MedicationSummary.tsx
│   │   ├── MessageCard.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Stats.tsx
│   │   └── Units.tsx
│   ├── forms/
│   │   ├── Residents/
│   │   │   └── CreateResidentForm.tsx
│   │   ├── Staff/
│   │   │   └── CreateStaffForm.tsx
│   │   ├── appointment/
│   │   │   ├── action.ts
│   │   │   └── appointmentForm.tsx
│   │   ├── careHome/
│   │   │   └── createHomeForm.tsx
│   │   ├── houses/
│   │   │   └── createHouse.tsx
│   │   ├── incidentreport/
│   │   │   └── CreateIncident.tsx
│   │   ├── organization/
│   │   │   └── EditOrganizationForm.tsx
│   │   └── profile/
│   │       └── EditProfileForm.tsx
│   ├── incident-report/
│   │   ├── IncidentTable.tsx
│   │   ├── columns.ts
│   │   └── data.ts
│   ├── incidentChart/
│   │   └── incidentChart.tsx
│   ├── medsTable/
│   │   ├── MedsTable.tsx
│   │   ├── columns.tsx
│   │   └── data.tsx
│   ├── google-sign-in.tsx
│   ├── login-form.tsx
│   ├── section-cards.tsx
│   ├── sign-out.tsx
│   ├── signup-form.tsx
│   ├── site-header.tsx
│   └── skelton.tsx

lib/
├── auth.ts
├── db.ts
├── db/
│   ├── prisma.ts
│   └── serverAction.ts
├── executeAction.ts
├── mockData.ts
├── toast.tsx
├── userSchema.ts
└── utils.ts

prisma/
├── migrations/
└── schema.prisma

store/
└── globalStore.ts

hooks/
└── use-mobile.ts
```

## Core Features

### Role-Based Access Control
- **MANAGER**: Full access to all features (create, edit, delete all entities)
- **TEAM_LEAD**: Access to residents and appointments management
- **SUPPORT_WORKER**: Limited view access only

### Entity Management
- **Houses**: Create and delete with safety checks (manager only)
- **Staff**: Add and manage staff members (manager only)
- **Residents**: Add and manage residents (manager/team lead)
- **Appointments**: Create and manage appointments (manager/team lead)
- **Incidents**: Track and report incidents
- **Medications**: Manage medication schedules

### Security Features
- Route protection middleware
- Role-based UI component visibility
- Database validation and error handling
- NextAuth.js authentication with Google OAuth and credentials

### Technology Stack
- **Frontend**: Next.js 15 (App Router), TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Next.js API routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **State Management**: Zustand
- **Notifications**: Sonner (toast)

### Database Schema
- Users with roles (MANAGER, TEAM_LEAD, SUPPORT_WORKER)
- Care homes with multiple units/houses
- Residents assigned to specific houses
- Staff assigned to specific units
- Appointments linked to residents and units
- Incident reports and messages

### Design Guidelines
- **ALWAYS follow shadcn/ui minimal component style**
- **Use black and white color scheme as primary design language**
- **Maintain clean, minimal aesthetics with proper spacing**
- **Use subtle grays and accent colors sparingly**
- **Follow shadcn/ui design patterns and component composition**

### Git Commit Guidelines
- **Keep commit messages concise and focused on main points only**
- **Never mention Claude or AI assistance in commit messages**
- **Use conventional commit format: feat/fix/refactor/docs etc.**
- **Focus on what was changed, not how it was implemented**
- **Avoid lengthy descriptions and bullet points in commit messages**

### Recent Updates
- Complete role-based access control implementation
- House management with creation and deletion functionality
- Enhanced UI with confirmation dialogs and toast notifications
- Database safety checks for entity relationships
- Immediate UI updates after CRUD operations