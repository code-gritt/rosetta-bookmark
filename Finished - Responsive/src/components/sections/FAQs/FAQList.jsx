import { motion } from "motion/react";
import CaretUp from "../../icons/CaretUp";
import { useState } from "react";

export default function FAQQuestions({
  category,
  questions,
  activeQuestion,
  handleQuestionClick,
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const [inView, setInView] = useState(false);

  return (
    <motion.ul
      className="m-auto flex max-w-[51.625rem] flex-col gap-y-14 max-lg:gap-y-12"
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      key={category}
      layout
      variants={{
        hidden: {
          opacity: 0,
        },
        visible: {
          transition: {
            staggerChildren: 0.25,
            ease: "easeIn",
          },
        },
      }}
      whileInView={{ opacity: 1 }}
      onViewportEnter={() => setInView(true)}
      onViewportLeave={() => setInView(false)}
      viewport={{ once: false, amount: "100%" }}
    >
      {questions.map((question) => (
        <motion.li
          variants={itemVariants}
          key={question.id}
          className="shrink-0 grow-0"
        >
          <button
            className="flex w-full cursor-pointer items-center"
            onClick={() => handleQuestionClick(question.id)}
          >
            <div className="border-primary-50 mr-6 rounded-xl border-2 p-3.5 max-sm:mr-4 max-sm:p-3">
              <question.Icon
                width={2}
                className="stroke-primary-50"
                alt={question.alt}
              />
            </div>

            <p className="text-primary-50 mr-auto pr-4 text-left text-xl/loose font-medium tracking-tight max-lg:text-lg/8 max-lg:font-semibold max-sm:text-base/6 max-sm:font-medium">
              {question.question}
            </p>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center">
              <CaretUp
                className="stroke-primary-50"
                activeQuestion={activeQuestion === question.id}
                width={2.5}
                alt="Caret Up Icon"
              />
            </div>
          </button>
          <motion.p
            className="text-primary-100 pt-0 pr-14 pl-20 text-lg/8 font-light max-lg:text-base/loose max-sm:pr-0 max-sm:pl-0"
            initial={{ opacity: 0, maxHeight: 0, visibility: "hidden" }}
            animate={
              activeQuestion === question.id
                ? {
                    opacity: 1,
                    maxHeight: "300px",
                    visibility: "visible",
                    paddingTop: "1rem",
                  }
                : {}
            }
            transition={{ duration: 0.3, ease: "easeIn" }}
            layout
          >
            {question.answer}
          </motion.p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
