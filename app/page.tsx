import { Header } from "@/widgets/Header/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      <section className="flex h-[calc(100vh-64px)] items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-4xl font-bold">
            Добро пожаловать в ElectroBuilder
          </h2>

          <p className="mb-8 text-slate-500">
            Создайте первый проект, чтобы начать работу.
          </p>

          <button className="rounded-lg bg-slate-900 px-6 py-3 text-white transition hover:bg-slate-700">
            + Создать проект
          </button>
        </div>
      </section>
    </main>
  );
}