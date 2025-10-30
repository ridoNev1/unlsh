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
  },
  {
    title: "Consent & Connection Salon",
    date: "28 March 2025",
    location: "Members Lounge, Seminyak",
    description:
      "An intimate night for newcomers to meet the community. Expect facilitated conversations, rope tastings, lap dance workshops, and guided aftercare rituals.",
  },
  {
    title: "Uluwatu Coastal Retreat",
    date: "24 — 27 April 2025",
    location: "Clifftop Residency, Uluwatu",
    description:
      "Four days of curated beach excursions, sensual rituals, and sunset play parties. Includes boutique lodging, gourmet dining, and mentorship sessions with our Angels.",
  },
];

const UpcomingEventsPage = () => {
  return (
    <div className="min-h-screen bg-[#120104] font-avenir text-white">
      <Header />
      <main>
        <section
          className="relative isolate overflow-hidden bg-[#150005]"
          style={{ backgroundImage: `url(${importantBg})`, backgroundSize: "cover" }}
        >
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 text-center">
            <h1 className="font-bo text-5xl uppercase tracking-[0.18em] text-[#fde9df]">
              Upcoming Events
            </h1>
            <p className="mx-auto max-w-3xl text-base text-[#fde9df]/85">
              RSVP windows open in waves for members and invited guests. Browse the next experiences on our calendar, explore the mood, and register your interest early—slots fill quickly.
            </p>
            <div className="mt-6 flex justify-center gap-6 text-xs uppercase tracking-[0.4em]">
              <Link
                to="/#events"
                className="border border-[#fde9df] px-8 py-3 text-[#fde9df] transition hover:bg-[#fde9df] hover:text-[#150005]"
              >
                Back To Experiences
              </Link>
              <a
                href="mailto:rsvp@unlsh.society"
                className="border border-transparent bg-[#fde9df] px-8 py-3 text-[#150005] transition hover:bg-white"
              >
                Request Invite
              </a>
            </div>
          </div>
        </section>

        <section className="bg-[#FAF1E6] py-20 text-[#2d0610]">
          <div className="mx-auto grid max-w-5xl gap-12 px-6">
            {UPCOMING_EVENTS.map((event) => (
              <article
                key={event.title}
                className="border border-[#d9b3a3] bg-white/80 p-8 shadow-lg transition hover:border-[#bb7560]"
              >
                <header className="flex flex-col gap-2 text-left md:flex-row md:items-center md:justify-between">
                  <h2 className="font-bo text-3xl uppercase tracking-[0.2em]">
                    {event.title}
                  </h2>
                  <div className="text-xs uppercase tracking-[0.4em] text-[#7d0f16]">
                    <span>{event.date}</span>
                    <span className="mx-3 text-[#d9b3a3]">•</span>
                    <span>{event.location}</span>
                  </div>
                </header>
                <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[#3a0c12]">
                  {event.description}
                </p>
              </article>
            ))}
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
                Every gathering blends sensual education, play, and connection. Explore a preview of the signature formats you’ll encounter across the season.
              </p>
            </header>

            <div className="grid gap-8 md:grid-cols-2">
              {OFFERINGS.map((offering) => (
                <article
                  key={offering.title}
                  className="flex h-full flex-col border border-white/15 bg-black/40 px-8 py-8 shadow-lg"
                >
                  <h3 className="font-iowan text-2xl text-[#ff3944]">
                    {offering.title}
                  </h3>
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
