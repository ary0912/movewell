# MoveWell - Deployment Guide

## Quick Deploy to Vercel (Recommended - 2 minutes)

**Vercel** is perfect for Vite + React apps with a generous free tier. Here's how to deploy:

### Option 1: Deploy with Git (Easiest)

1. **Initialize Git repository** (if you haven't already):
   ```bash
   cd /Users/aryanlodha/Desktop/Move\ App
   git init
   git add .
   git commit -m "Initial commit: MoveWell health assessment app"
   ```

2. **Create a GitHub account** (if needed) and create a new repository:
   - Go to [github.com/new](https://github.com/new)
   - Name it `movewell` or similar
   - Don't initialize with README (you already have one)
   - Click "Create repository"

3. **Push code to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/movewell.git
   git branch -M main
   git push -u origin main
   ```

4. **Deploy to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub (click "Continue with GitHub")
   - Click "Import Project"
   - Select your `movewell` repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"
   - **Done!** Your app is live in ~2 minutes

### Option 2: Deploy with Vercel CLI (Quick Alternative)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
cd /Users/aryanlodha/Desktop/Move\ App
vercel

# Follow prompts and confirm deployment
```

---

## Alternative Free Platforms

### Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect GitHub and select your repository
4. Build settings are auto-detected
5. Deploy!

### GitHub Pages (Static only)
Update your `vite.config.ts`:
```typescript
export default defineConfig({
  base: '/movewell/', // Change to your repo name
  // ... rest of config
})
```

Then deploy to GitHub Pages using GitHub Actions.

---

## After Deployment

Your app will be available at:
- **Vercel**: `https://movewell-[random-id].vercel.app` or custom domain
- **Netlify**: `https://[your-site-name].netlify.app` or custom domain

### Custom Domain Setup (Optional - Free)

Both Vercel and Netlify offer free custom domain setup. You can use:
- Vercel: Supports all domain registrars
- Netlify: Works with any registrar

Simply update DNS records to point to their servers.

---

## Performance Tips

✓ Your build is optimized (Vite is fast!)
✓ Code splitting is automatic
✓ Images are optimized
✓ Production build is ~650KB JS, ~26KB CSS

---

## Environment Variables (if needed later)

Create a `.env` file locally:
```
VITE_API_URL=https://your-api.com
```

In Vercel/Netlify dashboard:
- Go to Project Settings → Environment Variables
- Add variables
- They'll be available in your build

---

## Support & Troubleshooting

If deployment fails:
1. Check build logs in Vercel/Netlify dashboard
2. Verify `npm run build` works locally
3. Ensure `dist` folder is created
4. Check `vercel.json` or `vercel.json` settings

---

## Next Steps

After deployment, consider:
- [ ] Set up a custom domain
- [ ] Add Google Analytics
- [ ] Enable automatic previews for PRs
- [ ] Set up CI/CD for automatic deployments

**Your app is production-ready!** 🚀
