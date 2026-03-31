import { useState, useEffect } from 'react'
import { 
  Wallet, 
  CreditCard, 
  Gift, 
  Globe, 
  Bitcoin, 
  Gamepad2, 
  ArrowRight, 
  Shield, 
  Zap, 
  TrendingUp,
  Smartphone,
  DollarSign,
  Users,
  Award,
  Clock,
  CheckCircle2,
  Menu,
  X,
  ChevronDown,
  Play,
  Star,
  Lock,
  Headphones,
  Sparkles,
  Target,
  RefreshCw,
  Send,
  Download
} from 'lucide-react'

// Animated counter hook
const useAnimatedCounter = (target: number, duration: number = 2000) => {
  const [count, setCount] = useState(0)
  
  useEffect(() => {
    let startTime: number | null = null
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [target, duration])
  
  return count
}

// Navigation Component
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Invest', href: '#invest' },
    { name: 'Cards', href: '#cards' },
    { name: 'Crypto', href: '#crypto' },
    { name: 'Gaming', href: '#gaming' },
    { name: 'Support', href: '#support' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-slate-950/90 backdrop-blur-xl border-b border-gray-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-3 group cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-500/30">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              NexGen Pay
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 text-sm font-medium">
                {link.name}
              </a>
            ))}
            <div className="h-6 w-px bg-gray-700 mx-4" />
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40">
              Get Started
            </button>
          </div>

          <button className="md:hidden text-white p-2 hover:bg-gray-800 rounded-lg transition-colors" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-gray-800 animate-in slide-in-from-top-5">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors font-medium">
                {link.name}
              </a>
            ))}
            <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

// Hero Section
const Hero = () => {
  const transactionCount = useAnimatedCounter(500000, 3000)
  const userCount = useAnimatedCounter(2000000, 3000)
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/40 via-purple-950/30 to-slate-950" />
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-full blur-[120px] animate-[spin_20s_linear_infinite]" />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%234f46e5%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
        <div className="text-center space-y-8">
          {/* Live Stats Badge */}
          <div className="inline-flex items-center space-x-3 bg-gray-900/60 backdrop-blur-md border border-gray-700/50 rounded-full px-5 py-2.5 mb-6 animate-in fade-in zoom-in duration-700">
            <span className="flex h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
            <span className="text-sm text-gray-300 font-medium">
              <span className="text-white font-bold">{transactionCount.toLocaleString()}</span>+ Transactions • <span className="text-white font-bold">{(userCount/1000000).toFixed(1)}M</span> Users
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight tracking-tight">
            Your All-in-One{' '}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Financial Powerhouse
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed font-light">
            Invest smart, buy gift cards & virtual cards, get international numbers, 
            trade crypto, play games to earn, and withdraw instantly via ATM or crypto wallet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <button className="group relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 flex items-center space-x-2 overflow-hidden">
              <span className="relative z-10">Start Investing Now</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </button>
            <button className="group flex items-center space-x-2 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-gray-700 hover:border-gray-500 hover:bg-gray-800/30">
              <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Shield, label: 'Bank-Grade Security', value: '256-bit SSL' },
              { icon: Zap, label: 'Instant Processing', value: '< 2 seconds' },
              { icon: Users, label: 'Active Users', value: '2M+' },
              { icon: Award, label: 'Compliance', value: 'PCI DSS' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center space-y-2 group">
                <div className="w-12 h-12 bg-gray-800/50 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-gray-700/50 transition-colors">
                  <stat.icon className="w-6 h-6 text-blue-400" />
                </div>
                <div className="text-xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  )
}

// Services Grid
const Services = () => {
  const services = [
    {
      icon: TrendingUp,
      title: 'Smart Investment',
      description: 'AI-powered investment portfolios with real-time analytics. Start with as little as $10.',
      color: 'from-green-500 to-emerald-600',
      features: ['Auto-investing', 'Risk assessment', 'Portfolio tracking'],
      badge: 'Popular'
    },
    {
      icon: Gift,
      title: 'Gift Cards',
      description: 'Buy and sell digital gift cards from 500+ brands worldwide at competitive rates.',
      color: 'from-pink-500 to-rose-600',
      features: ['500+ brands', 'Instant delivery', 'Up to 20% off'],
      badge: 'New'
    },
    {
      icon: CreditCard,
      title: 'Virtual Cards',
      description: 'Create virtual Visa/Mastercard debit & credit cards for secure online transactions.',
      color: 'from-blue-500 to-indigo-600',
      features: ['Instant issuance', 'Spending limits', 'Freeze anytime'],
      badge: null
    },
    {
      icon: Globe,
      title: 'Virtual Numbers',
      description: 'Get virtual phone numbers in 50+ countries for SMS verification and calls.',
      color: 'from-purple-500 to-violet-600',
      features: ['50+ countries', 'SMS receive', 'Call forwarding'],
      badge: null
    },
    {
      icon: Bitcoin,
      title: 'Crypto Exchange',
      description: 'Send, receive, and trade 100+ cryptocurrencies with low fees and instant settlement.',
      color: 'from-orange-500 to-amber-600',
      features: ['100+ coins', 'Instant swap', 'Secure wallet'],
      badge: 'Hot'
    },
    {
      icon: Gamepad2,
      title: 'Play & Earn',
      description: 'Play virtual games, complete challenges, and earn real money rewards instantly.',
      color: 'from-cyan-500 to-blue-600',
      features: ['Daily tournaments', 'Instant rewards', 'Skill-based'],
      badge: 'Trending'
    }
  ]

  return (
    <section id="cards" className="py-24 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            All Your Financial Needs in{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              One Platform
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Seamlessly integrated services designed for the modern digital economy
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 hover:border-gray-600 transition-all duration-500 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden">
              {service.badge && (
                <span className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold ${service.badge === 'Hot' ? 'bg-orange-500/20 text-orange-400' : service.badge === 'New' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                  {service.badge}
                </span>
              )}
              
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <service.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">{service.description}</p>
              
              <ul className="space-y-3">
                {service.features.map((feature, fidx) => (
                  <li key={fidx} className="flex items-center space-x-3 text-sm text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className="mt-8 w-full py-3 rounded-xl border border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white hover:border-gray-600 transition-all duration-300 font-medium flex items-center justify-center space-x-2 group-hover:bg-gray-800/50">
                <span>Explore Service</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// How It Works
const HowItWorks = () => {
  const steps = [
    {
      number: '01',
      title: 'Create Account',
      description: 'Sign up in seconds with email or phone. Instant verification with global KYC compliance.',
      icon: Smartphone
    },
    {
      number: '02',
      title: 'Add Funds',
      description: 'Deposit via bank transfer, card, crypto, or cash at supported ATMs worldwide.',
      icon: DollarSign
    },
    {
      number: '03',
      title: 'Start Trading',
      description: 'Access all services instantly. Buy cards, invest, trade crypto, or play games.',
      icon: Zap
    },
    {
      number: '04',
      title: 'Withdraw Anytime',
      description: 'Cash out to bank, crypto wallet, or withdraw cash at any ATM globally.',
      icon: Wallet
    }
  ]

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 to-slate-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get Started in{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              4 Easy Steps
            </span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8 h-full hover:border-blue-500/50 transition-all duration-300 group-hover:transform group-hover:-translate-y-1">
                <div className="text-6xl font-bold text-gray-800 mb-4 group-hover:text-gray-700 transition-colors">{step.number}</div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                  <step.icon className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
              {idx < 3 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                  <ArrowRight className="w-8 h-8 text-gray-700" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Investment Section
const InvestmentSection = () => {
  return (
    <section id="invest" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-2">
              <Target className="w-4 h-4 text-green-400" />
              <span className="text-sm text-green-400 font-medium">Smart Investing</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Grow Your Wealth with{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                AI-Powered Insights
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed">
              Our intelligent investment engine analyzes market trends and creates personalized portfolios 
              tailored to your risk tolerance and financial goals. Start with as little as $10.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Average Return', value: '12.4%', sub: 'Annual' },
                { label: 'Assets Managed', value: '$2.4B+', sub: 'Globally' },
                { label: 'Success Rate', value: '94%', sub: 'Profitable users' },
                { label: 'Markets', value: '50+', sub: 'Countries' },
              ].map((stat, idx) => (
                <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                  <div className="text-xs text-gray-600">{stat.sub}</div>
                </div>
              ))}
            </div>

            <button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/25 hover:shadow-green-500/40">
              Start Investing Now
            </button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-3xl blur-3xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <span className="text-gray-400 font-medium">Portfolio Performance</span>
                <span className="text-green-400 flex items-center space-x-1 bg-green-500/10 px-3 py-1 r