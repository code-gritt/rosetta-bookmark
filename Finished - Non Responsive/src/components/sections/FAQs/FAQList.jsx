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
      className="m-auto flex max-w-[51.625rem] flex-col gap-y-14"
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
            <div className="border-primary-50 mr-6 rounded-xl border-2 p-4">
              <question.Icon
                width={2}
                className="stroke-primary-50"
                alt={question.alt}
              />
            </div>

            <p className="text-primary-50 mr-auto text-left text-xl/loose font-medium tracking-tight">
              {question.question}
            </p>

            <CaretUp
              stroke="var(--color-primary-50)"
              className="stroke-primary-50"
              activeQuestion={activeQuestion === question.id}
              width={2.5}
              alt="Caret Up Icon"
            />
          </button>

          <motion.p
            className="text-primary-100 pt-0 pr-14 pl-20 text-lg/8 font-light"
            initial={{ opacity: 0, maxHeight: 0, visibility: "hidden" }}
            animate={
              activeQuestion === question.id
                ? {
                    opacity: 1,
                    maxHeight: "250px",
                    visibility: "visible",
                    paddingTop: "1rem",
                  }
                : {}
            }
            transition={{ duration: 0.25 }}
            layout
          >
            {question.answer}
          </motion.p>
        </motion.li>
      ))}
    </motion.ul>
  );
}
