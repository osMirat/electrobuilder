export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-3">
        <span className="text-2xl">⚡</span>

        <h1 className="text-xl font-semibold tracking-tight">
          ElectroBuilder
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-md border px-3 py-1.5 text-sm text-muted-foreground">
          Поиск...
        </div>

        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-200 font-medium">
          M
        </div>
      </div>
    </header>
  );
}