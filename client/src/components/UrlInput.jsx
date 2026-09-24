import { useState } from "react";

export default function UrlInput({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    try { new URL(url); }
    catch { setError("Please enter a valid URL."); return; }
    setError("");
    onSubmit(url);
  }

  return (
    <form onSubmit={submit} className="space-y-2">
      <label htmlFor="url" className="sr-only">URL to shorten</label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste your long URL"
          className="min-w-0 flex-1 rounded-xl border border-zinc-800 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-lime-300/60 focus:ring-2 focus:ring-lime-300/10"
          required
        />
        <button disabled={loading} className="rounded-xl bg-lime-300 px-6 py-3 font-semibold text-zinc-950 transition hover:bg-lime-200 disabled:cursor-not-allowed disabled:opacity-60">
          {loading ? "Shortening…" : "Shorten"}
        </button>
      </div>
      {error && <p className="text-sm text-red-300" role="alert">{error}</p>}
    </form>
  );
}