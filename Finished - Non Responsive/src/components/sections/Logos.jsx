import { logos } from "../../utils/constants";

export default function Logos() {
  return (
    <section className="bg-gradient-to-top">
      <div className="m-auto max-w-[90rem] px-24 py-28">
        <p className="text-primary-50 last m-auto mb-28 text-center text-xl">
          Organizations powered by <span className="font-bold">NoteFlow</span>
        </p>
        <ul className="mb-24 flex justify-between">
          {logos.slice(0, 5).map((logo) => (
            <img className="h-10" src={logo.src} alt={logo.alt} key={logo.id} />
          ))}
        </ul>
        <ul className="flex justify-between">
          {logos.slice(5).map((logo) => (
            <img className="h-10" src={logo.src} alt={logo.alt} key={logo.id} />
          ))}
        </ul>
      </div>
    </section>
  );
}
