<div align="center">
  <img src="[https://i.ibb.co.com/7hV2Fch/logo-modified.png](https://i.ibb.co.com/7hV2Fch/logo-modified.png)" alt="AI Logo" width="120" />
  <h1>🚀 AI Prompt Sharing & Marketplace Platform</h1>
</div>

---

## 📖 Project Purpose
The AI Prompt Sharing & Marketplace Platform allows users to create, discover, bookmark, and manage AI prompts for different AI tools such as ChatGPT, Gemini, Claude, Midjourney, and more. The platform aims to build a modern community-driven ecosystem where users can exchange high-quality AI prompts securely and efficiently.

---

## 🔗 Live URL
**Live Demo:** [https://prompt-hub-client.vercel.app](#)
**Backend Repo:** [https://github.com/apurbochaki-lab/PromptHub-server](#)

---

## ✨ Key Features

### 🔐 Authentication & Authorization
* JWT-based secure authentication using Next.js and `better-auth`.
* Role-Based Access Control protecting routes for User, Creator, and Admin roles.
* Seamless Google Login integration.

### 🔍 Explore & Discover Prompts
* Server-side search functionality by Prompt Title, Tags, and AI Tool.
* Filter prompts by Category, AI Tool, and Difficulty Level.
* Sorting options for Most Popular, Most Copied, and Latest prompts.

### 💳 Premium Marketplace
* One-time $5 payment system integrated with Stripe to unlock Premium access.
* Content protection for private/premium prompts (locked content and copy prevention) until subscribed.

### 💬 Interaction Features
* Logged-in users can bookmark and copy prompts, increasing the copy count dynamically.
* Users with access can leave reviews, give ratings, and report inappropriate content.

### 📊 Analytics & Dashboards
* **User Dashboard:** Manage added prompts, saved prompts, and submitted reviews.
* **Creator Dashboard:** View Recharts-powered analytics for total copies and prompt growth.
* **Admin Dashboard:** Full control over users, prompt moderation (approve/reject with feedback), payments data, and reported prompts.

---

## 🛠️ Tech Stack & npm Packages Used

### Core & Database
* **Framework:** `next` (v16.2.9)
* **Database:** `mongodb` 

### Authentication & Payments
* **Auth:** `better-auth`, `@better-auth/mongo-adapter`
* **Payments:** `stripe`, `@stripe/stripe-js`

### Styling, UI & Animations
* **Styling:** `tailwindcss`, `@tailwindcss/postcss`
* **UI Components:** `@heroui/react`, `@heroui/styles`
* **Animations:** `framer-motion` (Used in Banner, Featured Prompts, Reviews, etc.)

### Icons, Charts & Notifications
* **Charts:** `recharts` (For dashboard analytics)
* **Notifications:** `react-hot-toast` (For showing success/error messages)
* **Icons:** `lucide-react`, `@gravity-ui/icons`, `@iconify/react`

---
