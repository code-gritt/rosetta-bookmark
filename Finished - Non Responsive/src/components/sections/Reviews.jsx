import { reviews } from "../../utils/content";

export default function Reviews() {
  return (
    <section className="m-auto flex max-w-[90rem] flex-wrap items-center gap-x-4 gap-y-4 px-24">
      <ul className="flex">
        {reviews.map((review) => (
          <li key={review.id}>
            <img
              className="border-primary-100 -mr-4 h-12 rounded-full border-2 last:mr-0"
              src={review.src}
              alt={review.alt}
            />
          </li>
        ))}
      </ul>
      <p className="text-primary-100 text-xl/loose font-light">
        Trusted by{" "}
        <span className="text-primary-500 font-bold tracking-tighter">
          12,653+{" "}
        </span>
        productivity junkies
      </p>
    </section>
  );
}
