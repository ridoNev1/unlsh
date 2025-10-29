const NAV_LINKS = [
  { label: "Home", href: "#top" },
  { label: "Our Values", href: "#values" },
  { label: "Gallery", href: "#gallery" },
  { label: "Events", href: "#events" },
];

const Header = () => {
  return (
    <header className="bg-[#7a0f19]">
      <div className="flex items-center justify-between px-10 py-5">
        <a
          href="#top"
          className="font-iowan text-2xl uppercase tracking-[0.55em] text-[#fbe1d3]"
        >
          UNLSH
        </a>
        <nav className="hidden items-center gap-12 text-[12px] uppercase tracking-[0.6em] text-[#f8d8cb] md:flex">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-avenir transition-colors hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <button className="hidden border border-[#f7b7a5] px-7 py-2 text-[12px] uppercase tracking-[0.5em] text-[#f7b7a5] transition hover:border-white hover:text-white md:inline-flex">
          Membership
        </button>
      </div>
    </header>
  );
};

export default Header;
