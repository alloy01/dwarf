import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import AmbientBackground from "../components/AmbientBackground";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError(""); setLoading(true);
    try { await login(form); navigate("/dashboard"); }
    catch { setError("Your email or password is incorrect."); }
    finally { setLoading(false); }
  }

  return <AuthShell title="Welcome back" subtitle="Log in to manage your short links.">
    <form onSubmit={submit} className="space-y-4">
      <Field label="Email" type="email" value={form.email} onChange={(v) => setForm({...form, email:v})} />
      <Field label="Password" type="password" value={form.password} onChange={(v) => setForm({...form, password:v})} />
      {error && <p className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300" role="alert">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-lime-300 px-4 py-3 font-semibold text-zinc-950 disabled:opacity-60">{loading ? "Logging in…" : "Log in"}</button>
      <p className="text-center text-sm text-zinc-500">New to Dwarf? <Link to="/register" className="text-zinc-200 hover:underline">Create an account</Link></p>
    </form>
  </AuthShell>;
}

function Field({ label, type, value, onChange }) {
  return <label className="block"><span className="mb-2 block text-sm text-zinc-300">{label}</span><input type={type} value={value} onChange={(e)=>onChange(e.target.value)} required className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/10" /></label>;
}

export function AuthShell({ title, subtitle, children }) {
  return <div className="relative min-h-screen bg-zinc-950 text-zinc-100"><AmbientBackground /><div className="mx-auto max-w-md px-5 py-8"><Logo /><div className="mt-20 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur sm:p-8"><h1 className="text-2xl font-semibold">{title}</h1><p className="mt-2 text-sm text-zinc-500">{subtitle}</p><div className="mt-7">{children}</div></div></div></div>;
}