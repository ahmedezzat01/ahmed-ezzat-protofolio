'use client';
import { motion } from 'framer-motion';
import { ExternalLink, Globe, Shield, Server, Users, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

interface Project {
  id: number;
  title: string;
  titleAr: string;
  titleEs: string;
  description: string;
  descriptionAr: string;
  descriptionEs: string;
  features: string[];
  featuresAr: string[];
  featuresEs: string[];
  technologies: string[];
  icon: React.ElementType;
  color: string;
  url?: string;
  note?: string;
  noteAr?: string;
  noteEs?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'OWASP Juice Shop — TryHackMe',
    titleAr: 'OWASP Juice Shop — TryHackMe',
    titleEs: 'OWASP Juice Shop — TryHackMe',
    description: 'Completed the OWASP Juice Shop room on TryHackMe as part of the DEPI Infrastructure & Security track. Exploited 30+ vulnerabilities including SQL injection, XSS, broken authentication, insecure deserialization, and more — covering the full OWASP Top 10.',
    descriptionAr: 'إكمال غرفة OWASP Juice Shop على TryHackMe كجزء من مسار البنية التحتية والأمن في DEPI. استغلال 30+ ثغرة تشمل حقن SQL والتحطم المصادقة وغير ذلك — تغطي OWASP Top 10 بالكامل.',
    descriptionEs: 'Completé la sala OWASP Juice Shop en TryHackMe como parte del programa DEPI. Exploté 30+ vulnerabilidades incluyendo SQL injection, XSS, autenticación rota, y más — cubriendo el OWASP Top 10 completo.',
    features: ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Broken Authentication', 'Insecure Deserialization', 'Broken Access Control', 'Security Misconfiguration', 'Sensitive Data Exposure', 'OWASP Top 10 Coverage'],
    featuresAr: ['حقن SQL', 'تحطم المواقع (XSS)', 'مصادقة معطلة', 'تحلل غير آمن', 'تحكم وصول معطل', 'خطأ إعداد الأمان', 'كشف البيانات الحساسة', 'تغطية OWASP Top 10'],
    featuresEs: ['SQL Injection', 'XSS', 'Autenticación Rota', 'Deserialización Insegura', 'Control de Acceso Roto', 'Mala Configuración', 'Exposición de Datos Sensibles', 'Cobertura OWASP Top 10'],
    technologies: ['Burp Suite', 'Kali Linux', 'OWASP ZAP', 'JavaScript', 'SQL', 'Node.js'],
    icon: Target,
    color: 'cyber-red',
    url: 'https://tryhackme.com/room/owaspjuiceshop',
    note: 'Solved as part of DEPI Vulnerability Analyst & Penetration Tester track. Practiced real-world web application exploitation in a safe, legal environment.',
    noteAr: 'تم الحل كجزء من مسار محلل الثغرات واختبار الاختراق في DEPI. تمارين عملية لاستغلال تطبيقات الويب في بيئة آمنة وقانونية.',
    noteEs: 'Resuelto como parte del programa DEPI de Analista de Vulnerabilidades. Práctica real de explotación de aplicaciones web en entorno seguro.',
  },
  {
    id: 2,
    title: 'PortSwigger Web Security Labs',
    titleAr: 'معامل PortSwigger لأمن الويب',
    titleEs: 'Laboratorios PortSwigger',
    description: 'Completed multiple PortSwigger Web Security Academy labs covering the most critical web vulnerabilities. Hands-on exploitation of SSRF, SQL injection, authentication bypass, access control, XSS, CSRF, file upload vulnerabilities, and more using Burp Suite.',
    descriptionAr: 'إكمال عدة معامل PortSwigger Web Security Academy التي تغطي أهم ثغرات الويب. استغلال عملي لـ SSRF وحقن SQL وتجاوز المصادقة والتحكم بالوصول وXSS وCSRF وثغرات رفع الملفات باستخدام Burp Suite.',
    descriptionEs: 'Completé múltiples laboratorios de PortSwigger cubriendo las vulnerabilidades web más críticas. Explotación práctica de SSRF, SQL injection, bypass de autenticación, control de acceso, XSS, CSRF, y más usando Burp Suite.',
    features: ['SSRF Exploitation', 'SQL Injection Advanced', 'Authentication Bypass', 'Access Control Attacks', 'XSS & CSRF', 'File Upload Vulnerabilities', 'OAuth 2.0 Attacks', 'API Testing'],
    featuresAr: ['استغلال SSRF', 'حقن SQL متقدم', 'تجاوز المصادقة', 'هجمات التحكم بالوصول', 'XSS و CSRF', 'ثغرات رفع الملفات', 'هجمات OAuth 2.0', 'اختبار الـ API'],
    featuresEs: ['Explotación SSRF', 'SQL Injection Avanzado', 'Bypass Autenticación', 'Ataques Control de Acceso', 'XSS y CSRF', 'Subida de Archivos', 'Ataques OAuth 2.0', 'Testing API'],
    technologies: ['Burp Suite', 'PortSwigger Academy', 'Web Security', 'Proxies', 'HTTP'],
    icon: Target,
    color: 'cyber-red',
    url: 'https://portswigger.net/web-security',
    note: 'Practiced advanced web exploitation techniques in PortSwigger\'s guided labs using Burp Suite Community Edition.',
    noteAr: 'تم التدريب على تقنيات استغلال الويب المتقدمة في معامل PortSwigger باستخدام Burp Suite.',
    noteEs: 'Práctica de técnicas avanzadas de explotación web en los laboratorios guiados de PortSwigger.',
  },
  {
    id: 3,
    title: 'TryHackMe — Cybersecurity Labs',
    titleAr: 'TryHackMe — معامل الأمن السيبراني',
    titleEs: 'TryHackMe — Laboratorios de Ciberseguridad',
    description: 'Completed multiple TryHackMe rooms covering beginner to intermediate cybersecurity skills. Hands-on practice with network scanning, enumeration, privilege escalation, web exploitation, and security fundamentals.',
    descriptionAr: 'إكمال عدة غرف TryHackMe التي تغطي مهارات الأمن السيبراني من المبتدئ للمتوسط. تمارين عملية مع مسح الشبكات والتعداد وتصعيد الامتياز واستغلال الويب وأساسيات الأمان.',
    descriptionEs: 'Completé múltiples salas de TryHackMe cubriendo habilidades de ciberseguridad desde principiante hasta intermedio. Práctica con escaneo de redes, enumeración, escalada de privilegios y más.',
    features: ['Network Scanning & Enumeration', 'Privilege Escalation', 'Web Application Hacking', ' cryptography', 'Linux Fundamentals', 'Windows Fundamentals', 'SOC Operations', 'Digital Forensics'],
    featuresAr: ['مسح الشبكات والتعداد', 'تصعيد الامتياز', 'اختراق تطبيقات الويب', 'التشفير', 'أساسيات Linux', 'أساسيات Windows', 'عمليات SOC', 'التحليل الجنائي الرقمي'],
    featuresEs: ['Escaneo de Redes', 'Escalada de Privilegios', 'Hacking Web', 'Criptografía', 'Linux Básico', 'Windows Básico', 'SOC', 'Forense Digital'],
    technologies: ['Kali Linux', 'Nmap', 'Metasploit', 'Linux', 'Active Directory', 'Forensics'],
    icon: Shield,
    color: 'cyber-red',
    url: 'https://tryhackme.com',
    note: 'Continuously learning through TryHackMe\'s gamified platform, completing rooms across multiple learning paths.',
    noteAr: 'تعلم مستمر من خلال منصة TryHackMe اللعبية، إكمال غرف في مسارات تعلم متعددة.',
    noteEs: 'Aprendizaje continuo a través de la plataforma gamificada de TryHackMe.',
  },
  {
    id: 4,
    title: 'OWASP Juice Shop — Full Lab',
    titleAr: 'OWASP Juice Shop — اللاب الكامل',
    titleEs: 'OWASP Juice Shop — Lab Completo',
    description: 'Comprehensive exploitation of OWASP Juice Shop covering all major vulnerability categories. Solved 30+ challenges across all difficulty levels, documenting each exploit with proof-of-concept.',
    descriptionAr: 'استغلال شامل لـ OWASP Juice Shop يغطي جميع فئات الثغرات الرئيسية. حل 30+ تحدٍ عبر جميع مستويات الصعوبة مع توثيق كل استغلال.',
    descriptionEs: 'Explotación completa de OWASP Juice Shop cubriendo todas las categorías principales de vulnerabilidades. Resolví 30+ desafíos.',
    features: ['30+ Vulnerabilities Solved', 'All OWASP Top 10', 'Difficulty Levels Completed', 'PoC Documentation', 'Burp Suite Techniques', 'Manual & Automated Testing'],
    featuresAr: ['30+ ثغرة محلولة', 'OWASP Top 10 بالكامل', 'مستويات الصعوبة مكتملة', 'توثيق PoC', 'تقنيات Burp Suite', 'اختبار يدوي وأوتوماتيكي'],
    featuresEs: ['30+ Vulnerabilidades', 'OWASP Top 10 Completo', 'Niveles de Dificultad', 'Documentación PoC', 'Técnicas Burp Suite', 'Testing Manual y Automatizado'],
    technologies: ['Burp Suite', 'Kali Linux', 'JavaScript', 'SQL', 'Node.js', 'REST API'],
    icon: Shield,
    color: 'cyber-red',
    url: 'https://owasp.org/www-project-juice-shop/',
    note: 'One of the most comprehensive web security practice labs. Essential for understanding real-world web vulnerabilities.',
    noteAr: 'واحد من أكثر معامل أمن الويب شمولاً. ضروري لفهم ثغرات الويب الحقيقية.',
    noteEs: 'Uno de los laboratorios de seguridad web más completos.',
  },
  {
    id: 5,
    title: 'IT Infrastructure Management',
    titleAr: 'إدارة البنية التحتية',
    titleEs: 'Gestión de Infraestructura IT',
    description: 'Managing IT infrastructure across multiple companies, including systems administration, network management, and security policies.',
    descriptionAr: 'إدارة البنية التحتية عبر شركات متعددة، بما في ذلك إدارة الأنظمة والشبكات والسياسات الأمنية.',
    descriptionEs: 'Gestión de infraestructura IT en múltiples empresas, administración de sistemas y redes.',
    features: ['Systems Administration', 'Network Management', 'Security Policies', 'Technical Support', 'User Management', 'Business Continuity'],
    featuresAr: ['إدارة الأنظمة', 'إدارة الشبكات', 'السياسات الأمنية', 'الدعم الفني', 'إدارة المستخدمين', 'استمرارية الأعمال'],
    featuresEs: ['Administración', 'Gestión de Redes', 'Políticas de Seguridad', 'Soporte', 'Usuarios', 'Continuidad'],
    technologies: ['Linux', 'Windows Server', 'Networking', 'Security'],
    icon: Server,
    color: 'cyber-red',
  },
  {
    id: 6,
    title: 'Servixo Platform',
    titleAr: 'منصة Servixo',
    titleEs: 'Plataforma Servixo',
    description: 'Integrated Services Platform connecting customers with technicians such as plumbers, electricians, carpenters, and other service providers.',
    descriptionAr: 'منصة خدمات متكاملة تربط العملاء بالتقنيين مثل السباكين والكهرباء والنجارين ومزودي خدمات آخرين.',
    descriptionEs: 'Plataforma de servicios integrados que conecta a los clientes con técnicos como fontaneros, electricistas, carpinteros y otros proveedores.',
    features: ['Smart Service Booking', 'Emergency Requests System', 'Ratings & Reviews', 'Referral & Discounts', 'Secure Communication', 'Service Follow-Up'],
    featuresAr: ['حجز خدمات ذكي', 'نظام طوارئ', 'تقييمات ومراجعات', 'إحالات وخصومات', 'تواصل آمن', 'متابعة الخدمة'],
    featuresEs: ['Reserva Inteligente', 'Sistema de Emergencias', 'Calificaciones y Reseñas', 'Referidos y Descuentos', 'Comunicación Segura', 'Seguimiento'],
    technologies: ['HTML', 'CSS', 'JavaScript', 'Responsive Design', 'UI/UX'],
    icon: Globe,
    color: 'cyber-red',
    url: 'https://lnkd.in/dNsSvvXS',
    note: 'Developing the website was a significant achievement because web development is not my primary specialization, demonstrating adaptability, fast learning, and strong technical problem-solving skills.',
    noteAr: 'تطوير الموقع كان إنجازاً كبيراً لأنه ليس تخصصي الأساسي، مما يدل على القدرة على التكييف والتعلم السريع وحل المشكلات التقنية.',
    noteEs: 'Desarrollar el sitio web fue un logro significativo porque el desarrollo web no es mi especialización principal.',
  },
  {
    id: 7,
    title: 'TST Leadership',
    titleAr: 'قيادة TST',
    titleEs: 'Liderazgo TST',
    description: 'Leading the Technology Society Team as CEO, managing team growth, event organization, and strategic planning.',
    descriptionAr: 'قيادة فريق المجتمع التكنولوجي كرئيس تنفيذي، إدارة نمو الفريق وتنظيم الفعاليات والتخطيط الاستراتيجي.',
    descriptionEs: 'Liderando el Equipo de Sociedad Tecnológica como CEO, gestionando crecimiento y planificación estratégica.',
    features: ['Team Leadership', 'Strategic Planning', 'Event Management', 'Branding & Marketing', 'Social Media Management', 'Team Growth & Mentoring'],
    featuresAr: ['قيادة الفريق', 'التخطيط الاستراتيجي', 'إدارة الفعاليات', 'العلامة التجارية', 'إدارة التواصل', 'نمو الفريق'],
    featuresEs: ['Liderazgo', 'Planificación', 'Gestión de Eventos', 'Branding', 'Redes Sociales', 'Mentoring'],
    technologies: ['Leadership', 'Marketing', 'Branding', 'Event Planning'],
    icon: Users,
    color: 'cyber-red',
  },
];

export function ProjectsContent() {
  const { t } = useLanguage();

  const getLocalizedField = (project: Project, field: 'title' | 'description' | 'features' | 'note') => {
    if (field === 'features') return project.features;
    if (field === 'note') return project.note;
    return project[field] as string;
  };

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">{t.projects.title}</span>
            <span className="text-cyber-red">/&gt;</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.projects.subtitle}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.div key={project.id} initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.15 }}>
                <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-border/80 group">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${project.color}/10 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 text-${project.color}`} />
                      </div>
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-muted-foreground hover:text-cyber-red transition-colors">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-cyber-red transition-colors">
                      {getLocalizedField(project, 'title') as string}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {getLocalizedField(project, 'description') as string}
                    </p>

                    <div className="space-y-2 mb-4">
                      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                        Features
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {(getLocalizedField(project, 'features') as string[]).map((feature, j) => (
                          <div key={j} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <span className={`w-1 h-1 rounded-full bg-${project.color}`} />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.map((tech, j) => (
                        <span key={j} className="px-2 py-0.5 text-xs bg-muted text-foreground rounded border border-border">{tech}</span>
                      ))}
                    </div>

                    {project.note && (
                      <div className="p-3 bg-muted/50 rounded-lg border border-border">
                        <p className="text-xs text-muted-foreground italic">
                          {getLocalizedField(project, 'note') as string}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
