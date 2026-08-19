interface FullPageLoaderProps {
  label?: string;
}

export default function FullPageLoader({
  label = "Loading StudyFlow...",
}: FullPageLoaderProps) {
  return (
    <main
      className="flex min-h-screen items-center justify-center bg-(--background) px-6"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span
          className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-muted">{label}</p>
      </div>
    </main>
  );
}
