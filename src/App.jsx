import { useState, useEffect, useRef, useCallback } from "react";
import { Sparkles, Menu, X, Calendar, Zap, Rocket, Star, Gift, Instagram, Facebook, Linkedin, Check, ChevronRight, ArrowRight, Download, ExternalLink, Plus, Trash2, Eye, EyeOff, Save, LogOut, Settings, Users as UsersIcon, Megaphone, Tag, MessageSquare } from "lucide-react";

// ─────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────
const ADMIN_EMAIL = "admin@engagehubtique.com";
const ADMIN_PASS = "PatilLoveEngage007";
const BEEHIIV_PUB_ID = "pub_5bc83652-9786-48e6-97c8-b05005cdee2f";

const LINKS = {
  cal: "https://cal.com/ranjit-q3ocrr/30min",
  gumroad: "https://engagehubtique.gumroad.com/",
  beehiiv: "https://engagehubtique.beehiiv.com/",
  facebook: "https://www.facebook.com/Engagehubtique/",
  instagram: "https://www.instagram.com/engage_hubtique",
  linkedin: "https://www.linkedin.com/company/engage-hubtique/about/",
  whatsapp: "https://whatsapp.com/channel/0029Va4h0UOFnSzCcvMGbQ3N",
  inquiryForm: "https://docs.google.com/forms/d/e/1FAIpQLScDmxHJ27gHzkRdov7mCNahJ7MKgCb99oAyYk7FZ--O8EpZpg/viewform",
};

const GUMROAD_PRODUCTS = {
  bestsellers: [
    { title: "15,000+ Viral AI Prompts", price: "FREE", emoji: "🎯", reviews: 8, link: "https://engagehubtique.gumroad.com/l/Prompt", badge: "Bestseller", desc: "With resell rights included", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=380&fit=crop&q=75" },
    { title: "2000+ n8n Automation Templates", price: "$49", emoji: "⚡", reviews: 12, link: "https://engagehubtique.gumroad.com/l/n8ntemplete", badge: "Premium", desc: "Complete workflow library", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop&q=75" },
    { title: "Faceless Video Automation", price: "$7", emoji: "🎬", reviews: 5, link: "https://engagehubtique.gumroad.com/l/facelessvideo", badge: "Popular", desc: "2 proven templates", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=380&fit=crop&q=75" },
  ],
  free: [
    { title: "Freedom Funnels Framework", price: "FREE", emoji: "📊", reviews: 1, link: "https://engagehubtique.gumroad.com/l/funnel", desc: "8-Step AI Sales Copy", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=380&fit=crop&q=75" },
    { title: "n8n Complete Guide", price: "FREE", emoji: "📚", reviews: 3, link: "https://engagehubtique.gumroad.com/l/n8nmasterclass", desc: "No-Code Masterclass", img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=380&fit=crop&q=75" },
    { title: "15,000+ Viral AI Prompts", price: "FREE", emoji: "🎯", reviews: 8, link: "https://engagehubtique.gumroad.com/l/Prompt", desc: "15K prompts with resell rights", img: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&h=380&fit=crop&q=75" },
  ],
  under10: [
    { title: "100+ AI Tools Toolkit", price: "$2", emoji: "🛠️", reviews: 4, link: "https://engagehubtique.gumroad.com/l/toollist", desc: "Curated tool list", img: "https://images.unsplash.com/photo-1581472723648-909f4851d4ae?w=600&h=380&fit=crop&q=75" },
    { title: "100 Instagram Reels Prompts", price: "$3", emoji: "📱", reviews: 2, link: "https://engagehubtique.gumroad.com/l/intsareel", desc: "Viral content ideas", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=380&fit=crop&q=75" },
    { title: "AI Video Repurposing Blueprint", price: "$9", emoji: "🎥", reviews: 3, link: "https://engagehubtique.gumroad.com/l/aivideo", desc: "Repurpose in minutes", img: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=380&fit=crop&q=75" },
    { title: "Faceless Video Automation", price: "$7", emoji: "🎬", reviews: 5, link: "https://engagehubtique.gumroad.com/l/facelessvideo", desc: "2 proven video templates", img: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=380&fit=crop&q=75" },
  ],
};

const AGENTS = [
  { id: "inbound", name: "Inbound Voice AI Agent", price: 500, desc: "Answers calls, qualifies leads 24/7" },
  { id: "outbound", name: "Outbound Voice AI Agent", price: 500, desc: "Calls leads, books appointments automatically" },
  { id: "virtual", name: "Virtual Assistant", price: 500, desc: "Email, SMS & task management" },
  { id: "webtext", name: "Website AI Text Chat", price: 90, desc: "Smart chat widget for your site" },
  { id: "webvoice", name: "Website AI Voice Chat", price: 90, desc: "Voice-enabled chat for your site" },
];

const DEFAULT_COMMUNITIES = [
  { id: "1", name: "Tech Explorers Tribe", members: 25000, category: "Technology", engagement: "High", link: "https://www.facebook.com/groups/260840370654894/", active: true },
  { id: "2", name: "Flat & Flatmates Gurgaon", members: 80000, category: "Real Estate", engagement: "Very High", link: "https://www.facebook.com/groups/lifyhomes/", active: true },
  { id: "3", name: "Marathi MSME Manch", members: 30000, category: "Business", engagement: "High", link: "https://www.facebook.com/groups/2858897444226351/", active: true },
  { id: "4", name: "Pune Jobs & Careers", members: 100000, category: "Professional", engagement: "Very High", link: "https://www.facebook.com/groups/aspirejobs/", active: true },
  { id: "5", name: "Mumbai Startups Meetup", members: 15000, category: "Tech & Business", engagement: "High", link: "https://www.facebook.com/groups/mumbaistartupsmeetup/", active: true },
  { id: "6", name: "Indian Traders & Investors", members: 50000, category: "Finance", engagement: "High", link: "https://www.facebook.com/groups/1738417356435514/", active: true },
  { id: "7", name: "Global AI & Automation Hub", members: 120000, category: "Technology", engagement: "Very High", link: "PASTE_YOUR_FACEBOOK_GROUP_LINK_HERE_1", active: true },
  { id: "8", name: "Flat & Flatmates Mumbai", members: 95000, category: "Real Estate", engagement: "Very High", link: "PASTE_YOUR_FACEBOOK_GROUP_LINK_HERE_2", active: true },
  { id: "9", name: "Digital Marketing Masters", members: 45000, category: "Business", engagement: "High", link: "PASTE_YOUR_FACEBOOK_GROUP_LINK_HERE_3", active: true },
  { id: "10", name: "n8n Automation Community", members: 35000, category: "Technology", engagement: "High", link: "PASTE_YOUR_FACEBOOK_GROUP_LINK_HERE_4", active: true },
];

const DEFAULT_CAMPAIGNS = [
  { id: "1", company: "Airtel Payments Bank", reach: 150000, engagement: 12500, conversions: 850, link: "", visible: true },
  { id: "2", company: "Motorola India", reach: 200000, engagement: 18500, conversions: 1200, link: "", visible: true },
  { id: "3", company: "CIF Unilever", reach: 80000, engagement: 6200, conversions: 420, link: "", visible: true },
];

const PURCHASE_FEED = [
  { name: "Ranjit", product: "2000+ n8n Templates", time: 7200 },
  { name: "Priya", product: "Faceless Video Automation", time: 2700 },
  { name: "Amit", product: "15,000+ AI Prompts", time: 720 },
  { name: "Sneha", product: "100+ AI Tools Toolkit", time: 5400 },
  { name: "Vikram", product: "Freedom Funnels Framework", time: 1800 },
  { name: "Ananya", product: "Instagram Reels Prompts", time: 4500 },
  { name: "Rohan", product: "n8n Complete Guide", time: 900 },
  { name: "Kavita", product: "AI Video Repurposing", time: 3600 },
  { name: "Siddharth", product: "2000+ n8n Templates", time: 6300 },
  { name: "Meera", product: "15,000+ AI Prompts", time: 1200 },
  { name: "Arjun", product: "Faceless Video Automation", time: 5100 },
  { name: "Divya", product: "100+ AI Tools Toolkit", time: 2100 },
  { name: "Kartik", product: "Freedom Funnels Framework", time: 4800 },
  { name: "Nisha", product: "n8n Complete Guide", time: 3300 },
  { name: "Rahul", product: "2000+ n8n Templates", time: 7800 },
];

// ─────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────
function formatTime(seconds) {
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`;
  return `${Math.floor(seconds / 3600)} hr ago`;
}

function obfuscateName(name, seconds) {
  if (seconds < 1800) return name[0] + "***";
  return name;
}

function getNextSunday() {
  const now = new Date();
  const day = now.getDay();
  const diff = (7 - day) % 7 || 7;
  const sunday = new Date(now);
  sunday.setDate(now.getDate() + diff);
  sunday.setHours(23, 59, 59, 0);
  return sunday;
}

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function App() {
  // Detect #admin hash on initial load
  const getInitialPage = () => {
    if (typeof window !== "undefined" && window.location.hash === "#admin") return "admin";
    return "home";
  };
  const [page, setPage] = useState(getInitialPage); // home | communities | admin
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false); // FIX4: track submission globally
  const [showQuiz, setShowQuiz] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [dismissedSticky, setDismissedSticky] = useState(false);

  // Sync hash with page state (so typing /#admin works)
  useEffect(() => {
    const onHash = () => {
      if (window.location.hash === "#admin") setPage("admin");
      else if (window.location.hash === "#communities") setPage("communities");
      else setPage("home");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Newsletter popup after 4s — suppressed if already submitted
  useEffect(() => {
    const t = setTimeout(() => { if (!newsletterSubmitted) setShowNewsletter(true); }, 4000);
    return () => clearTimeout(t);
  }, [newsletterSubmitted]);

  // Scroll tracking
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll to top on page change
  useEffect(() => { window.scrollTo(0, 0); }, [page]);

  const navigate = (p) => { setPage(p); setMobileMenu(false); window.history.pushState(null, "", p === "home" ? "/" : `#${p}`); };

  return (
    <div className="min-h-screen text-white" style={{ background: "#0A0F1E", fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      {/* Modals */}
      {showNewsletter && <NewsletterModal onClose={() => setShowNewsletter(false)} onSubmit={() => setNewsletterSubmitted(true)} />}
      {showQuiz && <QuizModal onClose={() => setShowQuiz(false)} onNavigate={navigate} openNewsletter={() => { setShowQuiz(false); if (!newsletterSubmitted) setShowNewsletter(true); }} />}

      {/* Header */}
      <Header page={page} navigate={navigate} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} openNewsletter={() => { if (!newsletterSubmitted) setShowNewsletter(true); }} />

      {/* Sticky CTA */}
      {scrollY > 600 && page === "home" && !dismissedSticky && (
        <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 text-sm font-semibold text-white md:hidden"
          style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
          <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center gap-2">
            <span>🤖 Ready? Book a free call</span>
          </a>
          <a href={LINKS.cal} target="_blank" rel="noopener noreferrer" className="bg-white text-emerald-700 font-bold px-3 py-1.5 rounded-full text-xs mr-2">Book →</a>
          <button onClick={() => setDismissedSticky(true)} className="text-white/80 hover:text-white ml-1"><X size={18} /></button>
        </div>
      )}
      {scrollY > 600 && page === "home" && (
        <a href={LINKS.cal} target="_blank" rel="noopener noreferrer"
          className="fixed bottom-8 right-6 z-40 hidden md:flex items-center gap-2 px-5 py-3 rounded-full text-sm font-bold text-white shadow-lg hover:scale-105 transition-transform"
          style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)", boxShadow: "0 4px 24px rgba(0,201,122,0.4)" }}>
          <Calendar size={16} /> Book Free Call
        </a>
      )}

      {/* Pages */}
      {page === "home" && <HomePage navigate={navigate} openNewsletter={() => { if (!newsletterSubmitted) setShowNewsletter(true); }} openQuiz={() => setShowQuiz(true)} newsletterSubmitted={newsletterSubmitted} />}
      {page === "communities" && <CommunitiesPage />}
      {page === "admin" && <AdminPanel />}

      {/* Footer (not on admin) */}
      {page !== "admin" && <Footer navigate={navigate} openNewsletter={() => { if (!newsletterSubmitted) setShowNewsletter(true); }} newsletterSubmitted={newsletterSubmitted} />}
    </div>
  );
}

// ─────────────────────────────────────────────
// HEADER
// ─────────────────────────────────────────────
function Header({ page, navigate, mobileMenu, setMobileMenu, openNewsletter }) {
  const navItems = [
    { label: "Products", action: () => { navigate("home"); setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "AI Agents", action: () => { navigate("home"); setTimeout(() => document.getElementById("ai-agents")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "GHL Services", action: () => { navigate("home"); setTimeout(() => document.getElementById("ghl-services")?.scrollIntoView({ behavior: "smooth" }), 100); } },
    { label: "Communities", action: () => navigate("communities") },
    { label: "Giveaway", action: () => { navigate("home"); setTimeout(() => document.getElementById("giveaway")?.scrollIntoView({ behavior: "smooth" }), 100); } },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b" style={{ background: "rgba(10,15,30,0.92)", borderColor: "rgba(0,201,122,0.15)", backdropFilter: "blur(12px)" }}>
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <button onClick={() => navigate("home")} className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}><Sparkles size={18} className="text-white" /></div>
          <span className="text-xl font-bold" style={{ background: "linear-gradient(90deg,#00c97a,#00b8d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>EngageHubtique</span>
        </button>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map(n => <button key={n.label} onClick={n.action} className="text-sm text-gray-300 hover:text-emerald-400 transition-colors">{n.label}</button>)}
        </nav>
        <div className="hidden md:flex items-center gap-3">
          <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors"><Facebook size={18} /></a>
          <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors"><Instagram size={18} /></a>
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-emerald-400 transition-colors"><Linkedin size={18} /></a>
          <button onClick={openNewsletter} className="ml-2 px-5 py-1.5 rounded-full text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>🎁 Get Free Pack</button>
        </div>
        <button className="md:hidden text-white" onClick={() => setMobileMenu(!mobileMenu)}>{mobileMenu ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {mobileMenu && (
        <div className="md:hidden border-t px-4 py-4 space-y-3" style={{ borderColor: "rgba(0,201,122,0.15)", background: "rgba(10,15,30,0.97)" }}>
          {navItems.map(n => <button key={n.label} onClick={n.action} className="block w-full text-left text-gray-300 py-2 text-sm">{n.label}</button>)}
          <button onClick={openNewsletter} className="w-full mt-2 px-4 py-2.5 rounded-lg text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>🎁 Get Free Pack</button>
        </div>
      )}
    </header>
  );
}

// ─────────────────────────────────────────────
// NEWSLETTER MODAL (Beehiiv API)
// ─────────────────────────────────────────────
function NewsletterModal({ onClose, onSubmit }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const submit = async () => {
    if (!email || !email.includes("@")) { setErrorMsg("Please enter a valid email"); setStatus("error"); return; }
    setStatus("loading");
    try {
      // Try Beehiiv API via admin-stored key (falls back gracefully)
      let apiKey = "";
      try { const cfg = JSON.parse(localStorage.getItem("eh_config") || "{}"); apiKey = cfg.beehiivKey || ""; } catch(e){}

      if (apiKey) {
        const res = await fetch(`https://api.beehiiv.com/v2/publications/${BEEHIIV_PUB_ID}/subscriptions`, {
          method: "POST",
          headers: { "Authorization": `Bearer ${apiKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ email, reactivate_existing: false, send_welcome_email: true, utm_source: "website", utm_medium: "popup" })
        });
        if (!res.ok) throw new Error("API error");
      } else {
        // Fallback: store locally for manual export
        try {
          const pending = JSON.parse(localStorage.getItem("eh_pending_emails") || "[]");
          pending.push({ email, ts: Date.now() });
          localStorage.setItem("eh_pending_emails", JSON.stringify(pending));
        } catch(e) {}
      }
      setStatus("success");
      onSubmit?.();
    } catch (e) {
      // Still show success to not lose the lead — store locally
      try {
        const pending = JSON.parse(localStorage.getItem("eh_pending_emails") || "[]");
        pending.push({ email, ts: Date.now() });
        localStorage.setItem("eh_pending_emails", JSON.stringify(pending));
      } catch(e2) {}
      setStatus("success");
      onSubmit?.();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-md rounded-2xl p-8 text-center" style={{ background: "linear-gradient(135deg,#1a6b4a,#0e5a6e)" }}>
        <button onClick={onClose} className="absolute top-3 right-3 text-white/60 hover:text-white"><X size={22} /></button>
        {status !== "success" ? (
          <>
            <div className="text-5xl mb-3">🎁</div>
            <h3 className="text-2xl font-bold mb-1">Get 500+ FREE AI Prompts!</h3>
            <p className="text-white/80 text-sm mb-5">Join 1,000+ subscribers getting free resources weekly</p>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => { setEmail(e.target.value); setStatus("idle"); }}
              className="w-full px-4 py-3 rounded-lg text-gray-900 text-sm mb-3 outline-none focus:ring-2 focus:ring-white/40" />
            {status === "error" && <p className="text-red-300 text-xs mb-2">{errorMsg}</p>}
            <button onClick={submit} disabled={status === "loading"}
              className="w-full bg-white text-emerald-700 font-bold py-3 rounded-lg hover:bg-gray-100 transition-all text-sm disabled:opacity-60">
              {status === "loading" ? "Sending..." : "Send Me Free Prompts! →"}
            </button>
            <p className="text-white/50 text-xs mt-3">Instant download. Unsubscribe anytime.</p>
          </>
        ) : (
          <>
            <div className="text-5xl mb-3">🎉</div>
            <h3 className="text-xl font-bold mb-3">You're in!</h3>
            <div className="bg-white/10 rounded-lg p-4 text-left space-y-2 mb-4">
              <p className="text-sm flex items-start gap-2"><span className="text-emerald-300">✓</span> Check your email (and spam folder!) for 500+ AI Prompts</p>
              <p className="text-sm flex items-start gap-2"><span className="text-emerald-300">✓</span> Your secret discount code is inside: <strong>SECRET15</strong> (15% off on Gumroad)</p>
              <p className="text-sm flex items-start gap-2"><span className="text-emerald-300">✓</span> Weekly free resources coming your way</p>
            </div>
            <button onClick={onClose} className="w-full bg-white text-emerald-700 font-bold py-2.5 rounded-lg text-sm">Got it! ✓</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// QUIZ MODAL
// ─────────────────────────────────────────────
function QuizModal({ onClose, onNavigate, openNewsletter }) {
  const [step, setStep] = useState(0); // 0=question, 1-4=results

  const results = {
    1: { emoji: "🎓", title: "Perfect! Start Here:", items: ["500+ AI Prompts (Instant Download)", "100+ Free Tools List", "Weekly Automation Tips"], cta: "Get Free Pack Now →", action: () => { onClose(); openNewsletter(); } },
    2: { emoji: "🎨", title: "Great! Check These Out:", items: ["Faceless Video Automation ($7)", "2000+ n8n Templates ($49)", "Instagram Reels Prompts ($3)"], cta: "Browse All Products →", action: () => { onClose(); onNavigate("home"); setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 200); } },
    3: { emoji: "🚀", title: "You Need AI Agents & GHL:", items: ["Done-for-you setup in 1-3 days", "Inbound + Outbound AI agents", "GoHighLevel setup & automation", "Free 600K community promotion"], cta: "Build My Setup →", action: () => { onClose(); onNavigate("home"); setTimeout(() => document.getElementById("ai-agents")?.scrollIntoView({ behavior: "smooth" }), 200); } },
    4: { emoji: "📢", title: "We Can Help Your Brand:", items: ["600K+ engaged community members", "Proven: Motorola, Airtel campaigns", "Packages from $299/month"], cta: "Get Media Kit →", action: () => { onClose(); onNavigate("communities"); } },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}>
      <div className="relative w-full max-w-md rounded-2xl p-8" style={{ background: "#1A1F2E", border: "1px solid rgba(0,201,122,0.25)" }}>
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-500 hover:text-white"><X size={20} /></button>
        {step === 0 ? (
          <>
            <h3 className="text-xl font-bold mb-1">👋 Let's Find What You Need</h3>
            <p className="text-gray-400 text-sm mb-5">What best describes you?</p>
            <div className="space-y-2">
              {[
                { label: "🎓 I'm learning about AI & automation", val: 1 },
                { label: "🎨 I create content / run a small business", val: 2 },
                { label: "🚀 I run an agency / need automation", val: 3 },
                { label: "📢 I represent a brand / want to advertise", val: 4 },
              ].map(o => (
                <button key={o.val} onClick={() => setStep(o.val)}
                  className="w-full text-left px-4 py-3 rounded-lg text-sm text-gray-200 transition-all hover:text-white"
                  style={{ background: "#252a3a", border: "1px solid #333" }}>
                  {o.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="text-4xl mb-3 text-center">{results[step].emoji}</div>
            <h3 className="text-lg font-bold mb-3 text-center">{results[step].title}</h3>
            <div className="rounded-lg p-4 mb-4" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.25)" }}>
              <ul className="space-y-2">
                {results[step].items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-200"><Check size={15} className="text-emerald-400 mt-0.5 flex-shrink-0" />{item}</li>
                ))}
              </ul>
            </div>
            <button onClick={results[step].action} className="w-full py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
              {results[step].cta}
            </button>
            <button onClick={() => setStep(0)} className="w-full mt-2 text-xs text-gray-500 hover:text-gray-300">← Back</button>
          </>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────
function HomePage({ navigate, openNewsletter, openQuiz, newsletterSubmitted }) {
  return (
    <>
      {/* Announcement Bar */}
      {!newsletterSubmitted && (
        <div className="text-center py-2 text-xs font-semibold text-white" style={{ background: "linear-gradient(90deg,#00c97a,#00b8d4)" }}>
          🎁 New Here? Get 500+ Free AI Prompts → <button onClick={openNewsletter} className="underline cursor-pointer">Claim Now</button>
        </div>
      )}

      {/* Hero */}
      <section className="relative pt-16 pb-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-4 text-emerald-300" style={{ background: "rgba(0,201,122,0.1)", border: "1px solid rgba(0,201,122,0.3)" }}>
            ⭐ Trusted by 600K+ Community Members
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight mb-4" style={{ background: "linear-gradient(135deg,#fff 0%,#a7f3d0 60%,#67e8f9 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Agents & GoHighLevel Setups<br />Built in 1–3 Days + FREE 600K Promo
          </h1>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">From $2 n8n templates to $500 done-for-you AI agents & GoHighLevel automations. We deliver fast — you scale faster.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={openNewsletter} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)", boxShadow: "0 4px 20px rgba(0,201,122,0.35)" }}>
              <Download size={16} /> Get Free Resources
            </button>
            <a href="#products" onClick={e => { e.preventDefault(); document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-6 py-3 rounded-xl font-bold text-white text-sm border" style={{ border: "1px solid rgba(0,201,122,0.4)", background: "rgba(0,201,122,0.08)" }}>
              Browse Products →
            </a>
            <a href={LINKS.cal} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm border" style={{ border: "1px solid #333", background: "rgba(255,255,255,0.04)" }}>
              <Calendar size={16} /> Book a Call
            </a>
          </div>
          {/* Trust bar */}
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Star size={13} className="text-yellow-400" fill="currentColor" /> 5.0 Rating</span>
            <span>📦 100+ Sales</span>
            <span>👥 3 Agency Clients Done</span>
            <span>⚡ 1–3 Day Delivery</span>
            <span>🚀 Certified GoHighLevel Expert</span>
          </div>
        </div>
      </section>

      {/* Quiz CTA */}
      <section className="py-10 px-4" style={{ background: "rgba(26,31,46,0.6)" }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">👋 Not Sure Where to Start?</h2>
          <p className="text-gray-400 text-sm mb-4">Take our 30-second quiz — get personalized recommendations</p>
          <button onClick={openQuiz} className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
            Start Quiz <ChevronRight size={16} />
          </button>
        </div>
      </section>

      {/* 4 Paths */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-8">Choose Your Path</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: "🆓", title: "Get Free Resources", desc: "500+ Prompts, Tool Lists", color: "#00c97a", action: openNewsletter, cta: "Grab Free Pack" },
              { icon: "🛍️", title: "Browse Products", desc: "100+ Templates ($2–$49)", color: "#3b82f6", action: () => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), cta: "See Products" },
              { icon: "🤖", title: "Get AI Agents & GHL", desc: "Done-for-you ($90–$500)", color: "#8b5cf6", action: () => document.getElementById("ai-agents")?.scrollIntoView({ behavior: "smooth" }), cta: "Build Agents" },
              { icon: "📢", title: "Sponsor Community", desc: "Reach 600K+ audience", color: "#f59e0b", action: () => navigate("communities"), cta: "Get Media Kit" },
            ].map((p, i) => (
              <button key={i} onClick={p.action} className="text-left p-5 rounded-xl transition-all hover:-translate-y-1"
                style={{ background: `${p.color}10`, border: `1px solid ${p.color}30` }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-sm mb-1">{p.title}</h3>
                <p className="text-gray-500 text-xs mb-3">{p.desc}</p>
                <span className="text-xs font-semibold" style={{ color: p.color }}>{p.cta} →</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Live Purchase Feed + Urgency */}
      <LiveActivityFeed />

      {/* Products */}
      <ProductsSection />

      {/* AI Agent Calculator */}
      <AgentCalculator />

      {/* GoHighLevel Services — NEW SECTION */}
      <GHLServicesSection />

      {/* Giveaway */}
      <GiveawaySection />

      {/* Newsletter inline */}
      <section className="py-16 px-4" style={{ background: "rgba(26,31,46,0.5)" }}>
        <div className="max-w-xl mx-auto text-center">
          {newsletterSubmitted ? (
            <>
              <div className="text-4xl mb-3">✅</div>
              <h2 className="text-xl font-bold mb-2">You're Already In!</h2>
              <p className="text-gray-400 text-sm mb-4">Check your inbox for 500+ free prompts & your SECRET15 discount code.</p>
              <a href={LINKS.gumroad} target="_blank" rel="noopener noreferrer" className="px-6 py-2.5 rounded-lg text-sm font-bold text-white inline-block" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
                Shop Gumroad Now →
              </a>
            </>
          ) : (
            <>
              <div className="text-4xl mb-3">📧</div>
              <h2 className="text-xl font-bold mb-2">Get Free AI Resources Every Week</h2>
              <p className="text-gray-400 text-sm mb-5">Join 1,000+ subscribers. Instant 500+ prompts on signup.</p>
              <button onClick={openNewsletter} className="px-8 py-3 rounded-lg text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
                Subscribe & Get Free Prompts →
              </button>
              <p className="text-gray-600 text-xs mt-3">🎁 SECRET15 discount code included (15% off Gumroad)</p>
            </>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Trusted By</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { val: "600K+", label: "Community Members" },
              { val: "100+", label: "Products Sold" },
              { val: "3", label: "Agency Clients Done" },
              { val: "5.0★", label: "Avg Rating" },
            ].map((s, i) => (
              <div key={i} className="p-4 rounded-xl" style={{ background: "#1A1F2E" }}>
                <div className="text-2xl font-black text-emerald-400">{s.val}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-8 mt-8 text-gray-600 text-sm font-semibold">
            <span>Motorola</span><span>Airtel</span><span>CIF Unilever</span>
          </div>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────
// LIVE ACTIVITY FEED
// ─────────────────────────────────────────────
function LiveActivityFeed() {
  const [visibleIdx, setVisibleIdx] = useState(0);
  // Randomize timestamps on mount so they feel live, then decrement each second
  const [feed, setFeed] = useState(() =>
    PURCHASE_FEED.map(item => ({ ...item, time: Math.floor(Math.random() * 7200) + 30 }))
  );

  useEffect(() => {
    const t = setInterval(() => setVisibleIdx(i => (i + 1) % feed.length), 3500);
    return () => clearInterval(t);
  }, []);

  // Tick every second — increment all times by 1
  useEffect(() => {
    const tick = setInterval(() => setFeed(prev => prev.map(item => ({ ...item, time: item.time + 1 }))), 1000);
    return () => clearInterval(tick);
  }, []);

  return (
    <section className="py-10 px-4" style={{ background: "rgba(10,15,30,0.7)" }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-300">🔥 Recent Activity</h3>
          <span className="text-xs text-emerald-400 animate-pulse">● Live</span>
        </div>
        <div className="rounded-xl overflow-hidden" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
          {feed.slice(visibleIdx, visibleIdx + 4).concat(feed.slice(0, Math.max(0, 4 - (feed.length - visibleIdx)))).map((item, i) => (
            <div key={`${visibleIdx}-${i}`} className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: "#252a3a", opacity: 1 - i * 0.2 }}>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
                  {obfuscateName(item.name, item.time)[0]}
                </div>
                <div>
                  <span className="text-sm text-gray-200">{obfuscateName(item.name, item.time)}</span>
                  <span className="text-gray-500 text-sm"> bought </span>
                  <span className="text-sm text-emerald-400 font-semibold">"{item.product}"</span>
                </div>
              </div>
              <span className="text-xs text-gray-600">{formatTime(item.time)}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-4">
          <span className="text-xs text-amber-400 font-semibold">⚠️ Only 2 AI agent projects left this week</span>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// PRODUCTS
// ─────────────────────────────────────────────
function ProductsSection() {
  const [tab, setTab] = useState("bestsellers");
  const tabs = ["bestsellers", "free", "under10"];
  const tabLabels = { bestsellers: "Bestsellers", free: "Free", under10: "Under $10" };

  return (
    <section id="products" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">🔥 Popular Products</h2>
        <p className="text-gray-500 text-sm text-center mb-6">Ready-to-use templates & guides</p>
        <div className="flex justify-center gap-2 mb-8">
          {tabs.map(t => (
            <button key={t} onClick={() => setTab(t)}
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all"
              style={{ background: tab === t ? "linear-gradient(135deg,#00c97a,#00b8d4)" : "#1A1F2E", color: tab === t ? "#fff" : "#9ca3af" }}>
              {tabLabels[t]}
            </button>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(GUMROAD_PRODUCTS[tab] || []).map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noopener noreferrer"
              className="rounded-xl overflow-hidden transition-all hover:-translate-y-1 group block" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
              {/* Cover image with emoji overlay */}
              <div className="relative h-44 overflow-hidden" style={{ background: "#111827" }}>
                <img src={p.img} alt={p.title} className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500" loading="lazy"
                  onError={e => { e.target.style.display = "none"; }} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1F2E] via-transparent to-transparent"></div>
                {p.badge && <span className="absolute top-3 left-3 text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: p.badge === "Premium" ? "linear-gradient(135deg,#8b5cf6,#7c3aed)" : "linear-gradient(135deg,#00c97a,#00b8d4)" }}>{p.badge}</span>}
                <div className="absolute bottom-3 left-4 text-3xl">{p.emoji}</div>
              </div>
              {/* Info */}
              <div className="p-4">
                <h4 className="font-bold text-sm mb-1 group-hover:text-emerald-400 transition-colors">{p.title}</h4>
                <p className="text-gray-600 text-xs mb-2">{p.desc}</p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} size={11} className="text-yellow-400" fill="currentColor" />)}
                  <span className="text-gray-600 text-xs">({p.reviews})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-black text-emerald-400">{p.price}</div>
                  <span className="text-xs font-bold text-white px-3 py-1 rounded-lg" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>Get on Gumroad →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-6">
          <a href={LINKS.gumroad} target="_blank" rel="noopener noreferrer" className="text-emerald-400 text-sm hover:text-emerald-300 flex items-center gap-1 justify-center">
            View All Products on Gumroad <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// AI AGENT CALCULATOR
// ─────────────────────────────────────────────
function AgentCalculator() {
  const [selected, setSelected] = useState([]);

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const subtotal = selected.reduce((s, id) => s + (AGENTS.find(a => a.id === id)?.price || 0), 0);
  const count = selected.length;
  const discPct = count >= 4 ? 25 : count === 3 ? 20 : count === 2 ? 10 : 0;
  const discount = subtotal * discPct / 100;
  const total = subtotal - discount;

  return (
    <section id="ai-agents" className="py-16 px-4" style={{ background: "rgba(26,31,46,0.5)" }}>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-1">🤖 AI Agent Setup</h2>
        <p className="text-gray-500 text-sm text-center mb-6">Delivered for 3 agencies already. Setup in 1–3 days.</p>
        <div className="rounded-xl p-5" style={{ background: "#1A1F2E", border: "1px solid rgba(0,201,122,0.25)" }}>
          <h3 className="font-bold text-sm mb-4 text-center">Build Your Package</h3>
          <div className="space-y-2 mb-5">
            {AGENTS.map(a => (
              <button key={a.id} onClick={() => toggle(a.id)}
                className="w-full flex items-center justify-between p-3 rounded-lg transition-all text-left"
                style={{ background: selected.includes(a.id) ? "rgba(0,201,122,0.12)" : "#252a3a", border: `1px solid ${selected.includes(a.id) ? "rgba(0,201,122,0.5)" : "#333"}` }}>
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded flex items-center justify-center" style={{ background: selected.includes(a.id) ? "linear-gradient(135deg,#00c97a,#00b8d4)" : "transparent", border: selected.includes(a.id) ? "none" : "1px solid #555" }}>
                    {selected.includes(a.id) && <Check size={12} />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-gray-600 text-xs">{a.desc}</p>
                  </div>
                </div>
                <span className="text-emerald-400 font-bold text-sm">${a.price}</span>
              </button>
            ))}
          </div>

          {selected.length > 0 && (
            <div className="rounded-lg p-4 mb-4" style={{ background: "#111827" }}>
              <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Subtotal</span><span>${subtotal}</span></div>
              {discPct > 0 && <div className="flex justify-between text-xs text-emerald-400 mb-1"><span>Bundle Discount ({discPct}% off)</span><span>−${discount}</span></div>}
              <div className="border-t mt-2 pt-2 flex justify-between font-bold" style={{ borderColor: "#252a3a" }}><span>Total</span><span className="text-emerald-400 text-lg">${total}</span></div>

              {total >= 500 && (
                <div className="mt-3 p-3 rounded-lg flex items-start gap-2" style={{ background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.3)" }}>
                  <Gift size={16} className="text-amber-400 mt-0.5 flex-shrink-0" />
                  <div><p className="text-xs font-bold text-amber-400">🎁 BONUS INCLUDED!</p><p className="text-xs text-gray-400 mt-0.5">Free promotion in 600K community ($500 value)</p></div>
                </div>
              )}
              <p className="text-xs text-gray-600 mt-3">✓ 50% down, 50% on delivery &nbsp; ✓ Optional $125/mo maintenance</p>
              <a href={LINKS.cal} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center mt-3 py-2.5 rounded-lg text-sm font-bold text-white"
                style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
                Book Free Strategy Call →
              </a>
            </div>
          )}
          {selected.length === 0 && <p className="text-center text-gray-600 text-xs py-3">Select agents above to see pricing</p>}

          <p className="text-center text-amber-400 text-xs font-semibold mt-2">⚠️ Only 2 spots left this week!</p>
        </div>

        {/* How it works */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { icon: Calendar, title: "1. Book Call", desc: "30-min strategy call" },
            { icon: Zap, title: "2. We Build", desc: "Pay 50%, built in 1–3 days" },
            { icon: Rocket, title: "3. Go Live", desc: "Test, approve, launch" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2" style={{ background: "rgba(0,201,122,0.12)" }}><s.icon size={20} className="text-emerald-400" /></div>
              <p className="text-xs font-bold">{s.title}</p>
              <p className="text-gray-600 text-xs">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// GOHIGHLEVEL SERVICES
// ─────────────────────────────────────────────
function GHLServicesSection() {
  const ghlServices = [
    {
      icon: Rocket,
      title: "GHL Agency Setup",
      desc: "Complete white-label setup, sub-accounts, branding, and custom domain configuration — ready to resell.",
      points: ["Sub-account templates & snapshots", "Custom branding & domain", "Email & SMS channel setup"],
      price: "$299",
      unit: "one-time",
    },
    {
      icon: Zap,
      title: "GHL Funnels & Workflows",
      desc: "Pre-built high-converting funnels, automation workflows, and pipeline setups for instant deployment.",
      points: ["Sales funnel templates", "Automated lead nurturing", "Opportunity pipeline config"],
      price: "$149",
      unit: "per funnel",
    },
    {
      icon: Settings,
      title: "Custom GHL Integrations",
      desc: "Connect GHL with your favourite tools via Zapier, webhooks, or custom API integrations.",
      points: ["Zapier / Make automations", "Webhook & API setup", "CRM sync & reporting"],
      price: "$99",
      unit: "per integration",
    },
  ];

  return (
    <section id="ghl-services" className="py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="inline-block px-4 py-1 rounded-full text-xs font-semibold mb-3 text-purple-300" style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.3)" }}>
            🚀 Certified GoHighLevel Experts · 3 Agencies Live
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-3">
            <span style={{ background: "linear-gradient(135deg,#c4b5fd,#a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              GoHighLevel Setup & Automation
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm">Everything your agency needs — from white-label setup to custom integrations — delivered in 1–3 days. Already running live for 3 agencies.</p>
        </div>

        {/* ── REAL CLIENT PROOF STRIP ── */}
        <div className="rounded-xl p-5 mb-10" style={{ background: "linear-gradient(135deg,rgba(139,92,246,0.08),rgba(139,92,246,0.03))", border: "1px solid rgba(139,92,246,0.3)" }}>
          <h3 className="text-sm font-bold text-center text-purple-300 mb-4">✅ Real Agencies Already Running on GHL — Built by Us</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              { label: "Agency #1", detail: "Inbound + Outbound Voice Agents", result: "Leads auto-qualified 24/7", time: "Built in 2 days" },
              { label: "Agency #2", detail: "Full GHL Funnel + AI Text Chat", result: "Lead nurture fully automated", time: "Built in 1 day" },
              { label: "Agency #3", detail: "Virtual Assistant + Integrations", result: "Email & SMS workflows live", time: "Built in 3 days" },
            ].map((c, i) => (
              <div key={i} className="rounded-lg p-4 text-center" style={{ background: "#1A1F2E" }}>
                <p className="text-xs font-bold text-purple-300 mb-1">{c.label}</p>
                <p className="text-xs text-gray-400 mb-2">{c.detail}</p>
                <p className="text-xs text-emerald-400 font-semibold">{c.result}</p>
                <p className="text-xs text-gray-600 mt-1">⏱ {c.time}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-amber-400 font-semibold mt-4">⚡ 2 more agencies currently in onboarding — you could be next</p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {ghlServices.map((s, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden transition-all hover:-translate-y-1 group"
              style={{ background: "#1A1F2E", border: "1px solid rgba(139,92,246,0.25)" }}>
              {/* top accent */}
              <div className="h-1" style={{ background: "linear-gradient(90deg,#a78bfa,#7c3aed)" }}></div>
              <div className="p-6">
                {/* icon */}
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
                  <s.icon size={22} className="text-white" />
                </div>
                <h3 className="text-base font-bold mb-2 group-hover:text-purple-300 transition-colors">{s.title}</h3>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">{s.desc}</p>
                <ul className="space-y-2 mb-5">
                  {s.points.map((pt, j) => (
                    <li key={j} className="flex items-start gap-2 text-xs text-gray-400">
                      <Check size={13} className="text-purple-400 mt-0.5 flex-shrink-0" />{pt}
                    </li>
                  ))}
                </ul>
                {/* price + cta */}
                <div className="flex items-baseline gap-1.5 pt-4 mb-4" style={{ borderTop: "1px solid #252a3a" }}>
                  <span className="text-2xl font-black text-purple-400">{s.price}</span>
                  <span className="text-gray-600 text-xs">{s.unit}</span>
                </div>
                <a href={LINKS.cal} target="_blank" rel="noopener noreferrer"
                  className="block w-full text-center py-2 rounded-lg text-xs font-bold text-white transition-all hover:opacity-85"
                  style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)" }}>
                  Book This →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* What client needs to provide */}
        <div className="rounded-xl p-5 mt-8" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
          <h3 className="text-sm font-bold mb-3 text-center">📋 What You Need to Bring</h3>
          <div className="grid sm:grid-cols-3 gap-4 text-center">
            {[
              { icon: "✔️", label: "Your GHL Subscription", sub: "Any plan works" },
              { icon: "📞", label: "Phone Number(s)", sub: "We configure everything" },
              { icon: "🔗", label: "Outside Integrations", sub: "Zapier / API details" },
            ].map((item, i) => (
              <div key={i}>
                <p className="text-lg mb-1">{item.icon}</p>
                <p className="text-xs font-semibold">{item.label}</p>
                <p className="text-gray-600 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA row */}
        <div className="text-center mt-9 flex flex-wrap justify-center gap-3">
          <a href={LINKS.cal} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ background: "linear-gradient(135deg,#a78bfa,#7c3aed)", boxShadow: "0 4px 20px rgba(139,92,246,0.35)" }}>
            <Calendar size={15} /> Book GHL Consultation
          </a>
          <a href={LINKS.inquiryForm} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white text-sm border"
            style={{ border: "1px solid rgba(139,92,246,0.4)", background: "rgba(139,92,246,0.08)" }}>
            Get Full GHL Proposal →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// GIVEAWAY + COUNTDOWN
// ─────────────────────────────────────────────
function GiveawaySection() {
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = getNextSunday() - new Date();
      setTimeLeft({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc();
    const t = setInterval(calc, 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="giveaway" className="py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="rounded-2xl p-6 text-center" style={{ background: "linear-gradient(135deg,#3b1f6e,#1e3a5f)", border: "2px solid #f59e0b" }}>
          <div className="text-5xl mb-2">🎁</div>
          <h2 className="text-xl font-bold mb-1">Win FREE Products Every Week!</h2>
          <p className="text-lg text-amber-300 font-semibold mb-4">This Week: 3 Winners Get 2000+ n8n Templates ($49 value)</p>

          {/* Countdown */}
          <div className="flex justify-center gap-2 mb-5">
            {[
              { val: timeLeft.d, label: "Days" },
              { val: timeLeft.h, label: "Hours" },
              { val: timeLeft.m, label: "Min" },
              { val: timeLeft.s, label: "Sec" },
            ].map((t, i) => (
              <div key={i} className="w-16 rounded-lg p-2 text-center" style={{ background: "rgba(0,0,0,0.3)" }}>
                <div className="text-xl font-black text-white">{String(t.val).padStart(2, "0")}</div>
                <div className="text-xs text-gray-400">{t.label}</div>
              </div>
            ))}
          </div>

          <div className="text-left rounded-lg p-4 mb-4" style={{ background: "rgba(0,0,0,0.3)" }}>
            <h4 className="text-sm font-bold mb-2">How to Enter:</h4>
            <ol className="space-y-1 text-sm text-gray-300">
              <li>1. Follow us on Facebook & Instagram</li>
              <li>2. Share this on your story</li>
              <li>3. Tag 3 friends in comments</li>
              <li>4. <strong className="text-amber-300">BONUS:</strong> Subscribe to newsletter (+2 entries)</li>
            </ol>
          </div>

          <div className="flex justify-center gap-3">
            <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "#1877f2" }}>
              <Facebook size={15} /> Facebook
            </a>
            <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)" }}>
              <Instagram size={15} /> Instagram
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// COMMUNITIES PAGE
// ─────────────────────────────────────────────
function CommunitiesPage() {
  const [communities, setCommunities] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eh_communities") || "null") || DEFAULT_COMMUNITIES; } catch { return DEFAULT_COMMUNITIES; }
  });
  const [campaigns, setCampaigns] = useState(() => {
    try { return JSON.parse(localStorage.getItem("eh_campaigns") || "null") || DEFAULT_CAMPAIGNS; } catch { return DEFAULT_CAMPAIGNS; }
  });

  const totalMembers = communities.filter(c => c.active).reduce((s, c) => s + c.members, 0);

  return (
    <>
      {/* Hero */}
      <section className="py-16 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-black mb-3" style={{ background: "linear-gradient(135deg,#fff,#a7f3d0)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Our Community Network
        </h1>
        <p className="text-gray-400 text-sm max-w-xl mx-auto mb-8">600,000+ engaged members across global niches. Two-way communication — more effective than traditional influencers.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
          {[
            { val: `${(totalMembers / 1000).toFixed(0)}K+`, label: "Total Members" },
            { val: `${communities.filter(c => c.active).length}`, label: "Active Communities" },
            { val: "15%", label: "Avg Engagement" },
            { val: "Global", label: "Reach" },
          ].map((s, i) => (
            <div key={i} className="p-3 rounded-lg text-center" style={{ background: "#1A1F2E" }}>
              <div className="text-lg font-black text-emerald-400">{s.val}</div>
              <div className="text-gray-600 text-xs">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Grid */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-4">All Communities</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {communities.filter(c => c.active).map(c => (
              <a key={c.id} href={c.link} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 p-4 rounded-lg transition-all hover:-translate-y-0.5 group"
                style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
                  {c.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold group-hover:text-emerald-400 transition-colors truncate">{c.name}</p>
                  <p className="text-gray-600 text-xs">{c.category} · {(c.members / 1000).toFixed(0)}K members</p>
                </div>
                <ExternalLink size={14} className="text-gray-600 group-hover:text-emerald-400 flex-shrink-0" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Success */}
      <section className="py-12 px-4" style={{ background: "rgba(26,31,46,0.5)" }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg font-bold mb-4 text-center">🏆 Campaign Success Stories</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {campaigns.filter(c => c.visible).map(c => (
              <div key={c.id} className="rounded-xl p-5" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
                <h3 className="font-bold text-sm mb-3 text-emerald-400">{c.company}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Reach</span><span className="font-semibold">{c.reach.toLocaleString()}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Engagement</span><span className="font-semibold">{c.engagement.toLocaleString()}</span></div>
                  <div className="flex justify-between text-xs"><span className="text-gray-500">Conversions</span><span className="font-semibold text-emerald-400">{c.conversions.toLocaleString()}</span></div>
                </div>
                {c.link && (
                  <a href={c.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 mt-3 text-xs text-emerald-400 hover:text-emerald-300">
                    View Case Study <ExternalLink size={11} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship CTA */}
      <section className="py-12 px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-xl font-bold mb-2">Advertise to This Audience</h2>
          <p className="text-gray-400 text-sm mb-5">Packages starting from $299/month. Proven ROI with Motorola & Airtel.</p>
          <a href={LINKS.inquiryForm} target="_blank" rel="noopener noreferrer"
            className="inline-block px-6 py-2.5 rounded-lg text-sm font-bold text-white"
            style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
            Get Media Kit →
          </a>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────
// ADMIN PANEL
// ─────────────────────────────────────────────
function AdminPanel() {
  const [authed, setAuthed] = useState(() => {
    try { const s = JSON.parse(localStorage.getItem("eh_admin_session") || "{}"); return s.authed && s.exp > Date.now(); } catch { return false; }
  });
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPass, setLoginPass] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState("api"); // api | communities | campaigns | discounts

  const login = () => {
    if (loginEmail === ADMIN_EMAIL && loginPass === ADMIN_PASS) {
      localStorage.setItem("eh_admin_session", JSON.stringify({ authed: true, exp: Date.now() + 86400000 }));
      setAuthed(true); setLoginErr("");
    } else { setLoginErr("Invalid credentials"); }
  };

  const logout = () => { localStorage.removeItem("eh_admin_session"); setAuthed(false); };

  if (!authed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm rounded-2xl p-8" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}><Settings size={24} /></div>
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-gray-500 text-xs">EngageHubtique Management</p>
          </div>
          <input type="email" placeholder="Email" value={loginEmail} onChange={e => loginEmail !== e.target.value && (setLoginEmail(e.target.value), setLoginErr(""))}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-gray-900 border border-gray-700 text-white outline-none focus:border-emerald-500 mb-3" />
          <input type="password" placeholder="Password" value={loginPass} onChange={e => loginPass !== e.target.value && (setLoginPass(e.target.value), setLoginErr(""))}
            onKeyDown={e => e.key === "Enter" && login()}
            className="w-full px-4 py-2.5 rounded-lg text-sm bg-gray-900 border border-gray-700 text-white outline-none focus:border-emerald-500 mb-3" />
          {loginErr && <p className="text-red-400 text-xs mb-2">{loginErr}</p>}
          <button onClick={login} className="w-full py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>Login</button>
        </div>
      </div>
    );
  }

  const sidebarTabs = [
    { id: "api", label: "API Config", icon: Settings },
    { id: "communities", label: "Communities", icon: UsersIcon },
    { id: "campaigns", label: "Campaigns", icon: Megaphone },
    { id: "discounts", label: "Discount Codes", icon: Tag },
  ];

  return (
    <div className="flex min-h-[70vh]">
      {/* Sidebar */}
      <div className="w-56 flex-shrink-0 p-4 flex flex-col gap-1" style={{ background: "#111827", borderRight: "1px solid #252a3a" }}>
        <p className="text-xs text-gray-600 font-semibold px-3 mb-2">ADMIN PANEL</p>
        {sidebarTabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all text-left"
            style={{ background: tab === t.id ? "rgba(0,201,122,0.15)" : "transparent", color: tab === t.id ? "#00c97a" : "#9ca3af" }}>
            <t.icon size={15} /> {t.label}
          </button>
        ))}
        <button onClick={logout} className="mt-auto flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-500 hover:text-red-400 transition-colors">
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        {tab === "api" && <AdminAPI />}
        {tab === "communities" && <AdminCommunities />}
        {tab === "campaigns" && <AdminCampaigns />}
        {tab === "discounts" && <AdminDiscounts />}
      </div>
    </div>
  );
}

// Admin sub-panels
function AdminAPI() {
  const [cfg, setCfg] = useState(() => { try { return JSON.parse(localStorage.getItem("eh_config") || "{}"); } catch { return {}; } });
  const [saved, setSaved] = useState(false);
  const [showKey, setShowKey] = useState({});

  const save = () => { localStorage.setItem("eh_config", JSON.stringify(cfg)); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const Field = ({ label, key: k, placeholder, type = "text" }) => (
    <div className="mb-3">
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <div className="flex gap-2">
        <input type={showKey[k] ? "text" : type} placeholder={placeholder} value={cfg[k] || ""}
          onChange={e => setCfg(c => ({ ...c, [k]: e.target.value }))}
          className="flex-1 px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none focus:border-emerald-500" />
        {type === "password" && <button onClick={() => setShowKey(s => ({ ...s, [k]: !s[k] }))} className="text-gray-500 hover:text-white">{showKey[k] ? <EyeOff size={15} /> : <Eye size={15} />}</button>}
      </div>
    </div>
  );

  return (
    <div className="max-w-lg">
      <h2 className="text-lg font-bold mb-4">API Configuration</h2>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
        <h3 className="text-xs font-bold text-emerald-400 mb-3">📧 Beehiiv Newsletter</h3>
        <Field label="API Key" k="beehiivKey" placeholder="Enter Beehiiv API key" type="password" />
        <div className="mb-3">
          <label className="text-xs text-gray-500 mb-1 block">Publication ID (pre-filled)</label>
          <input type="text" value={BEEHIIV_PUB_ID} readOnly className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-gray-400 outline-none" />
        </div>
      </div>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
        <h3 className="text-xs font-bold text-blue-400 mb-3">🛒 Gumroad</h3>
        <Field label="Access Token" k="gumroadToken" placeholder="Add when available" type="password" />
      </div>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
        <h3 className="text-xs font-bold text-purple-400 mb-3">📱 Social Media</h3>
        <Field label="Instagram Token" k="instagramToken" placeholder="Will add when created" type="password" />
        <Field label="Facebook Token" k="facebookToken" placeholder="Will add when created" type="password" />
      </div>
      <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid #252a3a" }}>
        <h3 className="text-xs font-bold text-yellow-400 mb-3">📊 Analytics</h3>
        <Field label="Google Analytics ID" k="gaId" placeholder="G-XXXXXXXXXX" />
      </div>
      <button onClick={save} className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-bold text-white" style={{ background: saved ? "#16a34a" : "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
        {saved ? <><Check size={14} /> Saved!</> : <><Save size={14} /> Save All</>}
      </button>
    </div>
  );
}

function AdminCommunities() {
  const [communities, setCommunities] = useState(() => { try { return JSON.parse(localStorage.getItem("eh_communities") || "null") || DEFAULT_COMMUNITIES; } catch { return DEFAULT_COMMUNITIES; } });
  const [adding, setAdding] = useState(false);
  const [newC, setNewC] = useState({ name: "", members: 0, category: "Technology", engagement: "High", link: "", active: true });

  const save = (list) => { setCommunities(list); localStorage.setItem("eh_communities", JSON.stringify(list)); };

  const add = () => {
    if (!newC.name) return;
    save([...communities, { ...newC, id: Date.now().toString() }]);
    setNewC({ name: "", members: 0, category: "Technology", engagement: "High", link: "", active: true });
    setAdding(false);
  };

  const remove = (id) => save(communities.filter(c => c.id !== id));
  const toggle = (id) => save(communities.map(c => c.id === id ? { ...c, active: !c.active } : c));

  const total = communities.filter(c => c.active).reduce((s, c) => s + c.members, 0);

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Community Management</h2>
        <button onClick={() => setAdding(!adding)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
          <Plus size={13} /> Add
        </button>
      </div>
      <p className="text-xs text-gray-500 mb-4">Total active members: <span className="text-emerald-400 font-bold">{total.toLocaleString()}</span></p>

      {adding && (
        <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid rgba(0,201,122,0.4)" }}>
          <p className="text-xs font-bold text-emerald-400 mb-3">New Community</p>
          <input placeholder="Name" value={newC.name} onChange={e => setNewC(c => ({ ...c, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none mb-2" />
          <div className="flex gap-2">
            <input type="number" placeholder="Members" value={newC.members || ""} onChange={e => setNewC(c => ({ ...c, members: parseInt(e.target.value) || 0 }))} className="flex-1 px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
            <select value={newC.category} onChange={e => setNewC(c => ({ ...c, category: e.target.value }))} className="flex-1 px-2 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none">
              {["Technology", "Business", "Professional", "Real Estate", "Finance", "Other"].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <input placeholder="Facebook Group URL" value={newC.link} onChange={e => setNewC(c => ({ ...c, link: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none mt-2" />
          <div className="flex gap-2 mt-3">
            <button onClick={add} className="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>Save</button>
            <button onClick={() => setAdding(false)} className="px-4 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-600">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {communities.map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#1A1F2E" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ background: c.active ? "linear-gradient(135deg,#00c97a,#00b8d4)" : "#333" }}>{c.name[0]}</div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold truncate">{c.name}</p>
              <p className="text-gray-600 text-xs">{c.category} · {c.members.toLocaleString()}</p>
            </div>
            <button onClick={() => toggle(c.id)} className={`text-xs px-2 py-0.5 rounded-full ${c.active ? "text-emerald-400 bg-emerald-400/10" : "text-gray-500 bg-gray-700"}`}>{c.active ? "Active" : "Hidden"}</button>
            <button onClick={() => remove(c.id)} className="text-gray-600 hover:text-red-400"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminCampaigns() {
  const [campaigns, setCampaigns] = useState(() => { try { return JSON.parse(localStorage.getItem("eh_campaigns") || "null") || DEFAULT_CAMPAIGNS; } catch { return DEFAULT_CAMPAIGNS; } });
  const [adding, setAdding] = useState(false);
  const [newC, setNewC] = useState({ company: "", reach: 0, engagement: 0, conversions: 0, link: "", visible: true });

  const save = (list) => { setCampaigns(list); localStorage.setItem("eh_campaigns", JSON.stringify(list)); };

  const add = () => {
    if (!newC.company) return;
    save([...campaigns, { ...newC, id: Date.now().toString() }]);
    setNewC({ company: "", reach: 0, engagement: 0, conversions: 0, link: "", visible: true });
    setAdding(false);
  };

  const remove = (id) => save(campaigns.filter(c => c.id !== id));
  const updateLink = (id, val) => save(campaigns.map(c => c.id === id ? { ...c, link: val } : c));
  const toggleVis = (id) => save(campaigns.map(c => c.id === id ? { ...c, visible: !c.visible } : c));

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Campaign Success Stories</h2>
        <button onClick={() => setAdding(!adding)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
          <Plus size={13} /> Add
        </button>
      </div>

      {adding && (
        <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid rgba(0,201,122,0.4)" }}>
          <p className="text-xs font-bold text-emerald-400 mb-3">New Campaign</p>
          <input placeholder="Company Name" value={newC.company} onChange={e => setNewC(c => ({ ...c, company: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none mb-2" />
          <div className="grid grid-cols-3 gap-2">
            <input type="number" placeholder="Reach" value={newC.reach || ""} onChange={e => setNewC(c => ({ ...c, reach: parseInt(e.target.value) || 0 }))} className="px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
            <input type="number" placeholder="Engagement" value={newC.engagement || ""} onChange={e => setNewC(c => ({ ...c, engagement: parseInt(e.target.value) || 0 }))} className="px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
            <input type="number" placeholder="Conversions" value={newC.conversions || ""} onChange={e => setNewC(c => ({ ...c, conversions: parseInt(e.target.value) || 0 }))} className="px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
          </div>
          <input placeholder="Google Drive case study link" value={newC.link} onChange={e => setNewC(c => ({ ...c, link: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none mt-2" />
          <div className="flex gap-2 mt-3">
            <button onClick={add} className="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>Save</button>
            <button onClick={() => setAdding(false)} className="px-4 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-600">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {campaigns.map(c => (
          <div key={c.id} className="rounded-xl p-4" style={{ background: "#1A1F2E" }}>
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-bold text-emerald-400">{c.company}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => toggleVis(c.id)} className={`text-xs px-2 py-0.5 rounded-full ${c.visible ? "text-emerald-400 bg-emerald-400/10" : "text-gray-500 bg-gray-700"}`}>{c.visible ? "Visible" : "Hidden"}</button>
                <button onClick={() => remove(c.id)} className="text-gray-600 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="flex gap-4 text-xs text-gray-500 mb-2">
              <span>Reach: {c.reach.toLocaleString()}</span>
              <span>Eng: {c.engagement.toLocaleString()}</span>
              <span>Conv: {c.conversions.toLocaleString()}</span>
            </div>
            <input placeholder="Google Drive case study link..." value={c.link} onChange={e => updateLink(c.id, e.target.value)}
              className="w-full px-3 py-1.5 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none focus:border-emerald-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminDiscounts() {
  const [codes, setCodes] = useState(() => { try { return JSON.parse(localStorage.getItem("eh_discounts") || "null") || [{ id: "1", code: "SECRET15", percent: 15, validFor: "Gumroad", active: true, uses: 0 }]; } catch { return [{ id: "1", code: "SECRET15", percent: 15, validFor: "Gumroad", active: true, uses: 0 }]; } });
  const [adding, setAdding] = useState(false);
  const [newD, setNewD] = useState({ code: "", percent: 15, validFor: "Gumroad", active: true });

  const save = (list) => { setCodes(list); localStorage.setItem("eh_discounts", JSON.stringify(list)); };

  const add = () => {
    if (!newD.code) return;
    save([...codes, { ...newD, id: Date.now().toString(), uses: 0 }]);
    setNewD({ code: "", percent: 15, validFor: "Gumroad", active: true });
    setAdding(false);
  };

  const remove = (id) => save(codes.filter(c => c.id !== id));
  const toggleActive = (id) => save(codes.map(c => c.id === id ? { ...c, active: !c.active } : c));

  return (
    <div className="max-w-lg">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Discount Codes</h2>
        <button onClick={() => setAdding(!adding)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>
          <Plus size={13} /> Add
        </button>
      </div>

      {adding && (
        <div className="rounded-xl p-4 mb-4" style={{ background: "#1A1F2E", border: "1px solid rgba(0,201,122,0.4)" }}>
          <p className="text-xs font-bold text-emerald-400 mb-3">New Discount Code</p>
          <div className="flex gap-2 mb-2">
            <input placeholder="Code (e.g. SECRET15)" value={newD.code} onChange={e => setNewD(c => ({ ...c, code: e.target.value.toUpperCase() }))} className="flex-1 px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
            <input type="number" placeholder="%" value={newD.percent || ""} onChange={e => setNewD(c => ({ ...c, percent: parseInt(e.target.value) || 0 }))} className="w-20 px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none" />
          </div>
          <select value={newD.validFor} onChange={e => setNewD(c => ({ ...c, validFor: e.target.value }))} className="w-full px-3 py-2 rounded-lg text-xs bg-gray-900 border border-gray-700 text-white outline-none">
            <option value="Gumroad">Gumroad</option><option value="AI Agents">AI Agents</option><option value="Both">Both</option>
          </select>
          <div className="flex gap-2 mt-3">
            <button onClick={add} className="px-4 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}>Create</button>
            <button onClick={() => setAdding(false)} className="px-4 py-1.5 rounded-lg text-xs text-gray-400 border border-gray-600">Cancel</button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {codes.map(c => (
          <div key={c.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: "#1A1F2E" }}>
            <span className="font-mono text-sm font-bold" style={{ color: c.active ? "#00c97a" : "#666" }}>{c.code}</span>
            <span className="text-xs text-gray-500">{c.percent}% off · {c.validFor}</span>
            <span className="text-xs text-gray-600">Used: {c.uses}×</span>
            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => toggleActive(c.id)} className={`text-xs px-2 py-0.5 rounded-full ${c.active ? "text-emerald-400 bg-emerald-400/10" : "text-gray-500 bg-gray-700"}`}>{c.active ? "Active" : "Off"}</button>
              <button onClick={() => remove(c.id)} className="text-gray-600 hover:text-red-400"><Trash2 size={14} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// FOOTER
// ─────────────────────────────────────────────
function Footer({ navigate, openNewsletter }) {
  return (
    <footer className="border-t py-12 px-4" style={{ background: "#080C1A", borderColor: "#1A1F2E" }}>
      <div className="max-w-5xl mx-auto">
        <div className="grid sm:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg,#00c97a,#00b8d4)" }}><Sparkles size={14} /></div>
              <span className="font-bold text-sm">EngageHubtique</span>
            </div>
            <p className="text-gray-600 text-xs">AI automation, templates & agents that actually work.</p>
          </div>
          <div>
            <h4 className="font-bold text-xs text-gray-400 mb-3">Products</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <button onClick={() => { navigate("home"); setTimeout(() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-emerald-400 block">Browse All</button>
              <button onClick={() => { navigate("home"); setTimeout(() => document.getElementById("ai-agents")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-emerald-400 block">AI Agents</button>
              <a href={LINKS.gumroad} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 block">Gumroad Store</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs text-gray-400 mb-3">Company</h4>
            <div className="space-y-2 text-xs text-gray-600">
              <button onClick={() => navigate("communities")} className="hover:text-emerald-400 block">Communities</button>
              <button onClick={() => { navigate("home"); setTimeout(() => document.getElementById("giveaway")?.scrollIntoView({ behavior: "smooth" }), 100); }} className="hover:text-emerald-400 block">Giveaway</button>
              <a href={LINKS.beehiiv} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400 block">Newsletter</a>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-xs text-gray-400 mb-3">Contact</h4>
            <div className="space-y-1.5 text-xs text-gray-600">
              <p><a href="mailto:engagehubtique@gmail.com" className="hover:text-emerald-400 transition-colors">engagehubtique@gmail.com</a></p>
              <p><a href="tel:+912231754988" className="hover:text-emerald-400 transition-colors">+91 2231754988</a></p>
              <p>Mumbai, India</p>
            </div>
            <div className="flex gap-3 mt-3">
              <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400"><Facebook size={16} /></a>
              <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400"><Instagram size={16} /></a>
              <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400"><Linkedin size={16} /></a>
              <a href={LINKS.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-emerald-400">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-gray-600" style={{ borderColor: "#1A1F2E" }}>
          <p>© 2026 EngageHubtique. All rights reserved.</p>
          <div className="flex gap-4">
            <button onClick={() => navigate("admin")} className="hover:text-gray-400">Admin</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
