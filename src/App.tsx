/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Moon, 
  Sun, 
  ExternalLink, 
  Award,
  User,
  Code2,
  Terminal,
  ShieldCheck
} from 'lucide-react';

// --- مكون تأثير الكتابة ---
const TypingEffect = ({ texts, speed = 100, delay = 2000 }: { texts: string[], speed?: number, delay?: number }) => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);

  useEffect(() => {
    if (subIndex === texts[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), delay);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % texts.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, speed);
    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse, texts, speed, delay]);

  return (
    <span className="inline-block min-h-[1.2em]">
      {texts[index].substring(0, subIndex)}
      <motion.span
        animate={{ opacity: }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-1 h-[1em] bg-accent ml-1 align-middle"
      />
    </span>
  );
};

const GlassCard = ({ children, className = "", id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <div id={id} className={`glass-card rounded-2xl p-6 md:p-8 ${className}`}>
    {children}
  </div>
);

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress,,);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // --- بياناتك الشخصية ---
  const myCertificates = [
    {
      title: "مبادرة أشبال مصر الرقمية (DECI) - المستوى الثالث",
      issuer: "وزارة الاتصالات وتكنولوجيا المعلومات",
      date: "2025 - 2026",
      description: "تدريب مكثف في مجالات التكنولوجيا المتقدمة."
    },
    {
      title: "NASA Space Apps Challenge Cairo",
      issuer: "NASA",
      date: "سبتمبر 2025",
      description: "المشاركة في حل تحديات برمجية عالمية تابعة لناسا."
    },
    {
      title: "تطوير تطبيقات الموبايل باستخدام Flutter",
      issuer: "مهارة تك / DECI",
      date: "2025",
      description: "بناء تطبيقات متكاملة تعمل على Android و iOS."
    }
  ];

  return (
    <div className="min-h-screen bg-bg text-text-main selection:bg-accent/30 font-sans" dir="rtl">
      {/* شريط التقدم */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z- origin-right" style={{ scaleX }} />

      {/* خلفية تفاعلية */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-6xl">
        <GlassCard className="!p-4 flex items-center justify-between px-8">
          <div className="text-2xl font-bold tracking-tighter text-accent">
            MARRWAN.DEV
          </div>
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#about" className="hover:text-accent transition-colors">عني</a>
            <a href="#certificates" className="hover:text-accent transition-colors">شهاداتي</a>
            <a href="#contact" className="hover:text-accent transition-colors">تواصل معي</a>
          </div>
          <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-white/10 text-text-dim">
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </GlassCard>
      </nav>

      <main className="max-w-6xl mx-auto pt-32 pb-24 px-6 grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        
        {/* Hero Section */}
        <motion.div className="lg:col-span-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <GlassCard className="flex flex-col md:flex-row gap-8 items-center h-full text-right">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-accent flex-shrink-0 overflow-hidden">
              <img src="https://picsum.photos/seed/marrwan/400/400" alt="مروان وليد" className="w-full h-full object-cover" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-2">مروان وليد محمد</h1>
              <div className="text-lg font-mono text-accent mb-6" dir="ltr">
                <TypingEffect texts={['Cybersecurity Enthusiast', 'Flutter Developer', 'Python Programmer', 'Red Teamer in Training']} />
              </div>
              <div className="flex flex-wrap gap-2 justify-start">
                {['Python', 'Flutter', 'C++', 'Java', 'Linux Mint', 'Cybersecurity'].map((tag) => (
                  <span key={tag} className="text-[10px] px-3 py-1 bg-accent/10 text-accent rounded-full border border-accent/20 font-bold">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* روابط التواصل السريع */}
        <motion.div className="lg:col-span-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <GlassCard id="contact" className="h-full flex flex-col justify-center">
            <h3 className="text-accent font-bold text-xs uppercase mb-4">تواصل معي</h3>
            <div className="space-y-3">
              <a href="mailto:your-email@example.com" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-accent/10 transition-all border border-glass-border">
                <Mail size={18} className="text-accent" />
                <span className="text-sm">البريد الإلكتروني</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-accent/10 transition-all border border-glass-border">
                <Linkedin size={18} className="text-accent" />
                <span className="text-sm">لينكد إن</span>
              </a>
              <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-accent/10 transition-all border border-glass-border">
                <Github size={18} className="text-accent" />
                <span className="text-sm">جيت هاب</span>
              </a>
            </div>
          </GlassCard>
        </motion.div>

        {/* نبذة عني */}
        <motion.div className="lg:col-span-5" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <GlassCard id="about" className="h-full">
            <div className="flex items-center gap-2 mb-4">
              <User size={18} className="text-accent" />
              <h3 className="text-xs font-bold uppercase text-accent">من أنا؟</h3>
            </div>
            <p className="text-text-dim text-sm leading-relaxed text-justify">
              أنا مروان وليد، مبرمج مصري عمري 15 عاماً وطالب في الصف الثالث الإعدادي. شغوف جداً بعالم البرمجة والأمن السيبراني. أمتلك خبرة في لغات Python و C++ و Java، وأعمل على تطوير تطبيقات الموبايل باستخدام Flutter. أركز حالياً على تطوير مهاراتي في الـ Red Teaming واكتشاف الثغرات، وأسعى دائماً للمشاركة في المسابقات التقنية العالمية مثل NASA Space Apps ومبادرة أشبال مصر الرقمية.
            </p>
          </GlassCard>
        </motion.div>

        {/* قسم الشهادات والإنجازات */}
        <motion.div className="lg:col-span-7" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}>
          <GlassCard id="certificates" className="h-full">
            <div className="flex items-center gap-2 mb-6">
              <Award size={18} className="text-accent" />
              <h3 className="text-xs font-bold uppercase text-accent">الشهادات والإنجازات</h3>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              {myCertificates.map((cert, index) => (
                <div 
                  key={index}
                  className="group relative p-4 rounded-xl bg-white/5 border border-glass-border hover:border-accent/50 transition-all"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-sm font-bold text-text-main group-hover:text-accent transition-colors">{cert.title}</h4>
                      <p className="text-xs text-text-dim mt-1">{cert.issuer}</p>
                    </div>
                    <span className="text-[10px] font-mono text-accent bg-accent/5 px-2 py-1 rounded-md">{cert.date}</span>
                  </div>
                  <p className="text-[11px] text-text-dim">{cert.description}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </motion.div>

      </main>

      <footer className="py-12 px-6 border-t border-glass-border text-center relative z-10">
        <p className="text-text-dim text-[10px] uppercase tracking-widest">
          صنع بكل حماس بواسطة مروان وليد © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}