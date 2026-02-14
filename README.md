# ReferralVerse

A modern referral offers directory built with Next.js, React, and TypeScript. Deployed on Netlify.

---

## 🛠 Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [PostCSS](https://postcss.org/) (see [`postcss.config.mjs`](postcss.config.mjs))
- **Hosting:** [Netlify](https://www.netlify.com/)
- **SEO:** Dynamic metadata, Open Graph, and structured data
- **Comments:** Disqus integration

---

## 📁 Folder Structure

```
.
├── app/                # Main application routes and components (App Router)
│   ├── components/     # Reusable React components
│   ├── posts/          # Dynamic post pages ([slug])
│   └── ...             # Other route segments
├── lib/                # Utility libraries and helpers
├── public/             # Static assets (images, favicon, etc.)
├── .next/              # Next.js build output (auto-generated)
├── .idea/              # JetBrains IDE config (optional)
├── next.config.js      # Next.js configuration (JS)
├── next.config.ts      # Next.js configuration (TS, optional)
├── netlify.toml        # Netlify deployment configuration
├── postcss.config.mjs  # PostCSS configuration
├── package.json        # Project dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── README.md           # Project documentation
```

---

## 🚀 Getting Started (Local Development)

1. **Clone the repository:**
   ```sh
   git clone https://github.com/your-username/referralverse.git
   cd referralverse
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. **Build for production:**
   ```sh
   npm run build
   npm start
   ```

 