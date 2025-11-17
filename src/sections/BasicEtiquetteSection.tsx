import { useEffect, useMemo, useRef, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

import EtiquetteTitle from "../assets/basic-ettique-title.png";
import EtiquetteLeft from "../assets/etiquette-left.jpg";
import EtiquetteCenter from "../assets/etiquette-center.jpg";
import EtiquetteRightImage from "../assets/etiquette-right.jpg";
import BlackArrowRight from "../assets/black-arrow-right.svg";
import BlackArrowLeft from "../assets/black-arrow-left.svg";
import { useAdminContentStore } from "@/sections/admin/content-store";
import SanitizedHTML from "@/components/SanitizedHTML";

const ETIQUETTE_SLIDES = [
  {
    title: "Dress Code Mandatory",
    description:
      "Depending on the events you’re joining, participants are expected to follow the theme; no dress code = no entry.",
    image: EtiquetteLeft,
  },
  {
    title: "No Photography",
    description:
      "During our events, no recordings/cameras are allowed. Only official photographers or designated booths are allowed. Unless it’s stated otherwise.",
    image: EtiquetteCenter,
  },
  {
    title: "Minimize Phone Use",
    description: "Be present. Strictly no phones at our Play Party.",
    image: EtiquetteRightImage,
  },
  {
    title: "Ask Before Touching",
    description: "Explicit consent is required every time. No exceptions.",
    image: EtiquetteLeft,
  },
  {
    title: "No Predatory Behavior",
    description:
      "Coercing someone to play = instant ban. No unwanted advances, staring, or discriminatory language.",
    image: EtiquetteCenter,
  },
  {
    title: "Zero Tolerance For Drugs",
    description:
      "Be present. We expect all participants to be sober and play consciously.",
    image: EtiquetteRightImage,
  },
  {
    title: "Respect Identities & Privacy",
    description:
      "Use correct pronouns; ask politely if unsure. All party information stays confidential.",
    image: EtiquetteLeft,
  },
  {
    title: "Do Not Interrupt Scenes",
    description:
      "Never involve yourself in a scene without permission. Negotiate everything. Presence ≠ availability.",
    image: EtiquetteCenter,
  },
  {
    title: "Report Issues Immediately",
    description: "Find our Angels if you feel uncomfortable or unsafe.",
    image: EtiquetteRightImage,
  },
  {
    title: "Break Rules = Expelled",
    description: "No refunds, no second chances. Bye.",
    image: EtiquetteLeft,
  },
];

const formatStepper = (index: number, total: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

type SlideItem = {
  title: string;
  description: string;
  image: string;
};

const BasicEtiquetteSection = () => {
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );
  const etiquetteSlides = useAdminContentStore(
    (state) => state.collections.etiquetteSlides
  );

  const slides: SlideItem[] = useMemo(() => {
    if (!etiquetteSlides.length) {
      return ETIQUETTE_SLIDES;
    }
    return etiquetteSlides.map((slide, index) => ({
      title: slide.title,
      description: slide.description,
      image:
        slide.imageUrl ||
        ETIQUETTE_SLIDES[index % ETIQUETTE_SLIDES.length].image,
    }));
  }, [etiquetteSlides]);

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => setCurrent(api.selectedScrollSnap());
    handleSelect();

    api.on("select", handleSelect);
    api.on("reInit", handleSelect);

    return () => {
      api.off("select", handleSelect);
      api.off("reInit", handleSelect);
    };
  }, [api]);

  const goPrev = () => {
    autoplayPlugin.current?.reset();
    api?.scrollPrev();
  };
  const goNext = () => {
    autoplayPlugin.current?.reset();
    api?.scrollNext();
  };

  return (
    <section id="basic-etiquette" className="bg-[#fef3e7]">
      <Carousel
        className="w-full"
        opts={{ loop: true }}
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent className="-ml-0">
          {slides.map((slide) => (
            <CarouselItem key={`${slide.title}-${slide.description}`} className="!pl-0 h-[80vh]">
              <div className="grid gap-0 lg:grid-cols-2">
                <div className="h-full w-full">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-[80vh] w-full object-cover"
                  />
                </div>
                <div className="flex flex-col justify-center bg-[#FF0000] px-12 py-14 text-center text-[#160003]">
                  <img
                    src={EtiquetteTitle}
                    className="max-w-sm w-full mx-auto"
                    alt="basic etik title"
                  />
                  <div className="mt-4 flex items-center justify-center gap-8 text-lg font-condor uppercase text-[#160003]/80">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex items-center gap-2 transition"
                      aria-label="Show previous testimonial"
                    >
                      <img src={BlackArrowLeft} alt="black-arrow-left" />
                    </button>
                    <span className="text-2xl">
                      {formatStepper(current, slides.length)}
                    </span>
                    <button
                      type="button"
                      onClick={goNext}
                      className="flex items-center gap-2 transition"
                      aria-label="Show next testimonial"
                    >
                      <img src={BlackArrowRight} alt="black-arrow-right" />
                    </button>
                  </div>
                  <div className="mt-8 h-[1px] w-full bg-[#160003]/50" />
                  <p className="mt-6 text-xl uppercase tracking-[0.3em] text-[#160003]">
                    {slide.title}
                  </p>
                  <SanitizedHTML
                    html={slide.description}
                    className="mt-6 mx-auto max-w-sm text-center text-[#160003]/75"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

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
  );
};

export default BasicEtiquetteSection;
