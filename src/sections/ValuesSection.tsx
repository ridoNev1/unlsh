import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";

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
];

const VALUE_HIGHLIGHTS = [
  { title: SafeSpaceText, image: gallery5 },
  { title: ConnectionText, image: gallery4 },
  { title: ConsentText, image: gallery8 },
  { title: AuthenticityText, image: valuesAuthenticity },
  { title: FreedomText, image: gallery3 },
];

const ValuesSection = () => {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));

  return (
    <section id="values" className="beige-background text-[#2e0208]">
      <Carousel
        plugins={[plugin.current]}
        className="w-screen"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex items-center h-[260px] sm:h-[94px] justify-center gap-6 px-6 text-[#7d0f16]">
              <div className="flex items-center gap-6 py-5">
                <img
                  src={RedArrowLeft}
                  alt="red-arrow-left"
                  className="hidden sm:block"
                />
                <img
                  src={OurValues}
                  alt="Our-values"
                  className="w-full sm:w-[15vw]"
                />
                <img
                  src={RedArrowRight}
                  alt="red-arrow-right"
                  className="hidden sm:block"
                />
              </div>
            </div>
          </CarouselItem>
          {VALUE_CAROUSEL_ITEMS.map((item) => (
            <CarouselItem key={item.title}>
              <div
                className={`flex h-[260px] sm:h-[94px] w-full flex-col justify-center gap-8 px-8 sm:flex-row sm:items-center sm:gap-16 sm:px-16 ${item.wrapperClasses}`}
              >
                <div className="flex w-full flex-col gap-4 uppercase sm:w-[10%]">
                  <span className="font-avenir text-lg">{item.title}</span>
                </div>
                <span
                  className={`hidden h-20 w-px origin-center rotate-45 sm:block ${item.accentClasses}`}
                  aria-hidden="true"
                />
                <p
                  className={`w-full text-xs leading-relaxed sm:w-4/5 md:w-4/5 ${item.descriptionClasses}`}
                >
                  {item.description}
                </p>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
            <div className="absolute min-h-full inset-x-0 bottom-0 flex flex-col items-center justify-center gap-4 px-4 text-center text-white">
              <img src={item.title} alt="images-that-really-matter" />
            </div>
          </article>
        ))}
      </div>

      <div className="mx-auto py-4 font-iowan text-xl w-full px-8 font-iow text-center uppercase text-[#5b131f] tracking-[0.2em]">
        We create safe spaces to explore desire, embrace authenticity, and build
        connections.
      </div>
    </section>
  );
};

export default ValuesSection;
