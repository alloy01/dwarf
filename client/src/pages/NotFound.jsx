import { Link } from "react-router-dom";
export default function NotFound() {
  return <main className="min-h-screen grid place-items-center bg-zinc-950 px-5 text-center text-zinc-100"><div><p className="text-sm text-lime-300">404</p><h1 className="mt-2 text-3xl font-semibold">That page doesn't exist.</h1><Link to="/" className="mt-6 inline-block rounded-xl bg-lime-300 px-4 py-3 font-semibold text-zinc-950">Back home</Link></div></main>;
}