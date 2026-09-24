import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AmbientBackground from "../components/AmbientBackground";
import UrlInput from "../components/UrlInput";
import { useState } from "react";
import { createUrl } from "../api/urlApi";
import Toast from "../components/Toast";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [toast, setToast] = useState("");

  async function shorten(url) {
    setLoading(true);
    try {
      const res = await createUrl(url);
      setResult(res.data);
    } catch {
      setToast("We couldn't reach Dwarf right now. Please try again.");
    } finally { setLoading(false); }
  }

  async function copy() {
    const value = result?.short_url || result?.shortUrl || result?.url;
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setToast("Short link copied.");
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      <AmbientBackground />
      <Navbar />
      <main>
        <section className="mx-auto max-w-4xl px-5 pb-24 pt-24 text-center sm:pt-32">
          <p className="mb-5 text-sm font-medium text-lime-300">Simple links, without the clutter.</p>
          <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">Short links.<br />Less clutter.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">Turn long URLs into clean, shareable links. Dwarf keeps the job simple.</p>
          <div className="mx-auto mt-10 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 text-left shadow-2xl shadow-black/20 backdrop-blur">
            <UrlInput onSubmit={shorten} loading={loading} />
            {result && (
              <div className="mt-3 rounded-xl border border-lime-300/20 bg-lime-300/[0.04] p-4">
                <p className="text-xs uppercase tracking-wider text-zinc-500">Your short link</p>
                <div className="mt-1 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <a href={result.short_url || result.shortUrl || result.url} target="_blank" rel="noreferrer" className="break-all text-lime-300 hover:underline">{result.short_url || result.shortUrl || result.url}</a>
                  <button onClick={copy} className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500">Copy</button>
                </div>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-center gap-3 text-sm text-zinc-500">
            <span>No clutter</span><span>·</span><span>Fast workflow</span><span>·</span><span>Built to grow</span>
          </div>
        </section>

        <section className="border-y border-zinc-900">
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 md:grid-cols-3">
            {[
              ["01", "Paste", "Drop in a long URL. No complicated setup."],
              ["02", "Shorten", "Dwarf creates a compact link through the API."],
              ["03", "Share", "Copy it, open it, and get on with your day."]
            ].map(([n, title, body]) => (
              <div key={n}>
                <p className="text-sm text-lime-300">{n}</p>
                <h2 className="mt-3 text-xl font-medium">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{body}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <footer className="mx-auto max-w-6xl px-5 py-8 text-sm text-zinc-600">Dwarf · Short links, less clutter.</footer>
      <Toast message={toast} onClose={() => setToast("")} />
    </div>
  );
}