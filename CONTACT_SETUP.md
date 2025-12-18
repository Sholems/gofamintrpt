# Contact Form Email Setup

The contact form on your website now sends messages to two places:

1. **Admin Dashboard** - Messages are stored in the browser's localStorage and can be viewed at `/admin/messages`
2. **Email** - Messages are sent to `gofamintrpt@gmail.com`

## Setting Up Email Integration

### Option 1: Web3Forms (Recommended - Free & Easy)

1. Go to [https://web3forms.com](https://web3forms.com)
2. Enter your email address: `gofamintrpt@gmail.com`
3. Click "Get Access Key"
4. Copy the access key you receive
5. Create a file named `.env.local` in your project root:
   ```
   WEB3FORMS_ACCESS_KEY=your_access_key_here
   ```
6. Restart your development server

**Pros:**
- Free for up to 250 submissions/month
- No coding required
- Works immediately
- Includes spam protection

### Option 2: SendGrid

1. Sign up at [https://sendgrid.com](https://sendgrid.com)
2. Create an API key
3. Install the SendGrid package:
   ```bash
   npm install @sendgrid/mail
   ```
4. Update `/app/api/contact/route.ts` to use SendGrid
5. Add to `.env.local`:
   ```
   SENDGRID_API_KEY=your_api_key_here
   ```

### Option 3: Gmail SMTP (For Google Workspace)

1. Enable 2-factor authentication on your Gmail account
2. Create an App Password: [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Install nodemailer:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```
4. Add to `.env.local`:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=gofamintrpt@gmail.com
   SMTP_PASS=your_app_password_here
   ```
5. Update the API route to use nodemailer

## Testing

1. Fill out the contact form on your website at `/contact`
2. Check the Admin Dashboard at `/admin/messages` to see the message
3. Check your email at `gofamintrpt@gmail.com`

## Admin Dashboard

Access the admin dashboard at: [http://localhost:3000/admin/messages](http://localhost:3000/admin/messages)

Features:
- View all contact form submissions
- Filter by read/unread status
- Reply directly via email
- Delete messages
- See unread count badge in navigation

## Notes

- Messages are stored in the browser's localStorage (visible in the admin dashboard)
- The email API is optional - messages will still be saved locally even if email fails
- For production, consider using a database instead of localStorage
- Add authentication to your admin routes for security

## Security Recommendations

1. Add authentication middleware to `/admin/*` routes
2. Use environment variables for all API keys (never commit them to Git)
3. Consider using a database (like Supabase, MongoDB, or PostgreSQL) for production
4. Add rate limiting to prevent spam
5. Implement CAPTCHA for additional protection
