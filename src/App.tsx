import { useState } from "react";
import valuesSafe from "./assets/value-safe-space.jpg";
import valuesConnection from "./assets/value-connection.jpg";
import valuesConsent from "./assets/value-consent.jpg";
import valuesAuthenticity from "./assets/value-authenticity.jpg";
import valuesFreedom from "./assets/value-freedom.jpg";
import LogoDawn from "./assets/logo-dawn.png";
import Hero from "./assets/hero-secondary.jpg";
import gallery1 from "./assets/gallery-1.jpg";
import CtaPlay from "./assets/cta-play.jpg";
import gallery3 from "./assets/gallery-3.jpg";
import gallery4 from "./assets/gallery-4.jpg";
import gallery5 from "./assets/gallery-5.jpg";
import gallery7 from "./assets/gallery-7.jpg";
import gallery8 from "./assets/gallery-8.jpg";
import EtiquetteCenter from "./assets/etiquette-center.jpg";
import TestimoniTitle from "./assets/Testimoni-title.png";
import galleryLargeA from "./assets/gallery-large-1.jpg";
import galleryLargeB from "./assets/gallery-large-2.jpg";
import galleryLargeC from "./assets/gallery-large-3.jpg";
import galleryWide from "./assets/gallery-wide-1.jpg";
import importantBg from "./assets/important-bg.png";
import RevolutionText from "./assets/revolution-text.png";
import EtiquetteRight from "./assets/basic-ettique-title.png";
import EtiquetteGal from "./assets/etiquette-right.jpg";
import HeroTypography from "./assets/hero-typography.png";

import FaqTittle from "./assets/faq-title.png";

const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Values", href: "#values" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
];

const KEYWORDS = ["Drink", "Dance", "Dine", "Connect", "Play", "Explore"];

const VALUE_HIGHLIGHTS = [
  { title: "Safe Space", image: gallery5 },
  { title: "Connection", image: gallery4 },
  { title: "Consent", image: gallery8 },
  { title: "Authenticity", image: valuesAuthenticity },
  { title: "Freedom", image: gallery3 },
];

const SOCIETY_HIGHLIGHTS = [
  {
    title: "Weekly Rope Jam With In-Ropes Community",
    description: `It's a casual weekly meeting for those
who are into sensual artistry of rope
(kinbaku/shibari). Whether you’re a
beginner or a master, everyone is
welcome. You are here to explore, learn
and connect. At Rope Jam, we do not
encourage any sexual and nudity
activities. Free to attend at most times.
Usually done every Monday, and
occasionally on Thursday`,
  },
  {
    title: "Munch Social Parties, Drinks & Dance",
    description: `Is this your first time in our
community? Get to know the people in
the community by joining our Munch!
Munch is basically a social gathering
between Kinksters and sex - positive
people. Fully clothed, private event,
and it's either a sex-positive discussion
with dinner or a social party with drinks
and DJ. Click here if you’d like to know
more about Munch.`,
  },
  {
    title: "Sex-Positive Workshop & Classes",
    description: ` Are you new to BDSM and sexual or
sensual world? Don't worry, our
community is aim to educate and
grow together. Workshops and
classes are for you if you're interested
to learn more about certain topics.
Ranging from learning about consent,
domination, art of touch to mastering
the art of shibari, and other
provocative topics. We'll dive deep
into the subject with theory and
practices.`,
  },
];

const OFFERINGS = [
  {
    title: "Play Parties",
    blurb: `Our Play party is basically a house party with a bunch of
sex-positive people. No, we will not force you to be nude
and to play with others if you don't want to. We're all
respectful adults who understand consent, safety, and
sanity.
Some people will have sex, be naked, or play with each
other, and some only come to socialize and watch or to
be watched. We understand everyone has different
desires and would go on different explorations and that's
ok! You are in a safe space to be who you are!`,
  },
  {
    title: "Play Retreats",
    blurb: `Play Retreat is basically all of the above and more. What’s
more? The vacation, the road trips, and city exploration all
done with like-minded individuals! Sounds like a fun &
playful family vacation, right? Indeed.
It is an experience where fun, open-minded individuals
come together to embrace the beauty of an island in Asia
and beyond. We’re here to connect with playful humans
through shared activities and good vibes. Activities
designed to encourage self-expression, inner desire and
personal growth.`,
  },
];

const GALLERY_LAYOUT = [
  {
    src: galleryLargeB,
    alt: "Leather cuffs hanging on display.",
    classes: "col-start-1 row-start-1 col-span-1 row-span-1",
  },
  {
    src: galleryWide,
    alt: "Fire artist adorned in jewels holding flames.",
    classes: "col-start-2 row-start-1 col-span-1 row-span-2",
  },
  {
    src: CtaPlay,
    alt: "Performer posing beneath a chandelier.",
    classes: "col-start-3 row-start-1 col-span-1 row-span-1",
  },
  {
    src: EtiquetteGal,
    alt: "Performer mid-dance on stage.",
    classes: "col-start-4 row-start-1 col-span-1 row-span-2",
  },
  {
    src: galleryLargeC,
    alt: "Performer illuminated by crimson lighting.",
    classes: "col-start-5 row-start-1 col-span-1 row-span-2",
  },
  {
    src: gallery8,
    alt: "Playful moment captured during the party.",
    classes: "col-start-6 row-start-1 col-span-1 row-span-1",
  },
  {
    src: Hero,
    alt: "Performer walking through the crowd.",
    classes: "col-start-1 row-start-2 col-span-1 row-span-2",
  },
  {
    src: galleryLargeA,
    alt: "Guest enjoying a themed lounge.",
    classes: "col-start-2 row-start-3 col-span-1 row-span-1",
  },
  {
    src: valuesFreedom,
    alt: "Performer posing in a red-lit stairway.",
    classes: "col-start-3 row-start-2 col-span-1 row-span-2",
  },
  {
    src: valuesConsent,
    alt: "Guests performing a ritual with candles.",
    classes: "col-start-4 row-start-3 col-span-2 row-span-1",
  },
  {
    src: EtiquetteCenter,
    alt: "Fire breather captivating the crowd.",
    classes: "col-start-6 row-start-2 col-span-1 row-span-2",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "I loved the way the hosts introduced every room, guided the themes, and checked in on how I was feeling. It felt like a friend's house, if that friend owned a nightclub.",
    author: "Community Member, 2024",
  },
  {
    quote:
      "Everything was intentionally organized. I never felt rushed or pressured, and I appreciated the aftercare lounge. Lighting, food, soundscapes - every detail invited us deeper into pleasure.",
    author: "Guest, Play Retreats",
  },
];

const FAQS = [
  {
    question: "I have never seen a community like yours. Is it okay?",
    answer:
      "Absolutely. We welcome first-time explorers with gentle orientation, guided consent practices, and dedicated ambassadors. You will never be left to navigate alone.",
  },
  {
    question: "Do I need to bring a partner?",
    answer:
      "No partner required. We host a balanced mix of singles, couples, and constellations. Community agreements support everyone, regardless of relationship structure.",
  },
  {
    question: "How do I become a member?",
    answer:
      "Apply for membership, attend a virtual orientation, and join one of our socials. Once we are aligned on values, you will gain access to exclusive events and retreats.",
  },
];

const FAQ_IMAGES = [gallery1, gallery3, gallery7];

const App = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [faqIndex, setFaqIndex] = useState(0);

  const totalTestimonials = TESTIMONIALS.length;
  const totalFaqs = FAQS.length;

  const currentTestimonial = TESTIMONIALS[testimonialIndex];
  const currentFaq = FAQS[faqIndex];
  const currentFaqImage = FAQ_IMAGES[faqIndex % FAQ_IMAGES.length];

  const formatStepper = (index: number, total: number) =>
    `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

  const goToPrevTestimonial = () => {
    setTestimonialIndex(
      (prev) => (prev - 1 + totalTestimonials) % totalTestimonials
    );
  };

  const goToNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % totalTestimonials);
  };

  const goToPrevFaq = () => {
    setFaqIndex((prev) => (prev - 1 + totalFaqs) % totalFaqs);
  };

  const goToNextFaq = () => {
    setFaqIndex((prev) => (prev + 1) % totalFaqs);
  };

  return (
    <div className="min-h-screen bg-[#120104] font-avenir text-white">
      <header className="bg-[#7a0f19]">
        <div className="flex items-center justify-between px-10 py-5">
          <a
            href="#top"
            className="font-iowan text-2xl uppercase tracking-[0.55em] text-[#fbe1d3]"
          >
            UNLSH
          </a>
          <nav className="hidden items-center gap-12 text-[12px] uppercase tracking-[0.6em] text-[#f8d8cb] md:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-avenir transition-colors hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <button className="hidden border border-[#f7b7a5] px-7 py-2 text-[12px] uppercase tracking-[0.5em] text-[#f7b7a5] transition hover:border-white hover:text-white md:inline-flex">
            Membership
          </button>
        </div>
      </header>

      <main>
        <section
          id="top"
          className="grid bg-[#FAF1E6] xl:grid-cols-2 md:items-stretch"
        >
          <div className="flex min-h-[520px] flex-col justify-center px-8 py-16 text-[#7b131e] md:pl-[8vw] md:pr-[6vw] ">
            <div className="space-y-8">
              <div className="space-y-6 px-12">
                {/* <h1 className="font-bo text-center text-[58px] leading-[1.08] uppercase tracking-[0.22em] text-[#7d0e1a]">
                  <span className="block">We Are</span>
                  <span className="block">UNLSH</span>
                  <span className="block">
                    S
                    <span className="relative inline-flex h-[56px] w-[56px] items-center justify-center align-middle">
                      <span className="text-[58px] -mt-2 leading-none text-[#7d0e1a]">
                        O
                      </span>
                      <span className="absolute inset-0 -top-1 -left-1 bottom-1 right-1.5 rounded-full border border-[#7d0e1a]/80" />
                      <span className="absolute left-1/2 top-0 h-[240%] w-[2px] -translate-x-2 -translate-y-10 rotate-[40deg] bg-[#7d0e1a]/80" />
                    </span>
                    CIETY
                  </span>
                </h1> */}
                <img src={HeroTypography} alt="herotypography" />
              </div>
              <p className="max-w-xl text-center font-medium text-[12px] uppercase tracking-[0.32em] text-[#9d4b45]">
                Expect captivating performances, playful connections, and our DJ
                close to the crowd with sensual rhythms that awaken every
                sensation. A night of elegance, intimacy, and unforgettable
                energy. Step into the allure. Step into UNLSH.
              </p>
              <div className="flex justify-center">
                <button className="inline-flex border border-[#a04f49] px-8 py-2 text-[12px] uppercase tracking-[0.5em] text-[#7b131e] transition hover:bg-[#7b131e] hover:text-[#f6ece0]">
                  Membership
                </button>
              </div>
            </div>
          </div>
          <div>
            <img
              src={valuesConnection}
              alt="Guest wearing heels at an UNLSH gathering."
              className="w-full h-[80vh] max-h-[360px] lg: xl:max-h-[650px] object-cover md:min-h-[520px]"
            />
          </div>
        </section>

        <div className="bg-black">
          <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-5 px-6 py-5 text-[13px] uppercase tracking-[0.6em] text-white">
            {KEYWORDS.map((word, index) => (
              <div key={word} className="flex items-center gap-4">
                <span>{word}</span>
                {index !== KEYWORDS.length - 1 && (
                  <span className="text-white">&bull;</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Revolution section -------------- */}

        <section className="bg-[#880C11] text-center text-[#fde9df]">
          <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12">
            <img
              src={LogoDawn}
              alt="Icon representing authenticity."
              className="h-full object-cover w-50"
            />
            <img
              src={RevolutionText}
              alt="revolution-text"
              className="w-full"
            />
            <a
              href="#events"
              className="group inline-flex mt-8 items-stretch text-white"
            >
              <span className="border border-white px-10 py-3 text-[12px] uppercase tracking-[0.5em] transition-colors group-hover:bg-white border-r group-hover:text-[#880C11]">
                Upcoming Events
              </span>
              <span className="flex items-center justify-center gap-2 border border-l-0 border-white px-6 transition-colors group-hover:bg-white group-hover:text-[#880C11]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 12"
                  className="h-3 w-6"
                  fill="none"
                >
                  <path
                    d="M1 6h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="square"
                  />
                  <path
                    d="M12 1l6 5-6 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="miter"
                  />
                </svg>
              </span>
            </a>
          </div>
        </section>

        <section
          id="values"
          className="beige-background border-y border-[#d9b3a3] text-[#2e0208]"
        >
          <div className="flex items-center justify-center gap-6 px-6 text-[#7d0f16]">
            <div className="flex items-center gap-6 py-5">
              <span className="text-2xl sm:text-3xl">←</span>
              <h2 className="font-bo text-center text-[48px] leading-none tracking-[0.22em] uppercase">
                Our Values
              </h2>
              <span className="text-2xl sm:text-3xl">→</span>
            </div>
          </div>

          <div className=" grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5">
            {VALUE_HIGHLIGHTS.map((item) => (
              <article
                key={item.title}
                className="group relative h-[400px] overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/70" />
                <div className="absolute inset-x-0 bottom-10 flex flex-col items-center gap-4 px-4 text-center text-white">
                  <h4 className="font-bo text-lg uppercase tracking-[0.55em]">
                    {item.title}
                  </h4>
                  <span className="h-[6px] w-16 bg-[#c96a55]/90" />
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto py-4 font-iowan text-xl w-full px-8 font-iow text-center uppercase text-[#5b131f] tracking-[0.2em]">
            We create safe spaces to explore desire, embrace authenticity, and
            build connections.
          </div>
        </section>

        <section id="basic-etiquette" className="bg-[#fef3e7]">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="h-full w-full">
              <img
                src={valuesSafe}
                alt="Guests relaxing at UNLSH Society."
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-4 flex flex-col justify-center bg-[#FF0000] px-12 py-14 text-center text-[#160003]">
              <img
                src={EtiquetteRight}
                className="max-w-sm w-full mx-auto"
                alt="basicetik"
              />
              <div className="mt-4 flex items-center justify-center gap-8 text-lg uppercase tracking-[0.4em] text-[#160003]/80">
                <span>←</span>
                <span>1 / 10</span>
                <span>→</span>
              </div>
              <div className="mt-8 h-[1px] w-full bg-[#160003]/50" />
              <p className="mt-6 text-xl uppercase tracking-[0.3em] text-[#160003]">
                No Photography &amp; Phone Use
              </p>
              <p className="mt-6 mx-auto max-w-sm text-center text-[#160003]/75">
                Be present. Strictly no phones at our play party. During our
                events, no recordings or cameras are allowed. Only official
                photographers or designated booths are allowed unless it is
                stated otherwise.
              </p>
            </div>
          </div>

          <div className="bg-black px-6 py-8 text-white">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <p className="text-center font-iowan text-[13px] uppercase tracking-[0.6em] lg:text-left">
                Join our revolution of heart, mind, body, &amp; soul
              </p>
              <a
                href="#events"
                className="group inline-flex items-stretch text-white"
              >
                <span className="border border-[#e0191b] text-[#e0191b] px-10 py-2 text-[12px] uppercase tracking-[0.5em] transition-colors">
                  Upcoming Events
                </span>
                <span className="flex items-center justify-center gap-2 border border-l-0 text-[#e0191b] border-[#e0191b] px-5 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    className="h-3 w-6"
                    fill="none"
                  >
                    <path
                      d="M1 6h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 1l6 5-6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </section>

        <section
          id="who"
          className="bg-cover bg-center text-white min-h-[2200px]"
          style={{ backgroundImage: `url(${importantBg})` }}
        >
          <div>
            <div className="mx-auto max-w-6xl px-6 pt-24">
              <div className="py-12 grid sm:flex sm:gap-24 items-center">
                <p className="font-script text-8xl text-end max-w-[20vw] text-[#ff3944]">
                  What&apos;s On?
                </p>
                <h3 className="mt-2 font-bo text-6xl uppercase tracking-[0.12em] text-[#f7e6d9]">
                  UNLSH Society?
                </h3>
              </div>

              <div className="mt-12 grid gap-10 lg:grid-cols-3">
                {SOCIETY_HIGHLIGHTS.map((item) => (
                  <article
                    key={item.title}
                    className="rounded-[24px] border border-white/15 bg-black/35 px-6 py-8 shadow-lg backdrop-blur"
                  >
                    <h4 className="font-iowan text-lg uppercase tracking-[0.45em] text-[#ff3f43]">
                      {item.title}
                    </h4>
                    <div className="mt-3 h-[5px] w-full bg-[#ff3f43]" />
                    <p className="mt-6 text-sm text-justify leading-relaxed text-white/80">
                      {item.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div id="events" className="mx-auto max-w-6xl px-6 pt-16">
              <div className="grid gap-10 lg:grid-cols-2">
                {OFFERINGS.map((item) => (
                  <article
                    key={item.title}
                    className="flex flex-col rounded-[32px] border border-white/15 bg-black/40 px-10 py-10 shadow-lg"
                  >
                    <h4 className="mt-4 font-iowan text-3xl text-[#ff3944]">
                      {item.title}
                    </h4>
                    <div className="mt-3 h-[5px] w-full bg-[#ff3f43]" />
                    <p className="mt-6 flex-1 text-justify text-sm leading-relaxed text-white/85">
                      {item.blurb}
                    </p>
                    <a
                      href="#events"
                      className="group mt-10 inline-flex items-stretch self-start text-white"
                    >
                      <span className="border border-[#ff3944] text-[#ff3944] px-8 py-2 text-[11px] uppercase tracking-[0.5em] transition-colors ">
                        Upcoming Events
                      </span>
                      <span className="flex items-center text-[#ff3944] justify-center gap-2 border border-l-0 border-[#ff3944] px-5 transition-colors ">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 12"
                          className="h-3 w-6"
                          fill="none"
                        >
                          <path
                            d="M1 6h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="square"
                          />
                          <path
                            d="M12 1l6 5-6 5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinejoin="miter"
                          />
                        </svg>
                      </span>
                    </a>
                  </article>
                ))}
              </div>
            </div>

            <div id="gallery" className="mx-auto max-w-6xl px-6 pb-24 pt-10">
              <div className="mt-12 flex flex-col sm:grid sm:grid-cols-6 auto-rows-[160px] gap-4 md:auto-rows-[200px] lg:auto-rows-[240px]">
                {GALLERY_LAYOUT.map((image) => (
                  <figure
                    key={image.src}
                    className={`group relative overflow-hidden border border-white/10 ${image.classes}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 text-[10px] uppercase tracking-[0.4em] text-white/70 opacity-0 transition group-hover:opacity-100">
                      {image.alt}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#FAF1E6] py-24 text-[#33040a]">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <div>
                <img src={TestimoniTitle} alt="testi title" />
              </div>
            </div>
            <div className="flex flex-1 flex-col rounded-[32px] p-10 text-[#2d0610]">
              <p className="font-iowan text-lg leading-relaxed">
                "{currentTestimonial.quote}"
              </p>
              <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-[#9c1020]">
                - {currentTestimonial.author}
              </p>
              <div className="mt-10 flex items-center justify-between text-xs uppercase tracking-[0.55em] text-[#9c1020]">
                <button
                  type="button"
                  onClick={goToPrevTestimonial}
                  className="flex items-center gap-2 transition hover:text-[#6f0b16]"
                  aria-label="Show previous testimonial"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    className="h-3 w-6"
                    fill="none"
                  >
                    <path
                      d="M23 6H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 1L6 6l6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                  <p className="text-lg">Prev</p>
                </button>
                <span className="text-lg">
                  {formatStepper(testimonialIndex, totalTestimonials)}
                </span>
                <button
                  type="button"
                  onClick={goToNextTestimonial}
                  className="flex items-center gap-2 transition hover:text-[#6f0b16]"
                  aria-label="Show next testimonial"
                >
                  <p className="text-lg">Next</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    className="h-3 w-6"
                    fill="none"
                  >
                    <path
                      d="M1 6h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 1l6 5-6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-[#FF0000] py-24 text-black">
          <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
            <div className="flex flex-1 flex-col gap-8">
              <div>
                <img src={FaqTittle} alt="faq title" />
              </div>
              <div className="h-[3px] w-24 bg-black" />
              <div>
                <p className="font-iowan text-sm uppercase">
                  {currentFaq.question}
                </p>
                <p className="mt-6 max-w-xl text-base leading-relaxed">
                  {currentFaq.answer}
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-6">
              <div className="w-56 h-80">
                <img
                  src={currentFaqImage}
                  alt={currentFaq.question}
                  className="h-full w-full object-cover saturate-0"
                />
              </div>
              <div className="flex mt-14 items-center gap-6 text-xs uppercase">
                <button
                  type="button"
                  onClick={goToPrevFaq}
                  className="flex items-center gap-2 transition hover:text-[#fde0da]"
                  aria-label="Show previous question"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    className="h-3 w-6"
                    fill="none"
                  >
                    <path
                      d="M23 6H9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 1L6 6l6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                  <p className="text-lg">Prev</p>
                </button>
                <span className="text-lg">
                  {formatStepper(faqIndex, totalFaqs)}
                </span>
                <button
                  type="button"
                  onClick={goToNextFaq}
                  className="flex items-center gap-2 transition hover:text-[#fde0da]"
                  aria-label="Show next question"
                >
                  <p className="text-lg">Next</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 12"
                    className="h-3 w-6"
                    fill="none"
                  >
                    <path
                      d="M1 6h14"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="square"
                    />
                    <path
                      d="M12 1l6 5-6 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="miter"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-[#150005] py-12 text-sm text-white/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-sm">
            <p className="font-iowan text-lg uppercase tracking-[0.5em] text-white">
              UNLSH
            </p>
            <p className="mt-4 text-xs leading-relaxed text-white/60">
              Sensual salons, immersive retreats, and community-led play
              experiences in New York and beyond. We gather dreamers who honor
              consent, curiosity, and the power of communal pleasure.
            </p>
            <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-white/40">
              (c) UNLSH Society 2025
            </p>
          </div>
          <div className="grid gap-6 text-[11px] uppercase tracking-[0.45em] text-white/60 sm:grid-cols-2">
            <div className="space-y-3">
              <a href="#top" className="block hover:text-white">
                Home
              </a>
              <a href="#values" className="block hover:text-white">
                Our Values
              </a>
              <a href="#who" className="block hover:text-white">
                Who We Are
              </a>
              <a href="#events" className="block hover:text-white">
                Events
              </a>
            </div>
            <div className="space-y-3">
              <a href="#gallery" className="block hover:text-white">
                Gallery
              </a>
              <a href="#faq" className="block hover:text-white">
                FAQ
              </a>
              <a href="#" className="block hover:text-white">
                Membership
              </a>
              <a href="#top" className="block hover:text-white">
                Back To Top
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
