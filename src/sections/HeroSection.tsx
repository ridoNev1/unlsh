import HeroTypography from "../assets/hero-typography.png";
import valueConnectionImage from "../assets/value-connection.jpg";

const HeroSection = () => {
  return (
    <section
      id="top"
      className="grid bg-[#FAF1E6] xl:grid-cols-2 md:items-stretch"
    >
      <div className="flex min-h-[520px] flex-col justify-center px-8 py-16 text-[#7b131e] md:pl-[8vw] md:pr-[6vw] ">
        <div className="space-y-8">
          <div className="space-y-6 px-12">
            <img src={HeroTypography} alt="herotypography" />
          </div>
          <p className="max-w-xl text-center font-medium text-[12px] uppercase text-[#9d4b45]">
            Expect captivating performances, playful connections, and our DJ
            close to the crowd with sensual rhythms that awaken every sensation.
            A night of elegance, intimacy, and unforgettable energy. Step into
            the allure. Step into UNLSH.
          </p>
          <div className="flex justify-center">
            <button className="inline-flex border border-[#a04f49] px-8 py-2 text-[12px] uppercase tracking-[0.5em] text-[#7b131e] transition hover:bg-[#7b131e] hover:text-[#f6ece0]">
              Membership
            </button>
          </div>
        </div>
      </div>
      <div>
        <img
          src={valueConnectionImage}
          alt="Guest wearing heels at an UNLSH gathering."
          className="w-full h-[80vh] max-h-[360px] lg: xl:max-h-[650px] object-cover md:min-h-[520px]"
        />
      </div>
    </section>
  );
};

export default HeroSection;
