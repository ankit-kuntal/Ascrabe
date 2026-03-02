export interface SendOtpBody {
  phone: string;
}

export interface VerifyOtpBody {
  phone: string;
  otp: string;
}

export interface RegisterBody {
  phone: string;
  name: string;
  email: string;
}
