# Git Deployment Guide for Porto HTML5 Template

This document covers Git-based deployment options for your existing repository.

## Quick Deploy to GitHub Pages

```bash
git add .
git commit -m "Deploy Porto HTML5 template"
git push origin main
```

Then enable GitHub Pages:
- Go to your repository on GitHub
- Settings → Pages
- Select **main** branch and root folder (`/`)
- Click **Save**

---

## Deployment Options

### 1. GitHub Pages (main branch)

```bash
git add .
git commit -m "Update site"
git push origin main
```

Enable in: Repository Settings → Pages → Select main branch

### 2. GitHub Pages (gh-pages branch)

```bash
git checkout -b gh-pages
git push origin gh-pages
```

Enable in: Repository Settings → Pages → Select gh-pages branch

### 3. GitHub Pages (/docs folder)

```bash
mkdir docs
mv *.html css js img docs/
git add .
git commit -m "Move to docs folder"
git push origin main
```

Enable in: Repository Settings → Pages → Select main branch and `/docs` folder

### 4. Netlify (Drag & Drop)

1. Go to [Netlify Drop](https://app.netlify.com/drop)
2. Drag and drop your HTML folder
3. Site deployed instantly

### 5. Netlify (Git Integration)

1. Sign up at [Netlify](https://netlify.com)
2. Add new site → Import existing project
3. Select your Git provider
4. Authorize and select your repository
5. Deploy (leave build command empty for static HTML)

### 6. Vercel

1. Sign up at [Vercel](https://vercel.com)
2. Add New → Project
3. Import your Git repository
4. Deploy (Vercel auto-detects static site settings)

### 7. GitLab Pages

1. Create `.gitlab-ci.yml`:
```yaml
image: alpine/latest

pages:
  stage: deploy
  script:
    - cp -r . public/
  artifacts:
    paths:
      - public
  only:
    - main
```

2. Push to GitLab:
```bash
git remote set-url origin git@gitlab.com:your-gitlab-path.git
git push origin main
```

Enable in: Deploy → Pages in your GitLab project

### 8. Traditional Server (Git pull)

On your server:
```bash
git clone your-repo-url /var/www/your-site
# or
cd /var/www/your-site
git pull origin main
```

### 9. Traditional Server (Auto-deploy hook)

On your server:
```bash
git init --bare /var/www/your-site.git
git config receive.denyCurrentBranch ignore
```

Create hook `/var/www/your-site.git/hooks/post-receive`:
```bash
#!/bin/bash
TARGET="/var/www/your-site"
BRANCH="main"

while read oldrev newrev refname; do
    if [[ "$refname" == "refs/heads/$BRANCH" ]]; then
        git --work-tree=$TARGET --git-dir=$TARGET/.git checkout -f $BRANCH
    fi
done
```

### 10. Traditional Server (rsync)

```bash
rsync -avz --delete -e ssh ./ user@your-server.com:/var/www/your-site/
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Check CSS styles applied correctly
- [ ] Test all links and navigation
- [ ] Verify images loading
- [ ] Check responsive design on mobile
- [ ] Test interactive features
- [ ] Check browser console for errors
- [ ] Verify HTTPS working

---

## Troubleshooting

### 404 errors on GitHub Pages
- Ensure `index.html` exists in root
- Check GitHub Pages enabled in settings
- Use relative file paths

### Styles not loading
- Check CSS file paths in HTML
- Verify CSS files committed to git

### Images not showing
- Verify image paths in HTML
- Check file permissions

### Reset deployment
```bash
git reset --hard HEAD
git clean -fd
git pull origin main
```

---

## Security

- Never commit sensitive data (.env, credentials)
- Keep API keys and secrets in environment variables
- Use read-only Git tokens when possible
- Enable HTTPS on all deployments (automatic on GitHub Pages, Netlify, Vercel)
