"use client";

import { CreateProjectDialog } from "@/widgets/projects/CreateProjectDialog";
import { ProjectCard } from "@/widgets/projects/ProjectCard";
import { useProjectStore } from "@/stores/projectStore";

export default function ProjectsPage() {
  const projects = useProjectStore((state) => state.projects);

  return (
    <div className="flex h-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Проекты</h1>

          <p className="mt-2 text-slate-500">
            Управление проектами ElectroBuilder
          </p>
        </div>

        <CreateProjectDialog />
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-1 items-center justify-center rounded-xl border border-dashed bg-white">
          <div className="text-center">
            <h2 className="text-2xl font-semibold">Пока нет проектов</h2>

            <p className="mt-2 mb-6 text-slate-500">
              Создайте первый проект для начала работы.
            </p>

            <CreateProjectDialog />
          </div>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
    {projects.map((project) => (
        <ProjectCard
            key={project.id}
            project={project}
        />
    ))}
</div>
      )}
    </div>
  );
}