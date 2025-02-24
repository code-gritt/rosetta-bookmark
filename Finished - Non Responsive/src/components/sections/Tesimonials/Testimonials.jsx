import { useState } from "react";
import { testimonials as test } from "../../../utils/constants";
import TestimonialColumn from "./TestimonialColumn";
import CaretUp from "../../icons/CaretUp";
import { motion } from "motion/react";

export default function Testimonials() {
  const [expanded, setExpanded] = useState(true);

  return (
    <section className="bg-gradient-to-top">
      <div className="m-auto flex max-w-[90rem] flex-col items-center px-24 py-32">
        <div className="mb-20 flex max-w-[51.625rem] flex-col items-center gap-y-6">
          <p className="text-primary-1300 bg-primary-500 w-min rounded-full px-4 py-2 text-base/8 drop-shadow-[0_0px_25px_var(--color-primary-glow)]">
            Testimonials
          </p>
          <h2 className="text-primary-50 text-center text-6xl/18 font-semibold tracking-tighter">
            What our AI-powered notetakers have to say
          </h2>
          <p className="text-primary-100 px-28 text-center text-xl/loose font-light">
            NoteFlow has helped 1000&apos;s supercharge their productivity with
            cutting edge AI note taking tools
          </p>
        </div>
        <motion.div
          className="mb-20 grid grid-cols-3 gap-x-6"
          animate={{
            height: expanded ? "2976px" : "1128px",
          }}
          transition={{ duration: expanded ? 2 : 0.5, ease: "easeOut" }}
        >
          <TestimonialColumn testimonials={test.slice(0, expanded ? 5 : 2)} />
          <TestimonialColumn testimonials={test.slice(5, expanded ? 10 : 7)} />
          <TestimonialColumn
            testimonials={test.slice(10, expanded ? 15 : 12)}
          />
        </motion.div>
        <button
          className="text-primary-50 outline-primary-50 transition-properties hover:bg-primary-50 hover:text-primary-1300 group flex cursor-pointer items-center gap-x-3 rounded-full px-8 py-4 text-lg/loose outline-2"
          onClick={() => setExpanded((curr) => !curr)}
        >
          {expanded ? "Show less" : "Show more"}
          <CaretUp
            className={`stroke-primary-50 group-hover:stroke-primary-1300 rotate-180 transition-all duration-300 ${expanded && "rotate-360"}`}
            alt="Caret Up Icon"
            width={2}
          />
        </button>
      </div>
    </section>
  );
}
