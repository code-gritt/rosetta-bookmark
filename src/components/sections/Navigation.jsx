import Logo from "../icons/Logo";
import MobileMenuIcon from "./MobileMenu/MobileMenuIcon";
import { useModalContext } from "../../contexts/ModalContext";
import useAuthStore from "../../store/useAuthStore";
import { Link } from "react-router-dom";

export default function Navigation() {
  const { setActiveModal } = useModalContext();
  const { user, logout } = useAuthStore(); // assuming logout is defined in store

  return (
    <nav className="text-primary-50 m-auto flex max-w-[90rem] justify-between px-24 text-lg/8 font-light max-xl:px-16 max-xl:text-base/loose max-lg:px-8 max-md:px-6">
      {/* Logo */}
      <a
        className="flex items-center gap-x-3 max-xl:gap-x-3 max-md:gap-x-2"
        href="/"
      >
        <Logo
          className="stroke-primary-500 h-6 max-md:h-5"
          alt="NoteFlow Logo Icon"
          width={5}
        />
        <p className="text-xl font-bold tracking-tight max-xl:text-xl max-md:text-lg/8 max-md:tracking-tighter">
          Rosetta
        </p>
      </a>

      {/* Right Side */}
      <div className="flex items-center gap-x-3 max-lg:hidden">
        {user ? (
          <>
            {/* Logged-in: show avatar/email + logout */}
            <span className="text-sm font-medium">{user.email}</span>
            <Link to="/dashboard">
              <button className="bg-primary-500 hover:bg-primary-600 text-primary-1300 rounded-full px-4 py-2">
                Dashboard
              </button>
            </Link>

            <button
              onClick={logout}
              className="bg-primary-500 hover:bg-primary-600 text-primary-1300 rounded-full px-4 py-2"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {/* Not logged-in: show buttons */}
            <button
              className="border-primary-50 transition-properties hover:bg-primary-50 hover:text-primary-1300 box-border cursor-pointer rounded-full border-2 px-8 py-3.5 text-lg/8 font-normal max-xl:px-6 max-xl:py-3 max-xl:text-base/loose"
              onClick={() => setActiveModal("login")}
            >
              Login
            </button>
            <button
              className="bg-primary-500 border-primary-500 text-primary-1300 primary-glow hover:border-primary-50 hover:bg-primary-50 primary-glow-hover transition-properties cursor-pointer rounded-full border-2 px-8 py-3.5 text-lg/8 font-normal max-xl:px-6 max-xl:py-3 max-xl:text-base/loose"
              onClick={() => setActiveModal("sign-up")}
            >
              Get Started
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu Icon */}
      <MobileMenuIcon />
    </nav>
  );
}
