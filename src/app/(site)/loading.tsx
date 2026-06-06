export default function Loading() {
  return (
    <div
      className="flex flex-1 items-center justify-center py-32"
      role="status"
      aria-label="Loading"
    >
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-cream-200 border-t-berry" />
    </div>
  );
}
