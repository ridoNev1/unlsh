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
    quote: "i love the party 😘 thank you for the organized & safe party 🙏🏼",
    author: "Community Member",
  },
  {
    quote:
      "I loved the party and the community vibe, everything was really nicely organised, great job!! It felt like a big party in a friends house. I could see that you really care about it and about having safe and fun environment for people to play. I loved the space, food, themes of the rooms, lighting, introduction part and the people as well.",
    author: "Guest",
  },
  {
    quote: "It was an experience",
    author: "Guest",
  },
  {
    quote:
      "Intro was a great way to get things started. People were all very friendly!",
    author: "Guest",
  },
  {
    quote:
      "Overall a great experience. Everyone was very welcoming and I had a good time :)",
    author: "Guest",
  },
  {
    quote: "Very well thought & it was a very interesting sensory experience",
    author: "Community Member",
  },
  {
    quote:
      "We both thought it was very professional and were impressed with everything from the organisation to the friendliness and care given by the angels. It was our first time so we were shy but its definitely opened a new world for us that we want to be a part of, so thank you all for this.",
    author: "First-time Couple",
  },
  {
    quote: "Everything was great, would love to come to your parties more!",
    author: "Guest",
  },
  {
    quote:
      "A lot of thought was put into this and the experience was very exciting for us!",
    author: "Guest",
  },
  {
    quote:
      "Congrats for the organization! 👏 That's something for 100 persons! 💪 I really loved your way of being super natural & open, the playfulness present...",
    author: "Community Member",
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
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:items-center">
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
