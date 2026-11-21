import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, animate, AnimatePresence, MotionConfig, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
import { ArrowUpRight, HeartPulse, Leaf, Stethoscope, HeartHandshake, Activity, Apple, Baby, House, Users, BookOpen, ShieldCheck, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroVisual from "@/assets/medical-hero.png.asset.json";
import wellnessVisual from "@/assets/medical-wellness.png.asset.json";
import logo from "@/assets/amruta-logo.webp.asset.json";
import still from "@/assets/wellness-still.jpg";
import {
  about, achievements, affiliations, coaching, contact, experience, expertise, homecare, projects, values,
} from "@/components/site/content";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. Amruta Jagadale, MBBS — Women's Health & Lifestyle Coach, Bengaluru" },
      { name: "description", content: "Medical doctor with ~19 years of experience, healthcare entrepreneur and women's health & lifestyle coach in Bengaluru." },
      { property: "og:title", content: "Dr. Amruta Jagadale — Dedicated to Care. Driven by Excellence." },
      { property: "og:description", content: "Helping women build healthier lives, one habit at a time. Home healthcare, elder care and lifestyle coaching in Bengaluru." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const ease = [0.22, 1, 0.36, 1] as const;
const nav = [
  ["About", "about"], ["Expertise", "expertise"], ["Journey", "journey"], ["Services", "services"], ["Recognition", "recognition"], ["Contact", "contact"],
] as const;

function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.6, delay, ease }}>
      {children}
    </motion.div>
  );
}

function Heading({ n, eyebrow, title, dark = false }: { n: string; eyebrow: string; title: ReactNode; dark?: boolean }) {
  return (
    <Reveal className="mb-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="eyebrow">{n}</span><span className="rule-rose w-12" /><span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className={`mt-3 text-3xl leading-tight md:text-4xl ${dark ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
    </Reveal>
  );
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration: 2, ease, onUpdate: (x) => setV(Math.round(x)) });
    return () => c.stop();
  }, [inView, to]);
  return <span ref={ref}>{v}{suffix}</span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 40);
    f(); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 py-3 shadow-sm backdrop-blur" : "bg-background/80 py-3 backdrop-blur"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-3 font-display text-xl text-primary"><img src={logo.url} alt="Dr. Amruta Jagadale logo" className="h-12 w-12 rounded-full object-cover" /><span>Dr. Amruta <span className="text-accent">Jagadale</span></span></a>
        <nav className="hidden gap-8 lg:flex">
          {nav.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:text-accent">{l}</a>
          ))}
        </nav>
        <a href="#contact" className="hidden border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-block">Book Appointment</a>
        <button aria-label="Menu" onClick={() => setOpen(!open)} className="flex flex-col gap-1.5 lg:hidden">
          <span className={`h-px w-7 bg-primary transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
          <span className={`h-px w-7 bg-primary transition ${open ? "opacity-0" : ""}`} />
          <span className={`h-px w-7 bg-primary transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden bg-primary lg:hidden">
            <div className="flex flex-col gap-5 px-6 py-8">
              {nav.map(([l, id], i) => (
                <motion.a key={id} href={`#${id}`} onClick={() => setOpen(false)} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}
                  className="font-display text-3xl text-primary-foreground">{l}</motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="medical-hero relative isolate overflow-hidden">
      <img src={heroVisual.url} alt="3D rose-gold stethoscope, sculpted heart and sage leaves" fetchPriority="high" className="hero-art absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="hero-scrim absolute inset-0 -z-10" />
      <div className="mx-auto max-w-7xl px-6 pt-28 pb-10 md:pt-32 md:pb-12">
        <div className="hero-copy max-w-xl">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="eyebrow">Medical doctor · MBBS · Bengaluru</motion.p>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }} className="mt-4 text-5xl leading-[1.08] text-primary md:text-6xl">Dr. Amruta<br /><em className="text-accent">Jagadale</em></motion.h1>
          <Reveal delay={0.2}>
            <p className="mt-5 font-display text-2xl leading-snug text-primary md:text-3xl">Dedicated to Care.<br />Driven by Excellence.</p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-foreground/85 md:text-base">Women's Health & Lifestyle Coach · Healthcare Entrepreneur</p>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">Helping women build healthier lives, one habit at a time. Approximately 19 years in medicine, bringing compassionate guidance and quality care to you and your family.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-sm text-xs"><a href="#contact">Book an Appointment <ArrowUpRight /></a></Button>
              <Button asChild size="lg" variant="outline" className="h-11 rounded-sm text-xs"><a href="#about">Explore My Journey</a></Button>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 border-t border-accent/30 pt-4 text-xs text-primary">
              <span className="flex items-center gap-2"><HeartPulse className="h-4 w-4 text-accent" /> Women's health</span>
              <span className="flex items-center gap-2"><Leaf className="h-4 w-4 text-accent" /> Lifestyle coaching</span>
              <span className="flex items-center gap-2"><Stethoscope className="h-4 w-4 text-accent" /> Care at home</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-card py-9 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="wellness-image overflow-hidden"><img src={wellnessVisual.url} alt="3D wellness composition with a ceramic heart, rose-gold stethoscope and leaves" loading="lazy" className="aspect-[4/5] max-h-[470px] w-full object-cover" /></div>
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Vijayapura → Bengaluru</p>
        </Reveal>
        <div className="lg:col-span-7">
          <Heading n="01" eyebrow="About Me" title={<>Clear information.<br /><em className="text-accent">Compassionate</em> guidance.</>} />
          <div className="space-y-4 text-base leading-relaxed text-foreground/85 md:text-[17px]">
            {about.map((p, i) => <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>)}
          </div>
          <Reveal>
            <blockquote className="mt-6 border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug text-primary md:text-3xl">
              "Quality care is not only about meeting physical needs; it is also about treating every person with dignity, patience and respect."
            </blockquote>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Highlights() {
  const stats = [
    { n: 19, s: "", l: "Years in medicine (approx.)" },
    { n: 25, s: "", l: "Bed assisted living facility overseen" },
    { n: 30, s: "", l: "Day Belly Health video series" },
    { n: 13, s: "", l: "Areas of expertise" },
  ];
  return (
    <section className="bg-primary py-8 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-6 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1} className="border-l border-accent/40 pl-6">
            <div className="font-display text-6xl text-accent md:text-6xl"><Counter to={s.n} suffix={s.s} /></div>
            <p className="mt-3 max-w-[12rem] text-sm uppercase tracking-[0.14em] text-on-dark-muted">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function AnimatedCareIcon({ icon: Icon, delay = 0, dark = false }: { icon: LucideIcon; delay?: number; dark?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <motion.span aria-hidden="true" className={`care-icon ${dark ? "care-icon-dark" : ""}`}
      initial={false} whileInView={reduced ? {} : { y: [0, -4, 0], rotate: [0, -5, 0] }}
      viewport={{ amount: 0.8 }} transition={{ duration: 4, repeat: Infinity, delay, ease: "easeInOut" }}>
      <Icon className="h-6 w-6" strokeWidth={1.5} />
    </motion.span>
  );
}

const expertiseIcons = [HeartPulse, Activity, Leaf, HeartPulse, Baby, Apple, House, Users, HeartHandshake, ShieldCheck, Stethoscope, BookOpen, HeartHandshake];
const projectIcons = [Leaf, Stethoscope, HeartHandshake, Apple, Users];

function Expertise() {
  return (
    <section id="expertise" className="py-9 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="02" eyebrow="Skills & Expertise" title={<>Medicine, wellness and <em className="text-accent">community care</em>.</>} />
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => (
            <Reveal key={e.t} delay={(i % 3) * 0.08}>
              <article className="expertise-tile group relative h-full overflow-hidden rounded-md border border-border bg-card/50 p-5 transition-all duration-500 hover:-translate-y-1 hover:bg-primary">
                <div className="flex items-center justify-between"><AnimatedCareIcon icon={expertiseIcons[i] ?? HeartPulse} delay={(i % 3) * 0.5} /><span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span></div>
                <h3 className="mt-4 text-2xl leading-tight text-primary transition-colors group-hover:text-primary-foreground">{e.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground transition-colors group-hover:text-on-dark-muted">{e.d}</p>
                <span aria-hidden="true" className="tile-trace" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="bg-card py-9 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Heading n="03" eyebrow="Experience" title={<>Professional <em className="text-accent">journey</em>.</>} />
          <Reveal>
            <div className="border border-accent/50 p-6">
              <p className="eyebrow">Qualification</p>
              <p className="mt-3 font-display text-3xl text-primary">MBBS</p>
              <p className="mt-2 text-sm text-muted-foreground">Medical doctor based in Bengaluru, Karnataka.</p>
            </div>
          </Reveal>
        </div>
        <div className="relative lg:col-span-8">
          <motion.div className="absolute left-3 top-0 w-px origin-top bg-accent/60" style={{ height: "100%" }}
            initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease }} />
          <div className="space-y-6">
            {experience.map((x, i) => (
              <Reveal key={x.role} delay={i * 0.08} className="relative pl-14">
                <span className="absolute left-0 top-2 h-6 w-6 rounded-full border border-accent bg-background" />
                <p className="eyebrow">{x.period}</p>
                <h3 className="mt-2 text-3xl text-primary">{x.role}</h3>
                <p className="mt-1 text-sm uppercase tracking-[0.14em] text-foreground/70">{x.org}</p>
                <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">{x.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-9 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="04" eyebrow="Projects & Portfolio" title={<>Initiatives that make care <em className="text-accent">accessible</em>.</>} />
        <div className="divide-y divide-border border-y border-border">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={(i % 3) * 0.1}>
              <article className="project-row group relative grid gap-4 px-3 py-6 transition-colors duration-500 hover:bg-card md:grid-cols-12 md:items-start">
                <div className="flex items-center gap-3 md:col-span-1"><AnimatedCareIcon icon={projectIcons[i] ?? HeartHandshake} delay={i * 0.3} /><span className="font-display text-sm text-accent md:hidden">{String(i + 1).padStart(2, "0")}</span></div>
                <h3 className="text-3xl text-primary transition-transform duration-500 group-hover:translate-x-1 md:col-span-4">{p.name}</h3>
                <div className="md:col-span-7">
                  <p className="eyebrow">{p.tag}</p>
                  <p className="mt-3 leading-relaxed text-foreground/80">{p.text}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline">www.quickaidhealthcare.com ↗</a>}
                </div>
                <span aria-hidden="true" className="project-sweep" />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const Col = ({ title, sub, items }: { title: string; sub: string; items: { t: string; d: string }[] }) => (
    <div>
      <Reveal><div className="flex items-center gap-3"><AnimatedCareIcon dark icon={title === "Personal Health Coaching" ? HeartPulse : House} /><p className="eyebrow">{sub}</p></div><h3 className="mt-3 text-3xl text-primary-foreground">{title}</h3></Reveal>
      <div className="mt-5 space-y-4">
        {items.map((s, i) => (
          <Reveal key={s.t} delay={(i % 3) * 0.08} className="service-row group relative border-t border-accent/30 py-4">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="service-marker mt-1.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent/40 text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
              <div className="min-w-0"><h4 className="text-2xl text-accent transition-transform duration-500 group-hover:translate-x-1">{s.t}</h4>
              <p className="mt-2 leading-relaxed text-on-dark-muted">{s.d}</p></div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
  return (
    <section id="services" className="bg-primary py-9 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Heading dark n="05" eyebrow="Services Offered" title={<>Personal coaching & <em className="text-accent">care at home</em>.</>} />
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <Col sub="A · Heal with Dr. Amruta" title="Personal Health Coaching" items={coaching} />
          <Col sub="B · QuickAid Healthcare" title="Home Healthcare Services" items={homecare} />
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section id="recognition" className="py-9 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="06" eyebrow="Achievements & Affiliations" title={<>Recognition through <em className="text-accent">service</em>.</>} />
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 0.08} className="bg-background p-6 transition-all duration-500 hover:bg-card">
              <span className="font-display text-5xl italic text-accent/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-2xl text-primary">{a.t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.d}</p>
            </Reveal>
          ))}
          <Reveal className="bg-card p-6">
            <p className="eyebrow">Affiliations</p>
            {affiliations.map((a) => (
              <div key={a.t} className="mt-6 border-t border-accent/40 pt-4">
                <h3 className="text-2xl text-primary">{a.t}</h3>
                <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">{a.r}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Approach() {
  return (
    <section className="relative overflow-hidden bg-burgundy-deep py-10 md:py-14">
      <img src={still} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Heading dark n="07" eyebrow="My Approach to Care" title={<>Good healthcare begins with <em className="text-accent">understanding people</em>.</>} />
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <span className="block h-10 w-10 rotate-45 border border-accent" />
              <h3 className="mt-5 text-3xl text-primary-foreground">{v.t}</h3>
              <p className="mt-3 leading-relaxed text-on-dark-muted">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Gallery() {
  const imgs = [
    { src: logo.url, alt: "Dr. Amruta Jagadale brand logo", cls: "md:col-span-2 md:row-span-2" },
    { src: wellnessVisual.url, alt: "3D heart and stethoscope wellness illustration", cls: "md:row-span-2" },
  ];
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : imgs[active];
  return (
    <section className="bg-card py-9 md:py-12">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="08" eyebrow="Gallery" title={<>Moments & <em className="text-accent">milestones</em>.</>} />
        <div className="grid auto-rows-[170px] gap-4 md:grid-cols-3">
          {imgs.map((im, i) => (
            <Reveal key={i} className={im.cls}>
              <button onClick={() => setActive(i)} className="group block h-full w-full overflow-hidden">
                <img src={im.src} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {current && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-burgundy-deep/95 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActive(null)}>
            <motion.img initial={{ scale: 0.92 }} animate={{ scale: 1 }} src={current.src} alt={current.alt} className="max-h-[85vh] max-w-full object-contain" />
            <button aria-label="Close" className="absolute right-6 top-6 text-3xl text-primary-foreground">×</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const msg = `Hello Dr. Amruta, I'd like to book an appointment.\nName: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email")}\nPreferred date: ${f.get("date")}\nMessage: ${f.get("message")}`;
    window.open(`https://wa.me/${contact.whatsappDigits}?text=${encodeURIComponent(msg)}`, "_blank");
    setSent(true);
  };
  const field = "w-full border-b border-accent/40 bg-transparent py-3 text-primary-foreground placeholder:text-on-dark-muted/70 focus:border-accent focus:outline-none";
  return (
    <section id="contact" className="bg-primary py-9 md:py-12">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2">
        <div>
          <Heading dark n="09" eyebrow="Let's Connect" title={<>Your wellbeing deserves <em className="text-accent">thoughtful guidance</em>.</>} />
          <Reveal>
            <p className="max-w-lg leading-relaxed text-on-dark-muted">Whether you are looking for women's health and lifestyle coaching, want to learn about my healthcare initiatives, or need information about home healthcare services, I would be happy to hear from you.</p>
            <dl className="mt-10 space-y-6">
              {[["WhatsApp", contact.whatsapp, `https://wa.me/${contact.whatsappDigits}`], ["Email", contact.email, `mailto:${contact.email}`], ["Location", contact.location, ""]].map(([k, v, h]) => (
                <div key={k} className="border-t border-accent/30 pt-4">
                  <dt className="eyebrow">{k}</dt>
                  <dd className="mt-2 font-display text-2xl text-primary-foreground">{h ? <a href={h} className="hover:text-accent">{v}</a> : v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
        <Reveal delay={0.15}>
          <form onSubmit={submit} className="space-y-6 border border-accent/30 p-8 md:p-12">
            <h3 className="text-3xl text-primary-foreground">Appointment Enquiry</h3>
            <input required name="name" placeholder="Name" className={field} />
            <div className="grid gap-6 sm:grid-cols-2">
              <input required name="phone" type="tel" placeholder="Phone" className={field} />
              <input name="email" type="email" placeholder="Email" className={field} />
            </div>
            <input name="date" type="date" aria-label="Preferred date" className={field} />
            <textarea name="message" rows={4} placeholder="How can I help?" className={field} />
            <button className="w-full bg-accent py-4 text-xs uppercase tracking-[0.22em] text-primary transition hover:bg-primary-foreground">Send via WhatsApp</button>
            {sent && <p className="text-sm text-accent">Opening WhatsApp with your enquiry…</p>}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-burgundy-deep py-7 text-on-dark-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row">
        <p className="font-display text-2xl text-primary-foreground">Dr. Amruta <span className="text-accent">Jagadale</span>, MBBS</p>
        <p>© {new Date().getFullYear()} · Anjananagar, Bengaluru</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <MotionConfig reducedMotion="user"><main>
      <Header /><Hero /><About /><Highlights /><Expertise /><Journey /><Projects /><Services /><Recognition /><Approach /><Gallery /><Contact /><Footer />
      <a href={`https://wa.me/${contact.whatsappDigits}`} target="_blank" rel="noreferrer" aria-label="WhatsApp enquiry"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary shadow-lg transition hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.3Z" /></svg>
      </a>
    </main></MotionConfig>
  );
}
