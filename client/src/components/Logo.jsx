import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/" className="inline-flex items-center gap-2 font-semibold tracking-tight text-zinc-100">
      <span className="grid h-8 w-8 place-items-center rounded-lg border border-zinc-700 bg-zinc-900 text-sm text-lime-300">d</span>
      <span>Dwarf</span>
    </Link>
  );
}