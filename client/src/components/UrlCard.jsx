export default function UrlCard({ item, onDelete, onCopy }) {
  const shortUrl = item.short_url || item.shortUrl || item.url;
  const original = item.original_url || item.originalUrl || item.original || "—";
  const id = item.id || item._id || item.short_id;

  return (
    <article className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
      <div className="min-w-0">
        <p className="truncate text-sm text-zinc-400" title={original}>{original}</p>
        <p className="mt-1 break-all font-medium text-lime-300">{shortUrl}</p>
        {item.created_at && <p className="mt-2 text-xs text-zinc-600">{new Date(item.created_at).toLocaleString()}</p>}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <button onClick={() => onCopy(shortUrl)} className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500">Copy</button>
        <a href={shortUrl} target="_blank" rel="noreferrer" className="rounded-lg border border-zinc-700 px-3 py-2 text-sm hover:border-zinc-500">Open</a>
        {id && <button onClick={() => onDelete(id)} className="rounded-lg px-3 py-2 text-sm text-red-300 hover:bg-red-400/10">Delete</button>}
      </div>
    </article>
  );
}