'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 'phone' | 'otp';

export default function Login() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // STEP 1 → Send OTP
  const sendOtp = async () => {
    if (!phone) {
      setMessage('Enter mobile number');
      return;
    }

    setLoading(true);
    setMessage('');

    const res = await fetch('/api/send-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    if (res.ok) {
      setStep('otp');
      setMessage('OTP sent successfully');
    } else {
      setMessage(data.error || 'Failed to send OTP');
    }

    setLoading(false);
  };

  // STEP 2 → Verify OTP
  const verifyOtp = async () => {
    if (!otp) {
      setMessage('Enter OTP');
      return;
    }

    setLoading(true);
    setMessage('');

    const res = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (res.ok) {
      // ✅ Login successful → redirect
      router.push('/dashboard'); // change if needed
      return;
    } else {
      setMessage(data.error || 'Invalid OTP');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>

        {step === 'phone' && (
          <>
            <input
              type="text"
              placeholder="Enter Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
            <p className="text-center text-sm mt-4">
              Don’t have an account?{' '}
              <span
                onClick={() => router.push('/')}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Register
              </span>
            </p>
          </>
        )}

        {step === 'otp' && (
          <>
            <p className="text-sm text-gray-600 mb-3 text-center">
              Enter OTP sent to {phone}
            </p>

            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />

            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}

        {message && (
          <p className="text-center text-sm mt-4 text-red-500">{message}</p>
        )}
      </div>
    </div>
  );
}
