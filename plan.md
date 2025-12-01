# Portfolio Development Plan

## Current Status
- ✅ Next.js 16 + TypeScript + Tailwind CSS v4 setup complete
- ✅ Supabase integration configured (client + admin)
- ✅ Night mode theme implemented
- ✅ Seamless navbar with "Open to Work" badge
- ✅ Basic routing structure (About, Portfolio, Contact, Admin)
- ✅ ProjectCard component created

## Cleanup Notes
### Files to Remove (Optional)
- `public/indeed.svg` - No longer used after removing Indeed/Dice buttons

---

## 📋 About Page (app/page.tsx)

### ✅ Completed
- [x] Profile picture display
- [x] Social media links (LinkedIn, GitHub, X)
- [x] Static Work Experience section
- [x] Static Education section
- [x] Projects CTA button

### 🔨 To-Do
#### Backend Integration
- [ ] Create Supabase table: `about`
  - Fields: `id`, `bio` (text), `job_title` (text), `linkedin_url`, `github_url`, `x_url`, `created_at`, `updated_at`
- [ ] Create Supabase table: `work_experience`
  - Fields: `id`, `job_title`, `company`, `start_date`, `end_date` (nullable), `description`, `order`, `created_at`
- [ ] Create Supabase table: `education`
  - Fields: `id`, `degree`, `institution`, `start_date`, `end_date`, `description`, `order`, `created_at`
- [ ] Fetch `about` data on page load
- [ ] Map `work_experience` records to Work Experience component
- [ ] Map `education` records to Education component
- [ ] Implement markdown rendering for bio content (use `remark` + `remark-gfm`)

#### Component Modularization
- [ ] Extract Work Experience into `/components/WorkExperience.tsx`
  - Accept array of experience objects as props
  - Render timeline dynamically
- [ ] Extract Education into `/components/Education.tsx`
  - Accept array of education objects as props
  - Render cards dynamically
- [ ] Extract social links into `/components/SocialLinks.tsx`
  - Accept URLs as props from Supabase `about` table

---

## 🎨 Portfolio Page (app/portfolio/page.tsx)

### ✅ Completed
- [x] Fetch projects from Supabase
- [x] Display projects in grid layout
- [x] ProjectCard component with tags, demo/repo links

### 🔨 To-Do
#### Database Schema Update
- [ ] Update `projects` table to include:
  - `technologies` (text[] or JSONB) - List of skills/technologies used
  - Update ProjectCard to render technologies as bullet points instead of tags
- [ ] Ensure `order` field exists for manual sorting in admin

#### Component Enhancement
- [ ] Update `ProjectCard` component:
  - Replace tags section with "Technologies" section (bullet list)
  - Add conditional rendering: if both `demo_url` and `repo_url` exist, show both buttons
  - If only one exists, show single button labeled appropriately
- [ ] Add loading state skeleton for ISR revalidation

---

## 📬 Contact Page (app/contact/page.tsx)

### ✅ Completed
- [x] Form UI with Name, Email, Message fields
- [x] Form state management
- [x] Basic submit handler (mock)

### 🔨 To-Do
#### Backend Implementation
- [ ] Create API route: `app/api/contact/route.ts`
  - Validate form data with Zod
  - Send email via AWS SES (credentials already in `.env.local`)
  - Return success/error response
- [ ] Update form submit handler to call `/api/contact`
- [ ] Add proper error handling with user-friendly messages
- [ ] Add rate limiting (prevent spam)
- [ ] Optional: Store contact form submissions in Supabase table `contact_submissions`

#### AWS SES Setup
- [ ] Verify sender email in AWS SES console
- [ ] Test email sending with AWS SDK (already installed)
- [ ] Configure proper error messages for delivery failures

---

## 🔐 Admin Page & Authentication

### Current State
- ⚠️ Admin page exists but has no authentication
- ⚠️ No CRUD functionality implemented

### 🔨 To-Do

#### Phase 1: Authentication
- [ ] Implement Supabase Auth
  - [ ] Create login page: `app/admin/login/page.tsx`
  - [ ] Use Supabase Email + Password auth
  - [ ] Create protected route middleware: `middleware.ts`
  - [ ] Redirect unauthenticated users to `/admin/login`
  - [ ] Store session in cookies
  - [ ] Add logout button in admin layout
- [ ] Create admin-only user in Supabase Auth dashboard
- [ ] Test authentication flow

#### Phase 2: Admin Layout
- [ ] Create `/app/admin/layout.tsx`
  - [ ] Add sidebar navigation:
    - Dashboard (overview)
    - Manage About
    - Manage Work Experience
    - Manage Education
    - Manage Projects
    - View Contact Submissions
  - [ ] Add current page indicator
  - [ ] Add "Back to Site" link
  - [ ] Add logout button

#### Phase 3: Dashboard (app/admin/page.tsx)
- [ ] Display overview statistics:
  - Total projects
  - Total work experience entries
  - Total education entries
  - Recent contact form submissions
- [ ] Quick action buttons to each management page

#### Phase 4: Manage About (app/admin/about/page.tsx)
- [ ] Fetch current `about` data
- [ ] Form fields:
  - Bio (textarea with markdown support)
  - Job Title
  - LinkedIn URL
  - GitHub URL
  - X URL
- [ ] Save button → Updates Supabase `about` table
- [ ] Preview bio with rendered markdown
- [ ] Success/error toast notifications

#### Phase 5: Manage Work Experience (app/admin/work-experience/page.tsx)
- [ ] List all work experience entries (sorted by `order`)
- [ ] CRUD operations:
  - [ ] Create: Modal/form to add new entry
  - [ ] Read: Display in table/list
  - [ ] Update: Inline edit or modal
  - [ ] Delete: Confirm modal → delete from DB
- [ ] Drag-and-drop reordering (update `order` field)
- [ ] Form validation with Zod

#### Phase 6: Manage Education (app/admin/education/page.tsx)
- [ ] List all education entries (sorted by `order`)
- [ ] CRUD operations:
  - [ ] Create: Modal/form to add new entry
  - [ ] Read: Display in table/list
  - [ ] Update: Inline edit or modal
  - [ ] Delete: Confirm modal → delete from DB
- [ ] Drag-and-drop reordering (update `order` field)
- [ ] Form validation with Zod

#### Phase 7: Manage Projects (app/admin/projects/page.tsx)
- [ ] List all projects (sorted by `order`)
- [ ] CRUD operations:
  - [ ] Create: Form to add new project
  - [ ] Read: Display project cards with edit/delete buttons
  - [ ] Update: Edit form with all project fields
  - [ ] Delete: Confirm modal → delete from DB
- [ ] Image upload to Supabase Storage
  - [ ] Create storage bucket: `project-images`
  - [ ] Upload image → get public URL
  - [ ] Store URL in `image_url` field
- [ ] Toggle `published` status (show/hide on Portfolio page)
- [ ] Drag-and-drop reordering
- [ ] Form validation with Zod

#### Phase 8: View Contact Submissions (app/admin/contacts/page.tsx)
- [ ] Fetch and display all contact form submissions
- [ ] Display: Name, Email, Message, Submitted At
- [ ] Mark as read/unread
- [ ] Delete submission
- [ ] Optional: Reply via email button (opens mailto)

---

## 🗄️ Supabase Database Schema

### Tables to Create

```sql
-- About table
CREATE TABLE about (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bio TEXT,
  job_title TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  x_url TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Work Experience table
CREATE TABLE work_experience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_title TEXT NOT NULL,
  company TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Education table
CREATE TABLE education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  description TEXT,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now()
);

-- Projects table (already exists, update if needed)
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  technologies TEXT[], -- Array of technology names
  demo_url TEXT,
  repo_url TEXT,
  image_url TEXT,
  published BOOLEAN DEFAULT false,
  "order" INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Contact Submissions table (optional)
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now()
);
```

### Row Level Security (RLS)
- [ ] Enable RLS on all tables
- [ ] Allow public read access to: `about`, `work_experience`, `education`, `projects` (where `published = true`)
- [ ] Restrict write access to authenticated admin user only
- [ ] `contact_submissions`: No public access, admin-only read/write

---

## 🧩 Component Architecture

### Components to Create
- [ ] `/components/WorkExperience.tsx` - Timeline display
- [ ] `/components/Education.tsx` - Education cards
- [ ] `/components/SocialLinks.tsx` - Social media icons
- [ ] `/components/ProjectCard.tsx` - ✅ Already exists (needs updates)
- [ ] `/components/ui/Button.tsx` - Reusable button component
- [ ] `/components/ui/Modal.tsx` - Modal for admin CRUD operations
- [ ] `/components/ui/Toast.tsx` - Success/error notifications
- [ ] `/components/admin/Sidebar.tsx` - Admin navigation
- [ ] `/components/admin/ProjectForm.tsx` - Create/Edit project form
- [ ] `/components/admin/ExperienceForm.tsx` - Create/Edit work experience form
- [ ] `/components/admin/EducationForm.tsx` - Create/Edit education form

---

## 🚀 Deployment (Future Phase)

### AWS Deployment
- [ ] Set up AWS account
- [ ] Configure S3 bucket for static assets (if needed)
- [ ] Configure SES for production email sending
- [ ] Deploy Next.js app to Vercel or AWS Amplify
- [ ] Configure environment variables in deployment platform
- [ ] Test production build

---

## 📝 Development Priorities (Recommended Order)

1. **Database Setup** (30 min)
   - Create all Supabase tables
   - Configure RLS policies
   - Add seed data for testing

2. **About Page Backend Integration** (1-2 hours)
   - Fetch data from Supabase
   - Implement markdown rendering
   - Modularize components

3. **Portfolio Page Enhancement** (30 min)
   - Update ProjectCard for technologies bullet list
   - Test with real data

4. **Contact Form Implementation** (1-2 hours)
   - Create API route
   - Integrate AWS SES
   - Test email sending

5. **Admin Authentication** (2-3 hours)
   - Implement Supabase Auth
   - Create login page
   - Protect admin routes

6. **Admin CRUD - About** (1-2 hours)
   - Create management page
   - Implement save functionality

7. **Admin CRUD - Work Experience** (2-3 hours)
   - Create management page
   - Implement full CRUD

8. **Admin CRUD - Education** (2-3 hours)
   - Create management page
   - Implement full CRUD

9. **Admin CRUD - Projects** (3-4 hours)
   - Create management page
   - Implement image upload
   - Implement full CRUD

10. **Admin - Contact Submissions** (1 hour)
    - Create view page
    - Implement mark as read/delete

---

## 🎯 Total Estimated Time: 15-20 hours

This plan ensures modular, maintainable code with full admin functionality for seamless content updates.
