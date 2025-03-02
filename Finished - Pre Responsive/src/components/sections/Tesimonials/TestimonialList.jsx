import Testimonal from "./Testimonal";

export default function TestimonialList({ testimonials }) {
  return (
    <ul className="flex flex-col gap-y-6">
      {testimonials.map((test) => (
        <Testimonal test={test} key={test.name} />
      ))}
    </ul>
  );
}
