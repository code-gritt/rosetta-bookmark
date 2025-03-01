import { footerCols } from "../../utils/content";
import Logo from "../icons/Logo";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-bottom">
      <div className="m-auto flex max-w-[90rem] justify-between px-24 py-32">
        <div>
          <a className="flex items-center gap-x-3" href="#">
            <Logo
              className="stroke-primary-500 h-6"
              alt="NoteFlow Logo Icon"
              width={5}
            />
            <p className="text-primary-50 text-xl font-bold tracking-tight">
              NoteFlow
            </p>
          </a>
        </div>
        <div className="grid grid-cols-[repeat(4,max-content)] gap-x-24">
          {footerCols.map((col) => (
            <div key={col.id}>
              <p className="text-primary-50 mb-8 text-xl/loose font-semibold">
                {col.category}
              </p>
              <ul className="flex flex-col gap-y-4">
                {col.links.map((link, i) => (
                  <li key={i} className="cursor-pointer">
                    <a
                      className="text-primary-50 hover:text-primary-500 transition-properties text-lg/8 font-light"
                      href="#"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
