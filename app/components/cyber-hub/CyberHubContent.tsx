'use client';
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, AlertTriangle, Zap, Eye, Lock, Radio, Target,
  ChevronDown, Copy, Check, ExternalLink, BookOpen, Wifi, Globe
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import {
  careerPaths, currentThreats, securityTools, redFlags, caseStudies,
  advancedKnowledge, wifiAttacks, hackingConcepts, tipsAdvice,
  assessmentQuestions, getLevelBadge,
} from '@/lib/cyber-hub-data';
import { SecuritySitesContent } from '@/components/security-sites/SecuritySitesContent';

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      className="p-2 hover:bg-muted rounded transition-colors"
    >
      {copied ? <Check className="w-3 h-3 text-cyber-red" /> : <Copy className="w-3 h-3 text-muted-foreground" />}
    </button>
  );
}

function Badge({ level }: { level: string }) {
  const b = getLevelBadge(level);
  return (
    <span className={`px-2 py-0.5 text-xs rounded-full ${b.color}/20 text-foreground border border-border`}>
      {b.label}
    </span>
  );
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = { critical: 'bg-cyber-red/20 text-cyber-red', high: 'bg-cyber-red/20 text-cyber-red', medium: 'bg-cyber-red/20 text-cyber-red', low: 'bg-cyber-red/20 text-cyber-red' };
  return <span className={`px-2 py-0.5 text-xs rounded-full ${colors[severity] || colors.medium} border border-border`}>{severity.toUpperCase()}</span>;
}

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-cyber-red/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-cyber-red" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">{title}</h2>
      </div>
      <p className="text-sm text-muted-foreground ml-13">{subtitle}</p>
    </div>
  );
}

function getInitialProgress(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  const saved = localStorage.getItem('SecurityHub-progress');
  return saved ? JSON.parse(saved) : {};
}

function CareerPathSection() {
  const [selectedPath, setSelectedPath] = useState(careerPaths[0].id);
  const [progress, setProgress] = useState<Record<string, boolean>>(getInitialProgress);

  const toggleMilestone = useCallback((pathId: string, milestoneIdx: number) => {
    setProgress(prev => {
      const key = `${pathId}-${milestoneIdx}`;
      const next = { ...prev, [key]: !prev[key] };
      localStorage.setItem('SecurityHub-progress', JSON.stringify(next));
      return next;
    });
  }, []);

  const path = careerPaths.find((p) => p.id === selectedPath)!;
  const completedCount = path.milestones.filter((_, i) => progress[`${path.id}-${i}`]).length;

  return (
    <div>
      <SectionHeader icon={Target} title="Career Paths" subtitle="Interactive roadmap — click milestones to track your progress" />
      <div className="flex flex-wrap gap-2 mb-6">
        {careerPaths.map((p) => (
          <button key={p.id} onClick={() => setSelectedPath(p.id)}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${selectedPath === p.id ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'}`}>
            {p.icon} {p.name}
          </button>
        ))}
      </div>
      <div className="text-sm text-muted-foreground mb-4">{completedCount}/{path.milestones.length} milestones completed</div>
      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />
        <div className="space-y-6">
          {path.milestones.map((m, i) => {
            const done = progress[`${path.id}-${i}`];
            return (
              <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="relative pl-14">
                <div className={`absolute left-4 w-4 h-4 rounded-full border-2 ${done ? 'bg-cyber-red border-cyber-red' : 'bg-background border-border'}`} />
                <Card className={`bg-card transition-all cursor-pointer ${done ? 'border-cyber-red/30' : 'border-border hover:border-border/80'}`}
                  onClick={() => toggleMilestone(path.id, i)}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-bold text-foreground">{m.title}</h4>
                      <span className="text-xs text-muted-foreground">{m.timeline}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {m.certs.map((c) => <span key={c} className="px-2 py-0.5 text-xs bg-cyber-red/10 text-cyber-red rounded">{c}</span>)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {m.skills.map((s) => <span key={s} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">{s}</span>)}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function ThreatsSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div>
      <SectionHeader icon={AlertTriangle} title="Latest Threats & Trends" subtitle="Current cybersecurity threats — updated continuously" />
      <div className="text-xs text-muted-foreground mb-4">Last Updated: {new Date().toLocaleDateString()}</div>
      <div className="space-y-3">
        {currentThreats.map((t) => (
          <Card key={t.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between cursor-pointer" onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
                <div className="flex items-center gap-3">
                  <SeverityBadge severity={t.severity} />
                  <h4 className="font-bold text-foreground">{t.name}</h4>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === t.id ? 'rotate-180' : ''}`} />
              </div>
              <AnimatePresence>
                {expanded === t.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 space-y-2">
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                    <div><span className="text-xs font-semibold text-cyber-red">Impact:</span> <span className="text-xs text-muted-foreground">{t.impact}</span></div>
                    <div><span className="text-xs font-semibold text-cyber-red">Defense:</span> <span className="text-xs text-muted-foreground">{t.defense}</span></div>
                    {t.cves && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {t.cves.map((c) => (
                          <span key={c} className="px-2 py-0.5 text-xs bg-cyber-red/10 text-cyber-red rounded font-mono">{c}</span>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function ToolsSection() {
  const [filter, setFilter] = useState<string>('All');
  const categories = ['All', ...new Set(securityTools.map((t) => t.category))];
  const filtered = filter === 'All' ? securityTools : securityTools.filter((t) => t.category === filter);

  return (
    <div>
      <SectionHeader icon={Zap} title="Cybersecurity Toolkit" subtitle="Essential tools organized by category and skill level" />
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button key={c} onClick={() => setFilter(c)}
            className={`px-3 py-2 text-xs rounded-lg border transition-all ${filter === c ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((tool) => (
          <Card key={tool.name} className="bg-card border-border hover-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-foreground">{tool.name}</h4>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </div>
                <Badge level={tool.level} />
              </div>
              <p className="text-xs text-muted-foreground mb-2"><span className="font-semibold text-foreground">Use Case:</span> {tool.useCase}</p>
              {tool.command && (
                <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-1.5 mb-2">
                  <code className="text-xs text-cyber-red font-mono flex-1">{tool.command}</code>
                  <CopyButton text={tool.command} />
                </div>
              )}
              <a href={tool.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-cyber-red hover:underline">
                <ExternalLink className="w-3 h-3" /> View Tool
              </a>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function RedFlagsSection() {
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null);
  return (
    <div>
      <SectionHeader icon={Eye} title="Red Flags & Danger Zones" subtitle="Recognize warning signs before it's too late" />
      <div className="grid md:grid-cols-2 gap-3">
        {redFlags.map((flag) => (
          <Card key={flag.id} className="bg-card border-border hover-glow transition-all duration-300"
            onMouseEnter={() => setHoveredFlag(flag.id)} onMouseLeave={() => setHoveredFlag(null)}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge level={flag.category} />
                  <h4 className="font-bold text-foreground text-sm">{flag.title}</h4>
                </div>
                <SeverityBadge severity={flag.severity} />
              </div>
              <p className="text-xs text-muted-foreground font-mono bg-muted p-2 rounded mb-2">{flag.description}</p>
              <div className={`text-xs text-muted-foreground transition-all ${hoveredFlag === flag.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
                <span className="font-semibold text-cyber-red">Analysis:</span> {flag.analysis}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function AdvancedKnowledgeSection() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  return (
    <div>
      <SectionHeader icon={Lock} title="Advanced Knowledge (Hidden Gems)" subtitle="Insider knowledge — deep-dive into advanced topics" />
      <div className="space-y-3">
        {advancedKnowledge.map((section) => (
          <Card key={section.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between cursor-pointer"
                onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}>
                <div className="flex items-center gap-3">
                  <span className="text-lg">{section.icon}</span>
                  <h4 className="font-bold text-foreground">{section.title}</h4>
                  <Badge level={section.level} />
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-3 h-3 text-cyber-red" />
                  <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expandedSection === section.id ? 'rotate-180' : ''}`} />
                </div>
              </div>
              <AnimatePresence>
                {expandedSection === section.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3 space-y-2">
                    {section.content.map((item) => (
                      <div key={item.title} className="pl-4 border-l-2 border-cyber-red/30">
                        <h5 className="text-sm font-semibold text-foreground">{item.title}</h5>
                        <p className="text-xs text-muted-foreground">{item.description}</p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function CaseStudiesSection() {
  const [expanded, setExpanded] = useState<string | null>(null);
  return (
    <div>
      <SectionHeader icon={BookOpen} title="Real Stories" subtitle="Case studies — lessons from major incidents" />
      <div className="space-y-3">
        {caseStudies.map((cs) => (
          <Card key={cs.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-start justify-between cursor-pointer"
                onClick={() => setExpanded(expanded === cs.id ? null : cs.id)}>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <SeverityBadge severity={cs.severity} />
                    <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">{cs.type}</span>
                  </div>
                  <h4 className="font-bold text-foreground">{cs.name} ({cs.year})</h4>
                </div>
                <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform ${expanded === cs.id ? 'rotate-180' : ''}`} />
              </div>
              <p className="text-xs text-muted-foreground mt-1">{cs.summary}</p>
              <AnimatePresence>
                {expanded === cs.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-3">
                    <h5 className="text-xs font-semibold text-foreground mb-2">Timeline:</h5>
                    <div className="space-y-1 mb-3">
                      {cs.timeline.map((t, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="w-1.5 h-1.5 rounded-full bg-cyber-red" />
                          {t}
                        </div>
                      ))}
                    </div>
                    <h5 className="text-xs font-semibold text-foreground mb-2">Lessons Learned:</h5>
                    <ul className="space-y-1">
                      {cs.lessons.map((l, i) => (
                        <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                          <span className="text-cyber-red mt-0.5">•</span> {l}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function WifiSecuritySection() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setCheckedItems((p) => ({ ...p, [id]: !p[id] }));

  const hardeningChecklist = [
    'Use WPA3-SAE where available',
    'Set strong passphrases (20+ characters)',
    'Change default router credentials',
    'Disable WPS (Wi-Fi Protected Setup)',
    'Enable 802.11w (Management Frame Protection)',
    'Create separate IoT network (VLAN)',
    'Monitor for rogue access points',
    'Keep router firmware updated',
    'Disable remote management',
    'Use MAC address filtering (as additional layer)',
  ];

  return (
    <div>
      <SectionHeader icon={Wifi} title="WiFi Security" subtitle="Wireless attacks, defense, and hardening guide" />
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Common WiFi Attacks</h3>
          <div className="space-y-3">
            {wifiAttacks.map((attack) => (
              <Card key={attack.id} className="bg-card border-border">
                <CardContent className="p-3">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-bold text-foreground">{attack.name}</h4>
                    <SeverityBadge severity={attack.severity} />
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{attack.description}</p>
                  <p className="text-xs text-cyber-red"><span className="font-semibold">Mitigation:</span> {attack.mitigation}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-bold text-foreground mb-3">Hardening Checklist</h3>
          <Card className="bg-card border-border">
            <CardContent className="p-4 space-y-2">
              {hardeningChecklist.map((item, i) => (
                <label key={i} className="flex items-center gap-3 text-sm text-foreground cursor-pointer hover:text-cyber-red transition-colors">
                  <input type="checkbox" checked={!!checkedItems[`wifi-${i}`]} onChange={() => toggle(`wifi-${i}`)}
                    className="w-4 h-4 rounded border-border accent-cyber-red" />
                  <span className={checkedItems[`wifi-${i}`] ? 'line-through text-muted-foreground' : ''}>{item}</span>
                </label>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function HackingConceptsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const categories = ['All', ...new Set(hackingConcepts.map((c) => c.category))];
  const filtered = selectedCategory === 'All' ? hackingConcepts : hackingConcepts.filter((c) => c.category === selectedCategory);

  return (
    <div>
      <SectionHeader icon={Radio} title="Hacking Concepts" subtitle="Popular topics across physical, digital, and social domains" />
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map((c) => (
          <button key={c} onClick={() => setSelectedCategory(c)}
            className={`px-3 py-2 text-xs rounded-lg border transition-all ${selectedCategory === c ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-3">
        {filtered.map((concept) => (
          <Card key={concept.id} className="bg-card border-border hover-glow transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded">{concept.category}</span>
              </div>
              <h4 className="font-bold text-foreground mb-1">{concept.name}</h4>
              <p className="text-xs text-muted-foreground mb-2">{concept.description}</p>
              {concept.tools && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {concept.tools.map((t) => <span key={t} className="px-2 py-0.5 text-xs bg-cyber-red/10 text-cyber-red rounded">{t}</span>)}
                </div>
              )}
              <p className="text-xs text-cyber-red italic">⚠️ {concept.disclaimer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function TipsSection() {
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const levels = ['All', 'Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const filtered = selectedLevel === 'All' ? tipsAdvice : tipsAdvice.filter((t) => t.category === selectedLevel);

  return (
    <div>
      <SectionHeader icon={Shield} title="Tips & Advice" subtitle="Career guidance from beginner to expert" />
      <div className="flex flex-wrap gap-2 mb-6">
        {levels.map((l) => (
          <button key={l} onClick={() => setSelectedLevel(l)}
            className={`px-3 py-2 text-xs rounded-lg border transition-all ${selectedLevel === l ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'}`}>
            {l}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {filtered.map((tip) => (
          <Card key={tip.id} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Badge level={tip.category} />
                <h4 className="font-bold text-foreground text-sm">{tip.title}</h4>
              </div>
              <p className="text-sm text-muted-foreground">{tip.tip}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function SelfAssessmentSection() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = assessmentQuestions[currentQ];

  const handleAnswer = (idx: number) => {
    if (isAnswered) return;
    setSelectedAnswer(idx);
    setIsAnswered(true);
    if (idx === question.correctAnswer) setScore((s) => s + 1);
  };

  const nextQuestion = () => {
    if (currentQ < assessmentQuestions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  if (completed) {
    return (
      <div>
        <SectionHeader icon={Shield} title="Am I Secure?" subtitle="Quick self-assessment" />
        <Card className="bg-card border-border text-center p-8">
          <h3 className="text-2xl font-bold text-foreground mb-2">Assessment Complete!</h3>
          <p className="text-4xl font-bold text-gradient-blue-red mb-4">{score}/{assessmentQuestions.length}</p>
          <p className="text-muted-foreground mb-4">
            {score === assessmentQuestions.length ? 'Perfect score! You have strong fundamentals.' :
              score >= 3 ? 'Good knowledge! Keep learning and exploring.' :
                'Keep studying! Focus on the fundamentals.'}
          </p>
          <button onClick={() => { setCurrentQ(0); setScore(0); setCompleted(false); setSelectedAnswer(null); setIsAnswered(false); }}
            className="px-6 py-2 bg-cyber-red/10 text-cyber-red rounded-lg border border-cyber-red/30 hover:bg-cyber-red/20 transition-colors">
            Retake Assessment
          </button>
        </Card>
      </div>
    );
  }

  return (
    <div>
      <SectionHeader icon={Shield} title="Am I Secure?" subtitle="Quick self-assessment" />
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="text-xs text-muted-foreground mb-2">Question {currentQ + 1}/{assessmentQuestions.length} — {question.category}</div>
          <h3 className="text-lg font-bold text-foreground mb-4">{question.question}</h3>
          <div className="space-y-2 mb-4">
            {question.options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg border transition-all text-sm ${
                  isAnswered
                    ? idx === question.correctAnswer ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' :
                      idx === selectedAnswer ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' :
                        'border-border text-muted-foreground'
                    : 'border-border text-foreground hover:border-cyber-red/30 hover:bg-muted/50'
                }`}>
                {opt}
              </button>
            ))}
          </div>
          {isAnswered && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground"><span className="font-semibold text-foreground">Explanation:</span> {question.explanation}</p>
              <button onClick={nextQuestion}
                className="px-4 py-2 bg-cyber-red/10 text-cyber-red rounded-lg border border-cyber-red/30 hover:bg-cyber-red/20 transition-colors text-sm">
                {currentQ < assessmentQuestions.length - 1 ? 'Next Question' : 'See Results'}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

const tabs = [
  { id: 'roadmap', label: 'Career Paths', icon: Target },
  { id: 'threats', label: 'Threats', icon: AlertTriangle },
  { id: 'tools', label: 'Tools', icon: Zap },
  { id: 'sites', label: 'Security Sites', icon: Globe },
  { id: 'redflags', label: 'Red Flags', icon: Eye },
  { id: 'advanced', label: 'Hidden Gems', icon: Lock },
  { id: 'stories', label: 'Real Stories', icon: BookOpen },
  { id: 'toolkit', label: 'Toolkit Grid', icon: Shield },
  { id: 'wifi', label: 'WiFi Security', icon: Wifi },
  { id: 'concepts', label: 'Hacking', icon: Radio },
  { id: 'tips', label: 'Tips', icon: Shield },
  { id: 'assessment', label: 'Self-Assess', icon: Target },
];

export function SecurityHubContent() {
  const [activeTab, setActiveTab] = useState('roadmap');

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Security Hub</span>
            <span className="text-cyber-red">/&gt;</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Your comprehensive cybersecurity resource — career paths, tools, security sites, and advanced techniques.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg border transition-all ${
                  activeTab === tab.id ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'
                }`}>
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div key={activeTab} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          {activeTab === 'roadmap' && <CareerPathSection />}
          {activeTab === 'threats' && <ThreatsSection />}
          {activeTab === 'tools' && <ToolsSection />}
          {activeTab === 'sites' && <SecuritySitesContent />}
          {activeTab === 'redflags' && <RedFlagsSection />}
          {activeTab === 'advanced' && <AdvancedKnowledgeSection />}
          {activeTab === 'stories' && <CaseStudiesSection />}
          {activeTab === 'toolkit' && <ToolsSection />}
          {activeTab === 'wifi' && <WifiSecuritySection />}
          {activeTab === 'concepts' && <HackingConceptsSection />}
          {activeTab === 'tips' && <TipsSection />}
          {activeTab === 'assessment' && <SelfAssessmentSection />}
        </motion.div>
      </div>
    </main>
  );
}
