export default function AmbientBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="ambient absolute left-[12%] top-[8%] h-72 w-72 rounded-full bg-lime-400/2.5 blur-3xl" />
      <div className="ambient-delay absolute right-[8%] top-[45%] h-96 w-96 rounded-full bg-sky-400/2 blur-3xl" />
      <svg className="absolute inset-0 h-full w-full opacity-[0.055]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="56" height="56" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" className="text-zinc-400" />
      </svg>
    </div>
  );
}