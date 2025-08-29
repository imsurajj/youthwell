# Contact Form Backend Setup

This guide will help you set up the email functionality for the contact form.

## Features

- ✅ Sends confirmation email to user with unique ticket ID
- ✅ Sends notification email to admin with form details
- ✅ Generates unique ticket IDs for tracking
- ✅ Professional email templates
- ✅ Form validation and error handling

## Setup Instructions

### 1. Environment Variables

Create a `.env.local` file in your project root and add:

```env
# Email Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password_here
ADMIN_EMAIL=admin@youthwell.com
```

### 2. Gmail App Password Setup

If using Gmail, you'll need to create an App Password:

1. Go to your Google Account settings
2. Enable 2-Factor Authentication if not already enabled
3. Go to Security → App passwords
4. Generate a new app password for "Mail"
5. Use this password in your `EMAIL_PASS` variable

### 3. Alternative Email Services

You can modify the transporter configuration in `/src/app/api/contact/route.ts`:

```typescript
// For Outlook/Hotmail
const transporter = nodemailer.createTransporter({
  service: 'outlook',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// For custom SMTP
const transporter = nodemailer.createTransporter({
  host: 'your-smtp-host.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
```

### 4. Test the Setup

1. Start your development server
2. Fill out the contact form
3. Check both emails (user confirmation + admin notification)
4. Verify the ticket ID is generated and displayed

## How It Works

1. **User submits form** → Form data is sent to `/api/contact`
2. **API generates ticket ID** → Unique identifier like `TKT-abc123-def456`
3. **Sends user email** → Confirmation with ticket ID and status
4. **Sends admin email** → Notification with form details and ticket ID
5. **Returns success** → User sees confirmation with ticket ID

## Customization

### Email Templates

You can customize the email templates in `/src/app/api/contact/route.ts`:

- `getUserEmailTemplate()` - Email sent to form submitter
- `getAdminEmailTemplate()` - Email sent to admin

### Ticket ID Format

Modify the `generateTicketId()` function to change the format:

```typescript
function generateTicketId(): string {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
  const random = Math.random().toString(36).substring(2, 6);
  return `YW-${date}-${random}`.toUpperCase();
}
```

## Security Notes

- Never commit `.env.local` to version control
- Use App Passwords instead of regular passwords
- Consider rate limiting for production use
- Validate email addresses and sanitize inputs

## Troubleshooting

### Common Issues

1. **"Invalid login" error** → Check your email/password
2. **"Service not found"** → Verify email service configuration
3. **Emails not sending** → Check environment variables
4. **Form submission fails** → Check browser console for errors

### Testing

Use tools like Mailtrap for development testing:
- Set up a Mailtrap inbox
- Update environment variables to use Mailtrap credentials
- Test email functionality without sending real emails
