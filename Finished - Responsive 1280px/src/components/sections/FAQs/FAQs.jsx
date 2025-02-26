import { useState } from "react";
import { FAQs } from "../../../utils/constants";
import FAQQuestions from "./FAQList";

export default function FAQ() {
  const [category, setActiveCategory] = useState("General");
  const [activeQuestion, setActiveQuestion] = useState(null);

  const categoryObj = FAQs.filter((obj) => obj.category === category).at(0);
  const questionsArr = categoryObj.questions;

  const handleQuestionClick = (id) =>
    id === activeQuestion ? setActiveQuestion(null) : setActiveQuestion(id);

  const handleCategoryClick = (category) => {
    setActiveQuestion(null);
    setActiveCategory(category);
  };

  return (
    <section className="bg-gradient-to-bottom justify-items-center">
      <div className="w-full max-w-[90rem] pt-36 pb-32 max-xl:px-16 max-xl:pt-28 max-xl:pb-24">
        <h2 className="text-primary-50 mb-8 text-center text-6xl/18 font-semibold tracking-tighter max-xl:mb-6 max-xl:text-5xl/16">
          Frequently Asked Questions
        </h2>
        <div className="mb-20 max-xl:mb-16">
          <p className="text-primary-100 text-center text-xl/loose font-light">
            The most commonly asked questions about NoteFlow.
          </p>
          <p className="text-primary-100 text-center text-xl/loose font-light">
            Have any other questions?{" "}
            <a
              href="#"
              className="group underline decoration-1 underline-offset-3"
            >
              Chat with our expert tech team
            </a>
          </p>
        </div>
        <ul className="mb-16 flex justify-center gap-x-4 gap-y-4">
          {FAQs.map((obj) => (
            <button
              className={`border-primary-50 text-primary-50 transition-properties cursor-pointer rounded-full border-2 px-8 py-4 text-lg/8 max-xl:px-6 max-xl:py-3 max-xl:text-base/loose ${
                obj.category === category &&
                "bg-primary-500 text-primary-1300 border-primary-500 primary-glow"
              } ${obj.category !== category && "hover:bg-primary-50 hover:text-primary-1300"}`}
              key={obj.id}
              onClick={() => handleCategoryClick(obj.category)}
            >
              {obj.category}
            </button>
          ))}
        </ul>
        <FAQQuestions
          category={category}
          questions={questionsArr}
          activeQuestion={activeQuestion}
          handleQuestionClick={handleQuestionClick}
        />
      </div>
    </section>
  );
}
