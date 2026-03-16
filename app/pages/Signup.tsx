'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Recycle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

type Step = 'form' | 'otp';

export default function Signup() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('form');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
      router.push('/login');
      return;
    }

    const registerData = await registerRes.json();
    setMessage(registerData.error || 'Registration failed');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-hero mx-auto mb-3">
              <Recycle className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Create Account</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Join Ascrabe and start selling your scrap
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            {step === 'form' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Mobile Number</Label>
                  <Input
                    id="phone"
                    type="text"
                    placeholder="Enter 10-digit mobile number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <Button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Already have an account? </span>
                  <Link href="/login" className="font-medium text-primary hover:underline">
                    Login
                  </Link>
                </div>
              </div>
            )}

            {step === 'otp' && (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground text-center">
                  Enter OTP sent to <span className="font-medium">{phone}</span>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="otp">OTP</Label>
                  <Input
                    id="otp"
                    type="text"
                    placeholder="Enter 6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <Button
                  onClick={verifyAndRegister}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Verifying...' : 'Verify & Sign Up'}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep('form');
                    setOtp('');
                    setMessage('');
                  }}
                  className="w-full"
                >
                  Back
                </Button>
              </div>
            )}

            {message && (
              <Alert variant={message.includes('success') ? 'default' : 'destructive'} className="mt-4">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
