import LogoDawn from "../assets/logo-dawn.png";
import RevolutionText from "../assets/revolution-text.png";

const RevolutionSection = () => {
  return (
    <section className="bg-[#880C11] text-center text-[#fde9df]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12">
        <img
          src={LogoDawn}
          alt="Icon representing authenticity."
          className="h-full object-cover w-50"
        />
        <img src={RevolutionText} alt="revolution-text" className="w-full" />
        <a
          href="#events"
          className="group inline-flex mt-8 items-stretch text-white"
        >
          <span className="border border-white px-10 py-3 text-[12px] uppercase tracking-[0.5em] transition-colors group-hover:bg-white border-r group-hover:text-[#880C11]">
            Upcoming Events
          </span>
          <span className="flex items-center justify-center gap-2 border border-l-0 border-white px-6 transition-colors group-hover:bg-white group-hover:text-[#880C11]">
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
    </section>
  );
};

export default RevolutionSection;
