type OtpEntry = {
  otp: string;
  expiresAt: number;
};

const globalForOtp = global as any;

if (!globalForOtp.otpMap) {
  globalForOtp.otpMap = new Map<string, OtpEntry>();
}

const otpMap = globalForOtp.otpMap;

export function saveOtp(phone: string, otp: string, ttl: number) {
  otpMap.set(phone.trim(), {
    otp: otp.trim(),
    expiresAt: Date.now() + ttl,
  });
}

export function verifyOtp(phone: string, otp: string) {
  const entry = otpMap.get(phone.trim());

  console.log('All stored OTPs:', otpMap);
  console.log('Checking phone:', phone);
  console.log('Stored entry:', entry);
  console.log('Entered OTP:', otp);

  if (!entry) return false;

  if (Date.now() > entry.expiresAt) {
    otpMap.delete(phone.trim());
    return false;
  }

  if (entry.otp !== otp.trim()) return false;

  otpMap.delete(phone.trim());
  return true;
}
