import React, { useState, useEffect, useRef } from 'react';
import {
    GraduationCap,
    BookOpen,
    Award,
    ChevronRight,
    ExternalLink,
    Github,
    Linkedin,
    Mail,
    FileText,
    Star
} from 'lucide-react';

// --- DATEN ---

const PAPERS = [
    {
        id: 1,
        title: "Neuro-Symbolic AI: Brückenschlag zwischen Logik und Deep Learning",
        venue: "NeurIPS 2025",
        year: 2025,
        category: "AI",
        tags: ["Deep Learning", "Logic"],
        featured: true,
        link: "#",
        abstract: "Diese Arbeit untersucht die Integration von symbolischem Vorwissen in neuronale Netze, um die Erklärbarkeit und Dateneffizienz in komplexen Entscheidungsprozessen zu drastisch zu verbessern."
    },
    {
        id: 2,
        title: "Predictive Modeling für urbane Mobilitätssysteme",
        venue: "KDD 2024",
        year: 2024,
        category: "Data Science",
        tags: ["Smart Cities", "Prediction"],
        featured: false,
        link: "#",
        abstract: "Eine umfassende Analyse von Verkehrsströmen unter Verwendung von Graph Neural Networks zur Vorhersage von Engpässen in Echtzeit."
    },
    {
        id: 3,
        title: "Mensch-Maschine-Interaktion in der robotischen Chirurgie",
        venue: "CHI 2023",
        year: 2023,
        category: "HCI",
        tags: ["Robotics", "UX/UI"],
        featured: true,
        link: "#",
        abstract: "Studie zur kognitiven Belastung von Chirurgen bei der Nutzung semi-autonomer Assistenzsysteme, basierend auf Eye-Tracking-Daten."
    },
    {
        id: 4,
        title: "Bias-Reduktion in Large Language Models",
        venue: "ACL 2023",
        year: 2023,
        category: "AI",
        tags: ["NLP", "Ethics"],
        featured: false,
        link: "#",
        abstract: "Ein neuartiger Ansatz zur Quantifizierung und Mitigation von geschlechtsspezifischem Bias in vortrainierten Sprachmodellen."
    }
];

const ACHIEVEMENTS = [
    {
        year: "2025",
        title: "Best Student Paper Award",
        organization: "NeurIPS Konferenz",
        description: "Ausgezeichnet für herausragende Forschung im Bereich erklärbarer Künstlicher Intelligenz (XAI)."
    },
    {
        year: "2024",
        title: "Stipendiatin der Studienstiftung",
        organization: "Studienstiftung des deutschen Volkes",
        description: "Aufnahme in die Förderung aufgrund exzellenter akademischer Leistungen und gesellschaftlichem Engagement."
    },
    {
        year: "2023",
        title: "1. Platz - Global Data Hackathon",
        organization: "Tech for Good Org",
        description: "Entwicklung eines ML-Modells zur Vorhersage von Waldbränden innerhalb von 48 Stunden."
    },
    {
        year: "2022",
        title: "Forschungsstipendium: MIT Media Lab",
        organization: "DAAD",
        description: "Mehrmonatiger Forschungsaufenthalt in Boston zur Untersuchung multimodaler Interaktionskonzepte."
    }
];

const CATEGORIES = ["Alle", "AI", "Data Science", "HCI"];

// --- HILFSKOMPONENTEN ---

// Komponente für Scroll-Animationen (Fade In)
const FadeIn = ({ children, delay = 0, className = "" }) => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(ref.current);
                }
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        );

        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-1000 ease-out ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
                } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

// Sektions-Überschrift
const SectionTitle = ({ title, icon: Icon, subtitle }) => (
    <div className="mb-12">
        <div className="flex items-center gap-3 mb-3">
            <div className="p-3 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 text-cyan-400 border border-cyan-500/30">
                <Icon size={24} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400">
                {title}
            </h2>
        </div>
        {subtitle && <p className="text-slate-400 max-w-2xl text-lg">{subtitle}</p>}
    </div>
);

// --- HAUPTKOMPONENTE ---

export default function App() {
    const [activeFilter, setActiveFilter] = useState("Alle");

    const filteredPapers = PAPERS.filter(paper =>
        activeFilter === "Alle" ? true : paper.category === activeFilter
    );

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100 overflow-x-hidden relative">

            {/* Hintergrund Blur-Effekte (Glassmorphism Vibe) */}
            <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/20 blur-[120px] pointer-events-none" />
            <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-900/20 blur-[120px] pointer-events-none" />
            <div className="fixed top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-blue-900/10 blur-[100px] pointer-events-none" />

            {/* Navigation */}
            <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[#0a0f1c]/70 border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-xl font-bold tracking-tighter text-white">
                        Ariana<span className="text-cyan-400">.</span>
                    </span>
                    <div className="hidden md:flex gap-8 text-sm font-medium text-slate-400">
                        <a href="#about" className="hover:text-cyan-400 transition-colors">Über mich</a>
                        <a href="#papers" className="hover:text-cyan-400 transition-colors">Publikationen</a>
                        <a href="#achievements" className="hover:text-cyan-400 transition-colors">Erfolge</a>
                    </div>
                    <a href="#contact" className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white transition-all text-sm font-medium flex items-center gap-2">
                        <Mail size={16} /> Kontakt
                    </a>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 pt-32 pb-24 space-y-32 relative z-10">

                {/* HERO SECTION */}
                <section id="about" className="min-h-[70vh] flex flex-col justify-center">
                    <FadeIn>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                            </span>
                            M.Sc. Studentin & Forscherin
                        </div>
                    </FadeIn>

                    <FadeIn delay={100}>
                        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
                            Künstliche Intelligenz <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
                                menschlich gestalten.
                            </span>
                        </h1>
                    </FadeIn>

                    <FadeIn delay={200}>
                        <p className="text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
                            Hallo, ich bin Ariana. Ich forsche an der Schnittstelle von Machine Learning und Human-Computer Interaction.
                            Mein Ziel ist es, komplexe KI-Systeme erklärbar, fair und für alle zugänglich zu machen.
                        </p>
                    </FadeIn>

                    <FadeIn delay={300}>
                        <div className="flex flex-wrap gap-4">
                            <a href="#papers" className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold transition-all flex items-center gap-2 group">
                                Zu den Papers <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2">
                                <Github size={18} /> GitHub
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-all flex items-center gap-2">
                                <Linkedin size={18} /> LinkedIn
                            </a>
                        </div>
                    </FadeIn>
                </section>

                {/* PAPERS SECTION */}
                <section id="papers" className="scroll-mt-24">
                    <FadeIn>
                        <SectionTitle
                            title="Ausgewählte Publikationen"
                            icon={BookOpen}
                            subtitle="Eine Übersicht meiner akademischen Arbeiten, Konferenzbeiträge und Preprints."
                        />
                    </FadeIn>

                    <FadeIn delay={200}>
                        {/* Filter */}
                        <div className="flex flex-wrap gap-3 mb-10">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveFilter(cat)}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${activeFilter === cat
                                            ? "bg-purple-500/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.2)]"
                                            : "bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Papers Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {filteredPapers.map((paper, idx) => (
                                <div
                                    key={paper.id}
                                    className="group relative bg-[#131b2f]/50 backdrop-blur-sm border border-white/5 hover:border-cyan-500/30 rounded-2xl p-8 transition-all duration-300 hover:shadow-[0_8px_30px_rgba(34,211,238,0.05)] hover:-translate-y-1"
                                >
                                    {paper.featured && (
                                        <div className="absolute top-0 right-8 -translate-y-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                                            <Star size={12} fill="currentColor" /> Spotlight
                                        </div>
                                    )}

                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-cyan-400 font-mono text-sm font-semibold">{paper.venue} • {paper.year}</span>
                                        <a href={paper.link} className="text-slate-500 hover:text-cyan-400 transition-colors p-2 -mr-2 -mt-2">
                                            <ExternalLink size={20} />
                                        </a>
                                    </div>

                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors leading-snug">
                                        {paper.title}
                                    </h3>

                                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                                        {paper.abstract}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mt-auto">
                                        {paper.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-medium text-slate-300">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </section>

                {/* ACHIEVEMENTS SECTION */}
                <section id="achievements" className="scroll-mt-24">
                    <FadeIn>
                        <SectionTitle
                            title="Erfolge & Meilensteine"
                            icon={Award}
                            subtitle="Stipendien, Auszeichnungen und wichtige Stationen meiner akademischen Reise."
                        />
                    </FadeIn>

                    <div className="relative mt-12 pl-4 md:pl-0">
                        {/* Vertikale Linie Desktop */}
                        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent -translate-x-1/2"></div>
                        {/* Vertikale Linie Mobile */}
                        <div className="block md:hidden absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500/50 via-purple-500/30 to-transparent"></div>

                        <div className="space-y-12">
                            {ACHIEVEMENTS.map((item, idx) => (
                                <FadeIn key={idx} delay={idx * 150}>
                                    <div className={`relative flex flex-col md:flex-row items-center ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                                        {/* Zentrierter Punkt Desktop */}
                                        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0a0f1c] border-2 border-cyan-500 items-center justify-center z-10 shadow-[0_0_10px_rgba(34,211,238,0.5)]">
                                            <GraduationCap size={18} className="text-cyan-400" />
                                        </div>

                                        {/* Punkt Mobile */}
                                        <div className="md:hidden absolute left-[-11px] top-1 w-6 h-6 rounded-full bg-[#0a0f1c] border-2 border-cyan-500 flex items-center justify-center z-10">
                                            <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                                        </div>

                                        {/* Content Box */}
                                        <div className={`w-full md:w-1/2 pl-8 md:pl-0 md:px-12 ${idx % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                                            <div className="bg-[#131b2f]/40 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:bg-white/5 transition-colors">
                                                <span className="text-cyan-400 font-mono font-bold text-sm bg-cyan-500/10 px-3 py-1 rounded-full inline-block mb-3">
                                                    {item.year}
                                                </span>
                                                <h4 className="text-xl font-bold text-white mb-1">{item.title}</h4>
                                                <p className="text-sm font-medium text-purple-300 mb-3">{item.organization}</p>
                                                <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                </FadeIn>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CONTACT CTA */}
                <section id="contact" className="py-12">
                    <FadeIn>
                        <div className="relative rounded-3xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-900/40 to-purple-900/40" />
                            <div className="absolute inset-0 backdrop-blur-xl" />
                            <div className="relative border border-white/10 rounded-3xl p-12 text-center flex flex-col items-center">
                                <div className="w-16 h-16 rounded-full bg-cyan-500/20 flex items-center justify-center mb-6 border border-cyan-500/30">
                                    <Mail size={32} className="text-cyan-400" />
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Lass uns zusammenarbeiten!</h2>
                                <p className="text-slate-300 max-w-lg mb-8">
                                    Ich bin immer offen für spannende Forschungskooperationen, PhD-Möglichkeiten oder einen fachlichen Austausch.
                                </p>
                                <a href="mailto:hello@ariana.example.com" className="px-8 py-4 rounded-full bg-white text-slate-900 font-bold hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2">
                                    Nachricht schreiben <ChevronRight size={20} />
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </section>

            </main>

            {/* FOOTER */}
            <footer className="border-t border-white/5 bg-[#050810] py-8 mt-12 relative z-10">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Ariana. Alle Rechte vorbehalten.
                    </p>
                    <div className="flex gap-4 text-slate-500">
                        <a href="#" className="hover:text-cyan-400 transition-colors"><Github size={20} /></a>
                        <a href="#" className="hover:text-cyan-400 transition-colors"><Linkedin size={20} /></a>
                        <a href="#" className="hover:text-cyan-400 transition-colors"><FileText size={20} /></a>
                    </div>
                </div>
            </footer>
        </div>
    );
}