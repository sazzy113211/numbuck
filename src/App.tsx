import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import {
  Eye, EyeOff, Mail, Lock, Globe, ArrowRight, SkipForward,
  Wallet, TrendingUp, TrendingDown, Activity, Bell, Settings,
  User, ChevronDown, Check, X, RefreshCw, Send, Shield,
  BarChart3, CreditCard, Layers, Zap, Award, Clock
} from 'lucide-react';

// Types
type AuthMode = 'login' | 'signup';
type Step = 'auth' | 'country' | 'otp' | 'onboarding' | 'dashboard';

// Country list (100+ countries)
const countries = [
  { name: 'Afghanistan', code: 'AF', flag: '🇦🇫' },
  { name: 'Albania', code: 'AL', flag: '🇦🇱' },
  { name: 'Algeria', code: 'DZ', flag: '🇩🇿' },
  { name: 'Andorra', code: 'AD', flag: '🇦🇩' },
  { name: 'Angola', code: 'AO', flag: '🇦🇴' },
  { name: 'Argentina', code: 'AR', flag: '🇦🇷' },
  { name: 'Armenia', code: 'AM', flag: '🇦🇲' },
  { name: 'Australia', code: 'AU', flag: '🇦🇺' },
  { name: 'Austria', code: 'AT', flag: '🇦🇹' },
  { name: 'Azerbaijan', code: 'AZ', flag: '🇦🇿' },
  { name: 'Bahamas', code: 'BS', flag: '🇧🇸' },
  { name: 'Bahrain', code: 'BH', flag: '🇧🇭' },
  { name: 'Bangladesh', code: 'BD', flag: '🇧🇩' },
  { name: 'Barbados', code: 'BB', flag: '🇧🇧' },
  { name: 'Belarus', code: 'BY', flag: '🇧🇾' },
  { name: 'Belgium', code: 'BE', flag: '🇧🇪' },
  { name: 'Belize', code: 'BZ', flag: '🇧🇿' },
  { name: 'Benin', code: 'BJ', flag: '🇧🇯' },
  { name: 'Bhutan', code: 'BT', flag: '🇧🇹' },
  { name: 'Bolivia', code: 'BO', flag: '🇧🇴' },
  { name: 'Bosnia and Herzegovina', code: 'BA', flag: '🇧🇦' },
  { name: 'Botswana', code: 'BW', flag: '🇧🇼' },
  { name: 'Brazil', code: 'BR', flag: '🇧🇷' },
  { name: 'Brunei', code: 'BN', flag: '🇧🇳' },
  { name: 'Bulgaria', code: 'BG', flag: '🇧🇬' },
  { name: 'Burkina Faso', code: 'BF', flag: '🇧🇫' },
  { name: 'Burundi', code: 'BI', flag: '🇧🇮' },
  { name: 'Cambodia', code: 'KH', flag: '🇰🇭' },
  { name: 'Cameroon', code: 'CM', flag: '🇨🇲' },
  { name: 'Canada', code: 'CA', flag: '🇨🇦' },
  { name: 'Cape Verde', code: 'CV', flag: '🇨🇻' },
  { name: 'Chile', code: 'CL', flag: '🇨🇱' },
  { name: 'China', code: 'CN', flag: '🇨🇳' },
  { name: 'Colombia', code: 'CO', flag: '🇨🇴' },
  { name: 'Comoros', code: 'KM', flag: '🇰🇲' },
  { name: 'Congo', code: 'CG', flag: '🇨🇬' },
  { name: 'Costa Rica', code: 'CR', flag: '🇨🇷' },
  { name: 'Croatia', code: 'HR', flag: '🇭🇷' },
  { name: 'Cuba', code: 'CU', flag: '🇨🇺' },
  { name: 'Cyprus', code: 'CY', flag: '🇨🇾' },
  { name: 'Czech Republic', code: 'CZ', flag: '🇨🇿' },
  { name: 'Denmark', code: 'DK', flag: '🇩🇰' },
  { name: 'Djibouti', code: 'DJ', flag: '🇩🇯' },
  { name: 'Dominica', code: 'DM', flag: '🇩🇲' },
  { name: 'Dominican Republic', code: 'DO', flag: '🇩🇴' },
  { name: 'Ecuador', code: 'EC', flag: '🇪🇨' },
  { name: 'Egypt', code: 'EG', flag: '🇪🇬' },
  { name: 'El Salvador', code: 'SV', flag: '🇸🇻' },
  { name: 'Equatorial Guinea', code: 'GQ', flag: '🇬🇶' },
  { name: 'Eritrea', code: 'ER', flag: '🇪🇷' },
  { name: 'Estonia', code: 'EE', flag: '🇪🇪' },
  { name: 'Eswatini', code: 'SZ', flag: '🇸🇿' },
  { name: 'Ethiopia', code: 'ET', flag: '🇪🇹' },
  { name: 'Fiji', code: 'FJ', flag: '🇫🇯' },
  { name: 'Finland', code: 'FI', flag: '🇫🇮' },
  { name: 'France', code: 'FR', flag: '🇫🇷' },
  { name: 'Gabon', code: 'GA', flag: '🇬🇦' },
  { name: 'Gambia', code: 'GM', flag: '🇬🇲' },
  { name: 'Georgia', code: 'GE', flag: '🇬🇪' },
  { name: 'Germany', code: 'DE', flag: '🇩🇪' },
  { name: 'Ghana', code: 'GH', flag: '🇬🇭' },
  { name: 'Greece', code: 'GR', flag: '🇬🇷' },
  { name: 'Grenada', code: 'GD', flag: '🇬🇩' },
  { name: 'Guatemala', code: 'GT', flag: '🇬🇹' },
  { name: 'Guinea', code: 'GN', flag: '🇬🇳' },
  { name: 'Guyana', code: 'GY', flag: '🇬🇾' },
  { name: 'Haiti', code: 'HT', flag: '🇭🇹' },
  { name: 'Honduras', code: 'HN', flag: '🇭🇳' },
  { name: 'Hungary', code: 'HU', flag: '🇭🇺' },
  { name: 'Iceland', code: 'IS', flag: '🇮🇸' },
  { name: 'India', code: 'IN', flag: '🇮🇳' },
  { name: 'Indonesia', code: 'ID', flag: '🇮🇩' },
  { name: 'Iran', code: 'IR', flag: '🇮🇷' },
  { name: 'Iraq', code: 'IQ', flag: '🇮🇶' },
  { name: 'Ireland', code: 'IE', flag: '🇮🇪' },
  { name: 'Israel', code: 'IL', flag: '🇮🇱' },
  { name: 'Italy', code: 'IT', flag: '🇮🇹' },
  { name: 'Jamaica', code: 'JM', flag: '🇯🇲' },
  { name: 'Japan', code: 'JP', flag: '🇯🇵' },
  { name: 'Jordan', code: 'JO', flag: '🇯🇴' },
  { name: 'Kazakhstan', code: 'KZ', flag: '🇰🇿' },
  { name: 'Kenya', code: 'KE', flag: '🇰🇪' },
  { name: 'Kiribati', code: 'KI', flag: '🇰🇮' },
  { name: 'Kuwait', code: 'KW', flag: '🇰🇼' },
  { name: 'Kyrgyzstan', code: 'KG', flag: '🇰🇬' },
  { name: 'Laos', code: 'LA', flag: '🇱🇦' },
  { name: 'Latvia', code: 'LV', flag: '🇱🇻' },
  { name: 'Lebanon', code: 'LB', flag: '🇱🇧' },
  { name: 'Lesotho', code: 'LS', flag: '🇱🇸' },
  { name: 'Liberia', code: 'LR', flag: '🇱🇷' },
  { name: 'Libya', code: 'LY', flag: '🇱🇾' },
  { name: 'Liechtenstein', code: 'LI', flag: '🇱🇮' },
  { name: 'Lithuania', code: 'LT', flag: '🇱🇹' },
  { name: 'Luxembourg', code: 'LU', flag: '🇱🇺' },
  { name: 'Madagascar', code: 'MG', flag: '🇲🇬' },
  { name: 'Malawi', code: 'MW', flag: '🇲🇼' },
  { name: 'Malaysia', code: 'MY', flag: '🇲🇾' },
  { name: 'Maldives', code: 'MV', flag: '🇲🇻' },
  { name: 'Mali', code: 'ML', flag: '🇲🇱' },
  { name: 'Malta', code: 'MT', flag: '🇲🇹' },
  { name: 'Mauritania', code: 'MR', flag: '🇲🇷' },
  { name: 'Mauritius', code: 'MU', flag: '🇲🇺' },
  { name: 'Mexico', code: 'MX', flag: '🇲🇽' },
  { name: 'Moldova', code: 'MD', flag: '🇲🇩' },
  { name: 'Monaco', code: 'MC', flag: '🇲🇨' },
  { name: 'Mongolia', code: 'MN', flag: '🇲🇳' },
  { name: 'Montenegro', code: 'ME', flag: '🇲🇪' },
  { name: 'Morocco', code: 'MA', flag: '🇲🇦' },
  { name: 'Mozambique', code: 'MZ', flag: '🇲🇿' },
  { name: 'Myanmar', code: 'MM', flag: '🇲🇲' },
  { name: 'Namibia', code: 'NA', flag: '🇳🇦' },
  { name: 'Nauru', code: 'NR', flag: '🇳🇷' },
  { name: 'Nepal', code: 'NP', flag: '🇳🇵' },
  { name: 'Netherlands', code: 'NL', flag: '🇳🇱' },
  { name: 'New Zealand', code: 'NZ', flag: '🇳🇿' },
  { name: 'Nicaragua', code: 'NI', flag: '🇳🇮' },
  { name: 'Niger', code: 'NE', flag: '🇳🇪' },
  { name: 'Nigeria', code: 'NG', flag: '🇳🇬' },
  { name: 'North Korea', code: 'KP', flag: '🇰🇵' },
  { name: 'North Macedonia', code: 'MK', flag: '🇲🇰' },
  { name: 'Norway', code: 'NO', flag: '🇳🇴' },
  { name: 'Oman', code: 'OM', flag: '🇴🇲' },
  { name: 'Pakistan', code: 'PK', flag: '🇵🇰' },
  { name: 'Palau', code: 'PW', flag: '🇵🇼' },
  { name: 'Panama', code: 'PA', flag: '🇵🇦' },
  { name: 'Papua New Guinea', code: 'PG', flag: '🇵🇬' },
  { name: 'Paraguay', code: 'PY', flag: '🇵🇾' },
  { name: 'Peru', code: 'PE', flag: '🇵🇪' },
  { name: 'Philippines', code: 'PH', flag: '🇵🇭' },
  { name: 'Poland', code: 'PL', flag: '🇵🇱' },
  { name: 'Portugal', code: 'PT', flag: '🇵🇹' },
  { name: 'Qatar', code: 'QA', flag: '🇶🇦' },
  { name: 'Romania', code: 'RO', flag: '🇷🇴' },
  { name: 'Russia', code: 'RU', flag: '🇷🇺' },
  { name: 'Rwanda', code: 'RW', flag: '🇷🇼' },
  { name: 'Saint Kitts and Nevis', code: 'KN', flag: '🇰🇳' },
  { name: 'Saint Lucia', code: 'LC', flag: '🇱🇨' },
  { name: 'Saint Vincent and the Grenadines', code: 'VC', flag: '🇻🇨' },
  { name: 'Samoa', code: 'WS', flag: '🇼🇸' },
  { name: 'San Marino', code: 'SM', flag: '🇸🇲' },
  { name: 'Sao Tome and Principe', code: 'ST', flag: '🇸🇹' },
  { name: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' },
  { name: 'Senegal', code: 'SN', flag: '🇸🇳' },
  { name: 'Serbia', code: 'RS', flag: '🇷🇸' },
  { name: 'Seychelles', code: 'SC', flag: '🇸🇨' },
  { name: 'Sierra Leone', code: 'SL', flag: '🇸🇱' },
  { name: 'Singapore', code: 'SG', flag: '🇸🇬' },
  { name: 'Slovakia', code: 'SK', flag: '🇸🇰' },
  { name: 'Slovenia', code: 'SI', flag: '🇸🇮' },
  { name: 'Solomon Islands', code: 'SB', flag: '🇸🇧' },
  { name: 'Somalia', code: 'SO', flag: '🇸🇴' },
  { name: 'South Africa', code: 'ZA', flag: '🇿🇦' },
  { name: 'South Korea', code: 'KR', flag: '🇰🇷' },
  { name: 'South Sudan', code: 'SS', flag: '🇸🇸' },
  { name: 'Spain', code: 'ES', flag: '🇪🇸' },
  { name: 'Sri Lanka', code: 'LK', flag: '🇱🇰' },
  { name: 'Sudan', code: 'SD', flag: '🇸🇩' },
  { name: 'Suriname', code: 'SR', flag: '🇸🇷' },
  { name: 'Sweden', code: 'SE', flag: '🇸🇪' },
  { name: 'Switzerland', code: 'CH', flag: '🇨🇭' },
  { name: 'Syria', code: 'SY', flag: '🇸🇾' },
  { name: 'Taiwan', code: 'TW', flag: '🇹🇼' },
  { name: 'Tajikistan', code: 'TJ', flag: '🇹🇯' },
  { name: 'Tanzania', code: 'TZ', flag: '🇹🇿' },
  { name: 'Thailand', code: 'TH', flag: '🇹🇭' },
  { name: 'Togo', code: 'TG', flag: '🇹🇬' },
  { name: 'Tonga', code: 'TO', flag: '🇹🇴' },
  { name: 'Trinidad and Tobago', code: 'TT', flag: '🇹🇹' },
  { name: 'Tunisia', code: 'TN', flag: '🇹🇳' },
  { name: 'Turkey', code: 'TR', flag: '🇹🇷' },
  { name: 'Turkmenistan', code: 'TM', flag: '🇹🇲' },
  { name: 'Tuvalu', code: 'TV', flag: '🇹🇻' },
  { name: 'Uganda', code: 'UG', flag: '🇺🇬' },
  { name: 'Ukraine', code: 'UA', flag: '🇺🇦' },
  { name: 'United Arab Emirates', code: 'AE', flag: '🇦🇪' },
  { name: 'United Kingdom', code: 'GB', flag: '🇬🇧' },
  { name: 'United States', code: 'US', flag: '🇺🇸' },
  { name: 'Uruguay', code: 'UY', flag: '🇺🇾' },
  { name: 'Uzbekistan', code: 'UZ', flag: '🇺🇿' },
  { name: 'Vanuatu', code: 'VU', flag: '🇻🇺' },
  { name: 'Vatican City', code: 'VA', flag: '🇻🇦' },
  { name: 'Venezuela', code: 'VE', flag: '🇻🇪' },
  { name: 'Vietnam', code: 'VN', flag: '🇻🇳' },
  { name: 'Yemen', code: 'YE', flag: '🇾🇪' },
  { name: 'Zambia', code: 'ZM', flag: '🇿🇲' },
  { name: 'Zimbabwe', code: 'ZW', flag: '🇿🇼' },
];

// Onboarding slides
const onboardingSlides = [
  {
    id: 1,
    title: 'Welcome to NUMBUCK',
    description: 'Your gateway to digital financial freedom. Start earning today!',
    gradient: 'from-cyan-500 to-blue-600',
    icon: Zap
  },
  {
    id: 2,
    title: 'Earn Rewards',
    description: 'Get paid for completing tasks and participating in our ecosystem.',
    gradient: 'from-emerald-500 to-teal-600',
    icon: Award
  },
  {
    id: 3,
    title: 'Secure Transactions',
    description: 'Your funds are protected with enterprise-grade security.',
    gradient: 'from-purple-500 to-violet-600',
    icon: Shield
  },
  {
    id: 4,
    title: 'Real-time Analytics',
    description: 'Track your earnings and performance with live dashboards.',
    gradient: 'from-orange-500 to-amber-600',
    icon: BarChart3
  },
  {
    id: 5,
    title: 'Instant Withdrawals',
    description: 'Access your earnings anytime, anywhere with fast payouts.',
    gradient: 'from-pink-500 to-rose-600',
    icon: CreditCard
  },
  {
    id: 6,
    title: 'Join Our Community',
    description: 'Connect with thousands of users and grow together.',
    gradient: 'from-indigo-500 to-cyan-600',
    icon: Layers
  }
];

// OTP Functions
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function sendOTP(email: string, otp: string): Promise<void> {
  return emailjs.send(
    "service_xnd4amc",
    "template_tjpqvxm",
    {
      to_email: email,
      otp: otp
    },
    "4CgnADdnK-Cy-24wM" // Note: User should replace this with their actual public key
  ).then((response) => {
    console.log("OTP sent!", response.status);
    localStorage.setItem("otp", otp);
  }).catch((error) => {
    console.log("FAILED...", error);
    // Fallback for demo
    localStorage.setItem("otp", otp);
  });
}

function verifyOTP(userInput: string): boolean {
  const storedOTP = localStorage.getItem("otp");
  return userInput === storedOTP;
}

export default function App() {
  // State
  const [step, setStep] = useState<Step>('auth');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<typeof countries[0] | null>(null);
  const [otpInput, setOtpInput] = useState(['', '', '', '', '', '']);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Filter countries
  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(countrySearch.toLowerCase())
  );

  // Handle OTP input
  const handleOtpChange = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otpInput];
      newOtp[index] = value;
      setOtpInput(newOtp);
    }
  };

  // Handle OTP keydown
  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpInput[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  // Handle OTP paste
  const handleOtpPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    const newOtp = [...otpInput];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtpInput(newOtp);
  };

  // Send OTP handler
  const handleSendOTP = async () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    setLoading(true);
    setError('');
    const otp = generateOTP();
    await sendOTP(email, otp);
    setOtpSent(true);
    setLoading(false);
  };

  // Verify OTP handler
  const handleVerifyOTP = () => {
    const otpString = otpInput.join('');
    if (otpString.length !== 6) {
      setError('Please enter a 6-digit OTP');
      return;
    }
    if (verifyOTP(otpString)) {
      setOtpVerified(true);
      setError('');
      setTimeout(() => {
        setStep('onboarding');
      }, 1000);
    } else {
      setError('Invalid OTP. Please try again.');
    }
  };

  // Handle signup
  const handleSignup = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setError('');
    setStep('country');
  };

  // Handle login
  const handleLogin = () => {
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }
    setError('');
    // For demo, directly go to dashboard
    setStep('dashboard');
  };

  // Handle country selection
  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setShowCountryDropdown(false);
    setStep('otp');
  };

  // Handle onboarding navigation
  const handleNextSlide = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setStep('dashboard');
    }
  };

  const handleSkip = () => {
    setStep('dashboard');
  };

  // Auth Component
  const AuthComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mb-4 shadow-lg shadow-cyan-500/30">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">NUMBUCK</h1>
          <p className="text-slate-400 mt-2">Your digital financial platform</p>
        </div>

        {/* Auth Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          {/* Mode Toggle */}
          <div className="flex bg-slate-700/50 rounded-xl p-1 mb-6">
            <button
              onClick={() => { setAuthMode('login'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                authMode === 'login'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => { setAuthMode('signup'); setError(''); }}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                authMode === 'signup'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <div className="space-y-4">
            {/* Email */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-3 pl-12 pr-4 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-slate-300 text-sm font-medium mb-2 block">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (Signup only) */}
            {authMode === 'signup' && (
              <div>
                <label className="text-slate-300 text-sm font-medium mb-2 block">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-3 pl-12 pr-12 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={authMode === 'signup' ? handleSignup : handleLogin}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl mt-6 hover:shadow-lg hover:shadow-cyan-500/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {authMode === 'signup' ? 'Create Account' : 'Login'}
            </button>
          </div>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-slate-800 px-4 text-slate-500 text-sm">or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 bg-slate-700/50 border border-slate-600 rounded-xl py-3 text-white hover:bg-slate-700 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-2 bg-slate-700/50 border border-slate-600 rounded-xl py-3 text-white hover:bg-slate-700 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By continuing, you agree to our <span className="text-cyan-400 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-cyan-400 cursor-pointer hover:underline">Privacy Policy</span>
        </p>
      </div>
    </div>
  );

  // Country Selection Component
  const CountryComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 mb-4">
              <Globe className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Select Your Country</h2>
            <p className="text-slate-400 mt-2">Choose your country of residence</p>
          </div>

          {/* Country Selector */}
          <div className="relative">
            <button
              onClick={() => setShowCountryDropdown(!showCountryDropdown)}
              className="w-full bg-slate-700/50 border border-slate-600 rounded-xl py-4 px-4 text-left flex items-center justify-between hover:border-cyan-500 transition-colors"
            >
              {selectedCountry ? (
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <span className="text-white font-medium">{selectedCountry.name}</span>
                </div>
              ) : (
                <span className="text-slate-400">Search for your country...</span>
              )}
              <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showCountryDropdown ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown */}
            {showCountryDropdown && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800 border border-slate-700 rounded-xl shadow-xl max-h-80 overflow-hidden z-10">
                {/* Search Input */}
                <div className="p-3 border-b border-slate-700">
                  <input
                    type="text"
                    value={countrySearch}
                    onChange={(e) => setCountrySearch(e.target.value)}
                    placeholder="Search countries..."
                    className="w-full bg-slate-700/50 border border-slate-600 rounded-lg py-2 px-4 text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500"
                  />
                </div>
                {/* Country List */}
                <div className="max-h-60 overflow-y-auto">
                  {filteredCountries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-700/50 transition-colors text-left"
                    >
                      <span className="text-xl">{country.flag}</span>
                      <span className="text-white">{country.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Back Button */}
          <button
            onClick={() => setStep('auth')}
            className="w-full mt-6 py-3 text-slate-400 hover:text-white transition-colors"
          >
            ← Back to {authMode}
          </button>
        </div>
      </div>
    </div>
  );

  // OTP Component
  const OTPComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 mb-4">
              <Send className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Verify Your Email</h2>
            <p className="text-slate-400 mt-2">We've sent a 6-digit code to</p>
            <p className="text-cyan-400 font-medium">{email}</p>
          </div>

          {/* Error/Success Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4 flex items-center gap-2">
              <X className="w-5 h-5 text-red-400" />
              <span className="text-red-400 text-sm">{error}</span>
            </div>
          )}
          {otpVerified && (
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 mb-4 flex items-center gap-2">
              <Check className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 text-sm">Verified successfully!</span>
            </div>
          )}

          {/* OTP Input */}
          {!otpSent ? (
            <button
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          ) : (
            <>
              <div className="flex justify-center gap-3 mb-6" onPaste={handleOtpPaste}>
                {otpInput.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onInput={(e) => {
                      const target = e.target as HTMLInputElement;
                      if (target.value && index < 5) {
                        const nextInput = document.getElementById(`otp-${index + 1}`);
                        nextInput?.focus();
                      }
                    }}
                    className="w-12 h-14 bg-slate-700/50 border border-slate-600 rounded-xl text-center text-white text-xl font-bold focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
                  />
                ))}
              </div>

              <button
                onClick={handleVerifyOTP}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Verify OTP
              </button>

              {/* Resend */}
              <div className="text-center mt-4">
                <span className="text-slate-400">Didn't receive the code? </span>
                <button
                  onClick={handleSendOTP}
                  className="text-cyan-400 hover:underline"
                >
                  Resend
                </button>
              </div>
            </>
          )}

          {/* Back Button */}
          <button
            onClick={() => setStep('country')}
            className="w-full mt-6 py-3 text-slate-400 hover:text-white transition-colors"
          >
            ← Back to country selection
          </button>
        </div>
      </div>
    </div>
  );

  // Onboarding Component
  const OnboardingComponent = () => {
    const CurrentIcon = onboardingSlides[currentSlide].icon;
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-8 border border-slate-700/50 shadow-2xl">
            {/* Progress Dots */}
            <div className="flex justify-center gap-2 mb-8">
              {onboardingSlides.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-gradient-to-r from-cyan-500 to-blue-600'
                      : index < currentSlide
                      ? 'w-2 bg-cyan-500'
                      : 'w-2 bg-slate-600'
                  }`}
                />
              ))}
            </div>

            {/* Content */}
            <div className="text-center">
              {/* Icon */}
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-3xl bg-gradient-to-br ${onboardingSlides[currentSlide].gradient} mb-6 shadow-lg`}>
                <CurrentIcon className="w-12 h-12 text-white" />
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-3">
                {onboardingSlides[currentSlide].title}
              </h2>

              {/* Description */}
              <p className="text-slate-400 mb-8">
                {onboardingSlides[currentSlide].description}
              </p>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleSkip}
                  className="flex-1 py-3 px-6 rounded-xl text-slate-400 hover:text-white hover:bg-slate-700/50 transition-all flex items-center justify-center gap-2"
                >
                  <SkipForward className="w-5 h-5" />
                  Skip
                </button>
                <button
                  onClick={handleNextSlide}
                  className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2"
                >
                  {currentSlide === onboardingSlides.length - 1 ? 'Get Started' : 'Next'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Dashboard Component
  const DashboardComponent = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-700/50 backdrop-blur-xl sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">NUMBUCK</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-xl hover:bg-slate-700/50 transition-colors">
              <Bell className="w-6 h-6 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 rounded-xl hover:bg-slate-700/50 transition-colors">
              <Settings className="w-6 h-6 text-slate-400" />
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Balance Card */}
        <div className="bg-gradient-to-br from-cyan-500/20 via-blue-600/20 to-purple-600/20 rounded-3xl p-8 border border-cyan-500/30 mb-8 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-slate-400 mb-1">Total Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-white">$5,000</span>
                  <span className="text-slate-400">.00 USD</span>
                </div>
              </div>
              <button className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
                <RefreshCw className="w-6 h-6 text-white" />
              </button>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">+12.5%</span>
              <span className="text-slate-400">this week</span>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all flex items-center justify-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Deposit
              </button>
              <button className="flex-1 bg-slate-700/50 text-white font-semibold py-3 px-6 rounded-xl hover:bg-slate-700 transition-all flex items-center justify-center gap-2">
                <CreditCard className="w-5 h-5" />
                Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Tasks', value: '24', icon: Activity, color: 'from-cyan-500 to-blue-600' },
            { label: 'Completed', value: '156', icon: Check, color: 'from-emerald-500 to-teal-600' },
            { label: 'Pending', value: '8', icon: Clock, color: 'from-orange-500 to-amber-600' },
            { label: 'Earnings', value: '$1,250', icon: TrendingUp, color: 'from-purple-500 to-violet-600' },
          ].map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-5 border border-slate-700/50 hover:border-slate-600 transition-all">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-400 text-sm">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Earnings Overview</h3>
            <div className="flex gap-2">
              {['Day', 'Week', 'Month', 'Year'].map((period, index) => (
                <button
                  key={period}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    index === 1
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="h-64 flex items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95, 75, 100].map((height, index) => (
              <div
                key={index}
                className="flex-1 bg-gradient-to-t from-cyan-500 to-blue-600 rounded-t-lg opacity-80 hover:opacity-100 transition-opacity"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
          <div className="flex justify-between mt-2 px-4">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <span key={month} className="text-slate-500 text-xs">{month}</span>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-slate-800/50 backdrop-blur-xl rounded-3xl p-6 border border-slate-700/50">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
            <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">View All</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Task Completion Bonus', amount: '+$250.00', time: '2 hours ago', type: 'credit' },
              { title: 'Referral Reward', amount: '+$50.00', time: '5 hours ago', type: 'credit' },
              { title: 'Withdrawal to Bank', amount: '-$500.00', time: '1 day ago', type: 'debit' },
              { title: 'Premium Subscription', amount: '-$29.99', time: '2 days ago', type: 'debit' },
              { title: 'Task Completion Bonus', amount: '+$180.00', time: '3 days ago', type: 'credit' },
            ].map((tx, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-xl hover:bg-slate-700/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    tx.type === 'credit' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}>
                    {tx.type === 'credit' ? (
                      <TrendingUp className="w-6 h-6 text-emerald-400" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">{tx.title}</p>
                    <p className="text-slate-400 text-sm">{tx.time}</p>
                  </div>
                </div>
                <span className={`font-bold ${
                  tx.type === 'credit' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {tx.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-slate-700/50 md:hidden">
        <div className="flex items-center justify-around py-3">
          {[
            { icon: Activity, label: 'Home', active: true },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: Wallet, label: 'Wallet', active: false },
            { icon: User, label: 'Profile', active: false },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className={`flex flex-col items-center gap-1 p-2 ${
                  item.active ? 'text-cyan-400' : 'text-slate-400'
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );

  // Render current step
  switch (step) {
    case 'auth':
      return <AuthComponent />;
    case 'country':
      return <CountryComponent />;
    case 'otp':
      return <OTPComponent />;
    case 'onboarding':
      return <OnboardingComponent />;
    case 'dashboard':
      return <DashboardComponent />;
    default:
      return <AuthComponent />;
  }
}