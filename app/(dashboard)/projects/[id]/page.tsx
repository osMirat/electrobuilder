import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject } from "@/app/(dashboard)/projects/actions";
import { Button } from "@/components/ui/button";

const objectTypeLabels = {
  house: "Частный дом",
  apartment: "Квартира",
  office: "Офис",
  commercial: "Коммерческое помещение",
  production: "Производство",
  other: "Другое",
};

interface ProjectDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">{project.code}</p>
          <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
          <p className="mt-2 text-slate-500">
            Карточка проекта ElectroBuilder
          </p>
        </div>

        <Button asChild variant="outline">
          <Link href="/projects">Назад к проектам</Link>
        </Button>
      </div>

      <div className="rounded-xl border bg-white p-6">
        <dl className="grid gap-6 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-slate-500">Тип объекта</dt>
            <dd className="font-medium">
              {objectTypeLabels[project.objectType]}
            </dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Количество фаз</dt>
            <dd className="font-medium">{project.phases}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Заказчик</dt>
            <dd className="font-medium">{project.clientName || "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Адрес</dt>
            <dd className="font-medium">{project.address || "—"}</dd>
          </div>

          <div>
            <dt className="text-sm text-slate-500">Статус</dt>
            <dd className="font-medium">Черновик</dd>
          </div>

          <div className="sm:col-span-2">
            <dt className="text-sm text-slate-500">Комментарий</dt>
            <dd className="font-medium">{project.comment || "—"}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}