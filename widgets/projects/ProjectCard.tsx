import Link from "next/link";
import type { Project } from "@/features/projects/types";
import { Button } from "@/components/ui/button";

const objectTypeLabels: Record<Project["objectType"], string> = {
  house: "Частный дом",
  apartment: "Квартира",
  office: "Офис",
  commercial: "Коммерческое помещение",
  production: "Производство",
  other: "Другое",
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500">{project.code}</p>
          <h3 className="text-lg font-semibold">{project.name}</h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
          Черновик
        </span>
      </div>

      <div className="space-y-1 text-sm text-slate-600">
        <p>Тип объекта: {objectTypeLabels[project.objectType]}</p>
        <p>Фазы: {project.phases}</p>
        <p>Заказчик: {project.clientName || "—"}</p>
        <p>Адрес: {project.address || "—"}</p>
      </div>

      <div className="mt-5 flex justify-end">
        <Button asChild variant="outline" size="sm">
          <Link href={`/projects/${project.id}`}>Открыть</Link>
        </Button>
      </div>
    </div>
  );
}