export default function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div role="status" className="fixed bottom-5 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm text-zinc-100 shadow-2xl">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-zinc-500 hover:text-white" aria-label="Close notification">×</button>
    </div>
  );
}