import Link from "next/link";
import type { Project } from "@/features/projects/types";
import { Button } from "@/components/ui/button";
import { CreateProjectDialog } from "@/widgets/projects/CreateProjectDialog";
import { User, MapPin, Home, Zap, Pencil } from "lucide-react";

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
    <div className="h-full rounded-xl border bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-slate-500">{project.code}</p>
          <h3 className="text-lg font-semibold">{project.name}</h3>
        </div>

        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs">
          Черновик
        </span>
      </div>

      <div className="mt-5 space-y-2 text-sm text-slate-600">
        <div className="flex items-center gap-2">
          <User className="h-4 w-4" />
          <span>{project.clientName || "Не указан"}</span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4" />
          <span>{project.address || "Не указан"}</span>
        </div>

        <div className="flex items-center gap-2">
          <Home className="h-4 w-4" />
          <span>{objectTypeLabels[project.objectType]}</span>
        </div>

        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span>{project.phases} фаза</span>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-2 border-t pt-4">
        <CreateProjectDialog
          project={project}
          trigger={
            <Button variant="outline" size="sm">
              <Pencil className="mr-2 h-4 w-4" />
              Редактировать
            </Button>
          }
        />

        <Button asChild size="sm">
          <Link href={`/projects/${project.id}`}>Открыть</Link>
        </Button>
      </div>
    </div>
  );
}