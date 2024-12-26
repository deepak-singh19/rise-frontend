import { Link, useNavigate } from "react-router-dom";
import { navLinks, productOwnerNavLinks } from "../../lib/constants/data";
import MobDropdown from "./MobDropdown";
import PrimaryButton from "../common/PrimaryButton";
import { useUser } from "../../context/UserContextProvider";
import SecondaryButton from "../common/SecondaryButton";

export default function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, isMentor, logout } = useUser();
  return (
    <section className="bg-black text-white">
      <div className="flex justify-between">
        <div className="px-4 py-2">
          <a href="/">
            <img
              src="/logo.jpg"
              alt="Ri5e company logo"
              height={80}
              width={80}
            />
          </a>
        </div>
        <div className="hidden px-8 sm:block">
          <nav className="h-full">
            <ul className="flex h-full gap-8 text-2xl">
              {!isLoggedIn &&
                navLinks.map((navlink) => (
                  <li key={navlink.link} className="h-full content-center">
                    <Link to={navlink.link} className="hover:font-medium">
                      {navlink.title}
                    </Link>
                  </li>
                ))}
              {isLoggedIn && !isMentor && (
                <li className="h-full content-center">
                  <Link
                    to="/product/dashboard"
                    className="mx-4 hover:font-medium"
                  >
                    Dashboard
                  </Link>
                  <Link to="/mentor/match" className="mx-4 hover:font-medium">
                    Mentor Match
                  </Link>
                  <Link to="/inbox" className="mx-4 hover:font-medium">
                    Inbox
                  </Link>
                </li>
              )}
              {isLoggedIn && isMentor && (
                <li className="h-full content-center">
                  <Link to="/product/match" className="mx-4 hover:font-medium">
                    Product Match
                  </Link>
                  <Link to="/inbox" className="mx-4 hover:font-medium">
                    Inbox
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
        <div className="self-center p-4">
          {!isLoggedIn ? (
            <PrimaryButton
              name="Login"
              className="rounded bg-white px-6 py-2 font-semibold text-black transition hover:bg-gray-300"
              handleClick={() => {
                navigate("/login");
              }}
            />
          ) : (
            <div className="flex flex-col gap-4">
              <PrimaryButton
                name="My Profile"
                className="rounded bg-white p-1 font-semibold text-black transition hover:bg-gray-300"
                handleClick={() => {
                  navigate(isMentor ? "/mentor-profile" : "/product-profile");
                }}
              />
              <SecondaryButton
                name="Logout"
                className="rounded border border-white bg-transparent px-6 py-2 font-semibold text-white transition hover:bg-gray-300 hover:text-black"
                handleClick={() => {
                  logout();
                  navigate("/");
                }}
              />
            </div>
          )}
        </div>
        <MobDropdown />
      </div>
    </section>
  );
}
