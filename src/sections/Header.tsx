import { Link, type LinkProps } from "react-router-dom";
import UnlshLogo from "../assets/unlsh-logo.svg";
const NAV_LINKS: Array<{ label: string; to: LinkProps["to"] }> = [
  { label: "Home", to: { pathname: "/", hash: "#top" } },
  { label: "Our Values", to: { pathname: "/", hash: "#values" } },
  { label: "Community", to: { pathname: "/", hash: "#who" } },
  { label: "Events", to: "/upcoming-events" },
];

const Header = () => {
  return (
    <header className="bg-[#7a0f19]">
      <div className="flex items-center justify-between px-10 py-5">
        <Link to={{ pathname: "/", hash: "#top" }}>
          <img src={UnlshLogo} className="cursor-pointer" alt="unlshlogo" />
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
