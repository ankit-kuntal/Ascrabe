import { NextRequest, NextResponse } from 'next/server';
import { RegisterBody } from '@/lib/types';
import { connectDB } from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  try {
    await connectDB(); // ✅ Connect to MongoDB

    const body: RegisterBody = await req.json();
    const { phone, name, email } = body;

    // 1️⃣ Basic validation
    if (!phone || !name || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // 2️⃣ Phone validation (Indian format)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
      return NextResponse.json(
        { error: 'Invalid phone number' },
        { status: 400 }
      );
    }

    // 3️⃣ Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // 4️⃣ Check if user already exists
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists. Please login.' },
        { status: 400 }
      );
    }

    // 5️⃣ Save user to DB
    const newUser = await User.create({
      phone,
      name,
      email,
    });

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: {
          id: newUser._id,
          phone: newUser.phone,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register API error:', error);

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
