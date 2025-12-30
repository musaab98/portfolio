# Portfolio Website

A modern, full-stack portfolio website built with Next.js 16, featuring a custom CMS for content management, authentication, and cloud storage integration.

🔗 **Live Site:** [musaabelsheikh.com](https://musaabelsheikh.com)

---

## 📋 Overview

This project is a personal portfolio website with an integrated admin dashboard for managing content dynamically. It showcases professional experience, education, projects, and provides a contact interface—all without requiring code changes to update content.

### Key Features

- **Dynamic Content Management** - Full CRUD operations for projects, work experience, education, and bio
- **Authentication System** - Secure admin access with Supabase Auth (email/password)
- **Cloud Storage Integration** - Image hosting via Supabase Storage with public CDN
- **Incremental Static Regeneration** - Fast page loads with 60-second revalidation
- **Responsive Design** - Mobile-first UI with Tailwind CSS v4
- **SEO-Friendly** - Server-side rendering with Next.js App Router
- **Real-time Status Indicator** - "Open to work" toggle visible across the site
- **Custom Dark Theme** - Professional night mode design with custom color palette

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** (App Router) - React framework with server components
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS with custom theme
- **React 19** - Latest React features

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service
  - PostgreSQL database
  - Authentication (Row Level Security enabled)
  - Storage (public bucket for images)
  - Real-time subscriptions ready
- **@supabase/ssr** - Server-side auth with cookie handling
- **Next.js Middleware** - Route protection for admin pages

### Deployment
- **AWS Amplify** - Continuous deployment with CDN
- **AWS Route 53** - DNS management for custom domain
- **AWS Certificate Manager** - Automatic SSL/TLS certificates
- **Git-based CI/CD** - Auto-deploy on push to main branch

### Development Tools
- **npm** - Package management
- **ESLint** - Code linting
- **Git** - Version control

---

## 🏗️ Architecture

### Application Structure

```
portfolio/
├── app/
│   ├── page.tsx                 # Home page (about, experience, education)
│   ├── portfolio/
│   │   └── page.tsx            # Projects grid
│   ├── contact/
│   │   └── page.tsx            # Contact form
│   └── admin/                   # Protected admin routes
│       ├── layout.tsx          # Admin wrapper with auth check
│       ├── login/
│       │   └── page.tsx        # Admin login
│       ├── about/
│       │   └── page.tsx        # Bio & social links editor
│       ├── experience/
│       │   └── page.tsx        # Work experience CRUD
│       ├── education/
│       │   └── page.tsx        # Education CRUD
│       └── projects/
│           └── page.tsx        # Projects CRUD with priority sorting
├── components/
│   ├── Navbar.tsx              # Navigation with status indicator
│   ├── ProjectCard.tsx         # Project display component
│   └── StatusToggle.tsx        # Admin "open to work" toggle
├── lib/
│   ├── supabase.ts            # Server-side client (read-only)
│   ├── supabaseBrowser.ts     # Client-side client (@supabase/ssr)
│   └── supabaseServer.ts      # Auth client with cookies
├── middleware.ts               # Route protection
└── public/                     # Static assets
```

### Database Schema

**Tables:**
- `about` - Bio, job title, social links, open_to_work status (single row)
- `work_experience` - Company, position, dates, description, display_order
- `education` - Institution, degree, field, dates, description, display_order
- `projects` - Title, slug, description, technologies[], URLs, published, priority

**Storage:**
- `project-images` bucket (public) - Profile pictures and project images

### Authentication Flow

1. **Public Routes** - Home, portfolio, contact (no auth required)
2. **Protected Routes** - All `/admin/*` routes require authentication
3. **Middleware** - Checks session on server, redirects to login if invalid
4. **Row Level Security** - Database policies enforce auth at data layer

### Data Fetching Strategy

- **Server Components** - Static data fetching with ISR (revalidate: 60s)
- **Client Components** - Admin pages use client-side Supabase client
- **No API Routes** - Direct database access (faster, simpler)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/musaab98/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run this SQL in Supabase SQL Editor:
   ```sql
   -- About table
   CREATE TABLE about (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     bio TEXT NOT NULL,
     job_title TEXT NOT NULL,
     linkedin_url TEXT,
     github_url TEXT,
     x_url TEXT,
     open_to_work BOOLEAN DEFAULT true,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Work experience table
   CREATE TABLE work_experience (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     company TEXT NOT NULL,
     position TEXT NOT NULL,
     start_date TEXT NOT NULL,
     end_date TEXT,
     description TEXT,
     display_order INTEGER DEFAULT 0,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Education table
   CREATE TABLE education (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     institution TEXT NOT NULL,
     degree TEXT NOT NULL,
     field_of_study TEXT,
     start_date TEXT NOT NULL,
     end_date TEXT,
     description TEXT,
     display_order INTEGER DEFAULT 0,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Projects table
   CREATE TABLE projects (
     id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
     title TEXT NOT NULL,
     slug TEXT UNIQUE NOT NULL,
     description TEXT NOT NULL,
     technologies TEXT[] DEFAULT '{}',
     project_url TEXT,
     image_url TEXT,
     published BOOLEAN DEFAULT false,
     display_order INTEGER DEFAULT 0,
     priority INTEGER DEFAULT 999,
     created_at TIMESTAMPTZ DEFAULT NOW()
   );

   -- Add indexes for performance
   CREATE INDEX idx_work_experience_order ON work_experience(display_order);
   CREATE INDEX idx_education_order ON education(display_order);
   CREATE INDEX idx_projects_priority ON projects(priority);
   CREATE INDEX idx_projects_published ON projects(published);
   ```

5. **Create Supabase storage bucket**
   - Go to Storage in Supabase Dashboard
   - Create a new bucket named `project-images`
   - Make it public
   - Upload your profile picture as `pfp.png`

6. **Enable authentication**
   - Go to Authentication > Providers in Supabase
   - Enable Email provider
   - Create an admin user in Authentication > Users

7. **Run the development server**
   ```bash
   npm run dev
   ```

8. **Open [http://localhost:3000](http://localhost:3000)**

---

## 📦 Deployment

### Deploy to AWS Amplify

1. Push code to GitHub
2. Go to [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. Connect your repository
4. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
5. Deploy (auto-deploys on push to main)

### Configure Custom Domain

1. In Amplify Console > Domain management
2. Add your domain (if in Route 53, it auto-configures)
3. Wait for SSL certificate provisioning (~15 minutes)

---

## 🎨 Design System

### Color Palette
- **Background:** `#0a0a0f` (near-black)
- **Surface:** `#1e293b` (slate-800)
- **Border:** `#334155` (slate-700)
- **Primary:** `#22d3ee` (cyan-400)
- **Text:** `#cbd5e1` (slate-300)

### Typography
- **Font:** Hack (monospace) via CDN
- **Headings:** Bold, cyan-400
- **Body:** Regular, slate-300/400

### Components
- Rounded corners (8px)
- Subtle borders and shadows
- Hover states on interactive elements
- Grid pattern background overlay

---

## 🔐 Security Features

- **Route Protection** - Middleware blocks unauthorized admin access
- **Environment Variables** - Sensitive keys in environment, not code
- **Row Level Security** - Database-level access control (ready for expansion)
- **HTTPS Only** - Enforced via AWS Certificate Manager
- **No API Keys in Client** - Only public keys exposed to browser

---

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **ISR Strategy:** 60-second revalidation for fresh content with static speed
- **CDN Distribution:** AWS CloudFront for global delivery

---

## 🔮 Future Enhancements

- [ ] Blog section with markdown support
- [ ] Contact form with email service (Resend/SendGrid)
- [ ] Project detail pages (`/portfolio/[slug]`)
- [ ] Skills/technologies section with filtering
- [ ] Dark/light mode toggle
- [ ] Analytics dashboard in admin
- [ ] Resume/CV download with PDF generation
- [ ] SEO improvements (sitemap.xml, meta tags)
- [ ] Animations with Framer Motion
- [ ] Image upload widget in admin (drag-and-drop)

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Musaab Elsheikh**

- Website: [musaabelsheikh.com](https://musaabelsheikh.com)
- GitHub: [@musaab98](https://github.com/musaab98)

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Backend by [Supabase](https://supabase.com/)
- Deployed on [AWS Amplify](https://aws.amazon.com/amplify/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

---

**⭐ If you found this project interesting, please give it a star!**
