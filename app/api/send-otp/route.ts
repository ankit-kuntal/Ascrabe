import { NextRequest, NextResponse } from 'next/server';
import { saveOtp } from '@/lib/otpStore';
import { SendOtpBody } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body: SendOtpBody = await req.json();
    const { phone } = body;

    // 1️⃣ Validate
    if (!phone) {
      return NextResponse.json({ error: 'Phone is required' }, { status: 400 });
    }

    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // 2️⃣ Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3️⃣ Save with expiry (5 min)
    saveOtp(phone, otp, 5 * 60 * 1000);

    // 4️⃣ Development only log
    console.log('Generated OTP:', otp);

    return NextResponse.json(
      { message: 'OTP sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Send OTP Error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
