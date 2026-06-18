'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Terminal, Network, Code, Server, Lock, User, MapPin, Mail, Phone, Award, CheckCircle, X, ExternalLink } from 'lucide-react';
import { LinkedInIcon, GitHubIcon, FacebookIcon, InstagramIcon } from '@/components/ui/social-icons';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

gsap.registerPlugin(ScrollTrigger);

const RED = '#df2531';

const certifications = [
  { name: 'Foundations Of Security By Google', issuer: 'Google', year: '2024', file: '/certificate/Foundations-Of-Security-By-Google.pdf' },
  { name: 'Play It Safe Manage Security Risks By Google', issuer: 'Google', year: '2024', file: '/certificate/Play-It-Safe-Manage-Security-Risks-By-Google.pdf' },
  { name: 'Put It Work Prepare For CyberSecurity Jops By Google', issuer: 'Google', year: '2024', file: '/certificate/Put-It-Work-Prepare-For-CyberSecurity-Jops-By-Google.pdf' },
  { name: 'Introduction To CyberSecurity Awareness', issuer: 'Google', year: '2024', file: '/certificate/Introduction-To-CyberSecurity-Awareness.pdf' },
  { name: 'Vulnarability Analysis And Penetration Testing By DEPI', issuer: 'DEPI', year: '2024', file: '/certificate/Vulnarability-Analysis-And-Penetration-Testing-By-DEPI.pdf' },
  { name: 'Linux System Administration 1 RedHat', issuer: 'Red Hat', year: '2024', file: '/certificate/linux_system_administration_1_REDHAT.pdf' },
  { name: 'Linux System Administration 2 RedHat', issuer: 'Red Hat', year: '2024', file: '/certificate/linux_system_administration_2_REDHAT.pdf' },
  { name: 'CCNA Routing And Switching By NTI', issuer: 'Cisco', year: '2024', file: '/certificate/CCNA-Routing-And-Switching-By-NTI.pdf' },
  { name: 'CCEP', issuer: 'Cisco', year: '2024', file: '/certificate/CCEP.pdf' },
  { name: 'CyberSecurity For All By ITI', issuer: 'ITI', year: '2024', file: '/certificate/CyberSecurity-For-All-By-ITI.pdf' },
  { name: 'Prompet Engineerning', issuer: 'Coursera', year: '2024', file: '/certificate/PrompetEngineerning.pdf' },
];

function CertificateModal({ cert, onClose }: { cert: typeof certifications[0]; onClose: () => void }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfLoaded, setPdfLoaded] = useState(false);
  const [pdfError, setPdfError] = useState(false);
  const [Pdf, setPdf] = useState<any>(null);
  const [Document, setDocument] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    import('react-pdf').then((mod) => {
      if (mounted) {
        mod.pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${mod.pdfjs.version}/build/pdf.worker.min.mjs`;
        setDocument(() => mod.Document);
        setPdf(() => mod.Page);
      }
    });
    return () => { mounted = false; };
  }, []);

  function onDocumentLoadSuccess({ numPages: n }: { numPages: number }) {
    setNumPages(n);
    setPageNumber(1);
    setPdfLoaded(true);
  }

  function onDocumentLoadError() {
    setPdfError(true);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 30 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-4xl h-[85vh] bg-[#0a0a0a] rounded-2xl border border-[var(--cyber-red)]/30 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-white/10 shrink-0">
          <div>
            <h4 className="text-sm font-bold text-white">{cert.name}</h4>
            <p className="text-xs text-white/50">{cert.issuer} · {cert.year}</p>
          </div>
          <div className="flex items-center gap-2">
            {numPages > 1 && (
              <div className="flex items-center gap-1 mr-2">
                <button
                  onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                  disabled={pageNumber <= 1}
                  className="px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  Prev
                </button>
                <span className="text-xs text-white/50 px-2">{pageNumber} / {numPages}</span>
                <button
                  onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                  disabled={pageNumber >= numPages}
                  className="px-2 py-1 text-xs rounded bg-white/5 border border-white/10 text-white disabled:opacity-30 hover:bg-white/10 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
            <a
              href={cert.file}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 text-xs border text-[var(--cyber-red)] rounded-lg hover:bg-[var(--cyber-red)]/20 transition-colors flex items-center gap-1"
              style={{ backgroundColor: `${RED}1a`, borderColor: `${RED}4d` }}
            >
              <ExternalLink className="w-3 h-3" /> Open
            </a>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 overflow-auto flex items-center justify-center bg-[#1a1a1a]">
          {pdfError ? (
            <div className="text-center p-8">
              <p className="text-white/50 mb-4">PDF could not load in preview.</p>
              <a
                href={cert.file}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm bg-[var(--cyber-red)] text-white rounded-lg hover:bg-[var(--cyber-red)]/80 transition-colors inline-flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" /> Open PDF
              </a>
            </div>
          ) : !Document ? (
            <div className="text-center p-8">
              <div className="w-8 h-8 border-2 border-[var(--cyber-red)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
              <p className="text-white/50 text-sm">Loading PDF viewer...</p>
            </div>
          ) : (
            <Document
              file={cert.file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="text-center p-8">
                  <div className="w-8 h-8 border-2 border-[var(--cyber-red)] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                  <p className="text-white/50 text-sm">Loading certificate...</p>
                </div>
              }
              error={null}
              className="flex flex-col items-center py-4"
            >
              <Pdf
                pageNumber={pageNumber}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={Math.min(800, typeof window !== 'undefined' ? window.innerWidth - 100 : 800)}
                className="shadow-2xl"
              />
            </Document>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<typeof certifications[0] | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-card',
        { opacity: 0, y: 50, rotateX: 15 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', toggleActions: 'play none none reverse' }
        }
      );
      gsap.fromTo('.stat-item',
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', toggleActions: 'play none none reverse' }
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const highlights = [
    { icon: Shield, label: 'Cybersecurity', value: 'Penetration Testing & Vulnerability Assessment' },
    { icon: Server, label: 'Linux Admin', value: 'RHEL, Rocky Linux, System Administration' },
    { icon: Network, label: 'Networking', value: 'CCNA, Routing, Switching, VLANs' },
    { icon: Code, label: 'Development', value: 'Python, JavaScript, Web Development' },
    { icon: Lock, label: 'Security Tools', value: 'Nmap, Burp Suite, Metasploit, Wireshark' },
    { icon: Terminal, label: 'Automation', value: 'Bash Scripting, Task Automation' },
  ];

  return (
    <section ref={sectionRef} id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-[var(--cyber-red)]">&lt;</span>
            <span className="text-gradient-blue-red">{t.about.title}</span>
            <span className="text-[var(--cyber-red)]">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.about.subtitle}</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12" style={{ perspective: '1000px' }}>
          <div className="about-card lg:col-span-1">
            <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-[var(--cyber-red)]/30">
              <CardContent className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full p-[2px]" style={{ background: `linear-gradient(135deg, ${RED}, ${RED}, ${RED})` }}>
                  <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                    <User className="w-16 h-16 text-muted-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-1">Ahmed Ezzat</h3>
                <p className="text-sm text-[var(--cyber-red)] font-mono mb-4">IT Manager | Penetration Tester</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center justify-center gap-2"><MapPin className="w-4 h-4" />Damietta, Egypt</div>
                  <div className="flex items-center justify-center gap-2"><Mail className="w-4 h-4" />ahmed.ezzat@students.du.edu.eg</div>
                  <div className="flex items-center justify-center gap-2"><Phone className="w-4 h-4" />+20 102 473 8360</div>
                </div>
                <div className="flex justify-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/ahmed-ezzat01/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-[var(--cyber-red)]/30 transition-colors">
                    <LinkedInIcon className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="https://github.com/ahmedezzat01" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-[var(--cyber-red)]/30 transition-colors">
                    <GitHubIcon className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="https://facebook.com/ahmed.ezzat.0001" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-[var(--cyber-red)]/30 transition-colors">
                    <FacebookIcon className="w-5 h-5 text-foreground" />
                  </a>
                  <a href="https://www.instagram.com/ahmed.ezzaat.01/" target="_blank" rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted border border-border flex items-center justify-center hover:border-[var(--cyber-red)]/30 transition-colors">
                    <InstagramIcon className="w-5 h-5 text-foreground" />
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="about-card lg:col-span-2">
            <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-[var(--cyber-red)]/30">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">{t.about.whoIAm}</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Computer Science and AI student with strong expertise in Cybersecurity, Linux System Administration,
                  and Programming. Certified by Google, Microsoft, IBM, and Cisco in Cybersecurity, Networking,
                  and Operating Systems. Skilled in Python, C, HTML, CSS, and Flutter basics, with hands-on
                  experience in penetration testing and system management.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  As the Team Lead of TST, I have developed solid leadership, communication, and problem-solving
                  skills through managing teams and delivering real-world projects. I am passionate about continuous
                  learning and aim to advance my career as a Cybersecurity Specialist and System Engineer,
                  contributing to building secure and innovative digital solutions.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  {[
                    { label: '1+', sub: 'Years Experience' },
                    { label: '10+', sub: 'Projects Done' },
                    { label: '50+', sub: 'Clients Served' },
                    { label: '6+', sub: 'Certifications' },
                  ].map((stat, i) => (
                    <div key={i} className="stat-item text-center p-3 bg-muted/50 rounded-lg border border-border">
                      <div className="text-xl font-bold text-gradient-blue-red">{stat.label}</div>
                      <div className="text-xs text-muted-foreground">{stat.sub}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {highlights.map((item, i) => (
            <div key={i} id={`skill-${item.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`} className="about-card">
              <Card className="bg-card border-border hover-glow transition-all duration-300 hover:border-border/80 cursor-pointer group">
                <CardContent className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${RED}1a` }}>
                    <item.icon className="w-5 h-5" style={{ color: RED }} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground group-hover:text-[var(--cyber-red)] transition-colors">{item.label}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.value}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="about-card">
          <Card className="bg-card border-border hover-glow transition-all duration-300">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-[var(--cyber-red)]" /> Certifications
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {certifications.map((cert, i) => (
                  <button
                    key={i}
                    id={`cert-${cert.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    onClick={() => setSelectedCert(cert)}
                    className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg border border-border hover:border-[var(--cyber-red)]/50 hover:bg-muted transition-all duration-300 text-left group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${RED}1a` }}>
                      <CheckCircle className="w-4 h-4" style={{ color: RED }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground leading-tight group-hover:text-[var(--cyber-red)] transition-colors">{cert.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{cert.issuer} · {cert.year}</p>
                    </div>
                    <ExternalLink className="w-3 h-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
