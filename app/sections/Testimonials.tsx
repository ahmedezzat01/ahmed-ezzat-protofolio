'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Card, CardContent } from '@/components/ui/card';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    id: 1,
    name: 'John Smith',
    role: 'CTO, TechCorp',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    description: 'Exceptional penetration testing skills. Identified critical vulnerabilities that our internal team missed. Highly recommended for any security assessment.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Security Director, FinanceInc',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
    description: 'Professional, thorough, and delivered actionable insights. The security audit helped us achieve compliance and protect our customer data.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'CEO, StartupXYZ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    description: 'Outstanding incident response expertise. Helped us contain and remediate a security breach quickly. Their expertise saved us from significant damage.',
    rating: 5,
  },
  {
    id: 4,
    name: 'Emily Davis',
    role: 'IT Manager, GlobalCo',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    description: 'Comprehensive security training for our team. Made complex concepts easy to understand and provided practical hands-on exercises.',
    rating: 5,
  },
];

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate testimonial cards
      gsap.fromTo('.testimonial-card',
        { opacity: 0, y: 60, rotateY: -15 },
        {
          opacity: 1, y: 0, rotateY: 0,
          duration: 0.8, stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient">Testimonials</span>
            <span className="text-cyber-red">/&gt;</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            What clients and colleagues say about my work
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6" style={{ perspective: '1000px' }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="testimonial-card" style={{ transformStyle: 'preserve-3d' }}>
              <Card className="bg-card border-border h-full hover-glow transition-all duration-500 hover:rotate-y-5 hover:rotate-x-5 hover:scale-105 cursor-pointer">
                <CardContent className="p-6">
                  <Quote className="w-8 h-8 text-cyber-red/30 mb-4" />
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                    {testimonial.description}
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-cyber-red text-cyber-red" />
                    ))}
                  </div>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-cyber-red/30"
                    />
                    <div>
                      <h4 className="text-foreground font-semibold text-sm">{testimonial.name}</h4>
                      <p className="text-muted-foreground text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
