import { useEffect, useState } from "react";
import { createUrl, deleteUrl, listUrls } from "../api/urlApi";
import { useAuth } from "../context/AuthContext";
import AmbientBackground from "../components/AmbientBackground";
import Logo from "../components/Logo";
import UrlInput from "../components/UrlInput";
import UrlCard from "../components/UrlCard";
import Toast from "../components/Toast";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState("");

  async function load() {
    setLoading(true); setError("");
    try {
      const res = await listUrls();
      setUrls(Array.isArray(res.data) ? res.data : (res.data?.urls || []));
    } catch { setError("We couldn't load your links. Please try again."); }
    finally { setLoading(false); }
  }
  useEffect(() => { load(); }, []);

  async function shorten(url) {
    setCreating(true);
    try {
      const res = await createUrl(url);
      const item = res.data;
      setUrls((prev) => [item, ...prev]);
      setToast("Short link created.");
    } catch { setToast("We couldn't create that link. Please try again."); }
    finally { setCreating(false); }
  }

  async function remove(id) {
    try { await deleteUrl(id); setUrls((prev)=>prev.filter((x)=>(x.id||x._id||x.short_id)!==id)); setToast("Link deleted."); }
    catch { setToast("We couldn't delete that link."); }
  }

  async function copy(value) {
    try { await navigator.clipboard.writeText(value); setToast("Short link copied."); }
    catch { setToast("Copy failed. You can select the link manually."); }
  }

  return <div className="min-h-screen bg-zinc-950 text-zinc-100"><AmbientBackground />
    <header className="border-b border-zinc-800/80 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Logo />
        <div className="flex items-center gap-3"><span className="hidden max-w-48 truncate text-sm text-zinc-500 sm:block">{user?.email}</span><button onClick={logout} className="rounded-lg border border-zinc-800 px-3 py-2 text-sm hover:border-zinc-700">Log out</button></div>
      </div>
    </header>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="max-w-3xl"><p className="text-sm text-lime-300">Dashboard</p><h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">Shorten a URL.</h1><p className="mt-3 text-zinc-500">Create a clean link and keep your history in one place.</p>
        <div className="mt-7 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3"><UrlInput onSubmit={shorten} loading={creating} /></div>
      </div>
      <section className="mt-12">
        <div className="flex items-end justify-between"><div><h2 className="text-xl font-medium">Your links</h2><p className="mt-1 text-sm text-zinc-600">{urls.length} saved</p></div><button onClick={load} className="text-sm text-zinc-500 hover:text-zinc-200">Refresh</button></div>
        {error && <p className="mt-5 rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-300">{error}</p>}
        {loading ? <div className="mt-5 space-y-3">{[1,2,3].map(n=><div key={n} className="h-28 animate-pulse rounded-xl border border-zinc-900 bg-zinc-900/40" />)}</div>
        : urls.length === 0 ? <div className="mt-5 rounded-2xl border border-dashed border-zinc-800 p-10 text-center"><h3 className="font-medium">No shortened URLs yet.</h3><p className="mt-2 text-sm text-zinc-600">Create your first short link above.</p></div>
        : <div className="mt-5 grid gap-3">{urls.map((item, i)=><UrlCard key={item.id||item._id||item.short_id||i} item={item} onDelete={remove} onCopy={copy} />)}</div>}
      </section>
    </main>
    <Toast message={toast} onClose={()=>setToast("")} />
  </div>;
}