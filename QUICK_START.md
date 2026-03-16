# 🚀 Ascrabe - Quick Start Guide

## Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB instance (local or cloud)

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create a `.env.local` file in the project root:
```
MONGODB_URI=mongodb://localhost:27017/ascrabe
```

Replace with your actual MongoDB connection string. For cloud:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ascrabe?retryWrites=true&w=majority
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Available Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/` | Landing page with hero section | ✅ Working |
| `/login` | User login with OTP | ✅ Working |
| `/signup` | User registration with OTP | ✅ Working |
| `/sell` | Sell scrap form | ✅ Working |
| `/categories` | Browse scrap categories | ✅ Working |
| `/dashboard` | User dashboard & order tracking | ✅ Working |
| `/admin` | Admin panel & analytics | ✅ Working |

## 🔐 Authentication Flow

### Registration (Sign Up)
1. User enters: Phone, Name, Email
2. System sends OTP to phone
3. User verifies OTP
4. User is registered and redirected to login

### Login
1. User enters phone number
2. System sends OTP
3. User verifies OTP
4. User is logged in and redirected to dashboard

**Note:** OTP currently logs to console in development. In production, integrate SMS service (Twilio, AWS SNS, etc.)

## 📊 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  phone: String (unique), // 10-digit Indian format
  name: String,
  email: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Design System

The project uses a modern design system with:
- **Colors**: Emerald (primary), Cyan (secondary), Orange (accent)
- **Components**: shadcn/ui components with Tailwind CSS
- **Typography**: Inter font from Google Fonts
- **Spacing**: Tailwind's default scale
- **Animations**: Smooth fade-in and slide-in effects

## 📦 API Endpoints

### POST `/api/register`
Register a new user
```javascript
{
  phone: "9876543210",
  name: "Rahul Sharma",
  email: "rahul@example.com"
}
```

### POST `/api/send-otp`
Send OTP to phone number
```javascript
{
  phone: "9876543210"
}
```

### POST `/api/verify-otp`
Verify OTP for a phone number
```javascript
{
  phone: "9876543210",
  otp: "123456"
}
```

## 🛠️ Development Tips

### Add a New Route
1. Create folder: `app/newroute/`
2. Create `page.tsx` in that folder
3. Import your component and export it

Example:
```typescript
// app/contact/page.tsx
import Contact from '@/app/pages/Contact';

export default function ContactPage() {
  return <Contact />;
}
```

### Use Design Tokens
Always use semantic classes instead of arbitrary colors:
```jsx
// ✅ Good
<div className="bg-card text-foreground">

// ❌ Avoid
<div className="bg-blue-500 text-white">
```

### Component Development
- Use `'use client'` for components with state/interactivity
- Import UI components from `@/components/ui/`
- Use Lucide icons from `lucide-react`
- Follow the existing component structure

## 🧪 Testing the App

1. **Visit Landing Page**: http://localhost:3000
2. **Click "Sign Up"**: Register with test phone number
3. **Check Console**: OTP will be logged (in dev mode)
4. **Enter OTP**: Use the logged OTP to verify
5. **Login**: Try login flow with same phone
6. **Explore Routes**: Test all pages and features

## 🚨 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env.local`
- Verify network access if using cloud MongoDB

### Port Already in Use
```bash
# Change port
npm run dev -- -p 3001
```

### Clear Build Cache
```bash
rm -rf .next
npm run dev
```

## 📚 Project Structure Explained

```
Ascrabe/
├── app/
│   ├── api/               # Backend API routes
│   ├── pages/             # Page components
│   ├── [route]/page.tsx  # Dynamic routes
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles + design tokens
├── components/
│   ├── ui/                # shadcn UI components
│   ├── Navbar.tsx         # Header navigation
│   └── Footer.tsx         # Footer
├── lib/
│   ├── mongodb.ts         # Database connection
│   ├── otpStore.ts        # OTP storage logic
│   ├── types.ts           # TypeScript definitions
│   └── utils.ts           # Helper functions
├── models/
│   └── User.ts            # Mongoose schema
├── public/
│   └── hero-recycling.jpg # Hero image
└── package.json           # Dependencies
```

## 🔒 Security Notes

For production:
1. ✅ Add proper password authentication (bcrypt)
2. ✅ Implement session management (cookies/JWT)
3. ✅ Add rate limiting for OTP endpoints
4. ✅ Implement CSRF protection
5. ✅ Use HTTPS only
6. ✅ Add input validation & sanitization
7. ✅ Implement Row Level Security (RLS) in database
8. ✅ Use environment variables for secrets

## 📞 Support

- Check `FIXES_SUMMARY.md` for complete list of fixes
- Review component files for implementation details
- Check shadcn/ui docs: https://ui.shadcn.com/
- Next.js docs: https://nextjs.org/docs

---

**Happy coding! 🎉**
