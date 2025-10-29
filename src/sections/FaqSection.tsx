import { useEffect, useRef, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import FaqTitle from "../assets/faq-title.png";
import gallery1 from "../assets/gallery-1.jpg";
import gallery3 from "../assets/gallery-3.jpg";
import gallery7 from "../assets/gallery-7.jpg";
import BlackArrowRight from "../assets/black-arrow-right.svg";
import BlackArrowLeft from "../assets/black-arrow-left.svg";

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

const formatStepper = (index: number, total: number) =>
  `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;

const FaqSection = () => {
  const [api, setApi] = useState<UseEmblaCarouselType[1] | null>(null);
  const [current, setCurrent] = useState(0);
  const autoplayPlugin = useRef(
    Autoplay({ delay: 4500, stopOnInteraction: false })
  );

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
    <section id="faq" className="bg-[#FF0000] py-24 text-black">
      <Carousel
        className="mx-auto max-w-6xl px-6"
        opts={{ loop: true }}
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        onMouseEnter={autoplayPlugin.current.stop}
        onMouseLeave={autoplayPlugin.current.reset}
      >
        <CarouselContent className="-ml-0">
          {FAQS.map((faq, index) => (
            <CarouselItem key={faq.question} className="!pl-0">
              <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
                <div className="flex flex-1 flex-col gap-8">
                  <div>
                    <img src={FaqTitle} alt="faq title" />
                  </div>
                  <div className="h-[3px] w-24 bg-black" />
                  <div>
                    <p className="font-iowan text-sm uppercase">
                      {faq.question}
                    </p>
                    <p className="mt-6 max-w-xl text-base leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
                <div className="flex flex-1 flex-col items-center gap-6">
                  <div className="w-56 h-80">
                    <img
                      src={FAQ_IMAGES[index % FAQ_IMAGES.length]}
                      alt={faq.question}
                      className="h-full w-full object-cover saturate-0"
                    />
                  </div>
                  <div className="mt-14 flex items-center justify-center gap-12 text-xs font-condor uppercase">
                    <button
                      type="button"
                      onClick={goPrev}
                      className="flex items-center gap-2 transition"
                      aria-label="Show previous testimonial"
                    >
                      <img src={BlackArrowLeft} alt="black-arrow-left" />
                    </button>
                    <span className="text-2xl">
                      {formatStepper(current, FAQS.length)}
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
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default FaqSection;
