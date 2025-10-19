# 🚀 Deployment Guide - Edu-Learn Platform

Complete guide for deploying the Edu-Learn platform to production.

---

## 📑 Table of Contents

- [Pre-Deployment Checklist](#pre-deployment-checklist)
- [Environment Configuration](#environment-configuration)
- [Database Setup](#database-setup)
- [Deployment Options](#deployment-options)
- [Frontend Deployment](#frontend-deployment)
- [Backend Deployment](#backend-deployment)
- [Domain Configuration](#domain-configuration)
- [SSL/HTTPS Setup](#sslhttps-setup)
- [Monitoring & Logging](#monitoring--logging)
- [Backup Strategy](#backup-strategy)
- [CI/CD Pipeline](#cicd-pipeline)
- [Post-Deployment](#post-deployment)
- [Troubleshooting](#troubleshooting)

---

## ✅ Pre-Deployment Checklist

### Code Preparation

- [ ] All features tested locally
- [ ] No console.log statements in production code
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] API endpoints documented
- [ ] Error handling implemented
- [ ] Security measures in place
- [ ] Performance optimized
- [ ] Code reviewed and approved
- [ ] Git repository clean (no sensitive data)

### Security Checklist

- [ ] Strong JWT_SECRET generated
- [ ] Database credentials secured
- [ ] API keys stored in environment variables
- [ ] CORS configured for production domain
- [ ] HTTPS enabled
- [ ] Rate limiting implemented
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention verified
- [ ] XSS protection enabled
- [ ] Sensitive data encrypted

### Performance Checklist

- [ ] Database indexes added
- [ ] Images optimized
- [ ] Frontend bundle optimized
- [ ] Lazy loading implemented
- [ ] Caching strategy defined
- [ ] CDN configured (if applicable)
- [ ] Compression enabled
- [ ] Database connection pooling configured

---

## ⚙️ Environment Configuration

### Production Environment Variables

#### Backend (.env)

```env
# Server Configuration
NODE_ENV=production
PORT=5000

# Database Configuration (Neon/Supabase)
DB_HOST=your-production-db-host.neon.tech
DB_PORT=5432
DB_NAME=your_production_db
DB_USER=your_production_user
DB_PASSWORD=your_secure_production_password
DB_SSL=true

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_min_32_characters_long
JWT_EXPIRE=7d

# Frontend URL
FRONTEND_URL=https://your-domain.com

# AI Configuration
DEEPSEEK_API_KEY=your_production_deepseek_api_key

# Zoom Configuration
ZOOM_API_KEY=your_production_zoom_client_id
ZOOM_API_SECRET=your_production_zoom_client_secret
ZOOM_ACCOUNT_ID=your_production_zoom_account_id

# Email Configuration (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_specific_password

# Monitoring (Optional)
SENTRY_DSN=your_sentry_dsn
LOG_LEVEL=error
```

#### Frontend (.env)

```env
VITE_API_URL=https://api.your-domain.com/api
VITE_ENV=production
```

### Generating Secure Secrets

```bash
# Generate JWT secret (Node.js)
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Generate JWT secret (OpenSSL)
openssl rand -hex 64

# Generate JWT secret (Python)
python -c "import secrets; print(secrets.token_hex(64))"
```

---

## 🗄️ Database Setup

### Option 1: Neon (Recommended)

**Advantages:**
- Serverless PostgreSQL
- Auto-scaling
- Generous free tier
- Easy setup
- Built-in backups

**Setup Steps:**

1. **Create Account**
   - Go to [neon.tech](https://neon.tech/)
   - Sign up with GitHub/Google

2. **Create Project**
   - Click "New Project"
   - Choose region closest to your users
   - Note the connection string

3. **Get Connection Details**
   ```
   Host: ep-xxx-xxx.us-east-1.aws.neon.tech
   Database: neondb
   User: neondb_owner
   Password: npg_xxxxxxxxxxxxx
   Port: 5432
   ```

4. **Configure Backend**
   - Add credentials to backend/.env
   - Enable SSL: `DB_SSL=true`

5. **Run Migrations**
   ```bash
   cd backend
   npm run migrate
   npm run seed
   ```

### Option 2: Supabase

**Advantages:**
- PostgreSQL with additional features
- Real-time subscriptions
- Built-in authentication
- Storage included
- Free tier available

**Setup Steps:**

1. **Create Project**
   - Go to [supabase.com](https://supabase.com/)
   - Create new project

2. **Get Connection String**
   - Go to Project Settings → Database
   - Copy connection string

3. **Configure Backend**
   - Add to backend/.env
   - Enable SSL

### Option 3: Railway

**Advantages:**
- Simple deployment
- PostgreSQL included
- Auto-scaling
- Good free tier

**Setup Steps:**

1. **Create Project**
   - Go to [railway.app](https://railway.app/)
   - New Project → Provision PostgreSQL

2. **Get Credentials**
   - Click on PostgreSQL service
   - Copy connection details

3. **Configure Backend**
   - Add to backend/.env

### Database Migration

```bash
# Connect to production database
cd backend

# Run migrations
npm run migrate

# Seed initial data (optional)
npm run seed

# Verify connection
node check-db.js
```

---

## 🌐 Deployment Options

### Comparison Table

| Platform | Frontend | Backend | Database | Difficulty | Cost |
|----------|----------|---------|----------|------------|------|
| **Vercel + Railway** | ✅ | ✅ | ✅ | Easy | Free tier |
| **Netlify + Render** | ✅ | ✅ | ✅ | Easy | Free tier |
| **Heroku** | ✅ | ✅ | ✅ | Easy | Paid |
| **AWS** | ✅ | ✅ | ✅ | Hard | Pay-as-go |
| **DigitalOcean** | ✅ | ✅ | ✅ | Medium | $5/month |
| **Docker + VPS** | ✅ | ✅ | ✅ | Hard | $5/month |

---

## 🎨 Frontend Deployment

### Option 1: Vercel (Recommended)

**Advantages:**
- Optimized for React/Vite
- Automatic deployments
- Global CDN
- Free SSL
- Generous free tier

**Deployment Steps:**

1. **Prepare Repository**
   ```bash
   # Ensure code is pushed to GitHub
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com/)
   - Click "Import Project"
   - Select your GitHub repository
   - Configure project:
     - Framework Preset: Vite
     - Root Directory: ./
     - Build Command: `npm run build`
     - Output Directory: `dist`

3. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_API_URL=https://your-backend-url.com/api
     VITE_ENV=production
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for deployment to complete
   - Your site will be live at `https://your-project.vercel.app`

5. **Custom Domain (Optional)**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Update DNS records as instructed

### Option 2: Netlify

**Deployment Steps:**

1. **Connect Repository**
   - Go to [netlify.com](https://netlify.com/)
   - New site from Git
   - Select repository

2. **Configure Build**
   - Build command: `npm run build`
   - Publish directory: `dist`

3. **Set Environment Variables**
   - Site settings → Build & deploy → Environment
   - Add variables

4. **Deploy**
   - Click "Deploy site"

### Option 3: GitHub Pages

**Deployment Steps:**

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/repo-name",
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d dist"
     }
   }
   ```

3. **Update vite.config.js**
   ```javascript
   export default defineConfig({
     base: '/repo-name/',
     // ... other config
   });
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

---

## 🖥️ Backend Deployment

### Option 1: Railway (Recommended)

**Advantages:**
- Easy deployment
- PostgreSQL included
- Auto-scaling
- Free tier available
- GitHub integration

**Deployment Steps:**

1. **Create Account**
   - Go to [railway.app](https://railway.app/)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Add PostgreSQL**
   - Click "New"
   - Select "Database" → "PostgreSQL"
   - Railway will provision database

4. **Configure Backend Service**
   - Select your backend service
   - Go to Settings
   - Set Root Directory: `backend`
   - Set Start Command: `npm start`

5. **Set Environment Variables**
   - Go to Variables tab
   - Add all production environment variables
   - Railway auto-injects database credentials

6. **Deploy**
   - Railway automatically deploys on push
   - Get your backend URL from Settings

### Option 2: Render

**Deployment Steps:**

1. **Create Account**
   - Go to [render.com](https://render.com/)
   - Sign up

2. **Create Web Service**
   - New → Web Service
   - Connect GitHub repository
   - Configure:
     - Name: edu-learn-backend
     - Environment: Node
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`

3. **Add PostgreSQL**
   - New → PostgreSQL
   - Note connection details

4. **Set Environment Variables**
   - Go to Environment
   - Add all variables

5. **Deploy**
   - Click "Create Web Service"

### Option 3: Heroku

**Deployment Steps:**

1. **Install Heroku CLI**
   ```bash
   # Windows
   choco install heroku-cli
   
   # Mac
   brew tap heroku/brew && brew install heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   heroku create edu-learn-backend
   ```

4. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:hobby-dev
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set JWT_SECRET=your_secret
   heroku config:set DEEPSEEK_API_KEY=your_key
   heroku config:set FRONTEND_URL=https://your-frontend.com
   ```

6. **Create Procfile**
   ```
   web: cd backend && npm start
   ```

7. **Deploy**
   ```bash
   git push heroku main
   ```

8. **Run Migrations**
   ```bash
   heroku run npm run migrate --app edu-learn-backend
   ```

### Option 4: DigitalOcean App Platform

**Deployment Steps:**

1. **Create Account**
   - Go to [digitalocean.com](https://digitalocean.com/)

2. **Create App**
   - Apps → Create App
   - Connect GitHub repository

3. **Configure**
   - Detect backend automatically
   - Set environment variables

4. **Add Database**
   - Add PostgreSQL database
   - Link to app

5. **Deploy**
   - Click "Create Resources"

---

## 🌍 Domain Configuration

### Custom Domain Setup

#### 1. Purchase Domain
- Namecheap
- Google Domains
- GoDaddy
- Cloudflare

#### 2. Configure DNS

**For Vercel (Frontend):**
```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

**For Railway (Backend):**
```
Type: CNAME
Name: api
Value: your-app.up.railway.app
```

#### 3. Update Environment Variables

**Backend:**
```env
FRONTEND_URL=https://yourdomain.com
```

**Frontend:**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

#### 4. Verify
- Wait for DNS propagation (up to 48 hours)
- Test: `https://yourdomain.com`
- Test API: `https://api.yourdomain.com/health`

---

## 🔒 SSL/HTTPS Setup

### Automatic SSL (Recommended)

Most platforms provide automatic SSL:
- **Vercel**: Automatic
- **Netlify**: Automatic
- **Railway**: Automatic
- **Render**: Automatic
- **Heroku**: Automatic with paid dynos

### Manual SSL (VPS)

Using Let's Encrypt with Certbot:

```bash
# Install Certbot
sudo apt-get update
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo certbot renew --dry-run
```

---

## 📊 Monitoring & Logging

### Application Monitoring

#### Option 1: Sentry

**Setup:**

1. **Create Account**
   - Go to [sentry.io](https://sentry.io/)
   - Create new project

2. **Install SDK**
   ```bash
   npm install @sentry/node @sentry/tracing
   ```

3. **Configure Backend**
   ```javascript
   // backend/server.js
   const Sentry = require("@sentry/node");
   const Tracing = require("@sentry/tracing");

   Sentry.init({
     dsn: process.env.SENTRY_DSN,
     tracesSampleRate: 1.0,
   });

   // Error handler
   app.use(Sentry.Handlers.errorHandler());
   ```

4. **Add to .env**
   ```env
   SENTRY_DSN=your_sentry_dsn
   ```

#### Option 2: LogRocket

**For Frontend Monitoring:**

```bash
npm install logrocket
```

```javascript
// src/main.jsx
import LogRocket from 'logrocket';

if (import.meta.env.PROD) {
  LogRocket.init('your-app-id');
}
```

### Server Monitoring

#### Railway/Render
- Built-in metrics dashboard
- View logs in real-time
- Set up alerts

#### Custom Monitoring

**PM2 (for VPS):**
```bash
# Install PM2
npm install -g pm2

# Start app with PM2
pm2 start backend/server.js --name edu-learn-backend

# Monitor
pm2 monit

# View logs
pm2 logs

# Setup startup script
pm2 startup
pm2 save
```

### Database Monitoring

**Neon:**
- Built-in monitoring dashboard
- Query performance insights
- Connection pool metrics

**Custom Queries:**
```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('your_db_name'));

-- Check table sizes
SELECT 
  schemaname,
  tablename,
  pg_size_pretty(pg_total_relation_size(schemaname||'.'||tablename)) AS size
FROM pg_tables
ORDER BY pg_total_relation_size(schemaname||'.'||tablename) DESC;

-- Check slow queries
SELECT * FROM pg_stat_statements 
ORDER BY mean_exec_time DESC 
LIMIT 10;
```

---

## 💾 Backup Strategy

### Database Backups

#### Automated Backups (Neon/Supabase)
- Automatic daily backups
- Point-in-time recovery
- Backup retention: 7-30 days

#### Manual Backups

```bash
# Backup database
pg_dump -h your-host -U your-user -d your-db > backup_$(date +%Y%m%d).sql

# Restore database
psql -h your-host -U your-user -d your-db < backup_20250101.sql

# Backup to S3 (automated)
pg_dump -h your-host -U your-user -d your-db | gzip | aws s3 cp - s3://your-bucket/backups/backup_$(date +%Y%m%d).sql.gz
```

#### Backup Script

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="your_db_name"

# Create backup
pg_dump -h $DB_HOST -U $DB_USER -d $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compress
gzip $BACKUP_DIR/backup_$DATE.sql

# Delete old backups (keep last 7 days)
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +7 -delete

echo "Backup completed: backup_$DATE.sql.gz"
```

**Schedule with Cron:**
```bash
# Edit crontab
crontab -e

# Add daily backup at 2 AM
0 2 * * * /path/to/backup.sh
```

### Code Backups

- Git repository (GitHub/GitLab)
- Multiple branches
- Tagged releases
- Regular commits

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '14'
      
      - name: Install dependencies
        run: |
          npm install
          cd backend && npm install
      
      - name: Run tests
        run: npm test

  deploy-frontend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'

  deploy-backend:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Deploy to Railway
        run: |
          npm install -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}
```

---

## ✅ Post-Deployment

### Verification Checklist

- [ ] Frontend loads correctly
- [ ] Backend health check responds
- [ ] Database connection works
- [ ] Login/signup works
- [ ] API endpoints respond
- [ ] AI features work
- [ ] Zoom integration works
- [ ] SSL certificate valid
- [ ] Custom domain works
- [ ] Email notifications work (if configured)
- [ ] Error tracking works
- [ ] Monitoring dashboard accessible
- [ ] Backups configured
- [ ] Performance acceptable

### Performance Testing

```bash
# Test API response time
curl -w "@curl-format.txt" -o /dev/null -s https://api.yourdomain.com/health

# Load testing with Apache Bench
ab -n 1000 -c 10 https://api.yourdomain.com/health

# Load testing with Artillery
npm install -g artillery
artillery quick --count 10 --num 100 https://api.yourdomain.com/health
```

### Security Audit

```bash
# Check SSL
https://www.ssllabs.com/ssltest/analyze.html?d=yourdomain.com

# Check security headers
https://securityheaders.com/?q=yourdomain.com

# Check dependencies
npm audit
npm audit fix
```

---

## 🐛 Troubleshooting

### Common Deployment Issues

#### Build Fails

**Problem**: Build fails on deployment platform

**Solutions:**
```bash
# Check Node version
node --version

# Clear cache
rm -rf node_modules package-lock.json
npm install

# Check build locally
npm run build

# Check logs on platform
```

#### Database Connection Fails

**Problem**: Cannot connect to production database

**Solutions:**
- Verify connection string
- Check SSL requirement
- Verify IP whitelist
- Check firewall rules
- Test connection locally

#### CORS Errors

**Problem**: Frontend cannot access backend API

**Solutions:**
```javascript
// backend/server.js
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

```env
# backend/.env
FRONTEND_URL=https://yourdomain.com
```

#### Environment Variables Not Working

**Problem**: App cannot read environment variables

**Solutions:**
- Verify variables are set on platform
- Check variable names (case-sensitive)
- Restart application
- Check for typos
- Verify .env file not committed

#### SSL Certificate Issues

**Problem**: SSL certificate invalid or expired

**Solutions:**
- Wait for DNS propagation
- Verify domain ownership
- Check certificate expiration
- Renew certificate
- Contact platform support

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app/
- **Neon Docs**: https://neon.tech/docs
- **Render Docs**: https://render.com/docs
- **Heroku Docs**: https://devcenter.heroku.com/

---

**Congratulations on deploying your platform! 🎉**

Your Edu-Learn platform is now live and ready to transform education!
