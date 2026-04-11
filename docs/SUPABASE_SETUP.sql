-- ══════════════════════════════════════════════════
-- Portfolio Supabase Schema
-- Run this in your Supabase SQL Editor
-- ══════════════════════════════════════════════════
 
-- 1. Profile (single row — your personal info)
create table if not exists profile (
  id            serial primary key,
  name          text default 'Habib Khan',
  role          text default 'Frontend Developer',
  bio           text,
  profile_image_path text,   -- storage path, e.g. "images/ProfileImage.jpg"
  resume_path   text,        -- storage path, e.g. "documents/Habib_Khan_Resume.pdf"
  linkedin_url  text,
  github_url    text
);

-- 2. Skills
create table if not exists skills (
  id     serial primary key,
  name   text not null,
  level  int  not null check (level between 0 and 100),
  color  text not null,       -- hex color, e.g. "#F7DF1E"
  years  numeric not null,
  icon   text not null        -- react-icons key, e.g. "SiJavascript"
);

-- 3. Education
create table if not exists education (
  id         serial primary key,
  degree     text not null,
  university text not null,
  duration   text not null,
  logo_path  text             -- storage path, e.g. "images/UniversityLogo.png"
);

-- 4. Projects
create table if not exists projects (
  id           serial primary key,
  title        text    not null,
  description  text,
  url          text,           -- live website URL (optional)
  apk_path     text,           -- storage path (optional)
  apk_filename text,           -- download filename, e.g. "Fresh-News.apk"
  tags         text[],         -- e.g. ARRAY['React', 'Firebase']
  sort_order   int default 0
);

-- 5. Project Images (one-to-many)
create table if not exists project_images (
  id         serial primary key,
  project_id int references projects(id) on delete cascade,
  path       text not null,    -- storage path
  sort_order int default 0
);

-- ── Enable RLS + public read access ──────────────

alter table profile        enable row level security;
alter table skills         enable row level security;
alter table education      enable row level security;
alter table projects       enable row level security;
alter table project_images enable row level security;

create policy "Public read" on profile        for select using (true);
create policy "Public read" on skills         for select using (true);
create policy "Public read" on education      for select using (true);
create policy "Public read" on projects       for select using (true);
create policy "Public read" on project_images for select using (true);


-- ══════════════════════════════════════════════════
-- Sample Data — edit with your real info then run
-- ══════════════════════════════════════════════════

insert into profile (name, role, bio, profile_image_path, resume_path, linkedin_url, github_url)
values (
  'Habib Khan',
  'Frontend Developer',
  'Frontend Developer who builds sleek, responsive websites with React.js and cross-platform mobile apps with React Native. I turn designs into pixel-perfect, high-performance interfaces that delight users on any device.',
  'images/ProfileImage.jpg',
  'documents/Habib_Khan_Resume.pdf',
  'https://www.linkedin.com/in/habib-khan-62b63522b/',
  'https://github.com/Mr-khan1100'
);

insert into skills (name, level, color, years, icon) values
  ('JavaScript', 90, '#F7DF1E', 2,   'SiJavascript'),
  ('React',      85, '#61DAFB', 2,   'SiReact'),
  ('Node.js',    80, '#68A063', 2,   'SiNodedotjs'),
  ('Python',     65, '#3776AB', 0.6, 'SiPython'),
  ('MongoDB',    60, '#47A248', 0.6, 'SiMongodb'),
  ('Git',        70, '#F05032', 2,   'SiGit'),
  ('MySQL',      85, '#0089D6', 2,   'SiMysql'),
  ('Firebase',   85, '#FFCA28', 2,   'SiFirebase'),
  ('HTML5',      90, '#E34F26', 2,   'SiHtml5'),
  ('CSS',        90, '#1572B6', 2,   'SiCss3');

insert into education (degree, university, duration, logo_path) values
  ('B.Tech in Information Technology',
   'Vasantdada Patil Pratishthan''s College of Engineering | Mumbai University',
   '2019 – 2023',
   'images/UniversityLogo.png');

insert into projects (title, description, url, apk_path, apk_filename, tags, sort_order) values
  ('Sales Dashboard',
   'Dynamic Sales Dashboard with Charts to show growth, manage sign-in, and traffic on your website. Responsive design with minimalistic colors and icons.',
   'https://nova-sales-dashboard.netlify.app/',
   null, null,
   ARRAY['React', 'Charts', 'Responsive'], 1),

  ('Fresh News',
   'Mobile app for reading the latest news from all over the world. Bookmark articles, filter by category, date and country. Search and read in WebView.',
   null,
   'apk/Fresh-news.apk', 'Fresh-News.apk',
   ARRAY['React Native', 'News API', 'Mobile'], 2),

  ('HRMS – Leave Management',
   'A leave management app with role-based access. Managers can approve or reject leave. Real-time status reflection and leave count with full validations.',
   null,
   'apk/QuickHr.apk', 'QuickHr.apk',
   ARRAY['React Native', 'Firebase', 'HRMS'], 3),

  ('Employee Form App',
   'Multi-step form app enforcing required fields with dynamic popups. Supports file upload as blob and many more features.',
   null,
   'apk/Employee-Form.apk', 'Employee-Form.apk',
   ARRAY['React Native', 'Forms', 'Validation'], 4);

-- Project images (update paths to match what you upload to Storage > assets bucket)
insert into project_images (project_id, path, sort_order)
select id, unnest(ARRAY[
  'images/Dashboard1.png','images/Dashboard2.png','images/Dashboard3.png'
]), generate_series(0,2)
from projects where title = 'Sales Dashboard';

insert into project_images (project_id, path, sort_order)
select id, unnest(ARRAY[
  'images/fresh-logo.png','images/FreshNews1.jpeg','images/FreshNews2.jpeg',
  'images/FreshNews3.jpeg','images/FreshNews4.jpeg','images/FreshNews5.jpeg'
]), generate_series(0,5)
from projects where title = 'Fresh News';

insert into project_images (project_id, path, sort_order)
select id, unnest(ARRAY[
  'images/QuickHrLogo.jpg','images/QuickHr1.jpeg',
  'images/QuickHr2.jpeg','images/QuickHr3.jpeg','images/QuickHr4.jpeg'
]), generate_series(0,4)
from projects where title = 'HRMS – Leave Management';

insert into project_images (project_id, path, sort_order)
select id, unnest(ARRAY[
  'images/fromsLogo.png','images/Form1.jpeg',
  'images/Form2.jpeg','images/Form3.jpeg','images/Form4.jpeg'
]), generate_series(0,4)
from projects where title = 'Employee Form App';
