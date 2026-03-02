'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type Step = 'form' | 'otp';

export default function Home() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('form');

  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // STEP 1 → Send OTP
  const sendOtp = async () => {
    if (!phone || !name || !email) {
      setMessage('All fields are required');
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
    } else {
      setMessage(data.error || 'Failed to send OTP');
    }

    setLoading(false);
  };

  // STEP 2 → Verify OTP + Register
  const verifyAndRegister = async () => {
    if (!otp) {
      setMessage('Enter OTP');
      return;
    }

    setLoading(true);
    setMessage('');

    const verifyRes = await fetch('/api/verify-otp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, otp }),
    });

    if (!verifyRes.ok) {
      const verifyData = await verifyRes.json();
      setMessage(verifyData.error || 'OTP verification failed');
      setLoading(false);
      return;
    }

    const registerRes = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, name, email }),
    });

    if (registerRes.ok) {
      router.push('/login'); // ✅ Redirect here
      return;
    }

    const registerData = await registerRes.json();
    setMessage(registerData.error || 'Registration failed');
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[350px]">
        <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

        {step === 'form' && (
          <>
            <input
              type="text"
              placeholder="Enter Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded mb-3"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              Already have an account?{' '}
              <span
                onClick={() => router.push('/login')}
                className="text-blue-600 cursor-pointer font-medium"
              >
                Login
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
              onClick={verifyAndRegister}
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
