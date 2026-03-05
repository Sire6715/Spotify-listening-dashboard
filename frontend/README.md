# Spotify Listening Dashboard

A full-stack web application that visualizes your Spotify listening habits with interactive charts and analytics.

## Stack

- **Frontend**: Next.js 16 with TypeScript, React 19, Tailwind CSS
- **Backend**: Python Flask API with Spotify Web API integration
- **Data**: CSV-based feature analysis for music tracks

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ (for frontend)
- Python 3.9+ (for backend)
- Git
- A Spotify Developer account with API credentials
- npm or yarn package manager

## Local Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd spotify-listening-dashboard
```

### 2. Backend Setup

```bash
cd backend

# Create a virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install
```

### 4. Environment Variables

Create a `.env.local` file in the `backend/` directory with your Spotify API credentials:

```
CLIENT_ID=your_spotify_client_id
CLIENT_SECRET=your_spotify_client_secret
REDIRECT_URI=http://localhost:5000/callback
AUTH_URL=https://accounts.spotify.com/authorize
SECRET_KEY=your_secret_key_for_sessions
```

Update the CORS origins in `backend/app.py` if needed for your deployment URL.

## Running Locally

### Backend

```bash
cd backend
python app.py
```

The Flask API will run on `http://localhost:5000`

### Frontend

```bash
cd frontend
npm run dev
```

The Next.js app will run on `http://localhost:3000`

## Deployment Steps

### Frontend Deployment (Vercel)

Vercel is the recommended platform for Next.js apps.

1. **Push to GitHub/GitLab**
   ```bash
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Select `frontend` as the root directory
   - Add environment variables if needed
   - Click "Deploy"

3. **Alternative: Manual Deployment**
   ```bash
   npm install -g vercel
   cd frontend
   vercel
   ```

### Backend Deployment (Railway or Heroku)

#### Option A: Railway

1. **Install Railway CLI**
   ```bash
   npm install -g @railway/cli
   ```

2. **Login to Railway**
   ```bash
   railway login
   ```

3. **Create Railway Project**
   ```bash
   railway init
   ```

4. **Set Environment Variables**
   ```bash
   railway variables set CLIENT_ID=your_id
   railway variables set CLIENT_SECRET=your_secret
   railway variables set REDIRECT_URI=https://your-backend.railway.app/callback
   railway variables set AUTH_URL=https://accounts.spotify.com/authorize
   railway variables set SECRET_KEY=your_secret_key
   ```

5. **Create Procfile** (in root of `backend/`)
   ```
   web: gunicorn app:app
   ```

6. **Deploy**
   ```bash
   railway up
   ```

#### Option B: Heroku

1. **Install Heroku CLI**
   ```bash
   # Download from heroku.com/download
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create App**
   ```bash
   cd backend
   heroku create your-app-name
   ```

4. **Create Procfile**
   ```
   web: gunicorn app:app
   ```

5. **Set Environment Variables**
   ```bash
   heroku config:set CLIENT_ID=your_id
   heroku config:set CLIENT_SECRET=your_secret
   heroku config:set REDIRECT_URI=https://your-app.herokuapp.com/callback
   heroku config:set AUTH_URL=https://accounts.spotify.com/authorize
   heroku config:set SECRET_KEY=your_secret_key
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### Connect Frontend to Backend

Update the backend API URL in your frontend configuration:

1. In `frontend/.env.local` or `.env.production`:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com
   ```

2. Update API calls in components to use this URL:
   ```typescript
   const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
   ```

## Environment Variables Summary

### Frontend
- `NEXT_PUBLIC_API_URL`: Backend API endpoint

### Backend
- `CLIENT_ID`: Spotify API Client ID
- `CLIENT_SECRET`: Spotify API Client Secret
- `REDIRECT_URI`: OAuth callback URL
- `AUTH_URL`: Spotify authorization endpoint
- `SECRET_KEY`: Flask session secret key

## Build for Production

### Frontend
```bash
cd frontend
npm run build
npm start
```

### Backend
```bash
cd backend
# Make sure Procfile exists with: web: gunicorn app:app
# Install gunicorn if needed:
pip install gunicorn
gunicorn app:app
```

## Troubleshooting

### CORS Issues
- Ensure your frontend URL is in the CORS whitelist in `backend/app.py`
- Update `NEXT_PUBLIC_API_URL` to match your backend deployment URL

### Missing Dependencies
```bash
# Frontend
npm install

# Backend
pip install -r requirements.txt
```

### Spotify Auth Issues
- Verify your CLIENT_ID and CLIENT_SECRET are correct
- Ensure REDIRECT_URI matches exactly in Spotify Developer settings and your app
- Check that your app is authorized in Spotify settings

## License

MIT

## Support

For issues or questions, please create a GitHub issue.
