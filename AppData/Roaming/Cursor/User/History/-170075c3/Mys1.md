# Deployment Guide for GitHub Pages

This guide will help you deploy your Daily Quote Puzzle Game to GitHub Pages.

## Prerequisites

1. **GitHub Account**: Make sure you have a GitHub account
2. **Git**: Install Git on your local machine
3. **Repository**: Create a new repository on GitHub

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Name your repository: `dailyquote_cursor`
5. Make it **Public** (required for GitHub Pages)
6. Don't initialize with README (we'll upload our files)
7. Click "Create repository"

## Step 2: Upload Your Code

### Option A: Using GitHub Desktop
1. Download and install [GitHub Desktop](https://desktop.github.com/)
2. Clone your repository
3. Copy all your project files into the repository folder
4. Commit and push to GitHub

### Option B: Using Git Command Line
```bash
# Initialize git in your project folder
git init

# Add all files
git add .

# Commit the files
git commit -m "Initial commit: Daily Quote Puzzle Game"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/dailyquote_cursor.git

# Push to GitHub
git push -u origin main
```

### Option C: Using GitHub Web Interface
1. Go to your repository on GitHub
2. Click "Add file" → "Upload files"
3. Drag and drop all your project files
4. Add commit message: "Initial commit: Daily Quote Puzzle Game"
5. Click "Commit changes"

## Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Scroll down to **Pages** section (in the left sidebar)
4. Under **Source**, select **Deploy from a branch**
5. Under **Branch**, select **main** and **/(root)**
6. Click **Save**

## Step 4: Wait for Deployment

- GitHub Pages will automatically build and deploy your site
- This usually takes 1-5 minutes
- You'll see a green checkmark when deployment is complete

## Step 5: Access Your Site

Your game will be available at:
```
https://YOUR_USERNAME.github.io/dailyquote_cursor
```

## Troubleshooting

### Common Issues:

1. **404 Error**: 
   - Make sure your repository is public
   - Check that GitHub Pages is enabled in Settings
   - Wait a few minutes for deployment

2. **Audio not working**:
   - GitHub Pages serves files over HTTPS
   - Audio should work fine in modern browsers

3. **Files not showing**:
   - Make sure all files are committed and pushed
   - Check that `index.html` is in the root directory

### File Structure Check

Your repository should look like this:
```
dailyquote_cursor/
├── index.html
├── daily_quote_puzzle_modern.html
├── game-modern.js
├── quotes_calendar.js
├── sounds/
│   ├── background-music.mp3
│   ├── keytype.mp3
│   ├── word-complete.mp3
│   ├── author-complete.mp3
│   ├── quote-complete.mp3
│   ├── reset.mp3
│   └── backspace.mp3
├── README.md
├── LICENSE
└── .gitignore
```

## Custom Domain (Optional)

If you want to use a custom domain:

1. Go to repository Settings → Pages
2. Under "Custom domain", enter your domain
3. Add a CNAME file to your repository with your domain
4. Configure DNS with your domain provider

## Updating Your Site

To update your site:

1. Make changes to your local files
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update: [describe your changes]"
   git push
   ```
3. GitHub Pages will automatically rebuild and deploy

## Performance Tips

- **File sizes**: Keep audio files reasonable in size
- **Caching**: GitHub Pages automatically caches static assets
- **CDN**: Consider using a CDN for large files if needed

---

Your Daily Quote Puzzle Game is now live on GitHub Pages! 🎉 