'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

gsap.registerPlugin(ScrollTrigger);

const articles = [
  {
    id: 1,
    title: 'Understanding SQL Injection Attacks',
    description: 'A comprehensive guide to SQL injection vulnerabilities, prevention techniques, and best practices for secure database design.',
    category: 'Web Security',
    readTime: '8 min read',
    date: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80',
    tags: ['SQL Injection', 'Web Security', 'OWASP'],
  },
  {
    id: 2,
    title: 'Zero Trust Architecture Implementation',
    description: 'Step-by-step guide to implementing zero trust security model in modern enterprise environments.',
    category: 'Architecture',
    readTime: '12 min read',
    date: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80',
    tags: ['Zero Trust', 'Enterprise', 'Network Security'],
  },
  {
    id: 3,
    title: 'Malware Analysis Fundamentals',
    description: 'Learn the basics of static and dynamic malware analysis, sandboxing, and reverse engineering techniques.',
    category: 'Malware Analysis',
    readTime: '15 min read',
    date: '2024-01-05',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&q=80',
    tags: ['Malware', 'Reverse Engineering', 'Analysis'],
  },
  {
    id: 4,
    title: 'Cloud Security Best Practices 2024',
    description: 'Essential security configurations for AWS, Azure, and GCP to protect your cloud infrastructure.',
    category: 'Cloud Security',
    readTime: '10 min read',
    date: '2024-01-01',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&q=80',
    tags: ['AWS', 'Azure', 'GCP', 'Cloud'],
  },
];

export function Articles() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate article cards with stagger
      gsap.fromTo('.article-card',
        { opacity: 0, y: 80, rotateX: 10 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8, stagger: 0.15,
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

  return (
    <section ref={sectionRef} id="articles" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Articles</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technical write-ups and security research
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6" style={{ perspective: '1000px' }}>
          {articles.map((article) => (
            <div key={article.id} className="article-card" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="bg-card border-border overflow-hidden hover-glow transition-all duration-500 hover:rotate-y-2 hover:rotate-x-2 hover:scale-[1.02] cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-1 text-xs bg-cyber-red/20 text-cyber-red rounded border border-cyber-red/30">
                      {article.category}
                    </span>
                  </div>
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="text-foreground text-lg group-hover:text-cyber-red transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {article.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </div>
                    <span className="text-xs text-muted-foreground">{article.date}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {article.tags.map((tag, i) => (
                      <span key={i} className="px-2 py-0.5 text-xs bg-muted text-muted-foreground rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <LiquidButton variant="outline" size="sm" className="w-full">
                    <BookOpen className="w-4 h-4 mr-2" />
                    Read Article
                  </LiquidButton>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
