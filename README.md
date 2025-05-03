# AceAI 🎯  
*AI-powered Mock Interview Platform*

AceAI is a full-stack AI-powered mock interview platform built to help users practice technical interviews with realistic, dynamic question generation using the Gemini API. Users can simulate interview scenarios, receive instant feedback, and improve their skills across coding, system design, and behavioral questions.

## 🚀 Features

- ✨ AI-generated mock interview questions using Gemini API
- 🔐 Authentication and user management powered by Clerk
- 🧠 Real-time feedback to improve performance
- 📊 Interview tracking and progress history (Coming soon)
- 🎨 Sleek, responsive UI with shadcn/ui and Tailwind CSS

---

## 🛠 Tech Stack

| Technology        | Description |
|-------------------|-------------|
| **Next.js**        | Full-stack React framework |
| **Clerk**          | Authentication and user sessions |
| **NeonDB**         | Serverless Postgres database |
| **Drizzle ORM**    | Type-safe ORM for working with SQL databases |
| **shadcn/ui**      | Beautifully designed UI components |
| **Tailwind CSS**   | Utility-first CSS framework |
| **Gemini API**     | Google's generative AI for dynamic question generation |

---

## 📦 Getting Started

## 📦 Project Setup

To get started with AceAI locally, follow these quick steps:

```bash
# 1. Clone the repo
git clone https://github.com/Sumit00s/aceai.git
cd aceai

# 2. Install dependencies
npm install

# 3. Create and configure your .env.local file
# Add the following environment variables:

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

NEXT_PUBLIC_DATABASE_URL=

NEXT_PUBLIC_GEMINI_API_KEY=

# 4. Push your database schema using Drizzle ORM
npx drizzle-kit push

# 5. Start the development server
npm run dev
