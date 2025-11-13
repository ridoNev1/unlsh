import { useMemo } from "react";

import OurValues from "../assets/our_values.svg";
import RedArrowLeft from "../assets/red-arrow-left.svg";
import RedArrowRight from "../assets/red-arrow-right.svg";
import valuesAuthenticity from "../assets/value-authenticity.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery4 from "../assets/gallery-4.jpg";
import gallery5 from "../assets/gallery-5.jpg";
import gallery8 from "../assets/gallery-8.jpg";
import AuthenticityText from "../assets/typography/authenticity_text.svg";
import ConnectionText from "../assets/typography/connection_text.svg";
import ConsentText from "../assets/typography/consent_text.svg";
import FreedomText from "../assets/typography/freedom_text.svg";
import SafeSpaceText from "../assets/typography/safe_space_text.svg";

const VALUE_CAROUSEL_ITEMS = [
  {
    title: "Safe Space",
    description:
      "We foster a judgement-free environment where people can explore their identities, desires, and sexuality without fear or shame or discrimination. At our parties, we expect all attendees to be respectful & kind to each other at all times.",
    wrapperClasses: "bg-[#e11019] text-[#fde9df]",
    accentClasses: "bg-[#fde9df]/80",
    descriptionClasses: "text-[#fde9df]/85",
  },
  {
    title: "Connection",
    description:
      "Genuine connections is the foundation of our community. Our party thrives on trust and openness. We create opportunities for deep respectful connections that honor each person's needs and desires.",
    wrapperClasses: "bg-[#050505] text-[#f4f1ee]",
    accentClasses: "bg-[#f4f1ee]/70",
    descriptionClasses: "text-[#f4f1ee]/80",
  },
  {
    title: "Consent",
    description:
      "The golden rule of UNLSH. Everything we do is rooted in enthusiastic, informed, and ongoing consent. We prioritise clear communication, boundaries, and mutual respect in all interactions - because autonomy matters. Any form of touching without permission is unacceptable and will result in immediate removal from the event and being banned from all future parties. No second chances.",
    wrapperClasses: "bg-[#f3e4d8] text-[#7b1218]",
    accentClasses: "bg-[#7b1218]/60",
    descriptionClasses: "text-[#7b1218]/80",
  },
  {
    title: "Authenticity",
    description:
      "Real people, real body, real vibe. No paid participants, no masks, no pretense—just genuine human beings. We encourage self-discovery, honesty, and vulnerability. Your true self is welcome here, without societal expectations or pressure to conform. Everyone is fully engrossed and actively contributing to the experience.",
    wrapperClasses: "bg-[#050505] text-[#f4f1ee]",
    accentClasses: "bg-[#f4f1ee]/70",
    descriptionClasses: "text-[#f4f1ee]/80",
  },
  {
    title: "Freedom",
    description:
      "We celebrate sexual liberation in all its forms (as long as it’s consensual and ethical). Whether you’re curious, experienced, or somewhere in between, you have the right to explore your desires without oppression or stigma. We believe our bodies are vessels for pleasure, learning, and growth, deserving of love, respect, and care. ",
    wrapperClasses: "bg-[#e11019] text-[#fde9df]",
    accentClasses: "bg-[#fde9df]/80",
    descriptionClasses: "text-[#fde9df]/85",
  },
];

const VALUE_HIGHLIGHTS = [
  { labelSrc: SafeSpaceText, image: gallery5 },
  { labelSrc: ConnectionText, image: gallery4 },
  { labelSrc: ConsentText, image: gallery8 },
  { labelSrc: AuthenticityText, image: valuesAuthenticity },
  { labelSrc: FreedomText, image: gallery3 },
];

const ValuesSection = () => {
  const valueCards = useMemo(() => {
    return VALUE_HIGHLIGHTS.map((highlight, index) => ({
      ...VALUE_CAROUSEL_ITEMS[index],
      image: highlight.image,
      labelSrc: highlight.labelSrc,
    }));
  }, []);

  return (
    <section id="values" className="beige-background text-[#2e0208]">
      <div className="flex items-center h-[260px] sm:h-[94px] justify-center gap-6 px-6 text-[#7d0f16]">
        <div className="flex items-center gap-6 py-5">
          <img
            src={RedArrowLeft}
            alt="red-arrow-left"
            className="hidden sm:block cursor-pointer"
          />
          <img
            src={OurValues}
            alt="Our-values"
            className="w-full sm:w-[15vw]"
          />
          <img
            src={RedArrowRight}
            alt="red-arrow-right"
            className="hidden sm:block cursor-pointer"
          />
        </div>
      </div>

      <div
        className=" grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-5"
        id="card-control-carousel"
      >
        {valueCards.map((item) => (
          <article
            key={item.title}
            className="group relative h-[400px] cursor-pointer [perspective:1200px]"
          >
            <div className="relative h-full w-full transition duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
              <div className="absolute inset-0 overflow-hidden [backface-visibility:hidden]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/20 to-black/70" />
                <div className="absolute inset-x-0 bottom-0 flex min-h-full flex-col items-center justify-center gap-4 px-4 text-center text-white">
                  <img src={item.labelSrc} alt="value-title" />
                </div>
              </div>
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-sm leading-relaxed [backface-visibility:hidden] [transform:rotateY(180deg)] ${item.wrapperClasses}`}
              >
                <span className="font-avenir text-lg uppercase">{item.title}</span>
                <span className={`h-12 w-px ${item.accentClasses}`} aria-hidden="true" />
                <p className={`text-xs sm:text-sm ${item.descriptionClasses}`}>
                  {item.description}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto py-4 font-iowan text-xl w-full px-8 font-iow text-center uppercase text-[#88181a] tracking-[0.2em]">
        We create safe spaces to explore desire, embrace authenticity, and build
        connections.
      </div>
    </section>
  );
};

export default ValuesSection;
