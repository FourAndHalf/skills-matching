import { useMemo, useState, type CSSProperties } from 'react';
import { ArrowUpRight, Bell, BriefcaseBusiness, Check, ChevronRight, CircleHelp, FileText, LayoutDashboard, Menu, RefreshCw, Search, Settings, Sparkles, UserRound, X } from 'lucide-react';

type MatchStatus = 'Strong match' | 'Potential match' | 'Mandatory gap';
type Match = { title: string; company: string; location: string; tags: string[]; status: MatchStatus; score: number; summary: string; evidence: string[]; gap?: string };

const matches: Match[] = [
  { title: 'Operations Coordinator', company: 'Northstar Logistics', location: 'Manchester · Hybrid', tags: ['Operations', 'Team leadership', 'Risk management'], status: 'Strong match', score: 92, summary: 'Your experience coordinating complex operations maps closely to this role.', evidence: ['Led 12-person logistics team across 4 sites', 'Managed high-tempo operational planning', 'Built risk briefings for senior stakeholders'] },
  { title: 'Programme Delivery Manager', company: 'Civic Bridge', location: 'London · Flexible', tags: ['Programme delivery', 'Stakeholder management'], status: 'Potential match', score: 78, summary: 'Your planning and stakeholder experience is a strong foundation. One negotiable requirement needs attention.', evidence: ['Delivered multi-phase programmes under pressure', 'Briefed internal and external partners'], gap: 'Experience with public-sector procurement is preferred, but learnable.' },
  { title: 'Security & Resilience Lead', company: 'Haven Systems', location: 'Bristol · On-site', tags: ['Security', 'Incident response', 'Leadership'], status: 'Mandatory gap', score: 64, summary: 'Your leadership background is relevant, but a mandatory certification is currently missing.', evidence: ['Led incident response and continuity planning', 'Owned team readiness and training'], gap: 'ISO 22301 certification is required for this role.' },
];

const navItems = [{ label: 'Overview', icon: LayoutDashboard }, { label: 'My profile', icon: UserRound }, { label: 'Explore roles', icon: BriefcaseBusiness }, { label: 'Documents', icon: FileText }];

function App() {
  const [active, setActive] = useState('Overview');
  const [filter, setFilter] = useState<'All' | MatchStatus>('All');
  const [selected, setSelected] = useState<Match | null>(null);
  const [confirmed, setConfirmed] = useState<string[]>(['Operations', 'Team leadership', 'Risk management']);
  const [refreshed, setRefreshed] = useState(false);
  const visibleMatches = useMemo(() => filter === 'All' ? matches : matches.filter((match) => match.status === filter), [filter]);

  function toggleSkill(skill: string) { setConfirmed((current) => current.includes(skill) ? current.filter((item) => item !== skill) : [...current, skill]); }

  return <div className="app-shell">
    <aside className="sidebar">
      <div className="brand"><span className="brand-mark"><Sparkles size={16} fill="currentColor" /></span><span>horizon</span></div>
      <div className="profile-mini"><div className="avatar">JD</div><div><strong>Jordan Davis</strong><span>Candidate profile</span></div><ChevronRight size={16} /></div>
      <nav aria-label="Main navigation">{navItems.map(({ label, icon: Icon }) => <button className={active === label ? 'nav-item active' : 'nav-item'} onClick={() => setActive(label)} key={label}><Icon size={18} /><span>{label}</span>{label === 'Explore roles' && <span className="nav-count">3</span>}</button>)}</nav>
      <div className="sidebar-bottom"><button className="nav-item"><Settings size={18} /><span>Settings</span></button><button className="nav-item"><CircleHelp size={18} /><span>Help centre</span></button><div className="privacy-note"><span className="status-dot" />Your data is private</div></div>
    </aside>
    <main className="main-content">
      <header className="topbar"><button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button><div className="breadcrumbs"><span>Workspace</span><ChevronRight size={14} /><strong>{active}</strong></div><div className="top-actions"><button className="icon-button" aria-label="Search"><Search size={19} /></button><button className="icon-button" aria-label="Notifications"><Bell size={19} /><i /></button><div className="avatar small">JD</div></div></header>
      <div className="content-wrap">
        <section className="hero"><div><span className="eyebrow">Tuesday, 6 October 2026</span><h1>Make your next move<br /><em>with confidence.</em></h1><p>We found <strong>3 roles</strong> that connect with your experience. Take a look, then tell us what feels right.</p></div><div className="hero-art" aria-hidden="true"><span className="orb orb-one" /><span className="orb orb-two" /><span className="art-card"><Sparkles size={16} /><span>fresh<br />possibilities</span></span></div></section>
        <section className="notice"><div className="notice-icon"><Sparkles size={19} /></div><div><strong>Your profile is ready for review</strong><p>We translated your experience into skills. Confirm what feels accurate so your recommendations keep getting better.</p></div><button className="text-button" onClick={() => document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' })}>Review profile <ArrowUpRight size={16} /></button></section>
        <div className="section-heading"><div><span className="eyebrow">Your opportunities</span><h2>Roles worth exploring</h2></div><button className="secondary-button" onClick={() => { setRefreshed(true); setTimeout(() => setRefreshed(false), 1400); }}><RefreshCw size={16} className={refreshed ? 'spin' : ''} />{refreshed ? 'Updated' : 'Refresh matches'}</button></div>
        <div className="filter-row" role="tablist" aria-label="Filter opportunities">{(['All', 'Strong match', 'Potential match', 'Mandatory gap'] as const).map((item) => <button className={filter === item ? 'filter active' : 'filter'} onClick={() => setFilter(item)} key={item}>{item}{item !== 'All' && <span>{matches.filter((match) => match.status === item).length}</span>}</button>)}</div>
        <section className="match-grid">{visibleMatches.map((match) => <article className="match-card" key={match.title} onClick={() => setSelected(match)}><div className="match-card-top"><div className="company-logo">{match.company.slice(0, 1)}</div><span className={`status ${match.status.toLowerCase().replace(' ', '-')}`}>{match.status}</span></div><h3>{match.title}</h3><p className="company">{match.company} <span>·</span> {match.location}</p><div className="score-row"><div className="score-ring" style={{ '--score': `${match.score * 3.6}deg` } as CSSProperties}><strong>{match.score}</strong><span>match</span></div><p>{match.summary}</p></div><div className="tag-row">{match.tags.map((tag) => <span className="skill-tag" key={tag}>{tag}</span>)}</div><button className="card-link">See why it matches <ArrowUpRight size={15} /></button></article>)}</section>
        <section className="profile-panel" id="profile"><div className="section-heading compact"><div><span className="eyebrow">Built from your experience</span><h2>Does this look like you?</h2></div><span className="review-state"><Check size={15} /> Last reviewed today</span></div><p className="panel-intro">These are the skills we understood from your experience. Confirm or remove them — there are no wrong answers.</p><div className="skill-review">{['Operations', 'Team leadership', 'Risk management', 'Strategic planning', 'Public speaking', 'Procurement'].map((skill) => <button className={confirmed.includes(skill) ? 'review-chip selected' : 'review-chip'} onClick={() => toggleSkill(skill)} key={skill}>{confirmed.includes(skill) ? <Check size={14} /> : <X size={14} />}{skill}</button>)}</div><div className="panel-footer"><span><span className="status-dot" />Your changes update future matches</span><button className="primary-button" onClick={() => setRefreshed(true)}>Save profile <ArrowUpRight size={16} /></button></div></section>
      </div>
    </main>
    {selected && <div className="modal-backdrop" onClick={() => setSelected(null)}><div className="evidence-modal" role="dialog" aria-modal="true" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setSelected(null)} aria-label="Close"><X size={18} /></button><span className="eyebrow">Evidence trail</span><h2>{selected.title}</h2><p className="company">{selected.company} <span>·</span> {selected.location}</p><div className="modal-status"><span className={`status ${selected.status.toLowerCase().replace(' ', '-')}`}>{selected.status}</span><strong>{selected.score}% match</strong></div><p>{selected.summary}</p><h4>What we connected</h4><ul>{selected.evidence.map((item) => <li key={item}><Check size={16} />{item}</li>)}</ul>{selected.gap && <div className="gap-box"><strong>Worth knowing</strong><p>{selected.gap}</p></div>}<button className="primary-button wide" onClick={() => setSelected(null)}>Got it</button></div></div>}
  </div>;
}

export default App;
