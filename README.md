# CareMatters 

**CareMatters** is a simple yet powerful care home management web app, built using the modern Next.js App Router. It helps streamline day-to-day operations for Managers, Nurses, and Care Assistants through a clean UI and role-based features.

---

## 🛠 Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Prisma** (ORM)
- **Supabase** (PostgreSQL + Auth)
- **Clerk** (Authentication & User Management)

---

## 📁 Folder Structure

/app
  /auth
  /dashboard
    /manager(Pilot)
    /nurse(Lead)
    /assistant(Hero)
    /onboarding
/components
/lib
/hooks
/docs
/public
/prisma



---

## ✅ Features (Planned)

- 🔐 Clerk-based authentication (role-specific dashboards)
- 🧑‍💼 Manager can manage staff and residents
- 👩‍⚕️ Nurse can add medications and 24-hour reports
- 🧑‍🦽 Care Assistants can update care plans and daily reports
- 📄 Real-time data using Supabase
- 🧪 Simple and clean UI for quick demo to employers

---

## 🚧 Local Development

## Redux toolkit 
- npm install @reduxjs/toolkit react-redux


```bash

# Clone the repo
git clone https://github.com/your-username/carematters.git
cd carematters

# Install dependencies
npm install

# Run the app
npm run dev

 


