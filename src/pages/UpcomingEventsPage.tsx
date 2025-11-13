import { Link } from "react-router-dom";
import Header from "../sections/Header";
import Footer from "../sections/Footer";
import { OFFERINGS } from "../data/events";
import importantBg from "../assets/important-bg.png";

const UPCOMING_EVENTS = [
  {
    title: "Velvet Masquerade Play Party",
    date: "15 March 2025",
    location: "Private Villa, Bali",
    description:
      "A sensorial evening of curated performances, themed play rooms, and a meticulously balanced guest list. Masks on arrival, lingerie or formal fetish attire required.",
    highlights: ["Masks Required", "Curated Scenes", "60 Guests"],
  },
  {
    title: "Consent & Connection Salon",
    date: "28 March 2025",
    location: "Members Lounge, Seminyak",
    description:
      "An intimate night for newcomers to meet the community. Expect facilitated conversations, rope tastings, lap dance workshops, and guided aftercare rituals.",
    highlights: ["Newcomer Friendly", "Guided Workshops", "Aftercare Rituals"],
  },
  {
    title: "Uluwatu Coastal Retreat",
    date: "24 — 27 April 2025",
    location: "Clifftop Residency, Uluwatu",
    description:
      "Four days of curated beach excursions, sensual rituals, and sunset play parties. Includes boutique lodging, gourmet dining, and mentorship sessions with our Angels.",
    highlights: ["All-Inclusive Stay", "Sunset Ceremonies", "Mentorship Circles"],
  },
];

const UpcomingEventsPage = () => {
  const featuredEvent = UPCOMING_EVENTS[0];

  return (
    <div className="min-h-screen bg-[#120104] font-avenir text-white">
      <Header />
      <main>
        <section
          className="relative isolate overflow-hidden bg-[#150005]"
          style={{ backgroundImage: `url(${importantBg})`, backgroundSize: "cover" }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c0409]/92 via-[#150005]/88 to-[#340a16]/90" />
          <div className="relative mx-auto max-w-6xl px-6 py-24">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_.9fr]">
              <div className="flex flex-col items-start text-left">
                <span className="text-[10px] uppercase tracking-[0.5em] text-[#ff6f61]">
                  Season 01 / 2025
                </span>
                <h1 className="mt-4 font-bo text-5xl uppercase tracking-[0.18em] text-[#fde9df] md:text-[3.6rem]">
                  Upcoming Events
                </h1>
                <p className="mt-6 max-w-xl text-base text-[#fde9df]/80">
                  RSVP windows open in waves for members and invited guests. Explore the next experiences on our calendar, immerse in the mood, and register your interest early—every room is intentionally kept intimate.
                </p>
                <div className="mt-10 flex flex-wrap gap-4 text-xs uppercase tracking-[0.4em]">
                  <Link
                    to="/#events"
                    className="border border-[#fde9df]/60 px-8 py-3 text-[#fde9df] transition hover:border-transparent hover:bg-[#fde9df] hover:text-[#150005]"
                  >
                    Back To Experiences
                  </Link>
                  <Link
                    to="/contact"
                    className="border border-transparent bg-[#fde9df] px-8 py-3 text-[#150005] transition hover:bg-white"
                  >
                    Request Invite
                  </Link>
                </div>
                <p className="mt-8 max-w-xl text-sm text-[#fde9df]/60">
                  Members receive curated recommendations, dress code briefings, and staggered RSVP
                  access tailored to their desires. Share your intentions and our concierge will
                  guide you toward the right gathering.
                </p>
              </div>

              {featuredEvent && (
                <article className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#24050d]/60 p-10 shadow-[0_40px_90px_-50px_rgba(255,105,97,0.75)] backdrop-blur">
                  <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff6f61]/25 blur-3xl" />
                  <div className="pointer-events-none absolute -bottom-16 right-0 h-48 w-48 rounded-full bg-[#ffe1d2]/10 blur-3xl" />
                  <div className="relative flex h-full flex-col gap-6">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[#ff6f61]/30 bg-[#ff6f61]/10 px-4 py-2 text-[10px] uppercase tracking-[0.45em] text-[#ff9a8e]">
                      Next Release
                    </span>
                    <h2 className="font-bo text-3xl uppercase tracking-[0.22em] text-[#fde9df]">
                      {featuredEvent.title}
                    </h2>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.4em] text-[#fde9df]/70">
                      <span>{featuredEvent.date}</span>
                      <span className="h-px w-8 bg-[#fde9df]/40" />
                      <span>{featuredEvent.location}</span>
                    </div>
                    <p className="text-sm leading-relaxed text-[#fde9df]/75">
                      {featuredEvent.description}
                    </p>
                    {featuredEvent.highlights?.length ? (
                      <ul className="mt-auto grid gap-3 text-left">
                        {featuredEvent.highlights.map((highlight) => (
                          <li
                            key={highlight}
                            className="flex items-center gap-3 text-xs tracking-[0.18em] text-[#fde9df]/70"
                          >
                            <span className="inline-block h-2 w-2 rounded-full bg-[#ff6f61]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                    <Link
                      to="/contact"
                      className="mt-8 inline-flex w-fit items-center gap-3 rounded-full border border-[#ff6f61]/50 px-6 py-3 text-[11px] uppercase tracking-[0.4em] text-[#ff9a8e] transition hover:border-[#fde9df] hover:text-[#fde9df]"
                    >
                      Request RSVP Window
                    </Link>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#FAF1E6] py-24 text-[#2d0610]">
          <div className="mx-auto max-w-6xl px-6">
            <header className="flex flex-col gap-4 text-left md:flex-row md:items-end md:justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.5em] text-[#7d0f16]">
                  Calendar Snapshot
                </span>
                <h2 className="mt-3 font-bo text-4xl uppercase tracking-[0.18em] text-[#2d0610]">
                  Intimate Gatherings Ahead
                </h2>
              </div>
              <p className="max-w-xl text-sm text-[#3a0c12]/80">
                Our facilitators craft each moment around consent, curiosity, and sensory interplay.
                Discover which format aligns with your intentions, then reach out to our concierge
                for availability.
              </p>
            </header>

            <div className="mt-16 grid gap-10">
              {UPCOMING_EVENTS.map((event, index) => {
                const isFeatured = index === 0;

                return (
                  <article
                    key={event.title}
                    className="relative overflow-hidden rounded-3xl border border-[#e2c5b5] bg-white/85 px-8 py-12 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-[#bb7560] hover:shadow-xl md:px-10"
                  >
                    <span className="absolute -top-12 -right-10 hidden h-32 w-32 rounded-full bg-[#ffb5a4]/25 blur-3xl md:block" />
                    <span className="absolute -left-5 top-10 hidden h-14 w-14 items-center justify-center rounded-full bg-[#ff6f61] font-bo text-lg uppercase tracking-[0.2em] text-white md:flex">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="relative flex flex-col gap-6 md:pl-10">
                      <header className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                        <div>
                          <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[#7d0f16]">
                            <span>{event.date}</span>
                            <span className="h-px w-8 bg-[#d9b3a3]" />
                            <span>{event.location}</span>
                          </div>
                          <h3 className="mt-4 font-bo text-3xl uppercase tracking-[0.2em] text-[#350910]">
                            {event.title}
                          </h3>
                          {isFeatured ? (
                            <span className="mt-2 inline-flex items-center gap-2 rounded-full border border-[#bb7560] px-4 py-1 text-[10px] uppercase tracking-[0.35em] text-[#7d0f16]">
                              Featured Release
                            </span>
                          ) : null}
                        </div>
                        <Link
                          to="/contact"
                          className="inline-flex items-center justify-center rounded-full border border-[#bb7560] px-6 py-3 text-[11px] uppercase tracking-[0.35em] text-[#7d0f16] transition hover:bg-[#bb7560] hover:text-white"
                        >
                          Join Waitlist
                        </Link>
                      </header>
                      <p className="text-sm leading-relaxed text-[#3a0c12]">
                        {event.description}
                      </p>
                      {event.highlights?.length ? (
                        <ul className="flex flex-wrap gap-3">
                          {event.highlights.map((highlight) => (
                            <li
                              key={highlight}
                              className="rounded-full border border-[#d9b3a3] bg-[#fef4eb] px-4 py-2 text-[0.68rem] uppercase tracking-[0.35em] text-[#7d0f16]"
                            >
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="relative isolate overflow-hidden bg-[#1c0409] py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-[#320910]/92 via-[#130207]/90 to-[#050103]/95" />
          <div className="absolute -top-32 left-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[#ff6f61]/20 blur-3xl" />
          <div className="absolute -bottom-10 right-10 h-48 w-48 rounded-full bg-[#ffe1d2]/10 blur-3xl" />
          <div className="relative mx-auto max-w-5xl px-6 text-center text-[#fde9df]">
            <span className="text-xs uppercase tracking-[0.5em] text-[#ff6f61]">
              Become A Member
            </span>
            <h2 className="mt-4 font-bo text-4xl uppercase tracking-[0.2em]">
              Secure Your RSVP Window
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-sm text-[#fde9df]/70">
              Share your desires and boundaries with our concierge. We curate matches, craft
              introductions, and unlock the spaces that fit your expression—long before RSVP links go
              public.
            </p>

            <div className="mt-12 grid gap-6 text-left md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bo text-lg uppercase tracking-[0.2em] text-[#ff9a8e]">
                  1. Introduce Yourself
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#fde9df]/75">
                  Complete a private intake so we can understand your dynamic, curiosities, and past
                  experience in curated play.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bo text-lg uppercase tracking-[0.2em] text-[#ff9a8e]">
                  2. Curate The Fit
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#fde9df]/75">
                  Our Angels pair you with the evenings and play partners that mirror your boundaries
                  and stretch you gently.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <h3 className="font-bo text-lg uppercase tracking-[0.2em] text-[#ff9a8e]">
                  3. RSVP With Ease
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#fde9df]/75">
                  Receive priority RSVP windows, dress code briefings, and concierge support before,
                  during, and after each gathering.
                </p>
              </div>
            </div>

            <div className="mt-12 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-[0.4em]">
              <Link
                to="/contact"
                className="border border-transparent bg-[#fde9df] px-8 py-3 text-[#150005] transition hover:bg-white"
              >
                Request Invite
              </Link>
              <Link
                to="/#events"
                className="border border-[#fde9df]/60 px-8 py-3 text-[#fde9df] transition hover:border-transparent hover:bg-[#fde9df] hover:text-[#150005]"
              >
                Explore Experiences
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-[#120104] py-20">
          <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6">
            <header className="flex flex-col gap-4 text-center text-[#f7e6d9]">
              <span className="text-xs uppercase tracking-[0.5em] text-[#ff6f61]">
                What To Expect
              </span>
              <h2 className="font-bo text-4xl uppercase tracking-[0.2em]">
                Curated Experiences
              </h2>
              <p className="mx-auto max-w-3xl text-sm text-white/70">
                Every gathering blends sensual education, play, and connection. Explore a preview of
                the signature formats you’ll encounter across the season.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
              {OFFERINGS.map((offering) => (
                <article
                  key={offering.title}
                  className="flex h-full flex-col border border-white/15 bg-black/40 px-8 py-8 shadow-lg"
                >
                  <h3 className="font-iowan text-2xl text-[#ff3944]">{offering.title}</h3>
                  <div className="mt-3 h-[4px] w-16 bg-[#ff3944]" />
                  <p className="mt-6 text-sm leading-relaxed text-white/85">
                    {offering.blurb}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default UpcomingEventsPage;
