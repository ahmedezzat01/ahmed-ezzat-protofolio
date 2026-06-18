export interface SecurityQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface BreachResult {
  breached: boolean;
  count: number;
  breaches?: { Name: string; Title: string; Date: string; PwnCount: number }[];
  error?: string;
}

export interface PasswordStrength {
  score: number;
  feedback: string[];
  crackTime: string;
  label: string;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "critical";
  timestamp: Date;
  read: boolean;
  url?: string;
  source?: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  date: string;
  image: string;
  category: string;
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  github?: string;
  demo?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  dates: string;
  responsibilities: string[];
}

export interface Testimonial {
  id: number | string;
  name: string;
  avatar: string;
  description: string;
}

export interface Skill {
  name: string;
  level: number;
  category: string;
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon?: string;
}
