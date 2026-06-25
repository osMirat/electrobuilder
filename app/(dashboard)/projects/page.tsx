import { Button } from "@/components/ui/button";

export default function ProjectsPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Проекты
          </h1>

          <p className="mt-2 text-slate-500">
            Управление проектами ElectroBuilder
          </p>
        </div>

        <Button>+ Новый проект</Button>
      </div>

      <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">
            Пока нет проектов
          </h2>

          <p className="mt-2 mb-6 text-slate-500">
            Создайте первый проект для начала работы.
          </p>

          <Button>Создать проект</Button>
        </div>
      </div>
    </div>
  );
}