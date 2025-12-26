# 💸 Expense Tracker

A modern, fully-featured expense tracking web application built with Next.js 15, TypeScript, Tailwind CSS, and Supabase.

## 🎯 Features

### ✅ Core Features

- **User Authentication** - Sign up, login, logout with Supabase Auth
- **Protected Routes** - Dashboard and expenses only accessible to authenticated users
- **Add Expenses** - Create new expenses with amount, category, date, and description
- **View Expenses** - Display all expenses in a clean, responsive table
- **Edit Expenses** - Modify existing expenses with a modal form
- **Delete Expenses** - Remove expenses with confirmation dialog
- **Total Spent** - Real-time calculation of total spending
- **Monthly Breakdown** - Separate card showing current month's spending

### 🎨 UI/UX Features

- **Modern Design** - Clean, minimalist interface with Tailwind CSS
- **Dark Mode** - Full dark mode support (auto-detects system preference)
- **Responsive Layout** - Mobile-friendly stacked layout
- **Loading Skeletons** - Animated loading states while fetching data
- **Error Handling** - User-friendly error messages
- **Gradient Cards** - Beautiful gradient backgrounds for summary cards
- **Hover Effects** - Smooth transitions and hover states

### 🔐 Security

- **Row-Level Security (RLS)** - Users can only access their own expenses
- **Server Actions** - Secure server-side mutations
- **Session Management** - Automatic session refresh with middleware
- **Type Safety** - Full TypeScript support with database types

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**

### Backend & Database

- **Supabase** (PostgreSQL + Auth)
- **Server Actions** (Next.js)

### Authentication

- **Supabase Auth** with email/password

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account (free at [supabase.com](https://supabase.com))

### 1. Clone the Repository

```bash
git clone <repository-url>
cd expense-tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Create the expenses table using this SQL:

```sql
create table expenses (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  amount numeric not null,
  category text not null,
  description text,
  date date not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table expenses enable row level security;

create policy "Users can view own expenses"
  on expenses for select
  using (auth.uid() = user_id);

create policy "Users can insert own expenses"
  on expenses for insert
  with check (auth.uid() = user_id);

create policy "Users can update own expenses"
  on expenses for update
  using (auth.uid() = user_id);

create policy "Users can delete own expenses"
  on expenses for delete
  using (auth.uid() = user_id);
```

3. Get your Supabase credentials:
   - Go to **Settings → API**
   - Copy your **Project URL** and **Anon Key**

### 4. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Usage

### Creating an Account

1. Navigate to `/auth/signup`
2. Enter email and password (min. 6 characters)
3. Confirm password matches
4. Click "Sign Up"

### Adding Expenses

1. Log in to your dashboard
2. Fill in the expense form:
   - **Amount**: Enter the expense amount (required)
   - **Category**: Select from dropdown
   - **Date**: Pick a date (defaults to today)
   - **Description**: Add optional notes
3. Click "Add Expense"

### Editing Expenses

1. Find the expense in the table
2. Click "Edit" button
3. Modify any field in the modal
4. Click "Save Changes"

### Deleting Expenses

1. Find the expense in the table
2. Click "Delete" button
3. Confirm deletion

## 📁 Project Structure

```
expense-tracker/
├── src/
│   ├── app/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── AddExpenseForm.tsx
│   │   ├── EditExpenseModal.tsx
│   │   ├── ExpenseList.tsx
│   │   ├── Header.tsx
│   │   └── LoadingSkeletons.tsx
│   ├── lib/
│   │   ├── actions/
│   │   ├── auth.ts
│   │   ├── constants.ts
│   │   ├── supabase.types.ts
│   │   ├── supabaseClient.ts
│   │   └── supabaseServer.ts
│   └── proxy.ts
├── .env.local
├── package.json
└── README.md
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] **Sign Up** - Create new account and verify redirect
- [ ] **Login** - Log out and back in, verify session persists
- [ ] **Add Expenses** - Add expense, verify appears in table and total updates
- [ ] **Edit Expenses** - Modify expense, verify changes are saved
- [ ] **Delete Expenses** - Delete expense, verify removal and total recalculation
- [ ] **Monthly Breakdown** - Verify "This Month" card shows correct total
- [ ] **Authentication** - Verify incognito/private window requires login
- [ ] **Responsive Design** - Test on mobile, tablet, and desktop
- [ ] **Dark Mode** - Verify dark mode works correctly

## 🔐 Security Features

- **RLS Policies** - Only users see their own expenses
- **Server Actions** - All mutations happen server-side
- **Session Middleware** - Automatic token refresh
- **Protected Routes** - Dashboard requires authentication
- **Type Safety** - TypeScript prevents bugs

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Connect repo to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 📝 Expense Categories

- Food & Dining
- Transportation
- Shopping
- Entertainment
- Bills & Utilities
- Healthcare
- Education
- Travel
- Personal
- Other

## 🐛 Troubleshooting

| Issue                 | Solution                          |
| --------------------- | --------------------------------- |
| "Unauthorized" error  | Log out and back in               |
| Expenses not showing  | Check RLS policies in Supabase    |
| Can't add expense     | Verify all required fields filled |
| Dark mode not working | Clear browser cache               |

## 📄 License

MIT License - feel free to use this project for personal or commercial use.

## 🤝 Contributing

Contributions welcome! Feel free to submit a Pull Request.

---

**Version:** 1.0.0 (MVP)  
**Last Updated:** December 22, 2025
#
