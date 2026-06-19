'use client';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Network, Server, Shield, Bug,
  ChevronDown, ExternalLink, Play, Terminal,
  Globe, Video
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';
import { useLanguage } from '@/contexts/language-context';

gsap.registerPlugin(ScrollTrigger);

interface CourseItem {
  title: string;
  titleAr: string;
  titleEs: string;
  url: string;
}

interface RoadmapCategory {
  id: string;
  title: string;
  titleAr: string;
  titleEs: string;
  icon: React.ElementType;
  color: string;
  courses: CourseItem[];
}

const roadmapCategories: RoadmapCategory[] = [
  {
    id: 'cs',
    title: 'Computer Science',
    titleAr: 'علوم الحاسب',
    titleEs: 'Ciencias de la Computación',
    icon: Terminal,
    color: 'cyber-red',
    courses: [
      { title: 'CompTIA A+', titleAr: 'CompTIA A+', titleEs: 'CompTIA A+', url: 'https://www.youtube.com/playlist?list=PLH-n8YK76vIiDdOMRB-ylvns-_8Zl1euV' },
    ],
  },
  {
    id: 'network',
    title: 'Network',
    titleAr: 'الشبكات',
    titleEs: 'Redes',
    icon: Network,
    color: 'cyber-red',
    courses: [
      { title: 'CompTIA Network+', titleAr: 'CompTIA Network+', titleEs: 'CompTIA Network+', url: 'https://www.youtube.com/playlist?list=PLH-n8YK76vIiuIZoWvHL7AvtrDV7hR3He' },
    ],
  },
  {
    id: 'servers',
    title: 'Servers',
    titleAr: 'الخوادم',
    titleEs: 'Servidores',
    icon: Server,
    color: 'cyber-red',
    courses: [
      { title: 'Windows Server 2019', titleAr: 'Windows Server 2019', titleEs: 'Windows Server 2019', url: 'https://www.youtube.com/playlist?list=PLDxVq3TlR9y2sMXaL_yLp-r6pUpevgC-w' },
      { title: 'Linux System Administration', titleAr: 'إدارة نظام Linux', titleEs: 'Administración de Sistema Linux', url: 'https://www.youtube.com/playlist?list=PLy1Fx2HfcmWBpD_PI4AQpjeDK5-5q6TG7' },
    ],
  },
  {
    id: 'commands',
    title: 'Windows Commands',
    titleAr: 'أوامر Windows',
    titleEs: 'Comandos de Windows',
    icon: Terminal,
    color: 'cyber-red',
    courses: [
      { title: 'PowerShell Course', titleAr: 'دورة PowerShell', titleEs: 'Curso de PowerShell', url: 'https://www.youtube.com/watch?v=6GPZthxEKU0&t=0s' },
    ],
  },
  {
    id: 'web',
    title: 'Web Programming',
    titleAr: 'برمجة الويب',
    titleEs: 'Programación Web',
    icon: Code,
    color: 'cyber-red',
    courses: [
      { title: 'HTML & CSS', titleAr: 'HTML & CSS', titleEs: 'HTML & CSS', url: 'https://www.youtube.com/watch?v=Pwatx1n1Ws0&t=0s' },
      { title: 'JavaScript', titleAr: 'JavaScript', titleEs: 'JavaScript', url: 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAx3kiplQR_oeDqLDBUDYwVv' },
      { title: 'PHP', titleAr: 'PHP', titleEs: 'PHP', url: 'https://www.youtube.com/watch?v=pszZMzI9a7A&t=0s' },
      { title: 'MySQL', titleAr: 'MySQL', titleEs: 'MySQL', url: 'https://www.youtube.com/watch?v=N-WPYk417yE&t=0s' },
      { title: 'CRUD', titleAr: 'CRUD', titleEs: 'CRUD', url: 'https://www.youtube.com/watch?v=6hgBFDTTwEk&t=0s' },
      { title: 'Secure Web App', titleAr: 'تطبيق ويب آمن', titleEs: 'App Web Segura', url: 'https://www.youtube.com/playlist?list=PLDoPjvoNmBAypWmEHEy3awR6Ek9sUe5ZS' },
    ],
  },
  {
    id: 'programming',
    title: 'General Programming',
    titleAr: 'البرمجة العامة',
    titleEs: 'Programación General',
    icon: Code,
    color: 'cyber-red',
    courses: [
      { title: 'Python', titleAr: 'Python', titleEs: 'Python', url: 'https://www.youtube.com/playlist?list=PLknwEmKsW8OsG8dnisr_-2WGyx7lpgGEE' },
    ],
  },
  {
    id: 'security',
    title: 'Security Basics',
    titleAr: 'أساسيات الأمان',
    titleEs: 'Fundamentos de Seguridad',
    icon: Shield,
    color: 'cyber-red',
    courses: [
      { title: 'Security+ SY0-601 Prep', titleAr: 'التخطيط لاختبار Security+ SY0-601', titleEs: 'Preparación Security+ SY0-601', url: 'https://netriders.academy/courses/security' },
    ],
  },
  {
    id: 'pentest',
    title: 'Penetration Testing',
    titleAr: 'اختبار الاختراق',
    titleEs: 'Pruebas de Penetración',
    icon: Bug,
    color: 'cyber-red',
    courses: [
      { title: 'eJPTv1 Prep', titleAr: 'التخطيط لاختبار eJPTv1', titleEs: 'Preparación eJPTv1', url: 'https://netriders.academy/courses/penetration-testing-student' },
    ],
  },
  {
    id: 'wapt',
    title: 'WAPT',
    titleAr: 'أمن تطبيقات الويب',
    titleEs: 'WAPT',
    icon: Globe,
    color: 'cyber-red',
    courses: [
      { title: 'Web App Basics + Burp Suite + ZAProxy', titleAr: 'أساسيات تطبيقات الويب + Burp Suite + ZAProxy', titleEs: 'Web App Basics + Burp Suite + ZAProxy', url: 'https://www.youtube.com/watch?v=MFanMkTGJSo&t=0s' },
      { title: 'WAPT Course', titleAr: 'دورة WAPT', titleEs: 'Curso WAPT', url: 'https://www.youtube.com/playlist?list=PLX621demLUSaA7ngeN7UfVzYJihHnEfv0' },
    ],
  },
  {
    id: 'redteam',
    title: 'Red Team',
    titleAr: 'الفريق الأحمر',
    titleEs: 'Equipo Rojo',
    icon: Bug,
    color: 'cyber-red',
    courses: [
      { title: 'OSCP', titleAr: 'OSCP', titleEs: 'OSCP', url: 'https://www.youtube.com/playlist?list=PL_yseowcuqYJc7wXtGIsshYp1B_W0M-ZK' },
    ],
  },
  {
    id: 'blueteam',
    title: 'Blue Team',
    titleAr: 'الفريق الأزرق',
    titleEs: 'Equipo Azul',
    icon: Shield,
    color: 'cyber-red',
    courses: [
      { title: 'eCIR Prep', titleAr: 'التخطيط لاختبار eCIR', titleEs: 'Preparación eCIR', url: 'https://netriders.academy/courses/incident-response' },
      { title: 'CCNP Security SCOR', titleAr: 'CCNP Security SCOR', titleEs: 'CCNP Security SCOR', url: 'https://netriders.academy/courses/scor' },
      { title: 'PDF Resources', titleAr: 'موارد PDF', titleEs: 'Recursos PDF', url: 'https://bit.ly/3McwMeK' },
      { title: 'Vulnerabilities Explained', titleAr: 'شرح الثغرات', titleEs: 'Vulnerabilidades Explicadas', url: 'https://www.youtube.com/playlist?list=PLsB1gqjeUAh_99a9LbVbxg-nBV79o0kW3' },
    ],
  },
];

const youtubeChannels = [
  { name: 'NahamSec', url: 'https://youtube.com/@nahamsec', category: 'Bug Bounty' },
  { name: 'Bug Bounty Reports Explained', url: 'https://youtube.com/@bugbountyreportsexplained', category: 'Bug Bounty' },
  { name: 'John Hammond', url: 'https://youtube.com/@_johnhammond', category: 'CTF & Hacking' },
  { name: 'InsiderPhD', url: 'https://youtube.com/@insiderphd', category: 'Bug Bounty' },
  { name: 'Anas Education', url: 'https://youtube.com/@anas_education', category: 'Arabic' },
  { name: 'Secstien', url: 'https://youtube.com/@secstien', category: 'Arabic' },
  { name: 'CyberBugz', url: 'https://youtube.com/@cyberbugz', category: 'Arabic' },
  { name: 'Gentil Security', url: 'https://youtube.com/@gentil.security', category: 'Arabic' },
  { name: 'Collins InfoSec', url: 'https://youtube.com/@collinsinfosec', category: 'Security' },
  { name: 'TCM Security Academy', url: 'https://youtube.com/@tcmsecurityacademy', category: 'Courses' },
  { name: 'Ryan PhDsec', url: 'https://youtube.com/@ryan_phdsec', category: 'Security' },
  { name: 'Khaled Haddad', url: 'https://youtube.com/@khaled.s.haddad', category: 'Arabic' },
  { name: 'Zigoo', url: 'https://youtube.com/@zigoo0', category: 'Arabic' },
  { name: 'Free4Arab', url: 'https://youtube.com/@free4arab1', category: 'Arabic' },
  { name: 'Khaled Ibn Al Walid', url: 'https://youtube.com/@khaledibnalwalid22', category: 'Arabic' },
  { name: 'S7ee7', url: 'https://youtube.com/@s7ee7', category: 'Arabic' },
  { name: 'InfoSecPat', url: 'https://youtube.com/@infosecpat', category: 'Security' },
  { name: 'WhiteSec Cybersecurity', url: 'https://youtube.com/@whiteseccybersecurity', category: 'Security' },
  { name: 'Cyber3rb', url: 'https://www.youtube.com/@Cyber3rb', category: 'Arabic' },
  { name: 'Rojavacyber', url: 'https://youtube.com/@rojavacyber', category: 'Arabic' },
  { name: 'GGG Team', url: 'https://youtube.com/@gghteam', category: 'Arabic' },
  { name: 'Magician Teq', url: 'https://youtube.com/@magician-teq', category: 'Arabic' },
  { name: 'Z3nsh3ll', url: 'https://youtube.com/@z3nsh3ll', category: 'Security' },
  { name: 'NetworkChuck', url: 'https://youtube.com/@networkchuck', category: 'Networking' },
  { name: 'LiveOverflow', url: 'https://youtube.com/@liveoverflow', category: 'CTF & Hacking' },
  { name: 'David Bombal', url: 'https://youtube.com/@davidbombal', category: 'Networking & Security' },
  { name: 'The Cyber Nerd', url: 'https://youtube.com/@the-cyber_nerd', category: 'Security' },
  { name: 'RS0N Live', url: 'https://youtube.com/@rs0n_live', category: 'Security' },
  { name: 'Albr Magawi', url: 'https://youtube.com/@albrmagawi', category: 'Arabic' },
  { name: 'HackerSploit', url: 'https://youtube.com/@hackersploit', category: 'Hacking' },
  { name: 'BlackBunnies', url: 'https://youtube.com/@blackbunnies', category: 'Hacking' },
  { name: 'Ahmed Mosa', url: 'https://youtube.com/@ahmedmosaa0x0', category: 'Arabic' },
  { name: 'Daoud Youssef', url: 'https://youtube.com/@daoudyoussef7999', category: 'Arabic' },
  { name: 'NSR Security', url: 'https://youtube.com/@nsrsecurity8636', category: 'Arabic' },
  { name: 'HackHunt', url: 'https://youtube.com/@hackhunt711', category: 'Arabic' },
  { name: 'Black Hat', url: 'https://youtube.com/@blackhat-zg2yo', category: 'Arabic' },
  { name: 'Boot2Root', url: 'https://youtube.com/@boot2root20', category: 'Hacking' },
  { name: 'CybNux', url: 'https://youtube.com/@cybnux', category: 'Arabic' },
  { name: 'GhostStrats', url: 'https://youtube.com/@ghoststrats', category: 'Security' },
  { name: 'Muhammad Waseem', url: 'https://youtube.com/@muhammadwaseem17397', category: 'Security' },
  { name: 'Rakwan', url: 'https://youtube.com/@rakwan', category: 'Arabic' },
  { name: 'Secure The Humans', url: 'https://youtube.com/@securethehumans', category: 'Security Awareness' },
  { name: 'Cybersecurity Digital Forensics', url: 'https://youtube.com/@cybersecuritydigitalforens4219', category: 'Forensics' },
  { name: 'Torr Security School', url: 'https://youtube.com/@torrsecurityschool', category: 'Courses' },
  { name: 'Amr Sec Official', url: 'https://youtube.com/@amrsecofficial', category: 'Arabic' },
  { name: 'Live Bug Hunting', url: 'https://youtube.com/@livebughunting', category: 'Bug Bounty' },
  { name: 'Raccoon', url: 'https://youtube.com/@raccoon-55', category: 'Security' },
  { name: 'HackerEnv', url: 'https://youtube.com/@hackerenv4200', category: 'Arabic' },
  { name: 'TWM3', url: 'https://youtube.com/@twm3', category: 'Security' },
  { name: 'Be Practical Tech', url: 'https://youtube.com/@bepracticaltech', category: 'Tech' },
  { name: 'CosmodiumCS', url: 'https://youtube.com/@cosmodiumcs', category: 'CTF' },
  { name: 'LSECQT', url: 'https://youtube.com/@lsecqt', category: 'Security' },
  { name: 'Cyber With Zuz', url: 'https://youtube.com/@cyberwithzuz', category: 'Security' },
  { name: 'Yasser Black', url: 'https://youtube.com/@yasserblack470', category: 'Arabic' },
  { name: 'MadHat', url: 'https://www.youtube.com/@madhatistaken', category: 'Hacking' },
  { name: 'ArabSecLab', url: 'https://www.youtube.com/@Arabseclab', category: 'Arabic' },
  { name: '0x4148', url: 'https://www.youtube.com/@0x4148', category: 'Arabic' },
  { name: 'Security Arabic', url: 'https://www.youtube.com/@SecurityArabic', category: 'Arabic' },
  { name: 'CyberZone', url: 'https://www.youtube.com/@CyberZone-2', category: 'Arabic' },
  { name: 'سكوريتي بالعربي', url: 'https://www.youtube.com/@%D8%B3%D9%83%D9%8A%D9%88%D8%B1%D9%8A%D8%AA%D9%8A%D8%A8%D8%A7%D9%84%D8%B9%D8%B1%D8%A8%D9%8A', category: 'Arabic' },
  { name: 'The Best Defense', url: 'https://www.youtube.com/@thebestdefense_io', category: 'Defense' },
  { name: 'HackWizFlEx', url: 'https://www.youtube.com/@HackWizFlEx', category: 'Hacking' },
  { name: 'Black Silence', url: 'https://www.youtube.com/@BlacKSilence12', category: 'Hacking' },
];

const categoryColors: Record<string, string> = {
  'cyber-red': 'text-cyber-red bg-cyber-red/10 border-cyber-red/30',
};

export function Roadmap() {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [expandedCategory, setExpandedCategory] = useState<string | null>('cs');
  const [showAllChannels, setShowAllChannels] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.roadmap-category',
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.6, stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getLocalizedTitle = (item: CourseItem) => {
    return item.title;
  };

  const getLocalizedCategory = (cat: RoadmapCategory) => {
    return cat.title;
  };

  const displayedChannels = showAllChannels ? youtubeChannels : youtubeChannels.slice(0, 20);

  return (
    <section ref={sectionRef} id="roadmap" className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">{t.roadmap.title}</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t.roadmap.subtitle}
          </p>
        </motion.div>

        {/* Course Categories */}
        <div className="space-y-3 mb-20">
          {roadmapCategories.map((category) => {
            const isExpanded = expandedCategory === category.id;
            const Icon = category.icon;
            const colors = categoryColors[category.color];

            return (
              <div key={category.id} className="roadmap-category">
                <Card className="bg-card border-border overflow-hidden hover-glow transition-all duration-300">
                  <button
                    onClick={() => setExpandedCategory(isExpanded ? null : category.id)}
                    className="w-full"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${colors} border`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="text-left">
                            <h3 className="text-foreground font-semibold text-sm">
                              {getLocalizedCategory(category)}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {category.courses.length} courses
                            </p>
                          </div>
                        </div>
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        </motion.div>
                      </div>
                    </CardContent>
                  </button>

                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-border p-4 space-y-2">
                          {category.courses.map((course, i) => (
                            <a
                              key={i}
                              href={course.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                            >
                              <div className="flex items-center gap-3">
                                <Play className="w-4 h-4 text-muted-foreground group-hover:text-cyber-red transition-colors" />
                                <span className="text-sm text-foreground group-hover:text-cyber-red transition-colors">
                                  {getLocalizedTitle(course)}
                                </span>
                              </div>
                              <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </div>
            );
          })}
        </div>

        {/* YouTube Channels */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 font-mono">
              <span className="text-cyber-red">{'<'}</span>
              <span className="text-gradient-red">
                YouTube Channels
              </span>
              <span className="text-cyber-red">{'/>'}</span>
            </h3>
            <p className="text-muted-foreground text-sm">
              60+ useful cybersecurity channels to follow
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {displayedChannels.map((channel, i) => (
              <a
                key={i}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-card border border-border hover:border-cyber-red/30 hover-glow transition-all duration-300 group"
              >
                <Video className="w-4 h-4 text-muted-foreground group-hover:text-cyber-red transition-colors shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-foreground truncate group-hover:text-cyber-red transition-colors">
                    {channel.name}
                  </p>
                  <p className="text-[10px] text-muted-foreground">{channel.category}</p>
                </div>
              </a>
            ))}
          </div>

          {youtubeChannels.length > 20 && (
            <div className="text-center mt-6">
              <LiquidButton
                variant="outline"
                size="sm"
                onClick={() => setShowAllChannels(!showAllChannels)}
              >
                {showAllChannels
                  ? 'Show Less'
                  : `Show All (${youtubeChannels.length})`
                }
              </LiquidButton>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
