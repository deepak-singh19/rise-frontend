import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { navLinks } from "../../lib/constants/data";

export default function MobDropdown() {
  const [isOpen, setIsopen] = useState(false);
  return (
    <div className="sm:hidden flex content-center p-4">
      <button
        className="block px-2 py-1 text-2xl text-white/60 bg-black z-[200]"
        onClick={() => setIsopen(!isOpen)}
      >
        <GiHamburgerMenu className="text-5xl" />
      </button>
      {isOpen && (
        <div className="absolute top-[15px] left-0 w-full h-full bg-black bg-opacity-90 z-[100]">
          <nav className="flex flex-col gap-4 text-center pt-20">
            {navLinks.map((navLink) => (
              <a
                key={navLink.link}
                href={navLink.link}
                className="text-3xl text-white"
                onClick={() => setIsopen(false)}
              >
                {navLink.title}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
