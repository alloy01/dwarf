import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { authenticated, checking } = useAuth();
  if (checking) return <div className="min-h-screen grid place-items-center bg-zinc-950 text-zinc-400">Checking session…</div>;
  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}