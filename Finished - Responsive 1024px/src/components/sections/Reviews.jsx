import { reviews } from "../../utils/constants";

export default function Reviews() {
  return (
    <section className="m-auto flex max-w-[90rem] items-center gap-x-4 px-24 max-xl:gap-x-3 max-xl:px-16 max-lg:px-8">
      <ul className="flex">
        {reviews.map((review) => (
          <img
            className="border-primary-100 -mr-4 h-12 rounded-full border-2 last:mr-0 max-xl:h-10"
            src={review.src}
            alt={review.alt}
            key={review.id}
          />
        ))}
      </ul>
      <p className="text-primary-100 text-xl max-xl:text-lg/8 max-lg:text-base/loose">
        Trusted by{" "}
        <span className="text-primary-500 font-bold tracking-tighter">
          12,653+{" "}
        </span>
        productivity junkies
      </p>
    </section>
  );
}
