import HeroGraphic from "../../assets/graphics/HeroGraphic.webp";
import { UseModalContext } from "../../contexts/ModalContext";
import ArrowRight from "../icons/ArrowRight";

export default function Hero() {
  const { setActiveModal } = UseModalContext();

  return (
    <div className="m-auto grid max-w-[90rem] grid-cols-[5fr_4fr] items-center gap-x-18 px-24 py-42 max-xl:grid-cols-2 max-xl:gap-x-12 max-xl:px-16 max-xl:py-38">
      <div>
        <h1 className="text-primary-50 mb-6 text-6xl/18 font-semibold tracking-tighter max-xl:mb-4 max-xl:text-5xl/16">
          AI-Powered Notes. Organize and Summarize in Seconds
        </h1>
        <p className="text-primary-100 mb-10 text-xl/loose font-light max-xl:mb-8 max-xl:text-lg/8">
          Let AI organize & summarize your notes, <br />
          saving you time and boosting productivity
        </p>
        <button
          className="text-primary-1300 bg-primary-500 border-primary-500 hover:border-primary-50 hover:bg-primary-50 transition-properties primary-glow-hover primary-glow flex cursor-pointer items-center gap-x-3 rounded-full border-2 px-8 py-4 max-xl:gap-x-2 max-xl:px-6 max-xl:py-3"
          onClick={() => setActiveModal("sign-up")}
        >
          <p className="text-lg/8 max-xl:text-base/loose">Get Started</p>
          <ArrowRight alt="Arrow right icon" className="stroke-primary-1300" />
        </button>
      </div>
      <div className="relative">
        <div className="bg-primary-1300 absolute top-0 right-0 bottom-0 left-0 rounded-full blur-3xl" />
        <img
          src={HeroGraphic}
          alt="Hero graphic of an Iphone showing NoteFlows note summarizer"
          className="relative max-h-[30rem] justify-self-end"
        />
      </div>
    </div>
  );
}
