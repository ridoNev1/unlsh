import { useEffect, useRef, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import TestimoniTitle from "../assets/Testimoni-title.png";
import BlackArrowRight from "../assets/black-arrow-right.svg";
import BlackArrowLeft from "../assets/black-arrow-left.svg";

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

const formatStepper = (index: number, total: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

const TestimonialsSection = () => {
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 5000, stopOnInteraction: false })
  );

  useEffect(() => {
    if (!api) return;

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

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
    <section className="bg-[#FAF1E6] py-24 text-[#33040a]">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-6 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <div>
            <img src={TestimoniTitle} alt="testi title" />
          </div>
        </div>
        <Carousel
          className="flex flex-1 flex-col rounded-[32px] p-10 text-[#2d0610]"
          opts={{ loop: true }}
          setApi={setApi}
          plugins={[autoplayPlugin.current]}
          onMouseEnter={autoplayPlugin.current.stop}
          onMouseLeave={autoplayPlugin.current.reset}
        >
          <CarouselContent>
            {TESTIMONIALS.map((item) => (
              <CarouselItem key={item.quote}>
                <div className="flex h-full flex-col">
                  <p className="font-iowan text-lg leading-relaxed">
                    "{item.quote}"
                  </p>
                  <p className="mt-6 text-[11px] uppercase tracking-[0.45em] ">
                    - {item.author}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="mt-10 flex items-center gap-6 uppercase font-condor">
            <button
              type="button"
              onClick={goPrev}
              className="flex items-center gap-2 transition"
              aria-label="Show previous testimonial"
            >
              <img src={BlackArrowLeft} alt="black-arrow-left" />
            </button>
            <span className="text-2xl">
              {formatStepper(current, TESTIMONIALS.length)}
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
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
