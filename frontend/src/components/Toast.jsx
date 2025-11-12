export default function Toast({ show, message }) {
  if (!show) return null;

  return (
    <div className="pointer-events-none fixed bottom-4 left-1/2 -translate-x-1/2 z-[70]">
      <div className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-900 ring-1 ring-neutral-800 text-sm">
        <span>{message}</span>
      </div>
    </div>
  );
}
