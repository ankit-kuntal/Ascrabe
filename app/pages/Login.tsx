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

type Step = 'phone' | 'otp';

export default function Login() {
  const router = useRouter();

  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    } else {
      setMessage(data.error || 'Failed to send OTP');
    }

    setLoading(false);
  };

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
      router.push('/dashboard');
      return;
    } else {
      setMessage(data.error || 'Invalid OTP');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg gradient-hero mx-auto mb-3">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Login to Ascrabe</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your phone number to continue
            </p>
          </div>

          <div className="rounded-xl border bg-card p-6 shadow-card">
            {step === 'phone' && (
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

                <Button
                  onClick={sendOtp}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Sending...' : 'Send OTP'}
                </Button>

                <div className="text-center text-sm">
                  <span className="text-muted-foreground">Don&apos;t have an account? </span>
                  <Link href="/signup" className="font-medium text-primary hover:underline">
                    Sign up
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
                  onClick={verifyOtp}
                  disabled={loading}
                  className="w-full"
                  size="lg"
                >
                  {loading ? 'Verifying...' : 'Verify OTP'}
                </Button>

                <Button
                  variant="ghost"
                  onClick={() => {
                    setStep('phone');
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
