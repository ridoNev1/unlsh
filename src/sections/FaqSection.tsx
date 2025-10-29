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
    question: "What’s the vibe like?",
    answer:
      "First of all, we have a strict 50:50 ratio between man & woman, of course more women is always favored. This mix derives from singles & couples. Our community is international and english speaking people, varied from European countries, Asian, Australian, US, and the UK. We have a high standard on selecting the people and maintain the participants at mid 20s - early 50s young who are fit, well-groomed, and attractive. Our golden standard is those who understand consent and well-behaved. During a party, we have Angels who will always keep an eye on everyone and we won’t hesitate to remove anyone who behaving badly.",
  },
  {
    question: "I have never been to any community like yours. Is it okay?",
    answer:
      "Yes yes yes, absolutely! We gotta start somewhere, right? And hopefully, we give you a good first impression by joining any of our events. We welcome any gender, any level of sexpertise, and any sexuality! You’re here to experience something new, connect with like-minded individuals, and hopefully learn something new. We aim to open your eyes, heart, mind and legs 😉",
  },
  {
    question:
      "Is it mandatory to join Munch first before joining the Play Party?",
    answer:
      "Yes and No. Yes, we encourage you to join our Munch first if you’d like to connect with our community, and through this event, we also get to know your vibe personally. But the thing is, our team is not always available to organize a regular Munch every month, so it’s difficult to maintain our regular schedule—we’re working on it! Therefore, no, it is not mandatory to attend Munch first before joining the Play Party. As a newcomer, it is mandatory to fill in our form before joining any of our event. This is our way to know a bit about you and your experience in the sex-positive world. So, pour your heart when filling in the form, because we know if you aren’t being genuine.",
  },
  {
    question: "Is your Play Party safe?",
    answer:
      "Yes. Privacy discretion is always encouraged—what happens at the party, stays at the party. This means the location of our event, personal identity of each participant, and any activity during the event are not to be discussed outside of the event. Our community is very discreet and curated, and your safety is our number one priority. Safety also applies to your sexual health status. Our members are expected to be regularly tested and aware of STI risk. Below we put list of clinics that you can go to if you’re in Bali. We also have a bracelet at the Play Party when you have submitted your recent negative STI result. Please note that a condom is to be used at all times during play.",
  },
  {
    question: "Can I come as a single?",
    answer:
      "Why not? If you’re confident enough to come as a single, please come! We understand you may be shy or nervous, but our team will do our best to make you feel welcome and help you connect with our other members. This applies to any of our events, whether you’re coming to our Rope Jam, Munch or even Play Party! We hope that you’re proactive in reaching people out and able to read the room to start a conversation with others—that’s how you connect with people.",
  },
  {
    question: "How much is it?",
    answer:
      "Great question! It varies. Our Rope Jam is free most of the times, and donation is sometimes encouraged. Munch sometimes ranges from 100,000 - 250,000 IDR this is to cover your first drink charge. Workshops may vary from 500,000 - 4,000,000 IDR depending on the kind of workshops, the duration, and the value that you gain. While, Play Party ranges from 500,000 - 3,500,000 IDR depends on your gender and status.",
  },
  {
    question: "Where to get tested?",
    answer:
      "At our Play Party, we expect our participants & members to submit their recent (no longer than 3 months) STI result. Mandatory tests include HIV, and Syphilis. Best to have Genital Swab for Gonorrhoea & Chlamydia, and optional for others; Hepatitis B & C, HPV, HSV-1 & 2, Mycoplasma Genitalium, Ureaplasma urealyticum, Bacterial Vaginosis, Trichomoniasis. Depends on where you are staying, we believe that every clinic in Bali provide STI testing. But, to make your life easier, here are some clinics that we recommend: Bali Medika Clinic (10% member discount, +62 812-3891-7654), Bali Peduli (+62 812-3889-5287), Ananta Clinical Laboratory (home service, +62 821-4675-1699), Puri Medical Clinic (+62851-8686-4059), Maha Medicare Clinic Seminyak (+62 812-3091-1811), Rumah Sakit Siloam Denpasar (0361-779900), Laboratorium Prodia (1500 830).",
  },
  {
    question: "Where to buy a proper outfit?",
    answer:
      "At our Play Party, wearing the proper outfit based on the theme is mandatory. We highly recommend these shops. Less is more, and be creative! Lingerie Store Seminyak by Luxe; Sexy Lingerie by Luxe; Bad Influence Boutique; Shine by Ashmaya; ELEVEN44; Madame Pigalle at Monsieur Blonde Berawa/Ubud/Seminyak; Shocked Dog Market Canggu - Bazaar; Lace & Basics Pererenan; GlowGirl Boutique; Gooseberry Intimates; Celeb Party Shop; CACAO + KIMONO Ubud/Pererenan; M the Studio Canggu; Lingery - Nina des Criquets; Hedonist Store Bali.",
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
              <div className="grid grid-cols-1 sm:grid-cols-[2fr_1fr] gap-16 lg:items-center">
                <div className="flex flex-1 flex-col gap-8">
                  <div>
                    <img
                      src={FaqTitle}
                      alt="faq title"
                      className="max-w-[60%]"
                    />
                  </div>

                  <div>
                    <p className="font-avenir text-xl uppercase">
                      {faq.question}
                    </p>
                    <p className="mt-6 max-w-xl text-sm leading-relaxed">
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
