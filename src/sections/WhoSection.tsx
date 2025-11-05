import { useEffect, useState } from "react";
import type { UseEmblaCarouselType } from "embla-carousel-react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import { Dialog, DialogContent } from "../components/ui/dialog";
import { OFFERINGS } from "../data/events";
import importantBg from "../assets/important-bg.png";
import galleryLargeB from "../assets/gallery-large-2.jpg";
import galleryWide from "../assets/gallery-wide-1.jpg";
import CtaPlay from "../assets/cta-play.jpg";
import EtiquetteGal from "../assets/etiquette-right.jpg";
import galleryLargeC from "../assets/gallery-large-3.jpg";
import gallery8 from "../assets/gallery-8.jpg";
import heroSecondary from "../assets/hero-secondary.jpg";
import galleryLargeA from "../assets/gallery-large-1.jpg";
import valuesFreedom from "../assets/value-freedom.jpg";
import valuesConsent from "../assets/value-consent.jpg";
import EtiquetteCenter from "../assets/etiquette-center.jpg";

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
    src: heroSecondary,
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

const WhoSection = () => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [galleryApi, setGalleryApi] = useState<UseEmblaCarouselType[1] | null>(
    null
  );

  useEffect(() => {
    if (isGalleryOpen && galleryApi) {
      galleryApi.scrollTo(selectedImage);
    }
  }, [isGalleryOpen, galleryApi, selectedImage]);

  const openGallery = (index: number) => {
    setSelectedImage(index);
    setIsGalleryOpen(true);
  };

  return (
    <section
      id="who"
      className="bg-contain bg-no-repeat sm:bg-cover sm:bg-center text-white min-h-[2200px]"
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
                className="border border-white/15 bg-black/35 px-6 py-8 shadow-lg backdrop-blur"
              >
                <h4 className="mt-4 font-iowan text-2xl text-[#ff3944]">
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
                className="flex flex-col border border-white/15 bg-black/40 px-10 py-10 shadow-lg"
              >
                <h4 className="mt-4 font-iowan text-3xl text-[#ff3944]">
                  {item.title}
                </h4>
                <div className="mt-3 h-[5px] w-full bg-[#ff3f43]" />
                <p className="mt-6 flex-1 text-justify text-sm leading-relaxed text-white/85">
                  {item.blurb}
                </p>
                <a
                  href="/upcoming-events"
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

        <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
          <div
            id="gallery"
            className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10"
          >
            <div className="mt-12 flex flex-col sm:grid sm:grid-cols-6 auto-rows-[160px] gap-4 md:auto-rows-[200px] lg:auto-rows-[240px]">
              {GALLERY_LAYOUT.map((image, index) => (
                <figure
                  key={image.src}
                  className={`group relative overflow-hidden border border-white/10 cursor-pointer ${image.classes}`}
                  onClick={() => openGallery(index)}
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

          <DialogContent className="!w-[80vw] !max-w-none !sm:h-[90vh] border border-white/20 bg-black/90 p-4 sm:p-8 text-white flex flex-col overflow-hidden">
            <Carousel
              opts={{ loop: true, startIndex: selectedImage }}
              setApi={setGalleryApi}
              className="relative flex-1"
            >
              <CarouselContent className="-ml-2 sm:-ml-4 h-full">
                {GALLERY_LAYOUT.map((image) => (
                  <CarouselItem
                    key={image.src}
                    className="flex h-full flex-col items-center justify-center overflow-hidden pl-2 sm:pl-4"
                  >
                    <div className="flex h-full w-full max-w-[82vw] lg:max-w-[1000px] flex-col items-center justify-center gap-6">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="mx-auto h-auto max-h-[calc(90vh-140px)] w-auto max-w-full object-contain"
                      />
                      <p className="text-center text-xs uppercase tracking-[0.35em] text-white/70">
                        {image.alt}
                      </p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-0 border border-white/30 bg-black/40 text-white hover:bg-black/60" />
              <CarouselNext className="right-0 border border-white/30 bg-black/40 text-white hover:bg-black/60" />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default WhoSection;
