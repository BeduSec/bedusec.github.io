import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Users, 
  Lock, 
  Globe, 
  ChevronRight, 
  Menu, 
  X, 
  ArrowRight,
  CheckCircle,
  BarChart,
  Server,
  Mail,
  Linkedin,
  Twitter,
  Github,
  Star,
  GitFork,
  BookOpen,
  ExternalLink
} from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-8 py-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 active:scale-95 text-sm tracking-wide";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-900/10",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm",
    outline: "border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </button>
  );
};

const Navbar = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Expertise', id: 'expertise', type: 'anchor' },
    { name: 'About Us', id: 'about', type: 'anchor' },
    { name: 'Services', id: 'services', type: 'anchor' },
    { name: 'GitHub', id: 'github', type: 'page' }
  ];

  const handleNavClick = (link) => {
    if (link.type === 'page') {
      setCurrentPage(link.id);
    } else {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(link.id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md border-b border-slate-100 py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="bg-slate-900 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">BEDUSEC</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`text-sm font-medium transition-colors ${currentPage === link.id ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
              >
                {link.name}
              </button>
            ))}
            <Button variant="primary" className="px-6 py-2.5 h-auto text-sm">Contact Firm</Button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="text-slate-900" /> : <Menu className="text-slate-900" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link)}
              className="text-left text-base font-medium text-slate-600 py-2"
            >
              {link.name}
            </button>
          ))}
          <Button variant="primary" className="w-full justify-center">Contact Firm</Button>
        </div>
      )}
    </nav>
  );
};

const GitHubPreview = () => {
  const [orgData, setOrgData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const orgRes = await fetch('https://api.github.com/orgs/bedusec');
        if (!orgRes.ok) throw new Error('Organization not found');
        const orgJson = await orgRes.json();
        setOrgData(orgJson);

        const reposRes = await fetch('https://api.github.com/orgs/bedusec/repos?sort=updated&per_page=6');
        const reposJson = await reposRes.json();
        setRepos(reposJson);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  if (loading) return (
    <div className="pt-48 pb-40 flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
    </div>
  );

  if (error) return (
    <div className="pt-48 pb-40 text-center bg-white">
      <h2 className="text-2xl font-bold text-slate-900">Unable to load GitHub data</h2>
      <p className="text-slate-500 mt-2">The organization might be private or doesn't exist.</p>
      <Button variant="primary" className="mx-auto mt-6" onClick={() => window.location.reload()}>Retry</Button>
    </div>
  );

  return (
    <div className="pt-32 pb-24 lg:pt-48 lg:pb-40 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12 items-start mb-20">
          <img src={orgData.avatar_url} alt="BEDUSEC" className="w-32 h-32 rounded-2xl border border-slate-100 shadow-sm" />
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-4xl font-bold text-slate-900">{orgData.name || 'BEDUSEC'}</h1>
              <span className="px-3 py-1 bg-slate-100 rounded-full text-xs font-bold text-slate-600 border border-slate-200 uppercase tracking-widest">Public Organization</span>
            </div>
            <p className="text-xl text-slate-600 mb-6 max-w-2xl">{orgData.description || 'Open source security research and development.'}</p>
            <div className="flex flex-wrap gap-8 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>{orgData.followers} Followers</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                <span>{orgData.public_repos} Repositories</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <a href={orgData.blog} className="hover:text-slate-900">{orgData.blog || 'bedusec.com'}</a>
              </div>
            </div>
          </div>
          <Button variant="outline" onClick={() => window.open(orgData.html_url, '_blank')}>
            <Github className="w-4 h-4" /> Follow on GitHub
          </Button>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
          Latest Open Source Contributions
          <span className="h-px flex-1 bg-slate-100"></span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map(repo => (
            <div key={repo.id} className="p-6 rounded-xl border border-slate-100 bg-white hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="flex justify-between items-start mb-4">
                <BookOpen className="w-5 h-5 text-slate-400 group-hover:text-slate-900" />
                <a href={repo.html_url} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-slate-900">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2 truncate">{repo.name}</h3>
              <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10">{repo.description || 'No description provided.'}</p>
              <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" /> {repo.stargazers_count}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" /> {repo.forks_count}
                  </div>
                </div>
                {repo.language && (
                  <span className="px-2 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-100">
                    {repo.language}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Hero = () => (
  <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-40 overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-white">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
    </div>
    
    <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
      <div className="max-w-4xl">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-sm font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-slate-900"></span>
          Viviamo per il rispetto
        </div>
        
        <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-8">
          Elevating Global <br />
          <span className="text-slate-500">Cybersecurity Standards</span>
        </h1>
        
        <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mb-12">
          BEDUSEC pairs the agility of youth innovation with rigorous security protocols. We provide enterprise-grade defense strategies for a complex digital world.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary">
            Schedule Consultation <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="secondary">
            View Capabilities
          </Button>
        </div>

        <div className="mt-20 pt-10 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">2026</div>
            <div className="text-sm text-slate-500 font-medium">Forward Vision</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">100%</div>
            <div className="text-sm text-slate-500 font-medium">Security Focus</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">Global</div>
            <div className="text-sm text-slate-500 font-medium">Operation Reach</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-slate-900 mb-1">50+</div>
            <div className="text-sm text-slate-500 font-medium">Enterprise Partners</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, description }) => (
  <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-300">
    <div className="w-12 h-12 bg-slate-50 rounded-lg flex items-center justify-center mb-6">
      <Icon className="w-6 h-6 text-slate-900" />
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{description}</p>
  </div>
);

const Expertise = () => (
  <section id="expertise" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Strategic Security Solutions</h2>
          <p className="text-lg text-slate-600">
            We move beyond basic protection to provide comprehensive security architecture. Our youth-led innovation teams stay ahead of emerging threats through proactive research.
          </p>
        </div>
        <a href="#services" className="flex items-center gap-2 text-slate-900 font-semibold hover:gap-3 transition-all">
          Explore All Services <ArrowRight className="w-4 h-4" />
        </a>
      </div>
      
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Lock}
          title="Infrastructure Hardening"
          description="Enterprise-grade system reinforcement ensuring resilience against sophisticated attacks and unauthorized access vectors."
        />
        <FeatureCard 
          icon={BarChart}
          title="Risk Assessment"
          description="Comprehensive evaluation of digital assets to identify vulnerabilities and implement strategic mitigation protocols."
        />
        <FeatureCard 
          icon={Globe}
          title="Global Compliance"
          description="Ensuring your digital operations meet international security standards and data privacy regulations."
        />
      </div>
    </div>
  </section>
);

const About = () => (
  <section id="about" className="py-24 bg-slate-900 text-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-block px-3 py-1 bg-slate-800 rounded-full text-xs font-semibold tracking-wider uppercase mb-6 text-slate-300">
            Our Philosophy
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">
            Built on Respect.<br />
            Driven by Innovation.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-8">
            BEDUSEC represents a new paradigm in cybersecurity. We are a collective of youth developers and security researchers committed to constructing a safer digital environment.
          </p>
          <p className="text-slate-400 text-lg leading-relaxed mb-10">
            Our motto, "Viviamo per il rispetto" (We live for respect), underscores our ethical approach to security. We respect data, privacy, and the integrity of the systems we protect.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-white shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Ethical Standards</h4>
                <p className="text-sm text-slate-400">Uncompromising integrity</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-white shrink-0 mt-1" />
              <div>
                <h4 className="font-bold mb-1">Advanced Research</h4>
                <p className="text-sm text-slate-400">Continuous learning</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative">
          <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-slate-800 relative z-10 border border-slate-700">
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-24 h-24 text-slate-700" />
            </div>
            <div className="absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-slate-900 to-transparent">
              <p className="font-medium text-white">Security Operations Center</p>
              <p className="text-sm text-slate-400">Global Monitoring Hub</p>
            </div>
          </div>
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-700 rounded-full blur-2xl opacity-50"></div>
          <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-slate-700 rounded-full blur-2xl opacity-50"></div>
        </div>
      </div>
    </div>
  </section>
);

const ServiceRow = ({ title, description, id }) => (
  <div className="group py-10 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-50/50 transition-colors px-4 -mx-4 rounded-lg">
    <div className="flex gap-6 items-start">
      <span className="text-sm font-bold text-slate-300 pt-1">{id}</span>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-blue-900 transition-colors">{title}</h3>
        <p className="text-slate-600 max-w-xl leading-relaxed">{description}</p>
      </div>
    </div>
    <div className="pl-10 md:pl-0">
      <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-slate-900 group-hover:border-slate-900 group-hover:text-white transition-all">
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const Services = () => (
  <section id="services" className="py-24 bg-white">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="max-w-3xl mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Capabilities</h2>
        <p className="text-lg text-slate-600">
          Our team delivers full-spectrum security services designed for modern enterprises.
        </p>
      </div>
      
      <div className="border-t border-slate-100">
        <ServiceRow 
          id="01"
          title="Penetration Testing" 
          description="Simulated cyberattacks against your computer system to check for exploitable vulnerabilities."
        />
        <ServiceRow 
          id="02"
          title="Secure Code Review" 
          description="In-depth analysis of source code to find security flaws that traditional testing might miss."
        />
        <ServiceRow 
          id="03"
          title="Incident Response" 
          description="Immediate and strategic response protocols to contain breaches and minimize operational impact."
        />
        <ServiceRow 
          id="04"
          title="Security Architecture" 
          description="Designing robust systems that integrate security at the foundational level of your infrastructure."
        />
      </div>
    </div>
  </section>
);

const Contact = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="bg-slate-900 rounded-3xl p-8 md:p-16 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to secure your infrastructure?</h2>
            <p className="text-slate-400 text-lg mb-8 max-w-lg">
              Partner with BEDUSEC for industry-leading security solutions. Our team is ready to audit, analyze, and fortify.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Email Us</div>
                  <div className="font-medium">contact@bedusec.com</div>
                </div>
              </div>
              <div className="flex items-center gap-4 text-white">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 uppercase tracking-wider">Headquarters</div>
                  <div className="font-medium">Global Operations</div>
                </div>
              </div>
            </div>
          </div>
          
          <form className="bg-white p-8 rounded-2xl shadow-xl">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">First Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-slate-50" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Last Name</label>
                <input type="text" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-slate-50" />
              </div>
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Work Email</label>
              <input type="email" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-slate-50" />
            </div>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
              <textarea rows="4" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 outline-none transition-all bg-slate-50"></textarea>
            </div>
            <Button variant="primary" className="w-full justify-center">
              Submit Inquiry
            </Button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <div className="grid md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900">BEDUSEC</span>
          </div>
          <p className="text-slate-600 leading-relaxed max-w-sm mb-6">
            Viviamo per il rispetto. Dedicated to elevating cyber safety through professional integrity and advanced technical capability.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-all">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-slate-900 mb-6">Company</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><a href="#" className="hover:text-slate-900 transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Our Team</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-slate-900 mb-6">Services</h4>
          <ul className="space-y-4 text-sm text-slate-600">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Penetration Testing</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Security Audits</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Compliance</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Training</a></li>
          </ul>
        </div>
      </div>
      
      <div className="pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
        <p>© 2026 BEDUSEC. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-slate-900">Privacy Policy</a>
          <a href="#" className="hover:text-slate-900">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans text-slate-900 antialiased selection:bg-slate-900 selection:text-white bg-white min-h-screen">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero />
            <Expertise />
            <About />
            <Services />
            <Contact />
          </>
        ) : (
          <GitHubPreview />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default App;