# Google OAuth Setup Guide

## Error: 401 invalid_client

This error occurs when Google OAuth credentials are missing or incorrect. Follow these steps to fix it:

## 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** and **Google Identity API**
4. Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
5. Set Application type to **Web application**
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)

## 2. Add Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

Update your `.env` file with:

```env
# Google OAuth credentials from Google Cloud Console
GOOGLE_CLIENT_ID="your-client-id.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="your-client-secret"

# Generate a random secret for NextAuth
NEXTAUTH_SECRET="your-random-secret-string"
NEXTAUTH_URL="http://localhost:3000"
```

## 3. Generate NEXTAUTH_SECRET

Run this command to generate a secure secret:

```bash
openssl rand -base64 32
```

Or use this online generator: https://generate-secret.vercel.app/32

## 4. Common Issues and Solutions

### Invalid Client ID
- Double-check your `GOOGLE_CLIENT_ID` matches exactly from Google Console
- Ensure there are no extra spaces or quotes

### Invalid Redirect URI
- Make sure your redirect URI in Google Console matches exactly:
  - Development: `http://localhost:3000/api/auth/callback/google`
  - Production: `https://yourdomain.com/api/auth/callback/google`

### Environment Variables Not Loading
- Restart your development server after changing `.env`
- Ensure `.env` is in the root directory
- Check that variables don't have quotes around them in `.env`

## 5. Testing

1. Restart your development server: `npm run dev`
2. Try logging in with Google
3. Check the browser console for any additional error messages

## 6. Production Deployment

For production:
1. Add your production domain to Google OAuth redirect URIs
2. Update `NEXTAUTH_URL` to your production URL
3. Ensure all environment variables are set in your hosting platform