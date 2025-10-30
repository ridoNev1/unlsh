import { Link, type LinkProps } from "react-router-dom";

const NAV_LINKS: Array<{ label: string; to: LinkProps["to"] }> = [
  { label: "Home", to: { pathname: "/", hash: "#top" } },
  { label: "Our Values", to: { pathname: "/", hash: "#values" } },
  { label: "Gallery", to: { pathname: "/", hash: "#gallery" } },
  { label: "Events", to: { pathname: "/", hash: "#events" } },
  { label: "Upcoming Events", to: "/upcoming-events" },
];

const Header = () => {
  return (
    <header className="bg-[#7a0f19]">
      <div className="flex items-center justify-between px-10 py-5">
        <Link
          to={{ pathname: "/", hash: "#top" }}
          className="font-iowan text-2xl uppercase tracking-[0.55em] text-[#fbe1d3]"
        >
          UNLSH
        </Link>
        <nav className="hidden items-center gap-12 uppercase text-[#f8d8cb] md:flex">
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="font-avenir transition-colors hover:text-white"
            >
              {item.label}
            </Link>
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
