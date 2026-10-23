"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Menu, X, Sparkles, SprayCan, Truck, SlidersHorizontal, Eye,
  Heart, BadgeCheck, MessageSquare, ClipboardList, CalendarCheck,
  ArrowRight, MessageCircle, Home as HomeIcon, ShieldCheck, Quote,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* EDITABLE DEMO CONTENT – none of this is confirmed by the business.  */
/* ------------------------------------------------------------------ */
const WHATSAPP_PLACEHOLDER = "27000000000"; // TODO: replace with official number (international format, no +)
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PLACEHOLDER}?text=${encodeURIComponent(
  "Hello Royal Maison, I'd like a free quote."
)}`;

const unsplash = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1200&q=80`;

// Illustrative stock imagery only. Swap for the client's own photos later.
const IMAGES = {
  hero: unsplash("1600585154340-be6161a56a0c"),
  gallery: [
    { src: unsplash("1560448204-e02f11c3d0e2"), alt: "Bright, tidy living room with neutral furnishings" },
    { src: unsplash("1556911220-bff31c812dba"), alt: "Clean modern kitchen with clear worktops" },
    { src: unsplash("1581578731548-c64695cc6952"), alt: "Person wiping a surface with a cloth" },
    { src: unsplash("1527515637462-cff94eecc1ac"), alt: "Cleaning supplies arranged neatly" },
    { src: unsplash("1584622650111-993a426fbf0a"), alt: "Fresh, clean bathroom with white fittings" },
  ],
};

const SERVICES = [
  { icon: HomeIcon, title: "Regular House Cleaning", text: "Keep your home consistently fresh with a routine clean that fits your schedule." },
  { icon: SprayCan, title: "Deep Cleaning", text: "A thorough, top-to-bottom clean for the corners and surfaces that need extra attention." },
  { icon: Truck, title: "Move-In / Move-Out Cleaning", text: "Start fresh in a new place or leave your old one spotless for the next occupants." },
  { icon: SlidersHorizontal, title: "Custom Cleaning Services", text: "Have something specific in mind? Tell us what you need and we'll shape a plan around it." },
];

const BENEFITS = [
  { icon: Eye, title: "Attention to Detail", text: "Every room is approached with care, so the small things don't get missed." },
  { icon: SlidersHorizontal, title: "Flexible Cleaning Options", text: "Choose the type and frequency of cleaning that suits your home and routine." },
  { icon: Heart, title: "Care for Your Home", text: "We treat your space with the same respect we'd want for our own." },
  { icon: BadgeCheck, title: "Professional Service", text: "Clear communication and a courteous approach from first message to final walkthrough." },
];

const STEPS = [
  { icon: MessageSquare, title: "Tell Us What You Need", text: "Share your home size, the kind of clean you're after and any special requests." },
  { icon: ClipboardList, title: "Receive Your Quote", text: "We review your details and get back to you with a clear, tailored quote." },
  { icon: CalendarCheck, title: "Schedule Your Cleaning", text: "Pick a time that works for you and leave the rest to us." },
];

const TESTIMONIAL_PLACEHOLDERS = [1, 2, 3];

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ------------------------------------------------------------------ */
/* Reusable pieces                                                     */
/* ------------------------------------------------------------------ */
function SmartImage({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catches images that failed before React attached onError.
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) {
    return (
      <div role="img" aria-label={alt} className={`flex items-center justify-center bg-[#173D32] text-[#C5A46D] ring-1 ring-[#C5A46D]/30 ${className}`}>
        <Sparkles className="h-12 w-12" aria-hidden />
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={ref}
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      onError={() => setFailed(true)}
      className={`bg-[#173D32]/10 object-cover ${className}`}
    />
  );
}

function SectionHeading({ label, title, text }: { label: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">{label}</p>
      <h2 className="font-serif text-3xl text-[#173D32] sm:text-4xl">{title}</h2>
      {text && <p className="mt-4 text-[#2B2B2B]/75">{text}</p>}
    </div>
  );
}

function Button({ href, children, variant = "primary" }: { href: string; children: ReactNode; variant?: "primary" | "outline" | "gold" | "ghost" }) {
  const styles = {
    primary: "bg-[#173D32] text-white hover:bg-[#12302a]",
    outline: "border border-[#173D32]/30 text-[#173D32] hover:bg-[#173D32] hover:text-white",
    ghost: "border border-white/30 text-white hover:bg-white/10",
    gold: "bg-[#C5A46D] text-[#173D32] hover:bg-[#d3b57f]",
  }[variant];
  return (
    <a href={href} className={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold shadow-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D] focus-visible:ring-offset-2 ${styles}`}>
      {children}
    </a>
  );
}

function Card({ icon: Icon, title, text }: { icon: typeof Eye; title: string; text: string }) {
  return (
    <article className="group rounded-2xl border-t-4 border-[#C5A46D] bg-white p-7 shadow-sm ring-1 ring-black/5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#173D32] text-[#C5A46D] transition group-hover:bg-[#C5A46D] group-hover:text-[#173D32]">
        <Icon className="h-6 w-6" aria-hidden />
      </div>
      <h3 className="font-serif text-xl text-[#173D32]">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-[#2B2B2B]/75">{text}</p>
    </article>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-[#173D32]/10 bg-[#FAF8F2]/95 backdrop-blur">
      <nav aria-label="Main" className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
        <a href="#home" className="font-serif text-2xl tracking-wide text-[#173D32]">
          Royal <span className="text-[#C5A46D]">Maison</span>
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <li key={n.href}>
              <a href={n.href} className="text-sm font-medium text-[#2B2B2B] transition hover:text-[#173D32]">{n.label}</a>
            </li>
          ))}
        </ul>
        <div className="hidden md:block"><Button href="#contact">Get a Free Quote</Button></div>
        <button
          type="button"
          className="rounded-lg p-2 text-[#173D32] md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>
      {open && (
        <div id="mobile-menu" className="border-t border-[#173D32]/10 bg-[#FAF8F2] px-5 pb-6 pt-2 md:hidden">
          <ul className="flex flex-col">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} onClick={() => setOpen(false)} className="block border-b border-[#173D32]/10 py-3 font-medium text-[#173D32]">{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="mt-5" onClick={() => setOpen(false)}><Button href="#contact">Get a Free Quote</Button></div>
        </div>
      )}
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
export default function Page() {
  return (
    <div className="overflow-x-hidden bg-[#FAF8F2] text-[#2B2B2B] scroll-smooth">
      <Header />
      <main>
        {/* HERO */}
        <section id="home" className="scroll-mt-20 bg-[#173D32] text-white">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 lg:grid-cols-[1.05fr_1fr] lg:py-24">
            <div>
              <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-[#C5A46D]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />Your Home, Our Care
              </p>
              <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                A Cleaner Home. <span className="text-[#C5A46D]">A Calmer Life.</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
                Royal Maison helps your home feel fresh, clean and comfortable, so you can spend your time on what matters most.
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href="#contact" variant="gold">Request a Free Quote <ArrowRight className="h-4 w-4" aria-hidden /></Button>
                <Button href="#services" variant="ghost">Explore Our Services</Button>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
                {["Free quotes", "Flexible options", "Bellville & surrounds"].map((t) => (
                  <li key={t} className="flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-[#C5A46D]" aria-hidden />{t}</li>
                ))}
              </ul>
            </div>

            <div className="relative sm:pb-10 sm:pl-10">
              <SmartImage
                eager
                src={IMAGES.hero}
                alt="Elegant, bright modern home interior"
                className="aspect-[4/3] w-full rounded-[2rem] shadow-2xl sm:aspect-[4/5]"
              />
              <SmartImage
                eager
                src={IMAGES.gallery[0].src}
                alt={IMAGES.gallery[0].alt}
                className="absolute bottom-0 left-0 hidden h-40 w-40 rounded-3xl border-4 border-[#173D32] shadow-xl sm:block md:h-52 md:w-52"
              />
              <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-[#173D32] shadow-lg backdrop-blur">
                <Sparkles className="h-4 w-4 text-[#C5A46D]" aria-hidden />Fresh. Tidy. Comfortable.
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section id="services" className="scroll-mt-20 bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading label="Services" title="Cleaning Tailored to Your Home" text="Demo content: services shown here are examples and are yet to be confirmed by the business." />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SERVICES.map((s) => <Card key={s.title} {...s} />)}
            </div>
          </div>
        </section>

        {/* WHY */}
        <section id="about" className="scroll-mt-20 bg-[#EFE7D4] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading label="Why Royal Maison" title="A Thoughtful Approach to Cleaning" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {BENEFITS.map((b) => <Card key={b.title} {...b} />)}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="bg-[#173D32] py-20 text-white">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <div className="mx-auto mb-12 max-w-2xl text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-[#C5A46D]">How It Works</p>
              <h2 className="font-serif text-3xl sm:text-4xl">Three Simple Steps</h2>
            </div>
            <ol className="grid gap-8 md:grid-cols-3">
              {STEPS.map((s, i) => (
                <li key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-7">
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#C5A46D] font-serif text-lg text-[#173D32]">{i + 1}</span>
                    <s.icon className="h-6 w-6 text-[#C5A46D]" aria-hidden />
                  </div>
                  <h3 className="font-serif text-xl">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* GALLERY */}
        <section id="gallery" className="scroll-mt-20 py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading label="Inspiration" title="The Feeling of a Fresh Home" text="Illustrative stock imagery for this concept demo. These are not photos of Royal Maison's work." />
            <div className="grid auto-rows-[180px] grid-cols-2 gap-4 sm:auto-rows-[220px] md:grid-cols-4">
              {IMAGES.gallery.map((g, i) => (
                <div key={g.src} className={`overflow-hidden rounded-2xl shadow-sm ${i === 0 ? "col-span-2 row-span-2" : i === 3 ? "md:col-span-2" : ""}`}>
                  <SmartImage src={g.src} alt={g.alt} className="h-full w-full transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="bg-[#E6EEE8] py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-8">
            <SectionHeading label="Testimonials" title="What Clients Say" text="Placeholder section. Replace with verified customer reviews once available." />
            <div className="grid gap-6 md:grid-cols-3">
              {TESTIMONIAL_PLACEHOLDERS.map((n) => (
                <figure key={n} className="rounded-2xl border border-dashed border-[#C5A46D] bg-white p-7">
                  <Quote className="mb-4 h-7 w-7 text-[#C5A46D]" aria-hidden />
                  <blockquote className="text-sm italic text-[#2B2B2B]/70">[Placeholder: verified customer review goes here]</blockquote>
                  <figcaption className="mt-5 text-sm font-medium text-[#173D32]">[Customer name, suburb]</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section id="contact" className="scroll-mt-20 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl bg-[#173D32] px-6 py-14 text-center text-white shadow-xl sm:px-12">
            <h2 className="font-serif text-3xl sm:text-4xl">Ready to Enjoy a Fresher Home?</h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Tell us about your cleaning needs and we'll be happy to put together a quote for you.
            </p>
            <div className="mt-8 flex justify-center">
              <Button href={WHATSAPP_URL} variant="gold">Request a Quote</Button>
            </div>
            <p className="mt-4 text-xs text-white/50">Opens WhatsApp (placeholder number in demo).</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t-4 border-[#C5A46D] bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <p className="font-serif text-2xl text-[#173D32]">Royal <span className="text-[#C5A46D]">Maison</span></p>
            <p className="mt-3 max-w-xs text-sm text-[#2B2B2B]/70">Home cleaning with care and attention to detail.</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-3 text-sm font-semibold text-[#173D32]">Navigate</p>
            <ul className="space-y-2 text-sm">
              {NAV.map((n) => <li key={n.href}><a href={n.href} className="text-[#2B2B2B]/70 hover:text-[#173D32]">{n.label}</a></li>)}
            </ul>
          </nav>
          <div className="text-sm text-[#2B2B2B]/70">
            <p className="mb-3 font-semibold text-[#173D32]">Service Area</p>
            <p>Bellville and surrounding Cape Town areas <span className="text-[#2B2B2B]/50">(demo content)</span></p>
            <p className="mt-4 mb-1 font-semibold text-[#173D32]">Contact</p>
            <p>Phone / WhatsApp: [placeholder]</p>
            <p>Email: [placeholder]</p>
          </div>
        </div>
        <div className="border-t border-[#173D32]/10 py-5 text-center text-xs text-[#2B2B2B]/50">
          Concept Website by LocalLaunch
        </div>
      </footer>

      {/* FLOATING WHATSAPP */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp (placeholder number)"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46D] focus-visible:ring-offset-2"
      >
        <MessageCircle className="h-7 w-7" aria-hidden />
      </a>
    </div>
  );
}