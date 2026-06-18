export interface TeamMember {
  id: string;
  name: string;
  role: string;
  level: number;
  color: string;
  committee?: string;
  children?: TeamMember[];
  imageUrl?: string;
}

export const teamData: TeamMember = {
  id: 'ceo',
  name: 'Ahmed Ezzat',
  role: 'President & CEO | System Administrator & Penetration Tester',
  level: 0,
  color: '#ffd700',
  imageUrl: '/assets/images/ahmed-ezzat-ceo.jpg',
  children: [
    {
      id: 'vp-founder',
      name: 'Dr. Mariam',
      role: 'Vice President & Founder',
      level: 1,
      color: '#c0c0c0',
      children: [
        {
          id: 'pr-head-mariam',
          name: 'Youssef El-Gamal',
          role: 'PR Head',
          level: 2,
          color: '#00d4ff',
          committee: 'PR',
          children: [],
        },
      ],
    },
    {
      id: 'vp-abdelhamid',
      name: 'Abdelhamid El-Komy',
      role: 'Vice President',
      level: 1,
      color: '#c0c0c0',
      children: [
        {
          id: 'pr-head-abdelhamid',
          name: 'Hania El-Taweel',
          role: 'PR Head',
          level: 2,
          color: '#00d4ff',
          committee: 'PR',
          children: [],
        },
        {
          id: 'dev-head',
          name: 'Sana Eiada',
          role: 'Development Head',
          level: 2,
          color: '#00d4ff',
          committee: 'Development',
          children: [],
        },
        {
          id: 'hr-head',
          name: 'Menna Ibrahim',
          role: 'HR Head',
          level: 2,
          color: '#00d4ff',
          committee: 'HR',
          children: [],
        },
      ],
    },
    {
      id: 'vp-mohamed',
      name: 'Mohamed Hamdy',
      role: 'Vice President',
      level: 1,
      color: '#c0c0c0',
      children: [
        {
          id: 'sm-head',
          name: 'Mostafa Ghozal',
          role: 'Social Media Head',
          level: 2,
          color: '#00d4ff',
          committee: 'Social Media',
          children: [],
        },
        {
          id: 'oc-head',
          name: 'Mazen Abo Omar',
          role: 'OC Head',
          level: 2,
          color: '#00d4ff',
          committee: 'OC',
          children: [],
        },
      ],
    },
  ],
};

export interface CommitteeHead {
  committee: string;
  head: { name: string; role: string };
  vice: { name: string; role: string } | null;
  members: { name: string; role: string }[];
  crossMembers?: { name: string; role: string }[];
}

export const committees: CommitteeHead[] = [
  {
    committee: 'FR',
    head: { name: 'Youssef El-Gamal', role: 'FR Head' },
    vice: null,
    members: [],
    crossMembers: [
      { name: 'Maaz Ibrahim', role: 'Shared FR/PR' },
      { name: 'Mohamed El-Makawi', role: 'Shared FR/PR' },
    ],
  },
  {
    committee: 'PR',
    head: { name: 'Hania El-Taweel', role: 'PR Head' },
    vice: { name: 'Safa El-Mallah', role: 'PR Vice Head' },
    members: [],
    crossMembers: [
      { name: 'Maaz Ibrahim', role: 'Shared FR/PR' },
      { name: 'Mohamed El-Makawi', role: 'Shared FR/PR' },
    ],
  },
  {
    committee: 'Development',
    head: { name: 'Sana Eiada', role: 'Development Head' },
    vice: { name: 'Mirna Rafaat', role: 'Development Vice Head' },
    members: [
      { name: 'Noran Mohamed', role: 'Developer' },
      { name: 'Noran Ghazy', role: 'Developer' },
      { name: 'Jana Samir', role: 'Developer' },
      { name: 'Aya Mohamed', role: 'Developer' },
      { name: 'Engy Ayad', role: 'Developer' },
    ],
  },
  {
    committee: 'OC',
    head: { name: 'Mazen Abo Omar', role: 'OC Head' },
    vice: { name: 'Shahd Ehab', role: 'OC Vice Head' },
    members: [
      { name: 'Ahmed Fakhr', role: 'OC Member' },
      { name: 'Mohamed Yasser', role: 'OC Member' },
      { name: 'Mahmoud Elbrembaly', role: 'OC Member' },
      { name: 'Mohamed El-Dabousy', role: 'OC Member' },
      { name: 'Ahmed Abo Omar', role: 'OC Member' },
    ],
  },
  {
    committee: 'HR',
    head: { name: 'Menna Ibrahim', role: 'HR Head' },
    vice: null,
    members: [
      { name: 'Alaa Walid', role: 'HR Member' },
      { name: 'Haneen Dawoud', role: 'HR Member' },
      { name: 'Walaa Anis', role: 'HR Member' },
    ],
  },
  {
    committee: 'Social Media',
    head: { name: 'Mostafa Ghozal', role: 'Social Media Head' },
    vice: { name: 'Hazem Ekramy', role: 'Social Media Vice Head' },
    members: [
      { name: 'Nada Atef', role: 'Social Media Member' },
    ],
    crossMembers: [
      { name: 'Youssef El-Gamal', role: 'FR Head' },
      { name: 'Hania El-Taweel', role: 'PR Head' },
      { name: 'Mazen Abo Omar', role: 'OC Head' },
    ],
  },
];

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getLevelColor(level: number): string {
  switch (level) {
    case 0: return '#ffd700';
    case 1: return '#c0c0c0';
    case 2: return '#00d4ff';
    case 3: return '#00ff41';
    default: return '#ffffff';
  }
}

export function getLevelLabel(level: number): string {
  switch (level) {
    case 0: return 'CEO';
    case 1: return 'Founder & VPs';
    case 2: return 'Committee Heads';
    case 3: return 'Vice Heads';
    case 4: return 'Members';
    default: return '';
  }
}
