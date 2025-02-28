import { reviews } from "../../utils/constants";

export default function Reviews() {
  return (
    <section className="m-auto flex max-w-[90rem] flex-wrap items-center gap-x-4 gap-y-4 px-24 max-xl:gap-x-3 max-xl:px-16 max-lg:px-8 max-md:px-6">
      <ul className="flex">
        {reviews.map((review) => (
          <li key={review.id}>
            <img
              className="border-primary-100 -mr-4 h-12 rounded-full border-2 last:mr-0 max-xl:h-10"
              src={review.src}
              alt={review.alt}
            />
          </li>
        ))}
      </ul>
      <p className="text-primary-100 text-xl/loose font-light max-lg:text-base/loose">
        Trusted by{" "}
        <span className="text-primary-500 font-bold tracking-tighter">
          12,653+{" "}
        </span>
        productivity junkies
      </p>
    </section>
  );
}
