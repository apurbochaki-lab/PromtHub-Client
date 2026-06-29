<div align="center">
  <img src="[https://i.ibb.co.com/7hV2Fch/logo-modified.png](https://i.ibb.co.com/7hV2Fch/logo-modified.png)" alt="AI Logo" width="120" />
  <h1>🚀 AI Prompt Sharing & Marketplace Platform</h1>
</div>

---

## 📖 Project Purpose
The AI Prompt Sharing & Marketplace Platform allows users to create, discover, bookmark, and manage AI prompts for different AI tools such as ChatGPT, Gemini, Claude, Midjourney, and more[cite: 1]. The platform aims to build a modern community-driven ecosystem where users can exchange high-quality AI prompts securely and efficiently[cite: 1].

---

## 🔗 Live URL
**Live Demo:** [https://prompt-hub-client.vercel.app](#)

---

## ✨ Key Features

### 🔐 Authentication & Authorization
* JWT-based secure authentication using Next.js and `better-auth`[cite: 1].
* Role-Based Access Control protecting routes for User, Creator, and Admin roles[cite: 1].
* Seamless Google Login integration[cite: 1].

### 🔍 Explore & Discover Prompts
* Server-side search functionality by Prompt Title, Tags, and AI Tool[cite: 1].
* Filter prompts by Category, AI Tool, and Difficulty Level[cite: 1].
* Sorting options for Most Popular, Most Copied, and Latest prompts[cite: 1].

### 💳 Premium Marketplace
* One-time $5 payment system integrated with Stripe to unlock Premium access[cite: 1].
* Content protection for private/premium prompts (locked content and copy prevention) until subscribed[cite: 1].

### 💬 Interaction Features
* Logged-in users can bookmark and copy prompts, increasing the copy count dynamically[cite: 1].
* Users with access can leave reviews, give ratings, and report inappropriate content[cite: 1].

### 📊 Analytics & Dashboards
* **User Dashboard:** Manage added prompts, saved prompts, and submitted reviews[cite: 1].
* **Creator Dashboard:** View Recharts-powered analytics for total copies and prompt growth[cite: 1].
* **Admin Dashboard:** Full control over users, prompt moderation (approve/reject with feedback), payments data, and reported prompts[cite: 1].

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
* **Animations:** `framer-motion` (Used in Banner, Featured Prompts, Reviews, etc.)[cite: 1]

### Icons, Charts & Notifications
* **Charts:** `recharts` (For dashboard analytics)[cite: 1]
* **Notifications:** `react-hot-toast` (For showing success/error messages)[cite: 1]
* **Icons:** `lucide-react`, `@gravity-ui/icons`, `@iconify/react`

---
