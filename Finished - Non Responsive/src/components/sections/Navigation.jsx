import Logo from "../icons/Logo";
import { navigationLinks } from "../../utils/constants";
import { UseModalContext } from "../../contexts/ModalContext";

export default function Navigation() {
  const { setActiveModal } = UseModalContext();

  return (
    <nav className="text-primary-50 m-auto flex max-w-[90rem] justify-between px-24 text-lg font-light">
      <a className="flex items-center gap-x-4" href="#">
        <Logo
          className="stroke-primary-500 h-6"
          alt="NoteFlow Logo Icon"
          width={5}
        />
        <p className="text-2xl font-bold tracking-tight">NoteFlow</p>
      </a>

      <ul className="flex items-center gap-x-8">
        {navigationLinks.map((link) => (
          <li key={link.id}>
            <a
              href={link.href}
              className="hover:text-primary-500 transition-properties"
            >
              {link.link}
            </a>
          </li>
        ))}
      </ul>

      <div className="flex gap-x-4">
        <button className="border-primary-50 transition-properties hover:bg-primary-50 hover:text-primary-1300 cursor-pointer rounded-full border-2 px-8 py-4 font-normal">
          Login
        </button>
        <button
          className="bg-primary-500 text-primary-1300 primary-glow hover:bg-primary-50 primary-glow-hover transition-properties cursor-pointer rounded-full px-8 py-4 font-normal"
          onClick={() => setActiveModal("sign-up")}
        >
          Get Started
        </button>
      </div>
    </nav>
  );
}
