'use client';
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink, Globe, SortAsc } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { securitySites, categories, tagFilters, type SecuritySite } from '@/lib/security-sites-data';

function SiteCard({ site, index }: { site: SecuritySite; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.02, duration: 0.3 }}
    >
      <Card className="bg-card border-border h-full hover-glow transition-all duration-300 hover:border-border/80 group">
        <CardContent className="p-5">
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center text-sm font-bold border border-border shrink-0"
              style={{ background: `${site.color}15`, color: site.color, borderColor: `${site.color}30` }}>
              {site.initials}
            </div>
            <div className="flex-1 min-w-0">
              <a href={site.url} target="_blank" rel="noopener noreferrer"
                className="text-sm font-bold text-foreground group-hover:text-cyber-red transition-colors flex items-center gap-1">
                {site.name}
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground/80 mb-3 line-clamp-2">{site.fullDescription}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-xs rounded-full border border-border text-muted-foreground">{site.category}</span>
              <span className={`px-2 py-0.5 text-xs rounded-full ${
                site.tag === 'Free' ? 'bg-cyber-red/10 text-cyber-red border border-cyber-red/30' :
                site.tag === 'Paid' ? 'bg-cyber-red/10 text-cyber-red border border-cyber-red/30' :
                'bg-cyber-red/10 text-cyber-red border border-cyber-red/30'
              }`}>{site.tag}</span>
            </div>
            <Globe className="w-3 h-3 text-muted-foreground/50" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function SecuritySitesContent() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState<'name' | 'category'>('name');

  const filteredSites = useMemo(() => {
    let result = securitySites;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q) || s.category.toLowerCase().includes(q));
    }
    if (selectedCategory !== 'All') result = result.filter((s) => s.category === selectedCategory);
    if (selectedTag !== 'All') result = result.filter((s) => s.tag === selectedTag);
    result = [...result].sort((a, b) => sortBy === 'name' ? a.name.localeCompare(b.name) : a.category.localeCompare(b.category));
    return result;
  }, [search, selectedCategory, selectedTag, sortBy]);

  const stats = useMemo(() => {
    const total = securitySites.length;
    const free = securitySites.filter(s => s.tag === 'Free').length;
    const freemium = securitySites.filter(s => s.tag === 'Freemium' || s.tag === 'Free/Pro').length;
    const paid = securitySites.filter(s => s.tag === 'Paid').length;
    return { total, free, freemium, paid };
  }, []);

  return (
    <main className="relative min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-mono">
            <span className="text-cyber-red">&lt;</span>
            <span className="text-gradient-blue-red">Security Websites</span>
            <span className="text-cyber-red">/&gt;</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Curated directory of {securitySites.length} cybersecurity resources — search, filter, and discover.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            { label: 'Total Sites', value: stats.total, color: 'cyber-red' },
            { label: 'Free', value: stats.free, color: 'cyber-red' },
            { label: 'Freemium', value: stats.freemium, color: 'cyber-red' },
            { label: 'Paid', value: stats.paid, color: 'cyber-red' },
          ].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className={`bg-card border border-border rounded-xl p-4 text-center hover-glow transition-all`}>
                <div className={`text-2xl font-bold text-${stat.color}`}>{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Search websites..."
              className="w-full pl-10 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm text-foreground focus:outline-none focus:border-cyber-red/50 transition-colors" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <button key={c} onClick={() => setSelectedCategory(c)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  selectedCategory === c ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'
                }`}>{c}</button>
            ))}
          </div>

          <div className="flex flex-wrap gap-2 justify-center items-center">
            {tagFilters.map((t) => (
              <button key={t} onClick={() => setSelectedTag(t)}
                className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  selectedTag === t ? 'border-cyber-red bg-cyber-red/10 text-cyber-red' : 'border-border text-muted-foreground hover:border-border/80'
                }`}>{t}</button>
            ))}
            <div className="flex items-center gap-1.5">
              <SortAsc className="w-3 h-3 text-muted-foreground" />
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value as 'name' | 'category')}
                className="px-3 py-1.5 text-xs rounded-lg border border-border bg-background text-muted-foreground focus:outline-none">
                <option value="name">Sort: Name</option>
                <option value="category">Sort: Category</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs text-muted-foreground">{filteredSites.length} site{filteredSites.length !== 1 ? 's' : ''} found</span>
          {(search || selectedCategory !== 'All' || selectedTag !== 'All') && (
            <button onClick={() => { setSearch(''); setSelectedCategory('All'); setSelectedTag('All'); }}
              className="text-xs text-cyber-red hover:underline">Clear filters</button>
          )}
        </div>
        {filteredSites.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="w-8 h-8 mx-auto mb-3 text-muted-foreground/50" />
            No results found. Try adjusting your search or filters.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSites.map((site, i) => (
              <SiteCard key={site.name} site={site} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
