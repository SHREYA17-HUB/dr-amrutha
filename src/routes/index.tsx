import { createFileRoute } from "@tanstack/react-router";
import { motion, useInView, animate, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode, type FormEvent } from "react";
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
  return (
    <motion.div className={className} initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, delay, ease }}>
      {children}
    </motion.div>
  );
}

function Heading({ n, eyebrow, title, dark = false }: { n: string; eyebrow: string; title: ReactNode; dark?: boolean }) {
  return (
    <Reveal className="mb-10 max-w-3xl">
      <div className="flex items-center gap-4">
        <span className="eyebrow">{n}</span><span className="rule-rose w-12" /><span className="eyebrow">{eyebrow}</span>
      </div>
      <h2 className={`mt-4 text-3xl leading-tight md:text-5xl ${dark ? "text-primary-foreground" : "text-primary"}`}>{title}</h2>
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
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "bg-background/90 py-3 shadow-sm backdrop-blur" : "py-6"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="font-display text-2xl text-primary">Dr. Amruta <span className="text-accent">Jagadale</span></a>
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
  const words = ["Dedicated", "to", "Care."];
  const words2 = ["Driven", "by", "Excellence."];
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-14 md:pt-32">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="eyebrow">Dr. Amruta Jagadale, MBBS</motion.p>
          <h1 className="mt-6 text-5xl leading-[0.98] text-primary sm:text-6xl md:text-7xl xl:text-[5.5rem]">
            {[words, words2].map((line, li) => (
              <span key={li} className={`block ${li ? "italic text-rose-gradient" : ""}`}>
                {line.map((w, i) => (
                  <span key={w} className="inline-block overflow-hidden pb-2 align-bottom">
                    <motion.span className="inline-block" initial={{ y: "110%" }} animate={{ y: 0 }}
                      transition={{ duration: 1, delay: 0.2 + li * 0.35 + i * 0.08, ease }}>{w}&nbsp;</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <Reveal delay={0.9}>
            <p className="mt-8 text-sm uppercase tracking-[0.18em] text-muted-foreground">Medical Doctor · Healthcare Entrepreneur · Women's Health & Lifestyle Coach</p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/85 md:text-[17px]">
              Helping women build healthier lives, one habit at a time. With approximately 19 years in medicine, I help women make informed health decisions and build sustainable habits — and support families through home healthcare, elder care and palliative care.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#about" className="bg-primary px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary-foreground transition hover:bg-burgundy-deep">Explore My Journey</a>
              <a href="#contact" className="border border-accent px-8 py-4 text-xs uppercase tracking-[0.22em] text-primary transition hover:bg-accent hover:text-primary-foreground">Book an Appointment</a>
            </div>
          </Reveal>
        </div>
        <motion.div className="relative lg:col-span-5" initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.4, ease }}>
          <div className="absolute -left-4 -top-4 h-full w-full border border-accent/60" />
          <img src={logo.url} alt="Dr. Amruta Jagadale logo" className="relative aspect-[4/5] w-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="bg-card py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <img src={still} alt="A calm wellness setting with stethoscope, tea and fresh fruit" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          <p className="mt-4 text-xs uppercase tracking-[0.2em] text-muted-foreground">Vijayapura → Bengaluru</p>
        </Reveal>
        <div className="lg:col-span-7">
          <Heading n="01" eyebrow="About Me" title={<>Clear information.<br /><em className="text-accent">Compassionate</em> guidance.</>} />
          <div className="space-y-6 text-base leading-relaxed text-foreground/85 md:text-[17px]">
            {about.map((p, i) => <Reveal key={i} delay={i * 0.05}><p>{p}</p></Reveal>)}
          </div>
          <Reveal>
            <blockquote className="mt-12 border-l-2 border-accent pl-6 font-display text-2xl italic leading-snug text-primary md:text-3xl">
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
    <section className="bg-primary py-14 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-y-12 px-6 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.l} delay={i * 0.1} className="border-l border-accent/40 pl-6">
            <div className="font-display text-6xl text-accent md:text-7xl"><Counter to={s.n} suffix={s.s} /></div>
            <p className="mt-3 max-w-[12rem] text-sm uppercase tracking-[0.14em] text-on-dark-muted">{s.l}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Expertise() {
  return (
    <section id="expertise" className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="02" eyebrow="Skills & Expertise" title={<>Medicine, wellness and <em className="text-accent">community care</em>.</>} />
        <div className="grid border-t border-border md:grid-cols-2 lg:grid-cols-3">
          {expertise.map((e, i) => (
            <Reveal key={e.t} delay={(i % 3) * 0.08}>
              <div className="group relative h-full border-b border-border p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:bg-primary md:border-r">
                <span className="font-display text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-2xl leading-tight text-primary transition-colors group-hover:text-primary-foreground">{e.t}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground transition-colors group-hover:text-on-dark-muted">{e.d}</p>
                <span className="rule-rose absolute bottom-0 left-0 w-0 transition-all duration-700 group-hover:w-full" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journey() {
  return (
    <section id="journey" className="bg-card py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-12">
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
          <div className="space-y-8">
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
    <section className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="04" eyebrow="Projects & Portfolio" title={<>Initiatives that make care <em className="text-accent">accessible</em>.</>} />
        <div className="divide-y divide-border border-y border-border">
          {projects.map((p, i) => (
            <Reveal key={p.name}>
              <div className="group grid gap-4 py-7 transition-all md:grid-cols-12 md:items-baseline">
                <span className="font-display text-xl text-accent md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl text-primary transition-transform duration-500 group-hover:translate-x-2 md:col-span-4 md:text-4xl">{p.name}</h3>
                <div className="md:col-span-7">
                  <p className="eyebrow">{p.tag}</p>
                  <p className="mt-3 leading-relaxed text-foreground/80">{p.text}</p>
                  {p.link && <a href={p.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent underline-offset-4 hover:underline">www.quickaidhealthcare.com ↗</a>}
                </div>
              </div>
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
      <Reveal><p className="eyebrow">{sub}</p><h3 className="mt-3 text-4xl text-primary-foreground">{title}</h3></Reveal>
      <div className="mt-6 space-y-6">
        {items.map((s, i) => (
          <Reveal key={s.t} delay={i * 0.05} className="border-t border-accent/30 pt-6">
            <h4 className="text-2xl text-accent">{s.t}</h4>
            <p className="mt-2 leading-relaxed text-on-dark-muted">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
  return (
    <section id="services" className="bg-primary py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Heading dark n="05" eyebrow="Services Offered" title={<>Personal coaching & <em className="text-accent">care at home</em>.</>} />
        <div className="grid gap-10 lg:grid-cols-2">
          <Col sub="A · Heal with Dr. Amruta" title="Personal Health Coaching" items={coaching} />
          <Col sub="B · QuickAid Healthcare" title="Home Healthcare Services" items={homecare} />
        </div>
      </div>
    </section>
  );
}

function Recognition() {
  return (
    <section id="recognition" className="py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="06" eyebrow="Achievements & Affiliations" title={<>Recognition through <em className="text-accent">service</em>.</>} />
        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <Reveal key={a.t} delay={(i % 3) * 0.08} className="bg-background p-8 transition-all duration-500 hover:bg-card">
              <span className="font-display text-5xl italic text-accent/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-6 text-2xl text-primary">{a.t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{a.d}</p>
            </Reveal>
          ))}
          <Reveal className="bg-card p-8">
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
    <section className="relative overflow-hidden bg-burgundy-deep py-16 md:py-24">
      <img src={still} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-15" />
      <div className="relative mx-auto max-w-7xl px-6">
        <Heading dark n="07" eyebrow="My Approach to Care" title={<>Good healthcare begins with <em className="text-accent">understanding people</em>.</>} />
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.1}>
              <span className="block h-10 w-10 rotate-45 border border-accent" />
              <h3 className="mt-8 text-3xl text-primary-foreground">{v.t}</h3>
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
    { src: still, alt: "Wellness still life with rose-gold stethoscope", cls: "md:row-span-2" },
  ];
  const [active, setActive] = useState<number | null>(null);
  const current = active === null ? null : imgs[active];
  return (
    <section className="bg-card py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <Heading n="08" eyebrow="Gallery" title={<>Moments & <em className="text-accent">milestones</em>.</>} />
        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-3">
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
    <section id="contact" className="bg-primary py-14 md:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-2">
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
    <footer className="bg-burgundy-deep py-12 text-on-dark-muted">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm md:flex-row">
        <p className="font-display text-2xl text-primary-foreground">Dr. Amruta <span className="text-accent">Jagadale</span>, MBBS</p>
        <p>© {new Date().getFullYear()} · Anjananagar, Bengaluru</p>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main>
      <Header /><Hero /><About /><Highlights /><Expertise /><Journey /><Projects /><Services /><Recognition /><Approach /><Gallery /><Contact /><Footer />
      <a href={`https://wa.me/${contact.whatsappDigits}`} target="_blank" rel="noreferrer" aria-label="WhatsApp enquiry"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary shadow-lg transition hover:scale-110">
        <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.7 1.2 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.4.1.6-.1l.8-1c.2-.3.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.1.1.7-.1 1.3Z" /></svg>
      </a>
    </main>
  );
}
