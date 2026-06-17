# Cosmora — Deployment Guide

A static React + Vite + Tailwind CSS landing page for Cosmora Health.
This is a **fully static** site — the `dist/` folder is all you need.

---

## Quick Start (Local)

```bash
cd novasight-dashboard
npm install
npm run build        # produces dist/
npm run preview      # optional: preview the built site locally
```

---

## Hosting Setups

### 1. Netlify (Recommended)

1. Push the repo to GitHub / GitLab / Bitbucket.
2. In Netlify, click **Add new site > Import an existing project**.
3. Connect your repo, set:
   - **Build command:** `cd novasight-dashboard && npm install && npm run build`
   - **Publish directory:** `novasight-dashboard/dist`
4. Click **Deploy**.

*Alternatively*, drag-and-drop the entire `novasight-dashboard/` folder into the Netlify dashboard — it will auto-detect the build.

### 2. Vercel

1. Push to a git repo.
2. Import the project in Vercel.
3. Set:
   - **Root Directory:** `novasight-dashboard`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click **Deploy**.

### 3. GitHub Pages

1. Push to a GitHub repo with a `gh-pages` branch (or use a workflow).
2. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      - run: npm ci
        working-directory: novasight-dashboard
      - run: npm run build
        working-directory: novasight-dashboard
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: novasight-dashboard/dist
```

3. Enable Pages in repo **Settings > Pages > Source: GitHub Actions**.

### 4. Cloudflare Pages

1. Push to git.
2. In Cloudflare Pages, create a project from your repo.
3. Set:
   - **Framework preset:** React + Vite
   - **Build command:** `npm run build`
   - **Output directory:** `novasight-dashboard/dist`
4. Deploy.

### 5. Apache / Nginx (Shared Hosting or VPS)

1. Run `npm run build` locally.
2. Upload the contents of `novasight-dashboard/dist/` to your web root
   (e.g., `public_html/` or `/var/www/html/`).
3. For Nginx, add a fallback for client-side routing:

```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

4. For Apache, ensure `.htaccess` exists in `dist/` with:

```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

---

## Configuring Contact Buttons → Google Form

The "Request Early Access" button in the Hero section and the "Explore Partnership Options" button in the Footer currently don't link anywhere.

### Steps:

1. **Create a Google Form** at [google.com/forms](https://forms.google.com) with fields like:
   - Name
   - Email
   - Organization / Clinic
   - Role / Interest area (Early Access, Partnership, etc.)

2. **Get the form URL** — click **Send** → copy the link (e.g. `https://forms.gle/xxxxx`).

3. **Wire up the buttons.** Edit these files and replace the bare `<button>` elements with `<a>` tags:

   **`src/components/Hero.tsx`** — line ~65, replace:
   ```tsx
   <button className="group flex items-center gap-2 px-8 py-4 bg-accent text-bg font-semibold rounded-lg hover:bg-sky-400 transition-all duration-200 min-h-[44px] min-w-[140px] justify-center">
     Request Early Access
     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
   </button>
   ```
   with:
   ```tsx
   <a
     href="YOUR_GOOGLE_FORM_URL_HERE"
     target="_blank"
     rel="noopener noreferrer"
     className="group flex items-center gap-2 px-8 py-4 bg-accent text-bg font-semibold rounded-lg hover:bg-sky-400 transition-all duration-200 min-h-[44px] min-w-[140px] justify-center"
   >
     Request Early Access
     <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
   </a>
   ```

   **`src/components/Footer.tsx`** — the "Explore Partnership Options" button around line ~70, replace:
   ```tsx
   <button className="mt-8 flex items-center gap-2 px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-bg transition-all duration-200 min-h-[44px]">
     Explore Partnership Options
     <Send className="w-4 h-4" />
   </button>
   ```
   with:
   ```tsx
   <a
     href="YOUR_GOOGLE_FORM_URL_HERE"
     target="_blank"
     rel="noopener noreferrer"
     className="mt-8 flex items-center gap-2 px-6 py-3 border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-bg transition-all duration-200 min-h-[44px]"
   >
     Explore Partnership Options
     <Send className="w-4 h-4" />
   </a>
   ```

4. **Rebuild** (`npm run build`) and redeploy.

---

## Weekly Mailing List (Automated)

The "Join the Waitlist" form in the Footer currently only shows a local success message. Here are two approaches to connect it:

### Option A: Google Form + Google Sheets (Simplest)

Same as the contact buttons above — replace the footer form with a link to a Google Form, then use **Google Sheets** as the backend:

1. Create a separate Google Form for "Join the Waitlist."
2. Link the form responses to a **Google Sheet** (Form > Responses > Link to Sheets).
3. Use **Google Apps Script** (Sheet > Extensions > Apps Script) to automate weekly email digests:

```javascript
// In Google Sheets > Extensions > Apps Script
function sendWeeklyDigest() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Form Responses');
  const rows = sheet.getDataRange().getValues();
  const headers = rows[0];
  
  // Get signups from the last 7 days
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const newSignups = [];
  for (let i = 1; i < rows.length; i++) {
    const date = new Date(rows[i][0]); // Assuming first column is timestamp
    if (date >= oneWeekAgo) {
      newSignups.push(rows[i]);
    }
  }
  
  if (newSignups.length === 0) return;
  
  const subject = 'Cosmora Weekly Update - ' + new Date().toLocaleDateString();
  const body = `New signups this week: ${newSignups.length}\n\n` +
    newSignups.map(row => `• ${row[1]} (${row[2]})`).join('\n');
  
  GmailApp.sendEmail('your-email@example.com', subject, body);
}
```

4. Set a **time-driven trigger** in Apps Script (Edit > Current project triggers) to run weekly.

### Option B: Email Service Provider (Mailchimp / Buttondown / ConvertKit)

For a more polished approach:

1. **Mailchimp:** Create a free account, create a signup form, and embed the form action URL in the Footer component:

   Replace the `handleSubmit` function in `Footer.tsx` with a direct form POST to Mailchimp:
   ```tsx
   // Set as a constant at the top of the file
   const MAILCHIMP_FORM_ACTION = 'https://YOUR_DOMAIN.usXX.list-manage.com/subscribe/post?u=XXXXX&id=XXXXX';
   ```

   Then update the form to POST to that URL, or use Mailchimp's embedded form embed code.

2. **Buttondown.co** (great for newsletters): Create a free account, grab the embed snippet, and swap it into the Footer component.

3. **ConvertKit:** Similar flow — create a form, get the embed code, replace the current form in `Footer.tsx`.

---

## Notes

- The **social links** in the Footer (Twitter, LinkedIn, GitHub) currently point to `#`. Update their `href` values when real profiles are available.
- The site is fully static after build — no server-side rendering or API calls are needed.
- Assets (images, favicon) are bundled into `dist/` by Vite's build process.
