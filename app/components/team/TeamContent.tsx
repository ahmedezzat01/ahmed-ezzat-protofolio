'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Crown, Users, Star } from 'lucide-react';
import { type TeamMember, committees, getInitials, getLevelLabel } from '@/lib/team-data';

function ProfileModal({ member, onClose }: { member: TeamMember; onClose: () => void }) {
  const initials = getInitials(member.name);
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="bg-card border border-border rounded-2xl shadow-2xl max-w-sm w-full p-6" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold border-2"
              style={{ borderColor: member.color, color: member.color, background: `${member.color}15` }}>{initials}</div>
            <div>
              <h3 className="text-lg font-bold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground">{member.role}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-3 mt-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="w-2 h-2 rounded-full" style={{ background: member.color }} />
            Level: {getLevelLabel(member.level)}
          </div>
          {member.committee && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-cyber-red" />
              Committee: {member.committee}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── Org Tree ──────────────────────────────────────────
interface Person {
  name: string;
  title: string;
  initials: string;
  color: string;
}

interface OrgData {
  ceo: Person;
  vps: Person[];
  heads: Person[];
}

const orgData: OrgData = {
  ceo: {
    name: 'Ahmed Ezzat',
    title: 'President & CEO | System Administrator & Penetration Tester',
    initials: 'AE',
    color: '#d4a017',
  },
  vps: [
    { name: 'Dr. Mariam', title: 'Vice President & Founder', initials: 'DM', color: '#888888' },
    { name: 'Abdelhamid El-Komy', title: 'Vice President', initials: 'AE', color: '#888888' },
    { name: 'Mohamed Hamdy', title: 'Vice President', initials: 'MH', color: '#888888' },
  ],
  heads: [
    { name: 'Youssef El-Gamal', title: 'PR Head', initials: 'YE', color: '#00bcd4' },
    { name: 'Hania El-Taweel', title: 'PR Head', initials: 'HE', color: '#00bcd4' },
    { name: 'Sana Eiada', title: 'Development Head', initials: 'SE', color: '#00bcd4' },
    { name: 'Menna Ibrahim', title: 'HR Head', initials: 'MI', color: '#00bcd4' },
    { name: 'Mostafa Ghozal', title: 'Social Media Head', initials: 'MG', color: '#00bcd4' },
    { name: 'Mazen Abo Omar', title: 'OC Head', initials: 'MA', color: '#00bcd4' },
  ],
};

function PersonCard({ person, compact = false }: { person: Person; compact?: boolean }) {
  return (
    <div className={`flex items-center gap-2 sm:gap-3 bg-[#1a1a1a] border border-[#333333] rounded-xl sm:rounded-[14px] ${compact ? 'px-2.5 py-2 sm:px-4 sm:py-3' : 'px-3 py-2.5 sm:px-[18px] sm:py-3.5'} relative z-2 shrink-0`}>
      <div className={`rounded-full border-2 flex items-center justify-center shrink-0 ${compact ? 'w-8 h-8 sm:w-10 sm:h-10' : 'w-9 h-9 sm:w-11 sm:h-11'}`}
        style={{ borderColor: person.color }}>
        <span style={{ color: person.color }} className={`font-bold ${compact ? 'text-[10px] sm:text-xs' : 'text-[11px] sm:text-xs'}`}>{person.initials}</span>
      </div>
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="text-white font-bold truncate" style={{ fontSize: compact ? '11px' : '12px' }}>{person.name}</span>
        <span className="text-[#aaaaaa] truncate" style={{ fontSize: compact ? '9px' : '10px' }}>{person.title}</span>
      </div>
    </div>
  );
}

function VLine({ height = '50px' }: { height?: string }) {
  return <div style={{ width: '2px', height, background: '#c62828' }} />;
}

function HLine() {
  return <div style={{ height: '2px', width: '100%', background: '#c62828' }} />;
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2" style={{ borderColor: color }} />
      <span className="text-white text-[11px] sm:text-xs">{label}</span>
    </div>
  );
}

function CommitteeCard({ committee, index }: { committee: typeof committees[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}
      className="bg-card border border-border rounded-xl p-4 sm:p-5 hover-glow transition-all duration-300">
      <h4 className="text-sm font-bold text-cyber-red mb-3">{committee.committee}</h4>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Crown className="w-3 h-3 text-cyber-red shrink-0" />
          <span className="text-sm text-foreground font-medium">{committee.head.name}</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">— {committee.head.role}</span>
        </div>
        {committee.vice && (
          <div className="flex items-center gap-2">
            <Star className="w-3 h-3 text-cyber-red shrink-0" />
            <span className="text-sm text-foreground">{committee.vice.name}</span>
            <span className="text-xs text-muted-foreground hidden sm:inline">— {committee.vice.role}</span>
          </div>
        )}
        {committee.members.length > 0 && (
          <div className="mt-2 pl-5 border-l border-border space-y-1">
            {committee.members.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <Users className="w-3 h-3 text-foreground/40 shrink-0" />
                <span className="text-xs text-muted-foreground">{m.name}</span>
              </div>
            ))}
          </div>
        )}
        {committee.crossMembers && committee.crossMembers.length > 0 && (
          <div className="mt-2 pl-5 border-l border-cyber-red/30 space-y-1">
            <p className="text-xs text-cyber-red mb-1">Cross-Committee:</p>
            {committee.crossMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cyber-red/40 shrink-0" />
                <span className="text-xs text-muted-foreground">{m.name} ({m.role})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Mobile Org Tree (vertical stack) ──────────────────
function MobileOrgTree() {
  return (
    <div className="space-y-4">
      {/* CEO */}
      <div className="flex flex-col items-center">
        <PersonCard person={orgData.ceo} />
        <VLine height="30px" />
      </div>

      {/* VPs with their heads */}
      {orgData.vps.map((vp, vpIdx) => {
        const vpHeads = orgData.heads.slice(
          vpIdx === 0 ? 0 : vpIdx === 1 ? 1 : 4,
          vpIdx === 0 ? 1 : vpIdx === 1 ? 4 : 6
        );
        return (
          <div key={vpIdx} className="flex flex-col items-center">
            <PersonCard person={vp} />
            <VLine height="20px" />
            <div className="grid grid-cols-2 gap-2 w-full">
              {vpHeads.map((head, i) => (
                <PersonCard key={i} person={head} compact />
              ))}
            </div>
            {vpIdx < orgData.vps.length - 1 && <VLine height="20px" />}
          </div>
        );
      })}

      {/* Legend */}
      <div className="flex justify-center gap-4 sm:gap-6 pt-4 mt-4 border-t border-[#333333]">
        <LegendItem color="#d4a017" label="CEO" />
        <LegendItem color="#888888" label="VP" />
        <LegendItem color="#00bcd4" label="Head" />
      </div>
    </div>
  );
}

// ─── Desktop Org Tree (horizontal) ─────────────────────
function DesktopOrgTree() {
  return (
    <div className="flex flex-col items-center">
      {/* CEO */}
      <div className="flex flex-col items-center">
        <PersonCard person={orgData.ceo} />
        <VLine height="40px" />
      </div>

      {/* CEO → VPs horizontal */}
      <div className="w-full max-w-[900px] relative">
        <HLine />
        {[16.66, 50, 83.33].map((pos, i) => (
          <div key={i} className="absolute top-0" style={{ left: `${pos}%` }}>
            <VLine height="30px" />
          </div>
        ))}
      </div>

      {/* VPs */}
      <div className="flex justify-center gap-10 lg:gap-16 mt-7 w-full max-w-[1100px]">
        {orgData.vps.map((vp, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <PersonCard person={vp} />
          </div>
        ))}
      </div>

      {/* VP → Heads vertical lines */}
      <div className="flex justify-center gap-10 lg:gap-16 w-full max-w-[1100px]">
        {orgData.vps.map((vp, idx) => (
          <div key={idx} className="flex flex-col items-center w-[180px] lg:w-[220px]">
            <VLine height="40px" />
          </div>
        ))}
      </div>

      {/* Shared horizontal line connecting all heads */}
      <div className="w-full max-w-[900px] relative">
        <HLine />
        {orgData.heads.map((_, idx) => {
          const totalHeads = orgData.heads.length;
          const percentage = ((idx + 1) / (totalHeads + 1)) * 100;
          return (
            <div key={idx} className="absolute top-0" style={{ left: `${percentage}%` }}>
              <VLine height="30px" />
            </div>
          );
        })}
      </div>

      {/* Heads */}
      <div className="flex justify-center gap-3 lg:gap-5 mt-7 flex-wrap max-w-[1200px]">
        {orgData.heads.map((head, idx) => (
          <PersonCard key={idx} person={head} compact />
        ))}
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 lg:gap-10 mt-12 pt-5 border-t border-[#333333] w-full max-w-[800px]">
        <LegendItem color="#d4a017" label="CEO" />
        <LegendItem color="#888888" label="VP" />
        <LegendItem color="#00bcd4" label="Head" />
      </div>
    </div>
  );
}

// ─── Main ──────────────────────────────────────────────
export function TeamContent() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    const t = setTimeout(() => setRevealed(true), 300);
    return () => { clearTimeout(t); window.removeEventListener('resize', check); };
  }, []);

  return (
    <main className="relative min-h-screen bg-background pt-20 sm:pt-24 pb-16 sm:pb-20">
      <div className="max-w-6xl mx-auto px-3 sm:px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">TST Organization</span>
            <span className="text-cyber-red">/&gt;</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base">The Technology Society Team</p>
        </motion.div>

        {revealed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="mb-12 sm:mb-16 bg-card border border-border rounded-2xl p-4 sm:p-6 lg:p-8 overflow-x-auto">
            <h2 className="text-lg sm:text-xl font-bold text-foreground mb-6 sm:mb-8 text-center">Organization Tree</h2>

            <div className="bg-[#0a0a0a] rounded-xl p-4 sm:p-6 lg:p-10 min-h-[300px] sm:min-h-[400px]">
              {isMobile ? <MobileOrgTree /> : <DesktopOrgTree />}
            </div>
          </motion.div>
        )}

        {/* Committee Breakdown */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-4 sm:mb-6 text-center">Committee Breakdown</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {committees.map((c, i) => (
              <CommitteeCard key={c.committee} committee={c} index={i} />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedMember && <ProfileModal member={selectedMember} onClose={() => setSelectedMember(null)} />}
      </AnimatePresence>
    </main>
  );
}
