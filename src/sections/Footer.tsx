const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#150005] py-12 text-sm text-white/70">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-sm">
          <p className="font-iowan text-lg uppercase tracking-[0.5em] text-white">
            UNLSH
          </p>
          <p className="mt-4 text-xs leading-relaxed text-white/60">
            Sensual salons, immersive retreats, and community-led play
            experiences in New York and beyond. We gather dreamers who honor
            consent, curiosity, and the power of communal pleasure.
          </p>
          <p className="mt-6 text-[11px] uppercase tracking-[0.45em] text-white/40">
            (c) UNLSH Society 2025
          </p>
        </div>
        <div className="grid gap-6 text-[11px] uppercase tracking-[0.45em] text-white/60 sm:grid-cols-2">
          <div className="space-y-3">
            <a href="#top" className="block hover:text-white">
              Home
            </a>
            <a href="#values" className="block hover:text-white">
              Our Values
            </a>
            <a href="#who" className="block hover:text-white">
              Who We Are
            </a>
            <a href="#events" className="block hover:text-white">
              Events
            </a>
          </div>
          <div className="space-y-3">
            <a href="#gallery" className="block hover:text-white">
              Gallery
            </a>
            <a href="#faq" className="block hover:text-white">
              FAQ
            </a>
            <a href="#" className="block hover:text-white">
              Membership
            </a>
            <a href="#top" className="block hover:text-white">
              Back To Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
