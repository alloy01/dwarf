import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthShell } from "./Login";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e) {
    e.preventDefault(); setError("");
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    if (form.password.length < 8) { setError("Password must be at least 8 characters."); return; }
    setLoading(true);
    try { await register({ email: form.email, password: form.password }); navigate("/dashboard"); }
    catch { setError("We couldn't create your account. Please try again."); }
    finally { setLoading(false); }
  }

  const field = (key, label, type="text") => <label className="block"><span className="mb-2 block text-sm text-zinc-300">{label}</span><input type={type} value={form[key]} onChange={(e)=>setForm({...form,[key]:e.target.value})} required className="w-full rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 outline-none focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/10" /></label>;

  return <AuthShell title="Create your account" subtitle="Start making cleaner links.">
    <form onSubmit={submit} className="space-y-4">
      {field("email","Email","email")}
      {field("password","Password","password")}
      {field("confirm","Confirm password","password")}
      {error && <p className="rounded-lg border border-red-400/20 bg-red-400/5 p-3 text-sm text-red-300" role="alert">{error}</p>}
      <button disabled={loading} className="w-full rounded-xl bg-lime-300 px-4 py-3 font-semibold text-zinc-950 disabled:opacity-60">{loading ? "Creating account…" : "Create account"}</button>
      <p className="text-center text-sm text-zinc-500">Already have an account? <Link to="/login" className="text-zinc-200 hover:underline">Log in</Link></p>
    </form>
  </AuthShell>;
}