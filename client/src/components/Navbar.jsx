import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { authenticated, logout } = useAuth();
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <nav className="flex items-center gap-2">
          {authenticated ? (
            <>
              <Link to="/dashboard" className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">Dashboard</Link>
              <button onClick={logout} className="rounded-lg border border-zinc-800 px-3 py-2 text-sm text-zinc-300 hover:border-zinc-700 hover:text-white">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm text-zinc-300 hover:text-white">Log in</Link>
              <Link to="/register" className="rounded-lg bg-lime-300 px-3 py-2 text-sm font-semibold text-zinc-950 hover:bg-lime-200">Get started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}