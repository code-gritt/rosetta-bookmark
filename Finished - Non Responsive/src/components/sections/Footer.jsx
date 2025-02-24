import { useState } from "react";
import { footerCols } from "../../utils/constants";
import Logo from "../icons/Logo";

export default function Footer() {
  const [email, setEmail] = useState("");

  function handleSubmit() {
    console.log(email);
    setEmail("");
  }

  return (
    <footer className="bg-gradient-to-bottom">
      <div className="m-auto flex max-w-[90rem] justify-between gap-x-12 px-24 py-32">
        <div className="flex flex-col justify-between">
          <a className="flex items-center gap-x-4" href="#">
            <Logo
              className="stroke-primary-500 h-6"
              alt="NoteFlow Logo Icon"
              width={5}
            />
            <p className="text-primary-50 text-2xl font-bold tracking-tight">
              NoteFlow
            </p>
          </a>
          <div>
            <h3 className="text-primary-50 pb-8 text-3xl font-bold tracking-tight">
              Have Anymore Questions?
            </h3>
            <div className="relative h-16 w-110">
              <input
                type="text"
                className="bg-primary-75 placeholder:text-primary-1500 h-full w-full rounded-full pl-8 placeholder:font-light placeholder:opacity-20"
                placeholder="janedone@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name="email"
              />
              <button
                className="text-primary-1300 bg-primary-500 primary-glow absolute top-0 right-0 cursor-pointer rounded-full px-8 py-4 text-lg/8 tracking-tight"
                onClick={handleSubmit}
              >
                Learn more
              </button>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(4_,max-content)] gap-x-18">
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
