export default function ArrowRight({ width = 1.5, className, alt }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      alt={alt}
      className={className}
    >
      <path
        d="M14.4301 5.93005L20.5001 12.0001L14.4301 18.0701"
        strokeWidth={width}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.5 12H20.33"
        strokeWidth={width}
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
